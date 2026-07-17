import { useId, useMemo, useState } from "react";
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
      return matched.map((salon) => ({ salon, distanceKm: null as number | null }));
    }

    return matched
      .map((salon) => ({
        salon,
        distanceKm: distanceKm(userCoords.lat, userCoords.lng, salon.lat, salon.lng),
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

  const handleSelect = (id: string) => {
    select(id);
    onClose();
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

        <div className="flex flex-col gap-4 border-b border-neutral-200 px-gutter py-8">
          <div className="flex items-center gap-2">
            <label className="relative min-w-0 flex-1" htmlFor={searchId}>
              <span className="sr-only">{salonDrawerCopy.searchPlaceholder}</span>
              <i
                className="ph ph-magnifying-glass pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-lg text-neutral-400"
                aria-hidden="true"
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={salonDrawerCopy.searchPlaceholder}
                autoComplete="off"
                className={cn(inputClassName, "bg-neutral-0 py-2 pr-3 pl-10")}
              />
            </label>
            <button
              type="button"
              onClick={locateNearestSalon}
              disabled={locateBusy}
              aria-busy={locateBusy}
              aria-label={
                locateBusy ? salonDrawerCopy.locatingLabel : salonDrawerCopy.locateLabel
              }
              className={cn(
                "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xs bg-neutral-900 text-neutral-0",
                "transition-colors duration-fast ease-out hover:bg-neutral-800",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
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
            <p className="m-0 text-xs leading-relaxed text-neutral-700" role="alert">
              {locateError}
            </p>
          ) : null}
          {locateStatus === "ready" && userCoords ? (
            <p className="m-0 text-xs leading-relaxed text-neutral-500">
              {salonDrawerCopy.nearestHint}
            </p>
          ) : null}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-gutter py-8">
          <p className="m-0 mb-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
            {salonDrawerCopy.resultsHeading}
          </p>

          {filteredSalons.length === 0 ? (
            <p className="m-0 py-6 text-sm text-neutral-500">{salonDrawerCopy.emptyResults}</p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {filteredSalons.map(({ salon, distanceKm: km }) => {
                const isSelected = selectedSalon?.id === salon.id;

                return (
                  <li
                    key={salon.id}
                    className={cn(
                      "rounded-xs border bg-neutral-50 px-5 py-5",
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
                    <p className="mt-1 mb-0 text-sm leading-relaxed text-neutral-500">
                      {salon.address}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <a
                        href={salon.href}
                        className="text-sm text-neutral-700 underline underline-offset-2 transition-colors duration-fast ease-out hover:text-gold-500"
                      >
                        {salonDrawerCopy.learnMoreLabel}
                      </a>
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
    </DrawerShell>
  );
}
