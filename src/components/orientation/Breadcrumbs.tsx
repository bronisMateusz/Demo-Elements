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
  /** `top` — below header; `section` — in section content (PDP / product description). */
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
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-neutral-500",
          isSection
            ? "text-xs leading-[1.4] tracking-normal normal-case"
            : "container text-sm",
        )}
      >
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-2 [&:not(:first-child)]:before:content-['/'] [&:not(:first-child)]:before:text-neutral-300"
            aria-current={item.current ? "page" : undefined}
          >
            {item.to && !item.current ? (
              <Link
                to={item.to}
                className={cn(
                  "transition-colors hover:text-neutral-900",
                  isSection ? "text-neutral-500" : "text-neutral-600",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={item.current ? "text-neutral-900" : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
