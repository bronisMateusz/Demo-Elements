import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

export type BreadcrumbItem = {
  label: string;
  to?: string;
  current?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  label?: string;
  className?: string;
  /** `top` — pod headerem; `section` — w treści sekcji (PDP / opis produktu) */
  variant?: "top" | "section";
};

export function Breadcrumbs({
  items,
  label = "Okruszki nawigacji",
  className,
  variant = "top",
}: BreadcrumbsProps) {
  const isSection = variant === "section";

  return (
    <nav
      className={cn(isSection ? "mb-8" : "py-6", className)}
      aria-label={label}
    >
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-text-muted",
          isSection
            ? "text-eyebrow leading-[1.4] tracking-normal normal-case"
            : "container text-small",
        )}
      >
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-2 [&:not(:first-child)]:before:content-['/'] [&:not(:first-child)]:before:text-border-strong"
            aria-current={item.current ? "page" : undefined}
          >
            {item.to && !item.current ? (
              <Link
                to={item.to}
                className={cn(
                  "transition-colors hover:text-text",
                  isSection ? "text-text-muted" : "text-text-body",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={item.current ? "text-text" : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
