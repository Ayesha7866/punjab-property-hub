import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  return (
    <div className={cn("reveal", className)} style={{ animationDelay: `${delayMs}ms` }}>
      {children}
    </div>
  );
}
