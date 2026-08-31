import { cn } from "../../lib/cn";
import {
  phosphorIconInFlexClassName,
  phosphorIconGlyphClassName,
} from "../../lib/phosphorIconInFlexClassName";
import {
  btnAnimatedBaseClassName,
  btnAnimatedFillLightClassName,
  btnAnimatedFillOnDarkClassName,
  btnAnimatedGoldClassName,
  btnAnimatedGoldOnDarkClassName,
  btnAnimatedPrimaryClassName,
  btnAnimatedPrimaryOnDarkClassName,
  btnAnimatedSecondaryClassName,
  btnAnimatedSecondaryOnDarkClassName,
} from "./btnAnimatedClassName";

export type ButtonVariant =
  "primary" | "secondary" | "ghost" | "gold" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonTone = "default" | "onDark";

type ButtonClassNameOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  full?: boolean;
  className?: string;
};

const animatedVariants = new Set<ButtonVariant>([
  "primary",
  "secondary",
  "gold",
]);

const buttonBase = cn(
  "inline-flex items-center justify-center gap-2 h-11 px-8 rounded-xs border font-body font-normal text-ui leading-none tracking-normal no-underline whitespace-nowrap cursor-pointer active:translate-y-px disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2",
  phosphorIconInFlexClassName,
  phosphorIconGlyphClassName,
  "[&>span]:leading-none",
);

const buttonBasePlain = cn(
  buttonBase,
  "transition-[background-color,border-color,color,transform,opacity] duration-fast ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
);

const buttonBaseAnimated = cn(buttonBase, btnAnimatedBaseClassName);

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-5 text-sm",
  md: "",
  lg: "px-10",
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: btnAnimatedPrimaryClassName,
  secondary: btnAnimatedSecondaryClassName,
  ghost:
    "border-transparent bg-transparent text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 focus-visible:outline-neutral-800",
  gold: btnAnimatedGoldClassName,
  tertiary:
    "border-transparent bg-transparent text-neutral-800 px-0 hover:text-gold-500 underline-offset-4 decoration-gold-500 decoration-1 hover:underline focus-visible:outline-neutral-800",
};

const buttonVariantsOnDark: Partial<Record<ButtonVariant, string>> = {
  primary: btnAnimatedPrimaryOnDarkClassName,
  secondary: btnAnimatedSecondaryOnDarkClassName,
  gold: btnAnimatedGoldOnDarkClassName,
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  tone = "default",
  full = false,
  className,
}: ButtonClassNameOptions = {}) {
  const isAnimated = animatedVariants.has(variant);
  const base = isAnimated ? buttonBaseAnimated : buttonBasePlain;
  const variantClassName =
    tone === "onDark" && buttonVariantsOnDark[variant]
      ? buttonVariantsOnDark[variant]
      : buttonVariants[variant];
  // Secondary onDark is a solid white plate - use dark fill / focus like default secondary.
  const useOnDarkChrome = tone === "onDark" && variant !== "secondary";
  const fillToneClassName = isAnimated
    ? useOnDarkChrome
      ? btnAnimatedFillOnDarkClassName
      : btnAnimatedFillLightClassName
    : undefined;
  const focusOutline = isAnimated
    ? useOnDarkChrome
      ? "focus-visible:outline-neutral-0"
      : "focus-visible:outline-neutral-800"
    : undefined;

  return cn(
    base,
    buttonSizes[size],
    variantClassName,
    fillToneClassName,
    focusOutline,
    full && "w-full",
    className,
  );
}
