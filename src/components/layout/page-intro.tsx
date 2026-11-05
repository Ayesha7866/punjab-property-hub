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
    <div className="border-b border-brand/10 bg-cream">
      <Container className="py-10">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-4 font-serif text-4xl text-brand">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-muted">{description}</p>
        ) : null}
      </Container>
    </div>
  );
}
