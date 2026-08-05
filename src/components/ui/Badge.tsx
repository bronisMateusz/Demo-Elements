import { type ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  badgeClassName,
  type BadgeSize,
  type BadgeVariant,
} from "./badgeClassName";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  /** When set, renders as a link (filter / listing target). */
  href?: string;
  ariaLabel?: string;
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  href,
  ariaLabel,
}: BadgeProps) {
  const classes = badgeClassName({ variant, size, className });

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cn(
          classes,
          "cursor-pointer no-underline",
          "transition-[filter,opacity] duration-fast ease-out",
          "hover:brightness-90 hover:opacity-90",
          "active:brightness-85",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
        )}
      >
        {children}
      </a>
    );
  }

  return <span className={classes}>{children}</span>;
}

export type { BadgeVariant, BadgeSize } from "./badgeClassName";
