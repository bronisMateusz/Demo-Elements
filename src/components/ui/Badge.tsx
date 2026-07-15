import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "default" | "gold" | "brand" | "outline";

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-bg-muted text-text-body border-border",
  gold: "bg-transparent text-gold border-gold/40",
  brand: "bg-brand text-neutral-0 border-transparent",
  outline: "bg-transparent text-text-body border-border",
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
        "inline-flex items-center border px-2.5 py-1 font-body text-eyebrow font-medium uppercase tracking-wide",
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
