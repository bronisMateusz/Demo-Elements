import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";

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

type Crumb =
  | { type: "item"; item: BreadcrumbItem; key: string }
  | { type: "ellipsis"; key: string; skipped: BreadcrumbItem[] };

/**
 * Mobile: keep breadcrumb look without horizontal scroll.
 * Long trails collapse the middle into an ellipsis (first + … + last two).
 */
function crumbsForViewport(
  items: BreadcrumbItem[],
  collapseMiddle: boolean,
): Crumb[] {
  if (!collapseMiddle || items.length <= 3) {
    return items.map((item, index) => ({
      type: "item" as const,
      item,
      key: `${item.label}-${index}`,
    }));
  }

  const first = items[0];
  const parent = items[items.length - 2];
  const current = items[items.length - 1];
  const skipped = items.slice(1, -2);

  return [
    { type: "item", item: first, key: `${first.label}-0` },
    { type: "ellipsis", key: "ellipsis", skipped },
    {
      type: "item",
      item: parent,
      key: `${parent.label}-${items.length - 2}`,
    },
    {
      type: "item",
      item: current,
      key: `${current.label}-${items.length - 1}`,
    },
  ];
}

function CrumbList({
  items,
  isSection,
  collapseMiddle,
  className,
}: {
  items: BreadcrumbItem[];
  isSection: boolean;
  collapseMiddle: boolean;
  className?: string;
}) {
  const crumbs = crumbsForViewport(items, collapseMiddle);

  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-neutral-500",
        isSection
          ? "text-xs leading-[1.4] tracking-normal normal-case"
          : "text-xs sm:text-sm",
        className,
      )}
    >
      {crumbs.map((crumb) => {
        if (crumb.type === "ellipsis") {
          const skippedLabels = crumb.skipped
            .map((item) => item.label)
            .join(" / ");
          return (
            <li
              key={crumb.key}
              className="flex items-center gap-2 before:text-neutral-300 before:content-['/']"
              title={skippedLabels}
            >
              <span aria-hidden="true">…</span>
              <span className="sr-only">Ukryte poziomy: {skippedLabels}</span>
            </li>
          );
        }

        const { item, key } = crumb;
        const index = items.indexOf(item);

        return (
          <li
            key={key}
            className={cn(
              "flex min-w-0 items-center gap-2",
              index > 0 && "before:text-neutral-300 before:content-['/']",
            )}
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
                  "text-pretty",
                  item.current && "font-medium text-neutral-900",
                )}
              >
                {item.label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function Breadcrumbs({
  items,
  label = "Okruszki nawigacji",
  className,
  variant = "top",
}: BreadcrumbsProps) {
  const isSection = variant === "section";

  const body = (
    <>
      <CrumbList
        items={items}
        isSection={isSection}
        collapseMiddle
        className="md:hidden"
      />
      <CrumbList
        items={items}
        isSection={isSection}
        collapseMiddle={false}
        className="hidden md:flex"
      />
    </>
  );

  if (isSection) {
    return (
      <nav className={cn("mb-8", className)} aria-label={label}>
        {body}
      </nav>
    );
  }

  return (
    <nav className={cn("py-6", className)} aria-label={label}>
      <Container size="content">{body}</Container>
    </nav>
  );
}
