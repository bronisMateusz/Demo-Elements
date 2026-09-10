import { listingFacetGroups } from "../../data/listing";
import { cn } from "../../lib/cn";
import {
  listingFilterHasActive,
  listingFilterActiveCount,
} from "../../lib/listingFilters";
import type { ListingFacetKey, ListingFilterState } from "../../types/listing";
import { Button } from "../ui/Button";
import { ListSelect } from "../ui/ListSelect";

const ALL_VALUE = "";

type ListingFiltersBarProps = {
  state: ListingFilterState;
  onChange: (next: ListingFilterState) => void;
  onClear: () => void;
  className?: string;
};

function setFacetSingle(
  state: ListingFilterState,
  key: ListingFacetKey,
  value: string,
): ListingFilterState {
  return {
    ...state,
    facets: {
      ...state.facets,
      [key]: value ? [value] : [],
    },
  };
}

/**
 * Facet selects in a dense grid: 2 / 4 / 8 columns so 7 selects + clear
 * never leave a lonely orphan cell.
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
        const selected = state.facets[group.key][0] ?? ALL_VALUE;
        const options = [
          { value: ALL_VALUE, label: "Wszystkie" },
          ...group.options,
        ];

        return (
          <ListSelect
            key={group.key}
            // Idle sentinel so empty facet shows the group label as placeholder.
            value={selected || "__idle__"}
            onChange={(value) =>
              onChange(setFacetSingle(state, group.key, value))
            }
            options={options}
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
