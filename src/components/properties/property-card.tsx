import Image from "next/image";
import Link from "next/link";
import { categoryLabel, formatPkr } from "@/lib/format";
import type { PublicProperty } from "@/lib/listings";
import { isVideoMime } from "@/lib/media";

export function PropertyCard({ property }: { property: PublicProperty }) {
  const photo = property.images.find((item) => !isVideoMime(item.mimeType));
  const src = photo ? `/api/media/${photo.id}` : "/images/hero-residence.jpg";

  return (
    <article className="overflow-hidden rounded-xl border border-brand/10 bg-white shadow-sm">
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative h-44">
          <Image
            src={src}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized={Boolean(photo)}
          />
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
            {property.purpose === "RENT" ? "For rent" : property.purpose === "COMMERCIAL" ? "Commercial" : "For sale"}
            {" · "}
            {categoryLabel(property.category)}
          </p>
          <h3 className="font-serif text-xl text-brand">{property.title}</h3>
          <p className="text-sm text-ink-muted">
            {property.location.name}, {property.location.district}
          </p>
          <p className="font-semibold text-brand">{formatPkr(property.pricePkr)}</p>
          <p className="text-xs text-ink-muted">
            {property.sizeValue} {property.sizeUnit}
            {property.bedrooms != null ? ` · ${property.bedrooms} bed` : ""}
          </p>
        </div>
      </Link>
    </article>
  );
}
