import { ListingFilters } from "./ListingFilters";
import type { ListingFilterState } from "../../types/listing";
import { DrawerHeader, DrawerShell } from "../layout/DrawerShell";

type ListingFiltersDrawerProps = {
  open: boolean;
  onClose: () => void;
  state: ListingFilterState;
  onChange: (next: ListingFilterState) => void;
  onClear: () => void;
};

export function ListingFiltersDrawer({
  open,
  onClose,
  state,
  onChange,
  onClear,
}: ListingFiltersDrawerProps) {
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
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-[clamp(1.25rem,2.222vw,2.5rem)] py-6">
        <ListingFilters
          state={state}
          onChange={onChange}
          onClear={() => {
            onClear();
          }}
          defaultOpenAll
          showQuickFilters
        />
      </div>
    </DrawerShell>
  );
}
