import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ListingMedia } from "@/components/properties/listing-media";
import { Container } from "@/components/ui/container";
import { parseAmenities } from "@/lib/amenities";
import { categoryLabel, formatPkr } from "@/lib/format";
import { getPublishedBySlug } from "@/lib/listings";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPublishedBySlug(slug);
  if (!property) return { title: "Listing not found" };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    alternates: { canonical: `/properties/${property.slug}` },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPublishedBySlug(slug);
  if (!property) notFound();
  const amenities = parseAmenities(property.amenities);
  const publicPhone = property.showPhone ? property.contactPhone : null;
  const waNumber = property.showWhatsapp
    ? property.whatsappPhone || property.contactPhone
    : publicPhone;
  const wa = waNumber
    ? whatsappLink(waNumber, `Assalamu alaikum, I saw ${property.title} on Punjab Property Hub. Is it still available?`)
    : null;

  return (
    <Container className="space-y-8 py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/properties", label: "Search" },
          { label: property.title },
        ]}
      />
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <ListingMedia items={property.images} title={property.title} />
          <h1 className="mt-6 font-serif text-4xl text-brand">{property.title}</h1>
          <p className="mt-2 text-ink-muted">
            {property.location.name}, {property.location.district}, Punjab
          </p>
          <p className="mt-6 whitespace-pre-wrap leading-7 text-ink-muted">{property.description}</p>
          {amenities.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {amenities.map((item) => (
                <li key={item} className="rounded-full bg-cream px-3 py-1 text-sm text-brand">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <aside className="h-fit rounded-xl border border-brand/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
            {property.purpose === "RENT" ? "For rent" : property.purpose === "COMMERCIAL" ? "Commercial" : "For sale"}
          </p>
          <p className="mt-2 font-serif text-3xl text-brand">{formatPkr(property.pricePkr)}</p>
          {property.negotiable ? <p className="text-sm text-ink-muted">Negotiable</p> : null}
          <dl className="mt-4 space-y-2 text-sm text-ink-muted">
            <div>Type: {categoryLabel(property.category)}</div>
            <div>
              Size: {property.sizeValue} {property.sizeUnit}
            </div>
            {property.bedrooms != null ? <div>Bedrooms: {property.bedrooms}</div> : null}
            {property.bathrooms != null ? <div>Bathrooms: {property.bathrooms}</div> : null}
            {property.coveredArea != null ? <div>Covered area: {property.coveredArea}</div> : null}
            {property.societyName ? <div>Society: {property.societyName}</div> : null}
            <div>Listed by: {property.owner.role === "DEALER" ? "Dealer / agent" : "Owner"}</div>
          </dl>
          <div className="mt-6 space-y-2">
            <p className="text-sm font-semibold text-brand">Talk to the seller</p>
            <p className="text-sm text-ink-muted">
              This website does not collect payment. Call or WhatsApp the seller about a visit or offer.
            </p>
            {publicPhone ? (
              <a
                className="block rounded-md bg-brand px-4 py-3 text-center text-sm font-semibold text-white"
                href={`tel:${publicPhone}`}
              >
                Call seller {publicPhone}
              </a>
            ) : null}
            {wa ? (
              <a
                className="block rounded-md bg-[#128C7E] px-4 py-3 text-center text-sm font-semibold text-white"
                href={wa}
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp seller
              </a>
            ) : null}
            {publicPhone ? (
              <a
                className="block rounded-md border border-brand/20 px-4 py-3 text-center text-sm text-brand"
                href={`sms:${publicPhone}`}
              >
                Send SMS
              </a>
            ) : null}
            {!publicPhone && !wa ? (
              <p className="text-sm text-ink-muted">
                The seller has hidden public contact. Use the site Contact page and mention this listing.
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </Container>
  );
}
