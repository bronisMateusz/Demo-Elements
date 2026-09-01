import { listingFilterHasActive } from "../../lib/listingFilters";
import { cn } from "../../lib/cn";
import type { ListingFilterState } from "../../types/listing";
import { DrawerHeader, DrawerShell } from "../layout/DrawerShell";
import { Button } from "../ui/Button";
import { ListingFilters } from "./ListingFilters";

type ListingFiltersDrawerProps = {
  open: boolean;
  onClose: () => void;
  state: ListingFilterState;
  onChange: (next: ListingFilterState) => void;
  onClear: () => void;
  /** Filtered product count shown on the sticky apply CTA. */
  resultCount: number;
};

export function ListingFiltersDrawer({
  open,
  onClose,
  state,
  onChange,
  onClear,
  resultCount,
}: ListingFiltersDrawerProps) {
  const hasActive = listingFilterHasActive(state);

  return (
    <DrawerShell
      open={open}
      onClose={onClose}
      label="Filtry produktów"
      closeLabel="Zamknij filtry"
      className="lg:hidden"
    >
      <DrawerHeader
        title="Filtry"
        closeLabel="Zamknij filtry"
        onClose={onClose}
        actions={
          <Button
            as="button"
            type="button"
            variant="secondary"
            size="sm"
            className={cn(
              "uppercase border-transparent",
              !hasActive && "invisible",
            )}
            onClick={onClear}
            disabled={!hasActive}
            ariaLabel="Wyczyść filtry"
          >
            Wyczyść
          </Button>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-[clamp(0.75rem,2.222vw,2.5rem)] py-6">
        <ListingFilters
          state={state}
          onChange={onChange}
          onClear={onClear}
          defaultOpenAll
          showQuickFilters
          showHeading={false}
          showClear={false}
        />
      </div>
      <div className="shrink-0 border-t border-neutral-300 bg-neutral-0 px-[clamp(0.75rem,2.222vw,2.5rem)] pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button
          as="button"
          type="button"
          variant="primary"
          size="lg"
          full
          ariaLabel={`Zobacz produkty (${resultCount})`}
          onClick={onClose}
        >
          Zobacz produkty ({resultCount})
        </Button>
      </div>
    </DrawerShell>
  );
}
