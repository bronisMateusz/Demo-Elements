import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  pageIntroHeroTopPaddingClassName,
  pageIntroTitleClassName,
} from "../../lib/layoutTokens";
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
    <div className={className}>
      <Container size="content">
        {breadcrumbs}
        <div
          className={cn(
            pageIntroHeroTopPaddingClassName,
            actions &&
              "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
          )}
        >
          <h1
            id={titleId}
            className={cn(pageIntroTitleClassName, "min-w-0 max-w-4xl")}
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
