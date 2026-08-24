import { cn } from "../../lib/cn";

/** Phone / e-mail contact links in salon panels and architect guardian. */
export const salonContactLinkClassName = cn(
  "inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-900 no-underline tabular-nums",
  "transition-colors duration-fast ease-out hover:text-gold-600",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
);

/** Same link style with top offset under an eyebrow label. */
export const salonContactLinkOffsetClassName = cn(
  "mt-3",
  salonContactLinkClassName,
);

export const salonContactEyebrowClassName =
  "m-0 font-body text-xs tracking-[0.08em] text-neutral-500 uppercase";
