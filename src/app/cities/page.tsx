import type { Metadata } from "next";
import { CitiesDirectory } from "@/components/cities/cities-directory";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { punjabDistrictCount, punjabPlaceCount } from "@/data/punjab-locations";

export const metadata: Metadata = {
  title: "All Punjab cities and districts",
  description: `Directory of ${punjabDistrictCount} Punjab districts and ${punjabPlaceCount} cities, tehsils, and towns for property search. This is a navigation index, not empty city landing pages.`,
  alternates: { canonical: "/cities" },
};

export default function CitiesPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Cities" },
        ]}
        title="All Punjab cities"
        description={`${punjabPlaceCount} cities and towns across ${punjabDistrictCount} districts — including Jhang, Toba Tek Singh, Okara, Kasur, Sheikhupura, and the rest of Punjab. Type a name to jump to it. Listings appear only after review.`}
      />
      <Container className="py-12">
        <CitiesDirectory />
      </Container>
    </>
  );
}
