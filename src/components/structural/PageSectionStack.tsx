import { type ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
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
 * Groups page-level content blocks. Outer my-12 + gap-12 between children
 * (RevealSection transform does not break flex gap like margin collapse).
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
        flushTop && pageSectionStackFlushTopClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}
