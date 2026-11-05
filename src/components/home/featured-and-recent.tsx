import { PropertyCard } from "@/components/properties/property-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedListings, getRecentListings } from "@/lib/listings";

export async function FeaturedAndRecent() {
  const [featured, recent] = await Promise.all([
    getFeaturedListings(),
    getRecentListings(),
  ]);

  return (
    <div className="space-y-16">
      <section>
        <SectionHeading
          eyebrow="Featured"
          title="Promoted listings"
          description="Only reviewed, published properties appear here. Promotion payments stay disabled."
        />
        {featured.length === 0 ? (
          <EmptyState title="No featured properties yet" className="mt-8">
            Owners can list a property now. It becomes public after an administrator
            approves it. Featured placement is separate and not sold yet.
          </EmptyState>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <SectionHeading
          eyebrow="New"
          title="Recently added"
          description="Newest approved listings. Draft, pending, and rejected properties stay private."
        />
        {recent.length === 0 ? (
          <EmptyState title="No published listings yet" className="mt-8">
            Create an owner or dealer account and submit a listing. Sample photography
            on this site is not a house for sale.
          </EmptyState>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
