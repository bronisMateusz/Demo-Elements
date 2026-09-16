import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { formatDistanceKm } from "../../lib/geo";
import { salonDrawerCopy } from "../../data/nav";
import { Button } from "../ui/Button";
import { inputClassName } from "../ui/inputClassName";
import type { SalonPickerResult } from "./salonPickerTypes";
import { useSalonPickerState } from "./useSalonPickerState";

export function SalonSearchBlock({
  searchId,
  query,
  onQueryChange,
  locateBusy,
  onLocate,
  locateError,
  showNearestHint,
  className,
  /** Hide cookie consent line (AskDrawer already has denser chrome). */
  compact = false,
}: {
  searchId: string;
  query: string;
  onQueryChange: (value: string) => void;
  locateBusy: boolean;
  onLocate: () => void;
  locateError: string | null;
  showNearestHint: boolean;
  className?: string;
  compact?: boolean;
}): ReactNode {
  return (
    <div className={cn("flex flex-col gap-3 md:gap-4", className)}>
      <div className="flex items-stretch gap-0">
        <label className="relative min-w-0 flex-1" htmlFor={searchId}>
          <span className="sr-only">{salonDrawerCopy.searchPlaceholder}</span>
          <i
            className="ph ph-magnifying-glass pointer-events-none absolute top-1/2 inset-s-3 -translate-y-1/2 text-lg text-neutral-400"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={salonDrawerCopy.searchPlaceholder}
            autoComplete="off"
            className={cn(
              inputClassName,
              "rounded-e-none border-e-0 bg-neutral-0 pe-3 ps-10",
            )}
          />
        </label>
        <button
          type="button"
          onClick={onLocate}
          disabled={locateBusy}
          aria-busy={locateBusy}
          aria-label={
            locateBusy
              ? salonDrawerCopy.locatingLabel
              : salonDrawerCopy.locateLabel
          }
          className={cn(
            "inline-flex size-12 shrink-0 items-center justify-center rounded-xs rounded-s-none bg-neutral-900 text-neutral-0",
            "transition-colors duration-fast ease-out hover:bg-neutral-800",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
            "disabled:cursor-wait disabled:opacity-70",
          )}
        >
          <i
            className={cn(
              "ph text-xl",
              locateBusy ? "ph-circle-notch animate-spin" : "ph-crosshair",
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      {!compact ? (
        <p className="m-0 text-xs leading-relaxed text-neutral-400">
          {salonDrawerCopy.consent}{" "}
          <a
            href={salonDrawerCopy.learnMoreHref}
            className="text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-800"
          >
            {salonDrawerCopy.consentLearnMoreLabel}
          </a>
        </p>
      ) : null}
      {locateError ? (
        <p
          className="m-0 text-xs leading-relaxed text-neutral-700"
          role="alert"
        >
          {locateError}
        </p>
      ) : null}
      {showNearestHint ? (
        <p className="m-0 text-xs leading-relaxed text-neutral-500">
          {salonDrawerCopy.nearestHint}
        </p>
      ) : null}
    </div>
  );
}

export function SalonResultsList({
  results,
  selectedSalonId,
  onSelect,
}: {
  results: SalonPickerResult[];
  selectedSalonId?: string | null;
  onSelect: (id: string) => void;
}) {
  if (results.length === 0) {
    return (
      <p className="m-0 py-6 text-sm text-neutral-500">
        {salonDrawerCopy.emptyResults}
      </p>
    );
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0 md:gap-3">
      {results.map(({ salon, distanceKm: km }) => {
        const isSelected = selectedSalonId === salon.id;

        return (
          <li
            key={salon.id}
            className={cn(
              "rounded-xs border bg-neutral-50 px-4 py-3.5 md:px-5 md:py-5",
              isSelected ? "border-neutral-900" : "border-neutral-300",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="m-0 font-body text-ui font-medium text-neutral-900">
                {salon.name}
              </p>
              {km != null ? (
                <span className="shrink-0 text-xs text-neutral-500">
                  {formatDistanceKm(km)}
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 mb-0 text-sm leading-relaxed text-neutral-500 md:mt-1">
              {salon.address}
            </p>
            <div className="mt-3 flex items-center justify-between gap-4 md:mt-5">
              <Link
                to={salon.href}
                className="text-sm text-neutral-700 underline underline-offset-2 transition-colors duration-fast ease-out hover:text-gold-500"
              >
                {salonDrawerCopy.learnMoreLabel}
              </Link>
              <Button
                as="button"
                type="button"
                variant={isSelected ? "primary" : "secondary"}
                size="sm"
                onClick={() => onSelect(salon.id)}
              >
                {isSelected ? (
                  <>
                    <i className="ph ph-check" aria-hidden="true" />
                    {salonDrawerCopy.selectedLabel}
                  </>
                ) : (
                  salonDrawerCopy.selectLabel
                )}
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type SalonPickerStackedProps = {
  lead?: string;
  selectedSalonId?: string | null;
  onSelect: (id: string) => void;
  className?: string;
};

/**
 * Stacked salon picker for AskDrawer body (Drupal #askDrawer .drawer-body).
 * Search + results in one scrollable column.
 */
export function SalonPickerStacked({
  lead,
  selectedSalonId,
  onSelect,
  className,
}: SalonPickerStackedProps) {
  const picker = useSalonPickerState(selectedSalonId);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {lead ? (
        <p className="m-0 text-sm leading-relaxed text-neutral-700 md:text-ui">
          {lead}
        </p>
      ) : null}

      <SalonSearchBlock
        searchId={picker.searchId}
        query={picker.query}
        onQueryChange={picker.setQuery}
        locateBusy={picker.locateBusy}
        onLocate={picker.locateNearestSalon}
        locateError={picker.locateError}
        showNearestHint={picker.showNearestHint}
        compact
      />

      <div>
        <p className="m-0 mb-3 text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase md:mb-4">
          {salonDrawerCopy.resultsHeading}
        </p>
        <SalonResultsList
          results={picker.filteredSalons}
          selectedSalonId={selectedSalonId}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
