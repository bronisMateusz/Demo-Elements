import { cn } from "../../lib/cn";

/**
 * Shared rising fill from the bottom (OKA).
 * Fill color comes from tone: black on light, white on dark.
 * `-inset-px` avoids a 1px hairline under the border while scale-y runs.
 */
export const btnAnimatedFillStructureClassName =
  "motion-fill-surface before:pointer-events-none before:absolute before:-inset-px before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-base before:ease-luxury hover:before:scale-y-100 focus-visible:before:scale-y-100 disabled:before:scale-y-0";

/** Hover / focus fill on light surfaces. */
export const btnAnimatedFillLightClassName = "before:bg-neutral-800";

/** Hover / focus fill on dark surfaces. */
export const btnAnimatedFillOnDarkClassName = "before:bg-neutral-0";

export const btnAnimatedBaseClassName = cn(
  "relative isolate overflow-hidden transition-[color,border-color] duration-base ease-luxury",
  btnAnimatedFillStructureClassName,
);

/** Primary = solid gold-500 + white label. */
export const btnAnimatedPrimaryClassName = cn(
  "border-gold-500 bg-gold-500 text-neutral-0",
  "hover:border-neutral-800 hover:text-neutral-0 focus-visible:border-neutral-800 focus-visible:text-neutral-0",
);

export const btnAnimatedSecondaryClassName = cn(
  "border-neutral-800 bg-neutral-0 text-neutral-800",
  "hover:border-neutral-800 hover:text-neutral-0 focus-visible:border-neutral-800 focus-visible:text-neutral-0",
);

/** Primary on dark - same gold idle; white rising fill on hover. */
export const btnAnimatedPrimaryOnDarkClassName = cn(
  "border-gold-500 bg-gold-500 text-neutral-0",
  "hover:border-neutral-0 hover:text-neutral-900 focus-visible:border-neutral-0 focus-visible:text-neutral-900",
);

/** Glass secondary for dark / liquid CTA surfaces. */
export const btnAnimatedSecondaryOnDarkClassName = cn(
  "border-neutral-0/45 bg-neutral-0/10 text-neutral-0 backdrop-blur-sm",
  "hover:border-neutral-0 hover:text-neutral-900 focus-visible:border-neutral-0 focus-visible:text-neutral-900",
);

/** Outline gold accent (not primary). */
export const btnAnimatedGoldClassName = cn(
  "border-gold-500 bg-transparent text-gold-500",
  "hover:border-neutral-800 hover:text-neutral-0 focus-visible:border-neutral-800 focus-visible:text-neutral-0",
);

export const btnAnimatedGoldOnDarkClassName = cn(
  "border-gold-500 bg-transparent text-gold-500",
  "hover:border-neutral-0 hover:text-neutral-900 focus-visible:border-neutral-0 focus-visible:text-neutral-900",
);

export function btnAnimatedPreviewClassName(forceFill = false) {
  return forceFill ? "before:scale-y-100" : undefined;
}
