import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Register as a buyer, property owner, or dealer on Punjab Property Hub.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Register" },
        ]}
        title="Create an account"
        description="Choose Seller if you want to add your own property. Choose Buyer only if you are searching. Dealers list for clients. You cannot make yourself an administrator."
      />
      <Container className="max-w-md py-12">
        <Suspense fallback={<p className="text-sm text-ink-muted">Loading form…</p>}>
          <RegisterForm />
        </Suspense>
        <p className="mt-6 text-sm text-ink-muted">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-brand">
            Sign in
          </Link>
        </p>
      </Container>
    </>
  );
}
