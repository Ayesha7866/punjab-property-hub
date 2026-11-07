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
        className="object-cover scale-105 opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#d45c28_0%,transparent_28%),linear-gradient(105deg,#040910_10%,#07111fdd_48%,#16345aaa_100%)]" />
      <div className="orb left-[-6rem] top-16 h-64 w-64 bg-terracotta/50" />
      <div className="orb right-[8%] top-[20%] h-48 w-48 bg-gold/35" style={{ animationDelay: "1.4s" }} />
      <div className="grain" />
      <Container className="relative grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron animate-pulse-soft" />
            {brand.province}, {brand.country}
          </p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Property that feels like Punjab — not a spreadsheet.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/78">
            Search houses, plots, and shops across 36 districts. Sellers list their own ads
            with photos and video. Nothing goes public until it is reviewed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/list-property" variant="gold" size="lg">
              Sell your property
            </ButtonLink>
            <ButtonLink href="/register?role=owner" variant="onDark" size="lg">
              Create seller account
            </ButtonLink>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-white/55">Coverage</dt>
              <dd className="mt-1 font-serif text-xl">36 districts</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-white/55">Listings</dt>
              <dd className="mt-1 font-serif text-xl">Reviewed</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-white/55">Buyers</dt>
              <dd className="mt-1 font-serif text-xl">Browse free</dd>
            </div>
          </dl>
        </div>
        <div className="reveal lg:-mb-24" style={{ animationDelay: "120ms" }}>
          <p className="mb-3 text-sm font-medium text-gold">Find a home, plot, or shop</p>
          <PropertySearchForm />
        </div>
      </Container>
    </section>
  );
}
