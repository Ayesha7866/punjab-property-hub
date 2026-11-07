import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/properties?purpose=sale", label: "Buy" },
      { href: "/properties?purpose=rent", label: "Rent" },
      { href: "/list-property", label: "Sell / list property" },
      { href: "/properties?purpose=commercial", label: "Commercial" },
      { href: "/cities", label: "Punjab cities" },
    ],
  },
  {
    title: "Sellers",
    links: [
      { href: "/list-property", label: "List a property" },
      { href: "/register?role=owner", label: "Owner account" },
      { href: "/register?role=dealer", label: "Dealer / agent" },
      { href: "/how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-brand-deep text-white">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo invert />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">{brand.description}</p>
          <p className="mt-4 text-sm text-gold">{brand.contact.email}</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{column.title}</p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.href}`}>
                  <Link href={link.href} className="text-sm text-white/75 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.legalName}. Listings appear only after review.</p>
          <p>Punjab, Pakistan · reviewed listings only</p>
        </Container>
      </div>
    </footer>
  );
}
