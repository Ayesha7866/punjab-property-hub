"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";
import { logoutAction } from "@/app/logout/actions";
import { Logo } from "@/components/brand/logo";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/properties?purpose=sale", label: "Buy" },
  { href: "/properties?purpose=rent", label: "Rent" },
  { href: "/list-property", label: "Sell" },
  { href: "/properties?purpose=commercial", label: "Commercial" },
  { href: "/cities", label: "Cities" },
  { href: "/about", label: "About" },
];

function isNavActive(href: string, pathname: string, purpose: string | null) {
  if (href.startsWith("/properties")) {
    if (pathname !== "/properties") return false;
    const wanted = new URL(href, "http://local.invalid").searchParams.get("purpose") || "sale";
    return (purpose || "sale") === wanted;
  }
  if (href === "/list-property") {
    return pathname === "/list-property" || pathname.startsWith("/list-property/");
  }
  return pathname === href;
}

type HeaderUser = { name: string; role: string } | null;

function DesktopNav() {
  const pathname = usePathname();
  const purpose = useSearchParams().get("purpose");
  return (
    <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium text-ink-muted transition-colors hover:text-brand",
            isNavActive(item.href, pathname, purpose) && "text-brand",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader({ user }: { user: HeaderUser }) {
  const [open, setOpen] = useState(false);
  const dashboardHref = user?.role === "ADMIN" ? "/admin" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-brand/10 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <Suspense
          fallback={
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm font-medium text-ink-muted">
                  {item.label}
                </Link>
              ))}
            </nav>
          }
        >
          <DesktopNav />
        </Suspense>
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <ButtonLink href={dashboardHref} variant="ghost" size="sm">
                {user.role === "ADMIN" ? "Admin" : "My dashboard"}
              </ButtonLink>
              <form action={logoutAction}>
                <Button type="submit" variant="ghost" size="sm">
                  Sign out
                </Button>
              </form>
              <ButtonLink href="/list-property" variant="gold" size="sm">
                Sell your property
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink href="/login" variant="ghost" size="sm">
                Sign in
              </ButtonLink>
              <ButtonLink href="/list-property" variant="gold" size="sm">
                Sell your property
              </ButtonLink>
            </>
          )}
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand/15 text-brand lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>
      {open ? (
        <div id="mobile-nav" className="border-t border-brand/10 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand hover:bg-cream"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted"
                  onClick={() => setOpen(false)}
                >
                  {user.role === "ADMIN" ? "Admin" : "My dashboard"}
                </Link>
                <form action={logoutAction}>
                  <button type="submit" className="w-full rounded-md px-3 py-2 text-left text-sm text-ink-muted">
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            )}
            <ButtonLink href="/list-property" variant="gold" className="mt-2 w-full">
              Sell your property
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
