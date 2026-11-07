import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.22em]",
            invert ? "text-gold" : "text-gold-deep",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-2 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl",
          invert ? "text-white" : "text-brand",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-3 text-base leading-7", invert ? "text-white/70" : "text-ink-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
