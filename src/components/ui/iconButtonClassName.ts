import { cn } from "../../lib/cn";
import { phosphorIconInFlexClassName } from "../../lib/phosphorIconInFlexClassName";

export type IconButtonVariant = "default" | "bordered" | "elevated" | "on-dark";

type IconButtonClassNameOptions = {
  variant?: IconButtonVariant;
  active?: boolean;
  className?: string;
};

const iconButtonBase = cn(
  "icon-btn inline-flex h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-xs border border-transparent bg-transparent text-neutral-800 transition-[background-color,color,border-color] duration-fast ease-out",
  phosphorIconInFlexClassName,
  "[&_i]:text-xl",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
);

const iconButtonVariants: Record<IconButtonVariant, string> = {
  default: "hover:bg-neutral-100 hover:text-neutral-900",
  bordered: "border-neutral-200 hover:border-neutral-800 hover:text-neutral-900",
  elevated: "border-neutral-200 bg-neutral-0 hover:bg-neutral-100 hover:text-neutral-900",
  "on-dark": "text-neutral-0 hover:bg-white/10",
};

export function iconButtonClassName({
  variant = "default",
  active = false,
  className,
}: IconButtonClassNameOptions = {}) {
  const activeClassName =
    variant === "elevated"
      ? active && "bg-neutral-0 text-neutral-900"
      : active && "bg-neutral-100 text-neutral-900";

  return cn(
    iconButtonBase,
    iconButtonVariants[variant],
    activeClassName,
    className,
  );
}
