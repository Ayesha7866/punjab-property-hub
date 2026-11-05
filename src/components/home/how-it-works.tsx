import { BadgeCheck, Building2, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    icon: Search,
    title: "Search Punjab",
    body: "Filter by sale or rent, city, property type, and budget. Guests can browse without an account.",
  },
  {
    icon: Building2,
    title: "Sellers publish",
    body: "Owners and dealers add photos (and optional video), price, city, and a phone / WhatsApp number.",
  },
  {
    icon: BadgeCheck,
    title: "We review, then publish",
    body: "Pending listings stay private. Only approved properties will appear in search and on city pages.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Process" title="How it works" />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-brand/10 bg-white p-6 shadow-sm"
            >
              <step.icon className="h-6 w-6 text-gold-deep" aria-hidden="true" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Step {index + 1}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-brand">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
