import { cn } from "../../lib/cn";
import type { ListingFilterState } from "../../types/listing";
import { Button } from "../ui/Button";
import { ListingQuickFilters } from "./ListingQuickFilters";

type ListingToolbarProps = {
  resultCount: number;
  filterState: ListingFilterState;
  onFilterChange: (next: ListingFilterState) => void;
  onOpenFilters?: () => void;
  className?: string;
};

export function ListingToolbar({
  resultCount,
  filterState,
  onFilterChange,
  onOpenFilters,
  className,
}: ListingToolbarProps) {
  return (
    <div
      className={cn(
        "flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-3",
        className,
      )}
    >
      <p className="m-0 font-body text-sm text-neutral-600 tabular-nums">
        Produkty:{" "}
        <span className="font-medium text-neutral-900">{resultCount}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {onOpenFilters ? (
          <Button
            as="button"
            type="button"
            variant="secondary"
            className="lg:hidden"
            onClick={onOpenFilters}
            ariaLabel="Otwórz filtry"
          >
            <i className="ph ph-funnel" aria-hidden="true" />
            Filtry
          </Button>
        ) : null}

        <ListingQuickFilters state={filterState} onChange={onFilterChange} />
      </div>
    </div>
  );
}
