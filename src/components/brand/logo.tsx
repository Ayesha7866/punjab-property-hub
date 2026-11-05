import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-brand", className)}>
      <span
        aria-hidden="true"
        className="relative flex h-9 w-9 items-center justify-center rounded-md bg-brand text-gold"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
          <path
            d="M6 15.2 16 7l10 8.2V25a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V15.2Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="M12 26v-7h8v7" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </span>
      <span className={cn("leading-tight", compact && "sr-only sm:not-sr-only")}>
        <span className="block font-serif text-lg tracking-tight">{brand.name}</span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-gold-deep">
          Punjab, Pakistan
        </span>
      </span>
    </span>
  );
}
