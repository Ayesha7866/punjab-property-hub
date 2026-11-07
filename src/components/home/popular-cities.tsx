import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { popularPunjabCities, punjabDistrictCount, punjabPlaceCount } from "@/data/punjab-locations";

export function PopularCities() {
  return (
    <section className="bg-cream py-20">
      <Container>
        <SectionHeading
          eyebrow="Punjab map, without fake pins"
          title="Start in a city people actually search"
          description={`${punjabPlaceCount} cities and towns across ${punjabDistrictCount} districts sit in the directory — Jhang, Toba Tek Singh, Gojra, Murree, and the rest. Cards are shortcuts. We do not invent streets.`}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularPunjabCities.map((city, index) => (
            <li key={city.slug} className={index === 0 ? "sm:col-span-2 lg:row-span-2" : undefined}>
              <Reveal delayMs={index * 50}>
                <Link
                  href={`/properties?city=${city.slug}&purpose=sale`}
                  className="card-lift group relative block overflow-hidden rounded-[1.6rem] bg-brand text-white shadow-lg"
                >
                  <div className={`relative ${index === 0 ? "h-72 lg:h-full min-h-72" : "h-44"}`}>
                    <Image
                      src={city.imageSrc}
                      alt={city.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-serif text-2xl">{city.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gold">{city.district} district</p>
                      <p className={`mt-2 text-sm leading-6 text-white/80 ${index === 0 ? "" : "line-clamp-2"}`}>
                        {city.blurb}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href="/cities" variant="outline">
            Browse all Punjab cities
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
