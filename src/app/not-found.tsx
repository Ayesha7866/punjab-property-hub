import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">404</p>
      <h1 className="mt-3 font-serif text-4xl text-brand">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-muted">
        That address is not in this marketplace. Try search, or return to the homepage.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/properties" variant="outline">
          Search
        </ButtonLink>
      </div>
    </Container>
  );
}
