import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { safeNextPath } from "@/lib/safe-path";
import { brand } from "@/config/brand";
import { getSessionUser } from "@/lib/session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to ${brand.name}.`,
  alternates: { canonical: "/login" },
};

export const instant = false;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next ? safeNextPath(params.next, "") : "";
  const user = await getSessionUser();
  if (user) {
    redirect(safeNextPath(next, user.role === "ADMIN" ? "/admin" : "/dashboard"));
  }

  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Sign in" },
        ]}
        title="Sign in"
        description="Sign in to list property, manage your ads, or continue as a buyer."
      />
      <Container className="max-w-md py-12">
        <LoginForm next={next || undefined} />
        <p className="mt-6 text-sm text-ink-muted">
          Need an account?{" "}
          <Link href="/register" className="font-medium text-brand">
            Register
          </Link>
        </p>
      </Container>
    </>
  );
}
