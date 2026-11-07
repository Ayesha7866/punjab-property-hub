import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const buyerBenefits = [
  "Browse published listings without creating an account.",
  "Shareable search URLs for city, type, purpose, and budget.",
  "Call, WhatsApp, or SMS the seller from the listing page.",
  "Pending ads never appear in public search.",
];

const sellerBenefits = [
  "Separate owner and dealer accounts — dealers do not pose as owners.",
  "Draft → pending review → published workflow, not instant public posts.",
  "Up to 20 photos and 2 walk-through videos per listing.",
  "Mark sold or rented from the seller dashboard.",
];

export function Benefits() {
  return (
    <section className="bg-brand py-20 text-white">
      <Container>
        <SectionHeading
          invert
          eyebrow="Why this marketplace"
          title="Built for buyers — and for people who actually own the keys"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[1.8rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Buyers</p>
              <h3 className="mt-2 font-serif text-3xl">Look first. Talk later.</h3>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-white/75">
                {buyerBenefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delayMs={80}>
            <article className="h-full rounded-[1.8rem] border border-gold/20 bg-gradient-to-br from-terracotta/30 to-brand-mid/40 p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Sellers</p>
              <h3 className="mt-2 font-serif text-3xl">Your ad. Your phone.</h3>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-white/80">
                {sellerBenefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
