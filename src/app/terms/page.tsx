import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms of use for ${brand.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Terms" },
        ]}
        title="Terms of use"
        description="Sellers are responsible for the accuracy of listings. The marketplace reviews submissions and may refuse or remove them."
      />
      <Container className="max-w-3xl space-y-5 py-12 text-base leading-7 text-ink-muted">
        <p>
          You must be authorised to list a property. Dealers must not present
          themselves as owners. Fabricated prices, photos you do not have rights
          to, or invented addresses are not allowed.
        </p>
        <p>
          Featured placement and dealer subscriptions are prepared in the
          codebase but payments stay disabled until a real provider is configured.
          We will not invent successful transactions.
        </p>
        <p>
          {brand.name} is not a party to the sale or rental contract between
          buyers and sellers. Have these terms reviewed by a lawyer before launch.
        </p>
      </Container>
    </>
  );
}
