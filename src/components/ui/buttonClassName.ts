import { cn } from "../../lib/cn";
import { phosphorIconInFlexClassName } from "../../lib/phosphorIconInFlexClassName";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonClassNameOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
};

const buttonBase = cn(
  "inline-flex items-center justify-center gap-2 h-12 px-8 rounded-sm border border-transparent font-body font-medium text-ui leading-none tracking-normal no-underline whitespace-nowrap cursor-pointer transition-[background-color,border-color,color,transform,opacity] duration-fast ease-out active:translate-y-px disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)]",
  phosphorIconInFlexClassName,
  "[&>span]:leading-none [&_i]:text-[1.125em]",
);

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-small",
  md: "",
  lg: "h-[52px] px-10",
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-text-on-primary hover:bg-brand-hover focus-visible:outline-focus-ring",
  secondary:
    "bg-transparent border-border text-text-strong hover:border-text-strong hover:text-text focus-visible:outline-focus-ring",
  ghost:
    "bg-transparent text-text-strong hover:text-text focus-visible:outline-focus-ring",
  gold:
    "bg-transparent border-gold text-gold hover:bg-gold hover:text-neutral-0 focus-visible:outline-focus-ring",
  tertiary:
    "bg-transparent border-transparent text-text-strong px-0 hover:text-gold underline-offset-4 decoration-gold decoration-1 hover:underline focus-visible:outline-focus-ring",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  full = false,
  className,
}: ButtonClassNameOptions = {}) {
  return cn(buttonBase, buttonSizes[size], buttonVariants[variant], full && "w-full", className);
}
