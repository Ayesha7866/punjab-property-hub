import Image from "next/image";
import Link from "next/link";
import { categoryLabel, formatPkr } from "@/lib/format";
import type { PublicProperty } from "@/lib/listings";
import { isVideoMime } from "@/lib/media";

export function PropertyCard({ property }: { property: PublicProperty }) {
  const photo = property.images.find((item) => !isVideoMime(item.mimeType));
  const src = photo ? `/api/media/${photo.id}` : "/images/hero-residence.jpg";

  return (
    <article className="card-lift overflow-hidden rounded-[1.6rem] border border-brand/10 bg-surface shadow-sm">
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative h-52">
          <Image
            src={src}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized={Boolean(photo)}
          />
          <p className="absolute left-3 top-3 rounded-full bg-brand/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold backdrop-blur">
            {property.purpose === "RENT" ? "For rent" : property.purpose === "COMMERCIAL" ? "Commercial" : "For sale"}
          </p>
        </div>
        <div className="space-y-2 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
            {categoryLabel(property.category)}
          </p>
          <h3 className="font-serif text-2xl leading-snug text-brand">{property.title}</h3>
          <p className="text-sm text-ink-muted">
            {property.location.name}, {property.location.district}
          </p>
          <p className="font-serif text-2xl text-brand">{formatPkr(property.pricePkr)}</p>
          <p className="text-xs text-ink-muted">
            {property.sizeValue} {property.sizeUnit}
            {property.bedrooms != null ? ` · ${property.bedrooms} bed` : ""}
          </p>
        </div>
      </Link>
    </article>
  );
}
