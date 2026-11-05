"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { countPhotos } from "@/lib/media";

export async function becomeSellerAction() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/list-property");
  if (user.role === "ADMIN" || user.role === "OWNER" || user.role === "DEALER") {
    redirect("/list-property");
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { role: "OWNER" },
  });
  revalidatePath("/dashboard");
  revalidatePath("/list-property");
  redirect("/list-property");
}

export async function updateListingStatus(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return;
  const id = String(formData.get("id") || "");
  const next = String(formData.get("status") || "");
  const allowed = ["SOLD", "RENTED", "ARCHIVED", "PENDING"] as const;
  if (!allowed.includes(next as (typeof allowed)[number])) return;

  const property = await prisma.property.findFirst({
    where: { id, ownerId: user.id },
    include: { images: { select: { mimeType: true } } },
  });
  if (!property) return;
  if (next === "PENDING" && property.status !== "DRAFT" && property.status !== "REJECTED") return;
  if (next === "PENDING" && countPhotos(property.images) === 0) {
    redirect("/dashboard?notice=need-photos");
  }
  if (["SOLD", "RENTED", "ARCHIVED"].includes(next) && property.status !== "APPROVED") return;

  await prisma.property.update({
    where: { id },
    data: {
      status: next as typeof property.status,
      submittedAt: next === "PENDING" ? new Date() : property.submittedAt,
    },
  });
  revalidatePath("/dashboard");
  revalidatePath("/properties");
}
