import { cn } from "../../lib/cn";
import {
  phosphorIconInFlexClassName,
  phosphorIconGlyphClassName,
} from "../../lib/phosphorIconInFlexClassName";
import {
  btnAnimatedFillLightClassName,
  btnAnimatedFillStructureClassName,
} from "./btnAnimatedClassName";

export type IconButtonVariant =
  "default" | "ghost" | "bordered" | "elevated" | "on-dark";

type IconButtonClassNameOptions = {
  variant?: IconButtonVariant;
  active?: boolean;
  className?: string;
};

const iconButtonBase = cn(
  "icon-btn inline-flex size-11 min-size-11 shrink-0 items-center justify-center rounded-xs border border-transparent bg-transparent text-neutral-800",
  phosphorIconInFlexClassName,
  phosphorIconGlyphClassName,
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
);

const iconButtonPlain = cn(
  iconButtonBase,
  "transition-[background-color,color,border-color] duration-fast ease-out",
);

const iconButtonAnimated = cn(
  iconButtonBase,
  "relative isolate overflow-hidden transition-[color,border-color] duration-base ease-luxury",
  btnAnimatedFillStructureClassName,
  btnAnimatedFillLightClassName,
);

const iconButtonVariants: Record<IconButtonVariant, string> = {
  default: "hover:bg-neutral-100 hover:text-neutral-900",
  /** Secondary rising fill, no resting border (drawer header controls). */
  ghost: cn("hover:text-neutral-0", "focus-visible:text-neutral-0"),
  bordered: cn(
    "border-neutral-800",
    "hover:border-neutral-800 hover:text-neutral-0",
    "focus-visible:border-neutral-800 focus-visible:text-neutral-0",
  ),
  elevated: cn(
    "border-neutral-800 bg-neutral-0",
    "hover:border-neutral-800 hover:text-neutral-0",
    "focus-visible:border-neutral-800 focus-visible:text-neutral-0",
  ),
  "on-dark": "text-neutral-0 hover:bg-white/10",
};

const animatedIconVariants = new Set<IconButtonVariant>([
  "ghost",
  "bordered",
  "elevated",
]);

export function iconButtonClassName({
  variant = "default",
  active = false,
  className,
}: IconButtonClassNameOptions = {}) {
  // Active = white plate + dark icon (filled glyph supplied by the caller).
  // Keep the rising hover fill; do not lock `before:scale-y-100` like a pressed dark state.
  const activeClassName = active
    ? "border-neutral-800 bg-neutral-0 text-neutral-900"
    : undefined;

  return cn(
    animatedIconVariants.has(variant) ? iconButtonAnimated : iconButtonPlain,
    iconButtonVariants[variant],
    activeClassName,
    className,
  );
}
