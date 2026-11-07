import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/layout/page-intro";
import { PropertySearchForm } from "@/components/search/property-search-form";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PropertyCard } from "@/components/properties/property-card";
import { describeFilters, parseSearchFilters, type SearchFilters } from "@/lib/search";
import { searchPublished } from "@/lib/listings";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const filters = parseSearchFilters(await searchParams);
  const summary = describeFilters(filters);
  return {
    title: `Search ${summary}`,
    description: `Search results ${summary} on Punjab Property Hub. Only approved listings will appear.`,
    alternates: { canonical: "/properties" },
  };
}

async function SearchResults({ filters, summary }: { filters: SearchFilters; summary: string }) {
  const listings = await searchPublished(filters);
  return (
    <>
      <p className="text-sm text-ink-muted">
        Showing published results {summary}. {listings.length} listing
        {listings.length === 1 ? "" : "s"} found.
      </p>
      {listings.length === 0 ? (
        <EmptyState title="No matching published properties">
          Pending and rejected listings never appear here. If you just submitted a property, wait
          for review or ask the administrator to approve it.
        </EmptyState>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((property) => (
            <li key={property.id}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default async function PropertiesPage({ searchParams }: Props) {
  const filters = parseSearchFilters(await searchParams);
  const summary = describeFilters(filters);

  return (
    <>
      <PageIntro
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Search" },
        ]}
        title="Property search"
        description="Choose any Punjab city or district. The URL is shareable. Published listings will appear here after review — the catalogue is empty until then."
      />
      <Container className="space-y-8 py-10">
        <PropertySearchForm filters={filters} compact />
        <Suspense
          fallback={<p className="text-sm text-ink-muted">Loading search results…</p>}
        >
          <SearchResults filters={filters} summary={summary} />
        </Suspense>
      </Container>
    </>
  );
}
