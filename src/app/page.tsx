import { Suspense } from "react";
import { Benefits } from "@/components/home/benefits";
import { FeaturedAndRecent } from "@/components/home/featured-and-recent";
import { HomeHero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ListCta } from "@/components/home/list-cta";
import { PopularCities } from "@/components/home/popular-cities";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    description: brand.description,
    url: brand.url,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Punjab, Pakistan",
    },
    email: brand.contact.email,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeHero />
      <PopularCities />
      <section className="py-16">
        <Container>
          <Suspense fallback={<p className="text-sm text-ink-muted">Loading listings…</p>}>
            <FeaturedAndRecent />
          </Suspense>
        </Container>
      </section>
      <HowItWorks />
      <Benefits />
      <ListCta />
    </>
  );
}
