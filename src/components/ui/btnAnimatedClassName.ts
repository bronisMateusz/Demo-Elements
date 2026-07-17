import { cn } from "../../lib/cn";

/**
 * Shared gold fill rising from the bottom (OKA).
 * `-inset-px` avoids a 1px hairline under the border while scale-y runs;
 * border-color uses the same slow luxury timing as the fill.
 */
export const btnAnimatedFillClassName =
  "motion-fill-surface before:pointer-events-none before:absolute before:-inset-px before:-z-10 before:origin-bottom before:scale-y-0 before:bg-gold-500 before:transition-transform before:duration-slow before:ease-luxury before:content-[''] hover:before:scale-y-100 focus-visible:before:scale-y-100 disabled:before:scale-y-0";

export const btnAnimatedBaseClassName = cn(
  "relative isolate overflow-hidden transition-[color,border-color] duration-slow ease-luxury",
  btnAnimatedFillClassName,
);

export const btnAnimatedPrimaryClassName = cn(
  "border-transparent bg-neutral-800 text-neutral-0 hover:text-neutral-0 focus-visible:text-neutral-0",
  "hover:border-gold-500 focus-visible:border-gold-500",
);

export const btnAnimatedSecondaryClassName = cn(
  "border-neutral-200 bg-transparent text-neutral-800",
  "hover:border-gold-500 hover:text-neutral-0 focus-visible:border-gold-500 focus-visible:text-neutral-0",
);

export const btnAnimatedGoldClassName = cn(
  "border-gold-500 bg-transparent text-gold-500",
  "hover:text-neutral-0 focus-visible:text-neutral-0",
);

export function btnAnimatedPreviewClassName(forceFill = false) {
  return forceFill ? "before:scale-y-100" : undefined;
}
