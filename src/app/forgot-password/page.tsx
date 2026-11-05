import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Password reset help for Punjab Property Hub.",
  alternates: { canonical: "/forgot-password" },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/login", label: "Sign in" },
          { label: "Forgot password" },
        ]}
        title="Forgot password"
        description="Automatic reset emails are not enabled yet. Use the contact form and an administrator can help from there."
      />
      <Container className="max-w-xl py-12 text-sm leading-6 text-ink-muted">
        <p>
          This site does not send password-reset mail until SMTP is configured.
          Write through{" "}
          <Link href="/contact" className="font-medium text-brand">
            Contact
          </Link>{" "}
          using the same email as your account.
        </p>
      </Container>
    </>
  );
}
