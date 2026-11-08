import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

export function ListCta() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand px-8 py-16 text-white sm:px-14">
          <div className="orb -right-10 -top-10 h-56 w-56 bg-gold/40" />
          <div className="orb bottom-[-4rem] left-10 h-40 w-40 bg-terracotta/50" />
          <div className="grain" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">List with us</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              Your house, plot, or shop — on {brand.name}.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
              Register as an owner or dealer, add photos and an optional video, then submit
              for review. The ad is not public until an administrator approves it. This site
              does not take payment from buyers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/list-property" variant="gold" size="lg">
                Start a listing
              </ButtonLink>
              <ButtonLink href="/register?role=dealer" variant="onDark" size="lg">
                Dealer registration
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
