import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";
import { ListingMediaThumb } from "@/components/properties/listing-media";
import { prisma } from "@/lib/db";
import { categoryLabel, formatPkr } from "@/lib/format";
import { getSessionUser } from "@/lib/session";
import { countPhotos } from "@/lib/media";
import { moderateListing } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/admin");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const [users, pending, published, messages] = await Promise.all([
    prisma.user.count(),
    prisma.property.findMany({
      where: { status: "PENDING" },
      include: {
        location: true,
        owner: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
      orderBy: { submittedAt: "asc" },
    }),
    prisma.property.count({ where: { status: "APPROVED" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
  ]);

  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Admin" },
        ]}
        title="Moderation"
        description={`${users} users · ${published} published listings · ${pending.length} waiting for review.`}
      />
      <Container className="space-y-10 py-10">
        <section className="space-y-6">
          <h2 className="font-serif text-2xl text-brand">Pending listings</h2>
          {pending.length === 0 ? (
            <p className="text-sm text-ink-muted">No listings waiting for review.</p>
          ) : (
            pending.map((property) => (
              <article key={property.id} className="rounded-xl border border-brand/10 bg-white p-5">
                <h3 className="font-serif text-2xl text-brand">{property.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {property.owner.name} ({property.owner.role.toLowerCase()}) · {property.location.name} ·{" "}
                  {categoryLabel(property.category)} · {formatPkr(property.pricePkr)}
                </p>
                {property.images.length ? (
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {property.images.map((image) => (
                      <ListingMediaThumb key={image.id} item={image} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-red-700">No photos — approve is blocked until the seller adds one.</p>
                )}
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink-muted">
                  {property.description}
                </p>
                <p className="mt-2 text-sm text-ink-muted">Phone: {property.contactPhone}</p>
                <form action={moderateListing} className="mt-4 flex flex-wrap items-end gap-3">
                  <input type="hidden" name="id" value={property.id} />
                  <label className="text-sm">
                    Reject reason
                    <input name="reason" className="mt-1 block h-10 rounded-md border border-brand/15 px-3" />
                  </label>
                  <button
                    type="submit"
                    name="decision"
                    value="approve"
                    disabled={countPhotos(property.images) === 0}
                    className="h-10 rounded-md bg-brand px-4 text-sm text-white disabled:opacity-40"
                  >
                    Approve
                  </button>
                  <button
                    type="submit"
                    name="decision"
                    value="reject"
                    className="h-10 rounded-md border border-brand/20 px-4 text-sm"
                  >
                    Reject
                  </button>
                </form>
              </article>
            ))
          )}
        </section>
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-brand">Contact inbox</h2>
          {messages.length === 0 ? (
            <p className="text-sm text-ink-muted">No contact messages yet.</p>
          ) : (
            <ul className="space-y-3">
              {messages.map((item) => (
                <li key={item.id} className="rounded-xl border border-brand/10 bg-white p-4 text-sm">
                  <p className="font-semibold text-brand">
                    {item.name} · {item.email}
                    {item.phone ? ` · ${item.phone}` : ""}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-ink-muted">{item.message}</p>
                  <p className="mt-2 text-xs text-ink-muted">
                    {item.createdAt.toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} Asia/Karachi
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    </>
  );
}
