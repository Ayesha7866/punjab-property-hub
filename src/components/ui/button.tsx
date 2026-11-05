import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-deep focus-visible:outline-brand",
  gold: "bg-gold text-brand-deep hover:bg-gold-deep focus-visible:outline-gold",
  outline:
    "border border-brand/20 bg-white text-brand hover:border-brand/40 hover:bg-cream",
  onDark:
    "border border-white bg-white text-brand-deep hover:bg-gold hover:border-gold",
  ghost: "text-brand hover:bg-brand/5",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
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
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
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
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
