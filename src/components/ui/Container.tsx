import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export const containerClassName = "container w-full";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
}) {
  return <Tag className={cn(containerClassName, className)}>{children}</Tag>;
}
