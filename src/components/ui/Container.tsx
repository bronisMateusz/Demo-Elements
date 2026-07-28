import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

export const containerClassName = "container";

/** Content rail - text/list sections on ultrawide. */
export const containerContentClassName = "max-w-384";

/** Wide shell - hero / large CTAs. */
export const containerWideClassName = "max-w-448";

/** Shared box model without `container`'s `max-w-none` (avoids fighting size caps). */
const containerRailClassName = "mx-auto w-full px-[clamp(1.25rem,2.222vw,2.5rem)]";

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
