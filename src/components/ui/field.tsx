import { cn } from "@/lib/cn";

export function Field({
  label,
  name,
  children,
  hint,
}: {
  label: string;
  name?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block min-w-0" htmlFor={name}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-ink-muted">{hint}</span> : null}
    </label>
  );
}

export const fieldControlClass =
  "h-11 w-full rounded-md border border-brand/15 bg-white px-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-gold focus:ring-2 focus:ring-gold/30";

export function Select({
  name,
  children,
  defaultValue,
  className,
  required,
}: {
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
  required?: boolean;
}) {
  return (
    <select
      id={name}
      name={name}
      defaultValue={defaultValue}
      required={required}
      className={cn(fieldControlClass, className)}
    >
      {children}
    </select>
  );
}
