import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "About",
  description: `About ${brand.name}, a property marketplace for Punjab, Pakistan.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "About" },
        ]}
        title={`About ${brand.name}`}
        description={brand.tagline}
      />
      <Container className="max-w-3xl space-y-5 py-12 text-base leading-7 text-ink-muted">
        <p>
          {brand.name} is being built as a production marketplace for property in
          Punjab, Pakistan. Owners, dealers, and authorised agents will publish
          homes, plots, and commercial space. Buyers and tenants will search,
          save, and contact sellers.
        </p>
        <p>
          The brand name, navy and gold colours, and contact details are stored in{" "}
          <code className="rounded bg-cream px-1.5 py-0.5 text-sm">src/config/brand.ts</code>{" "}
          so they can change later.
        </p>
        <p>
          We do not invent live listings, street addresses, or map coordinates.
          Public search shows only listings that have passed review — once that
          workflow is connected in later phases.
        </p>
      </Container>
    </>
  );
}
