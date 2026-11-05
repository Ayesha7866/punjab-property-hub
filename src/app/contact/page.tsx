import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${brand.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
        title="Contact"
        description={`Use the form to reach the site team. You can also email ${brand.contact.email}.`}
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-2">
        <ContactForm />
        <aside className="rounded-xl border border-brand/10 bg-white p-6 text-sm leading-6 text-ink-muted shadow-sm">
          <p>
            Messages are stored for the administrator. Email replies still need
            SMTP if you want automatic mail.
          </p>
          <p className="mt-4">
            {brand.contact.addressLine}
          </p>
        </aside>
      </Container>
    </>
  );
}
