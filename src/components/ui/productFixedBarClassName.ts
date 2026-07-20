import { cn } from "../../lib/cn";

type ProductFixedBarClassNameOptions = {
  visible?: boolean;
  className?: string;
};

/** OKA-style sticky PDP bar - full-bleed on mobile, capped + centered on desktop. */
export function productFixedBarClassName({
  visible = true,
  className,
}: ProductFixedBarClassNameOptions = {}) {
  return cn(
    "fixed inset-x-0 bottom-0 z-[90] transition-transform duration-base ease-luxury",
    // Cap width on wide screens so product info and CTAs stay close.
    "lg:inset-x-auto lg:bottom-5 lg:left-1/2 lg:w-[min(calc(100%-2*var(--spacing-gutter)),var(--max-width-content))] lg:-translate-x-1/2",
    visible
      ? "translate-y-0"
      : "pointer-events-none translate-y-[calc(100%+1.25rem)]",
    className,
  );
}
