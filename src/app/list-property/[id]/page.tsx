import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { parseAmenities } from "@/lib/amenities";
import { prisma } from "@/lib/db";
import { canListProperties, getSessionUser } from "@/lib/session";
import { ListingForm } from "../listing-form";

export const metadata: Metadata = {
  title: "Edit listing",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=/list-property/${id}`);
  if (!canListProperties(user.role)) redirect("/list-property");
  const property = await prisma.property.findFirst({
    where: { id, ownerId: user.id },
    include: { location: true, images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!property) notFound();
  if (["SOLD", "RENTED", "ARCHIVED"].includes(property.status)) {
    redirect("/dashboard");
  }

  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { label: "Edit listing" },
        ]}
        title="Edit your listing"
        description="Changes to a published ad go back to review before they appear on the public site."
      />
      <Container className="max-w-3xl py-12">
        <ListingForm
          defaultPhone={user.phone}
          existing={{
            id: property.id,
            title: property.title,
            description: property.description,
            purpose: property.purpose,
            category: property.category,
            pricePkr: property.pricePkr,
            negotiable: property.negotiable,
            locationSlug: property.location.slug,
            areaName: property.areaName,
            societyName: property.societyName,
            sizeValue: property.sizeValue,
            sizeUnit: property.sizeUnit,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            coveredArea: property.coveredArea,
            amenities: parseAmenities(property.amenities),
            contactPhone: property.contactPhone,
            whatsappPhone: property.whatsappPhone,
            showPhone: property.showPhone,
            showWhatsapp: property.showWhatsapp,
            photos: property.images.map((image) => ({ id: image.id, mimeType: image.mimeType })),
          }}
        />
      </Container>
    </>
  );
}
