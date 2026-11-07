import Link from "next/link";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, invert = false }: { items: Crumb[]; invert?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={invert ? "text-sm text-white/55" : "text-sm text-ink-muted"}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className={invert ? "hover:text-gold" : "hover:text-brand"}>
                {item.label}
              </Link>
            ) : (
              <span className={invert ? "text-gold" : "text-brand"}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
