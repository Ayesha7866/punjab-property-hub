import { BadgeCheck, Building2, Search } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
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
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute -left-24 top-10 font-serif text-[12rem] leading-none text-brand/[0.04]">
        03
      </div>
      <Container>
        <SectionHeading eyebrow="The loop" title="How it works" />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delayMs={index * 90}>
                <article className="relative h-full overflow-hidden rounded-[1.7rem] border border-brand/10 bg-surface p-7 shadow-sm">
                  <p className="font-serif text-6xl text-gold/40">0{index + 1}</p>
                  <step.icon className="mt-2 h-6 w-6 text-terracotta" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-2xl text-brand">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{step.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
