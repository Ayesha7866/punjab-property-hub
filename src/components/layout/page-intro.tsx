import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";

export function PageIntro({
  crumbs,
  title,
  description,
}: {
  crumbs: Crumb[];
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-brand/10 bg-brand text-white">
      <div className="orb -left-16 top-0 h-40 w-40 bg-terracotta/40" />
      <div className="grain" />
      <Container className="relative py-12">
        <Breadcrumbs items={crumbs} invert />
        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{description}</p>
        ) : null}
      </Container>
    </div>
  );
}
