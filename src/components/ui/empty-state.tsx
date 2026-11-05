import { cn } from "@/lib/cn";

export function EmptyState({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-brand/20 bg-white px-6 py-12 text-center shadow-sm",
        className,
      )}
    >
      <h3 className="font-serif text-xl text-brand">{title}</h3>
      <div className="mx-auto mt-3 max-w-lg text-sm leading-6 text-ink-muted">{children}</div>
    </div>
  );
}
