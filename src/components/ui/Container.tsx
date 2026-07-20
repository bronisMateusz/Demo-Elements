import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export const containerClassName = "container";

/** Content rail - text/list sections on ultrawide (`--max-width-content`). */
export const containerContentClassName = "max-w-content";

/** Wide shell - hero / large CTAs (`--max-width-wide`). */
export const containerWideClassName = "max-w-wide";

/** Shared box model without `container`'s `max-w-none` (avoids fighting size caps). */
const containerRailClassName = "mx-auto w-full px-gutter";

type ContainerSize = "full" | "content" | "wide";

export function Container({
  className,
  children,
  as: Tag = "div",
  size = "full",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
  /** `content` / `wide` - capped rails for ultrawide screens. */
  size?: ContainerSize;
}) {
  return (
    <Tag
      className={cn(
        size === "full" ? containerClassName : containerRailClassName,
        size === "content" && containerContentClassName,
        size === "wide" && containerWideClassName,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
