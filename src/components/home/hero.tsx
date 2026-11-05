import Image from "next/image";
import { PropertySearchForm } from "@/components/search/property-search-form";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <Image
        src="/images/hero-residence.jpg"
        alt="Sunlit residential courtyard used as brand photography, not a live listing"
        fill
        priority
        className="object-cover opacity-35"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/88 to-brand/55" />
      <Container className="relative grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {brand.province}, {brand.country}
          </p>
          <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
            A trustworthy marketplace for Punjab property.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
            Buyers can search without an account. If you own a house, plot, or shop,
            use Sell to enter your own listing — photos, optional video, price, and city.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/list-property" variant="gold">
              Sell your property
            </ButtonLink>
            <ButtonLink href="/register?role=owner" variant="onDark">
              Create seller account
            </ButtonLink>
          </div>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-white/60">Province</dt>
              <dd className="mt-1 font-semibold">Punjab first</dd>
            </div>
            <div>
              <dt className="text-white/60">Listings</dt>
              <dd className="mt-1 font-semibold">Reviewed before public</dd>
            </div>
            <div>
              <dt className="text-white/60">Guests</dt>
              <dd className="mt-1 font-semibold">Browse freely</dd>
            </div>
          </dl>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-gold">Find property</p>
          <PropertySearchForm />
        </div>
      </Container>
    </section>
  );
}
