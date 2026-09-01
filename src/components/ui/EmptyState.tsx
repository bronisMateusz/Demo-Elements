import { cn } from "../../lib/cn";
import { sectionMarginYClassName } from "../../lib/layoutTokens";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

export type EmptyStateAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
};

export type EmptyStateLayout = "page" | "section" | "panel";

type EmptyStateProps = {
  layout?: EmptyStateLayout;
  eyebrow?: string;
  iconClass?: string;
  title: string;
  description?: string;
  actions?: readonly EmptyStateAction[];
  className?: string;
};

const layoutClassName: Record<EmptyStateLayout, string> = {
  page: cn(
    "flex min-h-80 flex-col items-center justify-center text-center",
    sectionMarginYClassName,
  ),
  section:
    "flex min-h-96 flex-col items-center justify-center px-5 py-16 text-center sm:px-8",
  panel:
    "flex flex-col items-center justify-center rounded-xs border border-neutral-300 bg-neutral-50 px-6 py-14 text-center",
};

export function EmptyState({
  layout = "section",
  eyebrow,
  iconClass,
  title,
  description,
  actions,
  className,
}: EmptyStateProps) {
  const TitleTag = layout === "page" ? "h1" : "h2";
  const actionSize: ButtonSize = layout === "section" ? "md" : "lg";

  return (
    <div className={cn(layoutClassName[layout], className)} role="status">
      {eyebrow ? (
        <p className="mb-4 font-body text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
          {eyebrow}
        </p>
      ) : null}
      {iconClass ? (
        <i
          className={cn(iconClass, "text-4xl text-neutral-400")}
          aria-hidden="true"
        />
      ) : null}
      <TitleTag
        className={cn(
          layout === "page" && "t-h1 m-0",
          layout === "section" && "t-h2 m-0",
          layout === "panel" &&
            "m-0 font-heading text-h3 font-medium tracking-tight text-neutral-900",
          iconClass && "mt-4",
        )}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={cn(
            "mt-4 mb-0",
            layout === "panel"
              ? "max-w-xl font-body text-sm leading-relaxed text-neutral-600"
              : "t-body max-w-md",
          )}
        >
          {description}
        </p>
      ) : null}
      {actions && actions.length > 0 ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions.map((action, index) => {
            const variant =
              action.variant ?? (index === 0 ? "primary" : "secondary");
            if (action.href) {
              return (
                <Button
                  key={action.label}
                  href={action.href}
                  variant={variant}
                  size={actionSize}
                >
                  {action.label}
                </Button>
              );
            }
            return (
              <Button
                key={action.label}
                as="button"
                type="button"
                variant={variant}
                size={actionSize}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
