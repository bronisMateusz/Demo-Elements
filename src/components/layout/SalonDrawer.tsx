import { cn } from "../../lib/cn";
import { advisorAskDrawerCopy } from "../../data/ask";
import { salonDrawerCopy } from "../../data/nav";
import { useSelectedSalon } from "../../hooks/useSelectedSalon";
import { DrawerHeader, DrawerShell } from "./DrawerShell";
import { SalonResultsList, SalonSearchBlock } from "./SalonPickerPanel";
import { useSalonPickerState } from "./useSalonPickerState";

type SalonDrawerProps = {
  open: boolean;
  onClose: () => void;
  /**
   * Render panel body only (parent owns DrawerShell) - seamless step switch
   * from InspirationProductsDrawer.
   */
  embedded?: boolean;
  /** Salon pick is step 2 after products (eyebrow + back). */
  fromProductsStep?: boolean;
  onBackToProducts?: () => void;
};

const GUTTER_X = "px-[clamp(0.75rem,2.222vw,2.5rem)]";

export function SalonDrawer({
  open,
  onClose,
  embedded = false,
  fromProductsStep = false,
  onBackToProducts,
}: SalonDrawerProps) {
  const { salon: selectedSalon, select } = useSelectedSalon();
  const picker = useSalonPickerState(
    fromProductsStep ? undefined : selectedSalon?.id,
  );

  const handleSelect = (id: string) => {
    select(id);
    onClose();
  };

  const searchProps = {
    searchId: picker.searchId,
    query: picker.query,
    onQueryChange: picker.setQuery,
    locateBusy: picker.locateBusy,
    onLocate: picker.locateNearestSalon,
    locateError: picker.locateError,
    showNearestHint: picker.showNearestHint,
  };

  const body = (
    <>
      <DrawerHeader
        title={salonDrawerCopy.title}
        description={salonDrawerCopy.description}
        closeLabel="Zamknij"
        onClose={onClose}
        eyebrow={
          fromProductsStep ? advisorAskDrawerCopy.step2SalonEyebrow : undefined
        }
        onBack={fromProductsStep ? onBackToProducts : undefined}
        backLabel={
          fromProductsStep
            ? advisorAskDrawerCopy.backToProductsLabel
            : undefined
        }
      />

      <SalonSearchBlock
        {...searchProps}
        className={cn(
          "hidden border-b border-neutral-300 md:flex",
          GUTTER_X,
          "py-8",
        )}
      />

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto",
          GUTTER_X,
          "py-4 md:py-8",
        )}
      >
        <p className="m-0 mb-3 text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase md:mb-4">
          {salonDrawerCopy.resultsHeading}
        </p>
        <SalonResultsList
          results={picker.filteredSalons}
          selectedSalonId={fromProductsStep ? undefined : selectedSalon?.id}
          onSelect={handleSelect}
        />
      </div>

      <SalonSearchBlock
        {...searchProps}
        searchId={`${picker.searchId}-mobile`}
        className={cn(
          "shrink-0 border-t border-neutral-300 bg-neutral-0 md:hidden",
          GUTTER_X,
          "pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
        )}
      />
    </>
  );

  if (embedded) {
    return body;
  }

  return (
    <DrawerShell
      open={open}
      onClose={onClose}
      label={salonDrawerCopy.title}
      closeLabel="Zamknij wybór salonu"
    >
      {body}
    </DrawerShell>
  );
}
