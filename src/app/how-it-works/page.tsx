import type { Metadata } from "next";
import { HowItWorks } from "@/components/home/how-it-works";
import { PageIntro } from "@/components/layout/page-intro";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "How it works",
  description: `How buyers, owners, and dealers will use ${brand.name}.`,
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "How it works" },
        ]}
        title="How it works"
        description="Search is live. Listing, accounts, and moderation are implemented in later phases without fake success states."
      />
      <HowItWorks />
    </>
  );
}
