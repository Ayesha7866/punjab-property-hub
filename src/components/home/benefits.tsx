import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const buyerBenefits = [
  "Browse published listings without creating an account.",
  "Shareable search URLs for city, type, purpose, and budget.",
  "Save properties and send enquiries after you sign in (Phase 4).",
  "Call or WhatsApp only when a seller has consented to contact.",
];

const sellerBenefits = [
  "Separate owner and dealer accounts — dealers do not pose as owners.",
  "Draft → pending review → published workflow, not instant public posts.",
  "Photo limits, file-type checks, and server-side validation (Phase 3).",
  "Mark sold, rented, or archived from the seller dashboard (Phase 4).",
];

export function Benefits() {
  return (
    <section className="bg-cream py-16">
      <Container>
        <SectionHeading
          eyebrow="Why this marketplace"
          title="Built for buyers and for people who actually own or sell the property"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-brand/10 bg-white p-7 shadow-sm">
            <h3 className="font-serif text-2xl text-brand">For buyers and tenants</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-ink-muted">
              {buyerBenefits.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border border-brand/10 bg-white p-7 shadow-sm">
            <h3 className="font-serif text-2xl text-brand">For owners and dealers</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-ink-muted">
              {sellerBenefits.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
