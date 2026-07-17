import { cn } from "../../lib/cn";
import { phosphorIconInFlexClassName } from "../../lib/phosphorIconInFlexClassName";
import {
  btnAnimatedBaseClassName,
  btnAnimatedGoldClassName,
  btnAnimatedPrimaryClassName,
  btnAnimatedSecondaryClassName,
} from "./btnAnimatedClassName";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonClassNameOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
};

const animatedVariants = new Set<ButtonVariant>(["primary", "secondary", "gold"]);

const buttonBase = cn(
  "inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xs border font-body font-medium text-ui leading-none tracking-normal no-underline whitespace-nowrap cursor-pointer active:translate-y-px disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)]",
  phosphorIconInFlexClassName,
  "[&>span]:leading-none [&_i]:text-[1.125em]",
);

const buttonBasePlain = cn(
  buttonBase,
  "transition-[background-color,border-color,color,transform,opacity] duration-fast ease-out",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)]",
);

const buttonBaseAnimated = cn(
  buttonBase,
  btnAnimatedBaseClassName,
  "focus-visible:outline-neutral-800",
);

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-12 px-5 text-sm",
  md: "",
  lg: "h-[52px] px-10",
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: cn(btnAnimatedPrimaryClassName, "border-transparent"),
  secondary: btnAnimatedSecondaryClassName,
  ghost:
    "border-transparent bg-transparent text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 focus-visible:outline-neutral-800",
  gold: btnAnimatedGoldClassName,
  tertiary:
    "border-transparent bg-transparent text-neutral-800 px-0 hover:text-gold-500 underline-offset-4 decoration-gold-500 decoration-1 hover:underline focus-visible:outline-neutral-800",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  full = false,
  className,
}: ButtonClassNameOptions = {}) {
  const base = animatedVariants.has(variant) ? buttonBaseAnimated : buttonBasePlain;
  return cn(base, buttonSizes[size], buttonVariants[variant], full && "w-full", className);
}
