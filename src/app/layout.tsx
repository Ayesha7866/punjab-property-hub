import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, Outfit } from "next/font/google";
import { HeaderAuth } from "@/components/layout/header-auth";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { brand } from "@/config/brand";
import "./globals.css";

const sans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} | Buy, rent, and list property in Punjab, Pakistan`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "Punjab property",
    "Pakistan real estate",
    "houses for sale Punjab",
    "plots Lahore Faisalabad Multan",
    "rent Punjab",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: brand.name,
    description: brand.tagline,
    url: "/",
    siteName: brand.name,
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PK" className={`${sans.variable} ${serif.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Suspense fallback={<SiteHeader user={null} />}>
          <HeaderAuth />
        </Suspense>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
