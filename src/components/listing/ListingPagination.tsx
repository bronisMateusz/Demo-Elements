import { cn } from "../../lib/cn";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import { iconButtonClassName } from "../ui/iconButtonClassName";

type ListingPaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function ListingPagination({
  page,
  pageCount,
  onPageChange,
  className,
}: ListingPaginationProps) {
  if (pageCount <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div
      className={cn(
        "mt-8 flex items-center justify-center gap-3 md:mt-10",
        className,
      )}
    >
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: cn(
            "shadow-subtle",
            !canPrev && "pointer-events-none opacity-35",
          ),
        })}
        aria-label="Poprzednia strona"
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
      >
        <i className="ph ph-caret-left" aria-hidden="true" />
      </button>
      <p
        className="m-0 min-w-14 text-center font-body text-sm tabular-nums tracking-[0.12em] text-neutral-600"
        aria-live="polite"
      >
        {formatSlideIndex(page - 1, pageCount)}
      </p>
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: cn(
            "shadow-subtle",
            !canNext && "pointer-events-none opacity-35",
          ),
        })}
        aria-label="Następna strona"
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
      >
        <i className="ph ph-caret-right" aria-hidden="true" />
      </button>
    </div>
  );
}
