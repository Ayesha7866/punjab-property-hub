export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-serif text-3xl tracking-tight text-brand sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}
