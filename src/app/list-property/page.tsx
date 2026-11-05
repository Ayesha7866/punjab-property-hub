import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { becomeSellerAction } from "@/app/dashboard/actions";
import { canListProperties, getSessionUser } from "@/lib/session";
import { ListingForm } from "./listing-form";

export const metadata: Metadata = {
  title: "Sell / list a property",
  description: "Owners and dealers enter their own Punjab property for review.",
  alternates: { canonical: "/list-property" },
};

export const instant = false;

export default async function ListPropertyPage() {
  const user = await getSessionUser();

  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Sell" },
        ]}
        title="Seller: add your property"
        description="This form is for owners and dealers — not buyers. Enter the house, plot, or shop yourself. It stays private until an administrator approves it."
      />
      <Container className="max-w-3xl py-12">
        {!user ? (
          <div className="space-y-6">
            <p className="text-ink-muted">
              Create a <strong className="text-brand">seller account</strong> first, then fill
              the listing form (city, price, photos, phone).
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="/register?role=owner"
                className="rounded-xl border border-gold bg-cream p-5 shadow-sm"
              >
                <p className="font-serif text-xl text-brand">I own the property</p>
                <p className="mt-2 text-sm text-ink-muted">
                  House, plot, flat, shop — list it yourself.
                </p>
              </a>
              <a
                href="/register?role=dealer"
                className="rounded-xl border border-brand/15 bg-white p-5 shadow-sm"
              >
                <p className="font-serif text-xl text-brand">I am a dealer / agent</p>
                <p className="mt-2 text-sm text-ink-muted">
                  List authorised inventory for your clients.
                </p>
              </a>
            </div>
            <ButtonLink href="/login?next=/list-property" variant="outline">
              I already have a seller account — sign in
            </ButtonLink>
          </div>
        ) : !canListProperties(user.role) ? (
          <div className="space-y-4">
            <p className="text-ink-muted">
              This login is a buyer account. Turn it into a seller account to add
              your property (same email, no new registration).
            </p>
            <form action={becomeSellerAction}>
              <button
                type="submit"
                className="rounded-md bg-gold px-4 py-3 text-sm font-semibold text-brand-deep"
              >
                Make this a seller account and open the form
              </button>
            </form>
          </div>
        ) : (
          <ListingForm defaultPhone={user.phone} />
        )}
      </Container>
    </>
  );
}
