import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

type PageSectionStackProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Groups page-level content blocks. Vertical rhythm comes from each block's own
 * `sectionPaddingClassName` / `Section` padding - this wrapper does not add gaps.
 */
export function PageSectionStack({
  children,
  className,
}: PageSectionStackProps) {
  return <div className={cn(className)}>{children}</div>;
}
