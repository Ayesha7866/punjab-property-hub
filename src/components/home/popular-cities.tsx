import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { popularPunjabCities, punjabDistrictCount, punjabPlaceCount } from "@/data/punjab-locations";

export function PopularCities() {
  return (
    <section className="bg-cream py-16">
      <Container>
        <SectionHeading
          eyebrow="Punjab"
          title="Popular cities"
          description={`${punjabPlaceCount} cities and towns across ${punjabDistrictCount} districts are in search — including Jhang, Toba Tek Singh, Gojra, and Murree. The cards below are shortcuts. We do not invent streets or map pins.`}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularPunjabCities.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/properties?city=${city.slug}&purpose=sale`}
                className="group block overflow-hidden rounded-xl border border-brand/10 bg-white shadow-sm"
              >
                <div className="relative h-40">
                  <Image
                    src={city.imageSrc}
                    alt={city.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-4">
                  <p className="font-serif text-lg text-brand">{city.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-gold-deep">
                    {city.district} district
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{city.blurb}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/cities" variant="outline">
            Browse all Punjab cities
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
