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
  /** `top` - below header; `section` - in section content (PDP / product description). */
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
          "flex flex-nowrap items-center gap-x-2 overflow-x-auto text-neutral-500",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          isSection
            ? "text-xs leading-[1.4] tracking-normal normal-case"
            : "container text-sm",
        )}
      >
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex shrink-0 items-center gap-2 [&:not(:first-child)]:before:content-['/'] [&:not(:first-child)]:before:text-neutral-300"
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
              <span
                className={cn(
                  item.current && "max-w-[14rem] truncate text-neutral-900 sm:max-w-[20rem]",
                )}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
