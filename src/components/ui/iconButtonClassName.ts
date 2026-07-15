import { cn } from "../../lib/cn";
import { phosphorIconInFlexClassName } from "../../lib/phosphorIconInFlexClassName";

export type IconButtonVariant = "default" | "bordered" | "on-dark";

type IconButtonClassNameOptions = {
  variant?: IconButtonVariant;
  active?: boolean;
  className?: string;
};

const iconButtonBase = cn(
  "icon-btn inline-flex h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-sm border border-transparent bg-transparent text-text-strong transition-[background-color,color,border-color] duration-fast ease-out",
  phosphorIconInFlexClassName,
  "[&_i]:text-xl",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-focus-ring",
);

const iconButtonVariants: Record<IconButtonVariant, string> = {
  default: "hover:bg-bg-muted hover:text-text",
  bordered: "border-border hover:border-text-strong hover:text-text",
  "on-dark": "text-neutral-0 hover:bg-white/10",
};

export function iconButtonClassName({
  variant = "default",
  active = false,
  className,
}: IconButtonClassNameOptions = {}) {
  return cn(
    iconButtonBase,
    iconButtonVariants[variant],
    active && "bg-bg-muted text-text",
    className,
  );
}
