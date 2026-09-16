import { salonCardCopy, type SalonOption } from "../../data/nav";
import { salonDirectoryImageFor } from "../../data/salons";
import { Button } from "../ui/Button";

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
  const actionLabel = salon ? changeLabel : emptyLabel;

  return (
    <div className="flex flex-col gap-3 rounded-xs border border-neutral-300 bg-neutral-50 p-3">
      <div className="flex items-start gap-3">
        <div className="size-16 shrink-0 overflow-hidden bg-neutral-0">
          <img
            src={salonDirectoryImageFor(salon?.id ?? "")}
            alt=""
            className="size-full object-cover"
            width={64}
            height={64}
            draggable={false}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center self-stretch">
          <p className="m-0 font-body text-ui font-medium leading-snug text-neutral-900">
            {salon?.name ?? emptyLabel}
          </p>
          <p className="mt-1 mb-0 text-sm text-neutral-500">
            {salon?.address ?? emptyHint}
          </p>
        </div>
      </div>

      <Button
        as="button"
        type="button"
        variant="secondary"
        size="sm"
        full
        onClick={onChangeSalon}
      >
        {actionLabel}
      </Button>
    </div>
  );
}
