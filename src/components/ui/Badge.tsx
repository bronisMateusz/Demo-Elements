import { type ReactNode } from "react";
import { badgeClassName, type BadgeSize, type BadgeVariant } from "./badgeClassName";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
};

export function Badge({ children, variant = "default", size = "md", className }: BadgeProps) {
  return <span className={badgeClassName({ variant, size, className })}>{children}</span>;
}

export type { BadgeVariant, BadgeSize } from "./badgeClassName";
