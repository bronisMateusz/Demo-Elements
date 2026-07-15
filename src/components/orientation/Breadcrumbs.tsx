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
};

export function Breadcrumbs({ items, label = "Okruszki nawigacji", className }: BreadcrumbsProps) {
  return (
    <nav className={cn("py-6", className)} aria-label={label}>
      <ol className="container flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-text-muted">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-2 [&:not(:first-child)]:before:content-['/'] [&:not(:first-child)]:before:text-border-strong"
            aria-current={item.current ? "page" : undefined}
          >
            {item.to && !item.current ? (
              <Link to={item.to} className="text-text-body transition-colors hover:text-text">
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
