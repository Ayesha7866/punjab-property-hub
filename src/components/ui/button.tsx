import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand-mid hover:-translate-y-0.5",
  gold: "bg-gold text-brand-deep shadow-lg shadow-gold/30 hover:bg-saffron hover:-translate-y-0.5",
  outline:
    "border border-brand/15 bg-white/80 text-brand backdrop-blur hover:border-gold hover:bg-cream",
  onDark:
    "border border-white/70 bg-white text-brand-deep hover:bg-gold hover:border-gold",
  ghost: "text-brand hover:bg-brand/5",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
}: Common & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
