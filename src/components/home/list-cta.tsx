import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function ListCta() {
  return (
    <section className="py-16">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-brand px-8 py-12 text-white sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            List with us
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl sm:text-4xl">
            Ready to publish a house, plot, or shop in Punjab?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/75">
            Register as an owner or dealer, add photos, and submit for review.
            The ad is not public until an administrator approves it. Nothing is
            billed. Featured placement stays off until a real payment provider is
            connected.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/list-property" variant="gold">
              Start a listing
            </ButtonLink>
            <ButtonLink href="/register?role=dealer" variant="onDark">
              Dealer registration
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
