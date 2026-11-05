import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageIntro } from "@/components/layout/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { prisma } from "@/lib/db";
import { statusLabel } from "@/lib/format";
import { getSessionUser } from "@/lib/session";
import { becomeSellerAction, updateListingStatus } from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/dashboard");
  if (user.role === "ADMIN") redirect("/admin");
  const { notice } = await searchParams;

  const properties = await prisma.property.findMany({
    where: { ownerId: user.id },
    include: { location: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Dashboard" },
        ]}
        title={`Hello, ${user.name}`}
        description={
          user.role === "BUYER"
            ? "Browse and save published listings. Listing a property needs an owner or dealer account."
            : "Your listings. Pending ads are not public until they are approved."
        }
      />
      <Container className="space-y-6 py-10">
        {notice === "need-photos" ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
            Add at least one photo before submitting a listing for review.
          </p>
        ) : null}
        {user.role !== "BUYER" ? (
          <ButtonLink href="/list-property" variant="gold">
            Add a property
          </ButtonLink>
        ) : (
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/properties">Search properties</ButtonLink>
            <form action={becomeSellerAction}>
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-md bg-gold px-4 text-sm font-semibold text-brand-deep"
              >
                I want to sell — become a seller
              </button>
            </form>
          </div>
        )}
        {properties.length === 0 ? (
          <p className="text-sm text-ink-muted">You have not added a listing yet.</p>
        ) : (
          <ul className="space-y-3">
            {properties.map((property) => (
              <li
                key={property.id}
                className="flex flex-col gap-3 rounded-xl border border-brand/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-brand">{property.title}</p>
                  <p className="text-sm text-ink-muted">
                    {property.location.name} · {statusLabel(property.status)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["DRAFT", "PENDING", "REJECTED", "APPROVED"].includes(property.status) ? (
                    <Link href={`/list-property/${property.id}`} className="text-sm text-brand">
                      Edit
                    </Link>
                  ) : null}
                  {property.status === "APPROVED" ? (
                    <Link href={`/properties/${property.slug}`} className="text-sm text-brand">
                      View public page
                    </Link>
                  ) : null}
                  {property.status === "DRAFT" || property.status === "REJECTED" ? (
                    <form action={updateListingStatus}>
                      <input type="hidden" name="id" value={property.id} />
                      <input type="hidden" name="status" value="PENDING" />
                      <button type="submit" className="text-sm text-brand">
                        Submit for review
                      </button>
                    </form>
                  ) : null}
                  {property.status === "APPROVED" ? (
                    <>
                      <form action={updateListingStatus}>
                        <input type="hidden" name="id" value={property.id} />
                        <input type="hidden" name="status" value="SOLD" />
                        <button type="submit" className="text-sm text-ink-muted">
                          Mark sold
                        </button>
                      </form>
                      <form action={updateListingStatus}>
                        <input type="hidden" name="id" value={property.id} />
                        <input type="hidden" name="status" value="RENTED" />
                        <button type="submit" className="text-sm text-ink-muted">
                          Mark rented
                        </button>
                      </form>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
