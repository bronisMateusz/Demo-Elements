import { listingFacetGroups } from "../../data/listing";
import { cn } from "../../lib/cn";
import {
  listingFilterHasActive,
  listingFilterActiveCount,
} from "../../lib/listingFilters";
import type { ListingFilterState } from "../../types/listing";
import { Button } from "../ui/Button";
import { ListSelect } from "../ui/ListSelect";

type ListingFiltersBarProps = {
  state: ListingFilterState;
  onChange: (next: ListingFilterState) => void;
  onClear: () => void;
  className?: string;
};

/**
 * Facet selects in a dense grid: 2 / 4 / 8 columns so 7 selects + clear
 * never leave a lonely orphan cell. Multi-select like the vertical filter list.
 */
export function ListingFiltersBar({
  state,
  onChange,
  onClear,
  className,
}: ListingFiltersBarProps) {
  const hasActive = listingFilterHasActive(state);
  const activeFilterCount = listingFilterActiveCount(state);

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2",
        "sm:gap-3 md:grid-cols-4",
        // 7 facets + clear = 8 cells → one even row on wide screens.
        "xl:grid-cols-8",
        className,
      )}
    >
      {listingFacetGroups.map((group) => {
        const selected = state.facets[group.key];

        return (
          <ListSelect
            key={group.key}
            multiple
            value={selected}
            onChange={(values) =>
              onChange({
                ...state,
                facets: {
                  ...state.facets,
                  [group.key]: values,
                },
              })
            }
            options={group.options}
            placeholder={group.label}
            aria-label={group.label}
            className="min-w-0"
          />
        );
      })}

      <Button
        as="button"
        type="button"
        variant="secondary"
        className={cn(
          "min-h-12 w-full justify-center",
          !hasActive && "invisible",
        )}
        onClick={onClear}
        disabled={!hasActive}
        ariaLabel="Wyczyść filtry"
      >
        Wyczyść
        {activeFilterCount > 0 ? (
          <span className="tabular-nums">({activeFilterCount})</span>
        ) : null}
      </Button>
    </div>
  );
}
