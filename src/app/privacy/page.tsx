import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `Privacy policy for ${brand.name}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Privacy" },
        ]}
        title="Privacy policy"
        description="This policy describes the data the application is designed to hold. It is not a claim that every subsystem is already collecting that data."
      />
      <Container className="max-w-3xl space-y-5 py-12 text-base leading-7 text-ink-muted">
        <p>
          {brand.name} will store account details (name, email, phone, role),
          listing information you submit, saved properties, and enquiry records.
          Passwords will be stored as hashes, never in plain text.
        </p>
        <p>
          Published listings are public. Seller contact details are shown only
          according to the seller’s contact preferences. Pending and rejected
          listings are not public.
        </p>
        <p>
          Service-role keys and database credentials stay on the server. We do
          not sell personal data. You may request correction or deletion of your
          account by emailing {brand.contact.email}.
        </p>
        <p>Have this document reviewed by a lawyer before you take the site live.</p>
      </Container>
    </>
  );
}
