import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { sectionBottomPaddingClassName } from "../../lib/layoutTokens";
import { Container } from "../ui/Container";

type PageIntroProps = {
  title: string;
  titleId?: string;
  description?: string;
  breadcrumbs?: ReactNode;
  /** Trailing control in the title row (e.g. view toggle). */
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PageIntro({
  title,
  titleId = "page-intro-title",
  description,
  breadcrumbs,
  actions,
  children,
  className,
}: PageIntroProps) {
  return (
    <div className={cn(sectionBottomPaddingClassName, className)}>
      <Container size="content">
        {breadcrumbs}
        <div
          className={cn(
            actions &&
              "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
          )}
        >
          <h1
            id={titleId}
            className="m-0 min-w-0 max-w-4xl font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] font-medium tracking-tight text-neutral-900"
          >
            {title}
          </h1>
          {actions}
        </div>
        {description ? (
          <p className="mt-4 mb-0 max-w-3xl font-body text-ui leading-relaxed text-neutral-600 md:text-lg">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </div>
  );
}
