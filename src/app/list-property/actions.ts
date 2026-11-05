"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { propertyInputSchema } from "@/lib/property-schema";
import { rateLimit } from "@/lib/rate-limit";
import { canListProperties, clientIp, getSessionUser } from "@/lib/session";
import { uniqueSlug } from "@/lib/slug";
import { countPhotos, countVideos } from "@/lib/media";
import { savePropertyMedia } from "@/lib/uploads";

export type FormState = {
  status: "idle" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

function bool(formData: FormData, name: string) {
  return formData.get(name) === "on" || formData.get(name) === "true";
}

export async function createPropertyAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login?next=/list-property");
  }
  if (!canListProperties(user.role)) {
    return {
      status: "error",
      message: "Buyer accounts can browse and save listings. Register as an owner or dealer to publish property.",
    };
  }

  const limited = rateLimit(`list:${user.id}:${await clientIp()}`, 10, 60 * 60 * 1000);
  if (!limited.ok) {
    return { status: "error", message: "Too many listing submissions. Try later." };
  }

  const parsed = propertyInputSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    purpose: formData.get("purpose"),
    category: formData.get("category"),
    pricePkr: formData.get("pricePkr"),
    negotiable: bool(formData, "negotiable"),
    locationSlug: formData.get("locationSlug"),
    areaName: formData.get("areaName") || undefined,
    societyName: formData.get("societyName") || undefined,
    sizeValue: formData.get("sizeValue"),
    sizeUnit: formData.get("sizeUnit"),
    bedrooms: formData.get("bedrooms") || undefined,
    bathrooms: formData.get("bathrooms") || undefined,
    coveredArea: formData.get("coveredArea") || undefined,
    amenities: formData.getAll("amenities"),
    contactPhone: formData.get("contactPhone"),
    whatsappPhone: formData.get("whatsappPhone") || "",
    showPhone: bool(formData, "showPhone"),
    showWhatsapp: bool(formData, "showWhatsapp"),
    intent: formData.get("intent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const location = await prisma.location.findFirst({
    where: { slug: parsed.data.locationSlug, active: true },
  });
  if (!location) {
    return { status: "error", message: "Choose a valid Punjab city from the list." };
  }

  const files = [...formData.getAll("photos"), ...formData.getAll("videos")].filter(
    (item): item is File => item instanceof File,
  );
  const whatsappPhone = parsed.data.whatsappPhone || parsed.data.contactPhone;
  const showWhatsapp = Boolean(parsed.data.showWhatsapp && whatsappPhone);
  const submit = parsed.data.intent === "submit";
  const propertyId = String(formData.get("propertyId") || "");

  async function storeFiles(already: { photos: number; videos: number }) {
    try {
      return await savePropertyMedia(files, already);
    } catch (error) {
      return {
        status: "error" as const,
        message: error instanceof Error ? error.message : "Photo or video upload failed.",
      };
    }
  }

  if (propertyId) {
    const existing = await prisma.property.findFirst({
      where: { id: propertyId, ownerId: user.id },
      include: { images: true },
    });
    if (!existing) {
      return { status: "error", message: "This listing was not found on your account." };
    }
    if (["SOLD", "RENTED", "ARCHIVED"].includes(existing.status)) {
      return { status: "error", message: "Sold, rented, or archived listings cannot be edited." };
    }
    const images = await storeFiles({
      photos: countPhotos(existing.images),
      videos: countVideos(existing.images),
    });
    if ("status" in images) return images;
    if (submit && countPhotos(existing.images) + countPhotos(images) === 0) {
      return { status: "error", message: "Add at least one photo before submitting for review." };
    }
    const backToReview = submit || existing.status === "APPROVED";
    await prisma.property.update({
      where: { id: existing.id },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        purpose: parsed.data.purpose,
        category: parsed.data.category,
        pricePkr: parsed.data.pricePkr,
        negotiable: Boolean(parsed.data.negotiable),
        locationId: location.id,
        areaName: parsed.data.areaName,
        societyName: parsed.data.societyName,
        sizeValue: parsed.data.sizeValue,
        sizeUnit: parsed.data.sizeUnit,
        bedrooms: parsed.data.bedrooms,
        bathrooms: parsed.data.bathrooms,
        coveredArea: parsed.data.coveredArea,
        amenities: JSON.stringify(parsed.data.amenities ?? []),
        contactPhone: parsed.data.contactPhone,
        whatsappPhone,
        showPhone: parsed.data.showPhone ?? true,
        showWhatsapp,
        status: backToReview ? "PENDING" : existing.status === "PENDING" ? "PENDING" : "DRAFT",
        submittedAt: backToReview ? new Date() : existing.submittedAt,
        publishedAt: backToReview ? null : existing.publishedAt,
        rejectReason: backToReview ? null : existing.rejectReason,
        images: {
          create: images.map((image, index) => ({
            fileName: image.fileName,
            mimeType: image.mimeType,
            sortOrder: existing.images.length + index,
          })),
        },
      },
    });
    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: submit || existing.status === "APPROVED" ? "property.submit" : "property.draft",
        entity: "property",
        entityId: existing.id,
      },
    });
    redirect("/dashboard");
  }

  const images = await storeFiles({ photos: 0, videos: 0 });
  if ("status" in images) return images;
  if (submit && countPhotos(images) === 0) {
    return { status: "error", message: "Add at least one photo before submitting for review." };
  }

  const property = await prisma.property.create({
    data: {
      slug: uniqueSlug(parsed.data.title),
      title: parsed.data.title,
      description: parsed.data.description,
      purpose: parsed.data.purpose,
      category: parsed.data.category,
      pricePkr: parsed.data.pricePkr,
      negotiable: Boolean(parsed.data.negotiable),
      locationId: location.id,
      areaName: parsed.data.areaName,
      societyName: parsed.data.societyName,
      sizeValue: parsed.data.sizeValue,
      sizeUnit: parsed.data.sizeUnit,
      bedrooms: parsed.data.bedrooms,
      bathrooms: parsed.data.bathrooms,
      coveredArea: parsed.data.coveredArea,
      amenities: JSON.stringify(parsed.data.amenities ?? []),
      contactPhone: parsed.data.contactPhone,
      whatsappPhone,
      showPhone: parsed.data.showPhone ?? true,
      showWhatsapp,
      status: submit ? "PENDING" : "DRAFT",
      submittedAt: submit ? new Date() : null,
      ownerId: user.id,
      images: {
        create: images.map((image, index) => ({
          fileName: image.fileName,
          mimeType: image.mimeType,
          sortOrder: index,
        })),
      },
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: submit ? "property.submit" : "property.draft",
      entity: "property",
      entityId: property.id,
    },
  });

  redirect("/dashboard");
}
