import { salonCardCopy, type SalonOption } from "../../data/nav";
import { salonDirectoryImageFor } from "../../data/salons";
import { cn } from "../../lib/cn";

type DrawerSalonSummaryProps = {
  salon: SalonOption | null;
  onChangeSalon: () => void;
  /** Shown when no salon is selected. */
  emptyHint: string;
  emptyLabel?: string;
  changeLabel?: string;
};

/** Compact salon card for drawer forms (matches AskDrawer product summary). */
export function DrawerSalonSummary({
  salon,
  onChangeSalon,
  emptyHint,
  emptyLabel = "Wybierz salon",
  changeLabel = salonCardCopy.changeLabel,
}: DrawerSalonSummaryProps) {
  return (
    <div className="flex gap-3 rounded-xs border border-neutral-200 bg-neutral-50 p-3">
      <div className="size-14 shrink-0 overflow-hidden bg-neutral-0">
        <img
          src={salonDirectoryImageFor(salon?.id ?? "")}
          alt=""
          className="size-full object-cover"
          width={56}
          height={56}
          draggable={false}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="m-0 font-body text-ui font-medium leading-snug text-neutral-900">
            {salon?.name ?? emptyLabel}
          </p>
          <button
            type="button"
            className={cn(
              "shrink-0 border-0 bg-transparent p-0 font-body text-sm text-neutral-500 underline underline-offset-2",
              "transition-colors duration-fast ease-out hover:text-neutral-900",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
            )}
            onClick={onChangeSalon}
          >
            {salon ? changeLabel : emptyLabel}
          </button>
        </div>
        <p className="mt-1 mb-0 text-sm text-neutral-500">
          {salon?.address ?? emptyHint}
        </p>
      </div>
    </div>
  );
}
