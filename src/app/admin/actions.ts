"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { countPhotos } from "@/lib/media";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Administrator access required.");
  }
  return user;
}

export async function moderateListing(formData: FormData) {
  const admin = await requireAdmin();
  const id = String(formData.get("id") || "");
  const decision = String(formData.get("decision") || "");
  const reason = String(formData.get("reason") || "").trim();
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) return;

  if (decision === "approve") {
    const media = await prisma.propertyImage.findMany({
      where: { propertyId: id },
      select: { mimeType: true },
    });
    if (countPhotos(media) === 0) return;
    await prisma.property.update({
      where: { id },
      data: { status: "APPROVED", publishedAt: new Date(), rejectReason: null },
    });
  } else if (decision === "reject") {
    await prisma.property.update({
      where: { id },
      data: { status: "REJECTED", rejectReason: reason || "Does not meet listing standards." },
    });
  } else {
    return;
  }

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: `property.${decision}`,
      entity: "property",
      entityId: id,
      detail: reason || null,
    },
  });
  revalidatePath("/admin");
  revalidatePath("/properties");
  revalidatePath(`/properties/${property.slug}`);
  revalidatePath("/");
}
