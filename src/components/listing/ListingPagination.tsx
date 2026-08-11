import { buildListingPageItems } from "../../lib/listingPagination";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";

type ListingPaginationProps = {
  /** Products covered through the current page (for progress). */
  shownCount: number;
  totalCount: number;
  page: number;
  pageCount: number;
  /** Advances to the next page (same as pager next). */
  onShowMore: () => void;
  onPageChange: (page: number) => void;
  className?: string;
};

const pageControlClassName = cn(
  "inline-flex size-10 shrink-0 items-center justify-center rounded-xs",
  "font-body text-sm font-medium tabular-nums text-neutral-700",
  "transition-[background-color,border-color,color] duration-fast ease-out",
  "hover:bg-neutral-50 hover:text-neutral-900",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
  "disabled:pointer-events-none disabled:opacity-35",
);

const pageControlActiveClassName =
  "border border-neutral-300 bg-neutral-0 text-neutral-900";

/** Listing footer: progress, load-more, and numbered pager. */
export function ListingPagination({
  shownCount,
  totalCount,
  page,
  pageCount,
  onShowMore,
  onPageChange,
  className,
}: ListingPaginationProps) {
  if (totalCount <= 0 || pageCount <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < pageCount;
  const canShowMore = page < pageCount;
  const progressPercent =
    totalCount === 0 ? 0 : Math.min(100, (shownCount / totalCount) * 100);
  const pageItems = buildListingPageItems(page, pageCount);

  return (
    <div
      className={cn(
        "mt-8 flex w-full flex-col items-center justify-center gap-6 md:mt-10",
        className,
      )}
    >
      <div className="flex w-full max-w-56 flex-col items-center gap-2">
        <p
          className="m-0 text-center font-body text-sm text-neutral-600 tabular-nums"
          aria-live="polite"
        >
          <span className="font-medium text-neutral-900">{shownCount}</span>
          {" z "}
          <span className="font-medium text-neutral-900">{totalCount}</span>
          {" produktów"}
        </p>
        <div
          className="h-0.5 w-full overflow-hidden rounded-full bg-neutral-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalCount}
          aria-valuenow={shownCount}
          aria-label="Postęp przeglądania produktów"
        >
          <div
            className="h-full rounded-full bg-neutral-800 transition-[width] duration-base ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {canShowMore ? (
        <Button
          as="button"
          type="button"
          variant="primary"
          size="lg"
          onClick={onShowMore}
        >
          Pokaż więcej
        </Button>
      ) : null}

      <nav aria-label="Paginacja listy produktów">
        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-1 p-0">
          <li>
            <button
              type="button"
              className={pageControlClassName}
              aria-label="Poprzednia strona"
              disabled={!canPrev}
              onClick={() => onPageChange(page - 1)}
            >
              <i
                className="ph ph-caret-left text-lg leading-none"
                aria-hidden="true"
              />
            </button>
          </li>
          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <li
                key={`ellipsis-${index}`}
                className="inline-flex size-10 items-center justify-center text-sm text-neutral-500"
                aria-hidden="true"
              >
                …
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  className={cn(
                    pageControlClassName,
                    item === page && pageControlActiveClassName,
                  )}
                  aria-label={`Strona ${item}`}
                  aria-current={item === page ? "page" : undefined}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </button>
              </li>
            ),
          )}
          <li>
            <button
              type="button"
              className={pageControlClassName}
              aria-label="Następna strona"
              disabled={!canNext}
              onClick={() => onPageChange(page + 1)}
            >
              <i
                className="ph ph-caret-right text-lg leading-none"
                aria-hidden="true"
              />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
