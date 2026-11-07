import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/container";

export default function PropertiesLoading() {
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
      <Container className="py-10">
        <p className="text-sm text-ink-muted">Loading search results…</p>
        <div className="mt-6 h-48 animate-pulse rounded-[1.6rem] bg-brand/5" />
      </Container>
    </>
  );
}
