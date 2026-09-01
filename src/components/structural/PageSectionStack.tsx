import { type ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  pageSectionStackChildSpacingClassName,
  pageSectionStackClassName,
  pageSectionStackFlushTopClassName,
} from "../../lib/layoutTokens";

type PageSectionStackProps = {
  children: ReactNode;
  className?: string;
  /** No top margin - use when the page opens with PageIntro / split descriptive hero. */
  flushTop?: boolean;
};

/**
 * Groups page-level content blocks. Outer my-12 + mt-12 between children
 * (margin on flex items; RevealSection transform stays on the child wrapper).
 */
export function PageSectionStack({
  children,
  className,
  flushTop,
}: PageSectionStackProps) {
  return (
    <div
      className={cn(
        pageSectionStackClassName,
        pageSectionStackChildSpacingClassName,
        flushTop && pageSectionStackFlushTopClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}
