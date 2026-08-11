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
            ariaLabel="Otwórz filtry"
          >
            <i className="ph ph-funnel" aria-hidden="true" />
            Filtry
          </Button>
        ) : null}
      </div>

      <ListingQuickFilters
        state={filterState}
        onChange={onFilterChange}
        className="min-w-0 lg:justify-end"
      />
    </div>
  );
}
