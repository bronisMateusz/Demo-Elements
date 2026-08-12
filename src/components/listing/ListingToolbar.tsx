import { cn } from "../../lib/cn";
import { listingFilterActiveCount } from "../../lib/listingFilters";
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
  const activeFilterCount = listingFilterActiveCount(filterState);

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        "lg:min-h-12 lg:flex-row lg:items-center lg:justify-between lg:gap-x-6",
        className,
      )}
    >
      <div className="flex min-h-12 items-center justify-between gap-4 lg:min-h-0 lg:justify-start">
        <p className="m-0 font-body text-sm text-neutral-600 tabular-nums">
          Produkty:{" "}
          <span className="font-medium text-neutral-900">{resultCount}</span>
        </p>

        {onOpenFilters ? (
          <Button
            as="button"
            type="button"
            variant="secondary"
            className="shrink-0 lg:hidden"
            onClick={onOpenFilters}
            ariaLabel={
              activeFilterCount > 0
                ? `Otwórz filtry (${activeFilterCount} aktywne)`
                : "Otwórz filtry"
            }
          >
            <i className="ph ph-funnel" aria-hidden="true" />
            Filtry
            {activeFilterCount > 0 ? (
              <span className="tabular-nums">({activeFilterCount})</span>
            ) : null}
          </Button>
        ) : null}
      </div>

      <ListingQuickFilters
        state={filterState}
        onChange={onFilterChange}
        className="hidden lg:flex lg:justify-end"
      />
    </div>
  );
}
