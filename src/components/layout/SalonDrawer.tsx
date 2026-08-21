import { useId, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { distanceKm, formatDistanceKm } from "../../lib/geo";
import { salonDrawerCopy, salonOptions } from "../../data/nav";
import { useSelectedSalon } from "../../hooks/useSelectedSalon";
import { Button } from "../ui/Button";
import { DrawerHeader, DrawerShell } from "./DrawerShell";
import { inputClassName } from "../ui/inputClassName";

type SalonDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type UserCoords = {
  lat: number;
  lng: number;
};

type LocateStatus = "idle" | "loading" | "ready" | "error";

const GUTTER_X = "px-[clamp(0.75rem,2.222vw,2.5rem)]";

function SalonSearchBlock({
  searchId,
  query,
  onQueryChange,
  locateBusy,
  onLocate,
  locateError,
  showNearestHint,
  className,
}: {
  searchId: string;
  query: string;
  onQueryChange: (value: string) => void;
  locateBusy: boolean;
  onLocate: () => void;
  locateError: string | null;
  showNearestHint: boolean;
  className?: string;
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
      <p className="m-0 text-xs leading-relaxed text-neutral-400">
        {salonDrawerCopy.consent}{" "}
        <a
          href={salonDrawerCopy.learnMoreHref}
          className="text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-800"
        >
          {salonDrawerCopy.consentLearnMoreLabel}
        </a>
      </p>
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

export function SalonDrawer({ open, onClose }: SalonDrawerProps) {
  const searchId = useId();
  const { salon: selectedSalon, select } = useSelectedSalon();
  const [query, setQuery] = useState("");
  const [userCoords, setUserCoords] = useState<UserCoords | null>(null);
  const [locateStatus, setLocateStatus] = useState<LocateStatus>("idle");
  const [locateError, setLocateError] = useState<string | null>(null);

  const filteredSalons = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matched = normalized
      ? salonOptions.filter(
          (salon) =>
            salon.name.toLowerCase().includes(normalized) ||
            salon.address.toLowerCase().includes(normalized),
        )
      : [...salonOptions];

    if (!userCoords) {
      return matched.map((salon) => ({
        salon,
        distanceKm: null as number | null,
      }));
    }

    return matched
      .map((salon) => ({
        salon,
        distanceKm: distanceKm(
          userCoords.lat,
          userCoords.lng,
          salon.lat,
          salon.lng,
        ),
      }))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }, [query, userCoords]);

  const locateNearestSalon = () => {
    if (!navigator.geolocation) {
      setLocateStatus("error");
      setLocateError(salonDrawerCopy.locateUnsupported);
      return;
    }

    setLocateStatus("loading");
    setLocateError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setQuery("");
        setLocateStatus("ready");
      },
      (error) => {
        setLocateStatus("error");
        setLocateError(
          error.code === error.PERMISSION_DENIED
            ? salonDrawerCopy.locateDenied
            : salonDrawerCopy.locateUnavailable,
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 12_000,
        maximumAge: 60_000,
      },
    );
  };

  const locateBusy = locateStatus === "loading";
  const showNearestHint = locateStatus === "ready" && Boolean(userCoords);

  const handleSelect = (id: string) => {
    select(id);
    onClose();
  };

  const searchProps = {
    searchId,
    query,
    onQueryChange: setQuery,
    locateBusy,
    onLocate: locateNearestSalon,
    locateError,
    showNearestHint,
  };

  return (
    <DrawerShell
      open={open}
      onClose={onClose}
      label={salonDrawerCopy.title}
      closeLabel="Zamknij wybór salonu"
    >
      <DrawerHeader
        title={salonDrawerCopy.title}
        description={salonDrawerCopy.description}
        closeLabel="Zamknij"
        onClose={onClose}
      />

      {/* Desktop: search under header */}
      <SalonSearchBlock
        {...searchProps}
        className={cn(
          "hidden border-b border-neutral-200 md:flex",
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

        {filteredSalons.length === 0 ? (
          <p className="m-0 py-6 text-sm text-neutral-500">
            {salonDrawerCopy.emptyResults}
          </p>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-2 p-0 md:gap-3">
            {filteredSalons.map(({ salon, distanceKm: km }) => {
              const isSelected = selectedSalon?.id === salon.id;

              return (
                <li
                  key={salon.id}
                  className={cn(
                    "rounded-xs border bg-neutral-50 px-4 py-3.5 md:px-5 md:py-5",
                    isSelected ? "border-neutral-900" : "border-neutral-200",
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
                      onClick={() => handleSelect(salon.id)}
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
        )}
      </div>

      {/* Mobile: sticky search footer */}
      <SalonSearchBlock
        {...searchProps}
        searchId={`${searchId}-mobile`}
        className={cn(
          "shrink-0 border-t border-neutral-200 bg-neutral-0 md:hidden",
          GUTTER_X,
          "pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
        )}
      />
    </DrawerShell>
  );
}
