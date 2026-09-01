import { cn } from "../../lib/cn";

export type BadgeVariant =
  "default" | "gold" | "brand" | "outline" | "promo" | "neutral";
export type BadgeSize = "sm" | "md";

/**
 * Semantic product badges — keep primary statuses distinct from secondary labels.
 * promo = Promocja · gold = Bestseller · brand = Nowość · neutral = outlet / ekspozycja / etc.
 */
const badgeVariants: Record<BadgeVariant, string> = {
  default:
    "border border-neutral-300 bg-neutral-0 text-neutral-700 shadow-subtle",
  gold: "border-0 bg-gold-500 text-neutral-0",
  brand: "border-0 bg-badge-brand text-neutral-0",
  promo: "border-0 bg-promo text-neutral-0",
  outline: "border border-neutral-300 bg-transparent text-neutral-600",
  neutral: "border-0 bg-neutral-700 text-neutral-0",
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[0.6875rem] leading-none",
  md: "px-2.5 py-1 text-xs leading-none",
};

type BadgeClassNameOptions = {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
};

export function badgeClassName({
  variant = "default",
  size = "md",
  className,
}: BadgeClassNameOptions = {}) {
  return cn(
    "inline-flex items-center font-body font-medium uppercase tracking-[0.12em]",
    badgeSizes[size],
    badgeVariants[variant],
    className,
  );
}

export { badgeVariants };
