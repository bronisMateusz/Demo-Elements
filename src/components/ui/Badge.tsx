import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "default" | "gold" | "brand" | "outline";

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-neutral-50 text-neutral-600 border-neutral-200",
  gold: "bg-transparent text-gold-500 border-gold-500/40",
  brand: "bg-neutral-800 text-neutral-0 border-transparent",
  outline: "bg-transparent text-neutral-600 border-neutral-200",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 font-body text-xs font-medium uppercase tracking-wide",
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
