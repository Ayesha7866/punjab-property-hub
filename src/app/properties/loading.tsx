import { Container } from "@/components/ui/container";

export default function PropertiesLoading() {
  return (
    <Container className="py-16">
      <p className="text-sm text-ink-muted">Loading search results…</p>
      <div className="mt-6 h-48 animate-pulse rounded-xl bg-brand/5" />
    </Container>
  );
}
