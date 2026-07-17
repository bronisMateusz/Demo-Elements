import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export const containerClassName = "container";

/** Constrains content width on very large viewports (Tailwind `max-w-7xl` = 80rem). */
export const containerContentClassName = "max-w-7xl";

type ContainerSize = "full" | "content";

export function Container({
  className,
  children,
  as: Tag = "div",
  size = "full",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
  /** `content` - readable max width for text/list sections on ultrawide screens. */
  size?: ContainerSize;
}) {
  return (
    <Tag
      className={cn(
        containerClassName,
        size === "content" && containerContentClassName,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
