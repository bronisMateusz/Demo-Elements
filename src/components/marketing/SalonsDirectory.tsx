import { useMemo, useState } from "react";
import {
  presenceSalonCities,
  presenceVoivodeshipDrawerCopy,
  salonCardCopy,
  salonOptions,
  type SalonOption,
} from "../../data/nav";
import { groupSalonCitiesByVoivodeship } from "../../data/polandVoivodeships";
import {
  salonCountLabel,
  salonDirectoryImageFor,
  salonsPage,
} from "../../data/salons";
import { distanceKm, formatDistanceKm } from "../../lib/geo";
import { cn } from "../../lib/cn";
import { useSelectedSalon } from "../../hooks/useSelectedSalon";
import { PolandSalonsMap } from "../layout/PolandSalonsMap";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { inputClassName } from "../ui/inputClassName";

type LocateStatus = "idle" | "loading" | "ready" | "error";

/** Filter chips: min 44px target (WCAG 2.5.5 / project chip pattern), text-sm for readable AA contrast. */
const voivFilterChipClassName = cn(
  "inline-flex min-h-11 items-center rounded-xs border px-3 py-2 font-body text-sm leading-none tracking-[0.04em]",
  "transition-colors duration-fast ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
);

function voivFilterChipToneClassName(active: boolean): string {
  return active
    ? "border-neutral-900 bg-neutral-900 text-neutral-0"
    : "border-neutral-200 bg-neutral-0 text-neutral-700 hover:border-neutral-800";
}

function cityLabelFor(salon: SalonOption): string {
  return (
    presenceSalonCities.find((city) => city.href === salon.href)?.label ??
    salon.name
  );
}

function imageForSalon(salonId: string): string {
  return salonDirectoryImageFor(salonId);
}

function titleCaseVoiv(name: string): string {
  const plain = name.replace(/\u00AD/g, "");
  return plain
    .toLocaleLowerCase("pl")
    .replace(
      /(^|[\s-])(\S)/g,
      (_, sep: string, char: string) => `${sep}${char.toLocaleUpperCase("pl")}`,
    );
}

export function SalonsDirectory() {
  const { find, nearby, directory } = salonsPage;
  const { select, salon: selectedSalon } = useSelectedSalon();
  const [query, setQuery] = useState("");
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locateStatus, setLocateStatus] = useState<LocateStatus>("idle");
  const [locateError, setLocateError] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [focusedVoivId, setFocusedVoivId] = useState<string | null>(null);

  const voivGroups = useMemo(
    () => groupSalonCitiesByVoivodeship(presenceSalonCities),
    [],
  );

  const salonByHref = useMemo(() => {
    return new Map<string, SalonOption>(
      salonOptions.map((salon) => [salon.href, salon]),
    );
  }, []);

  const filteredSalons = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const base = normalized
      ? salonOptions.filter(
          (salon) =>
            salon.name.toLowerCase().includes(normalized) ||
            salon.address.toLowerCase().includes(normalized) ||
            cityLabelFor(salon).toLowerCase().includes(normalized),
        )
      : [...salonOptions];

    if (!userCoords) {
      return base.map((salon) => ({
        salon,
        distanceKm: null as number | null,
      }));
    }

    return base
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

  const nearestThree = useMemo(() => {
    if (!userCoords) return [];
    return filteredSalons.slice(0, 3);
  }, [filteredSalons, userCoords]);

  const queryMatchedHrefs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return null;
    return new Set<string>(filteredSalons.map(({ salon }) => salon.href));
  }, [filteredSalons, query]);

  const visibleGroups = useMemo(() => {
    return voivGroups
      .map((group) => {
        const cities = group.cities.filter((city) => {
          if (queryMatchedHrefs && !queryMatchedHrefs.has(city.href)) {
            return false;
          }
          return true;
        });
        return { ...group, cities };
      })
      .filter((group) => group.cities.length > 0)
      .filter((group) => !focusedVoivId || group.id === focusedVoivId);
  }, [focusedVoivId, queryMatchedHrefs, voivGroups]);

  const filteredVoivChips = useMemo(() => {
    return voivGroups
      .map((group) => ({
        id: group.id,
        name: group.name,
        count: group.cities.filter(
          (city) => !queryMatchedHrefs || queryMatchedHrefs.has(city.href),
        ).length,
      }))
      .filter((group) => group.count > 0);
  }, [queryMatchedHrefs, voivGroups]);

  const allVoivCount = useMemo(
    () => filteredVoivChips.reduce((sum, group) => sum + group.count, 0),
    [filteredVoivChips],
  );

  const locateNearestSalon = () => {
    if (!navigator.geolocation) {
      setLocateStatus("error");
      setLocateError(find.locateUnsupported);
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
            ? find.locateDenied
            : find.locateUnavailable,
        );
      },
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 60_000 },
    );
  };

  const hours = salonCardCopy.defaultHours;
  const drawerCopy = presenceVoivodeshipDrawerCopy;

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <Container size="content">
        <div className="rounded-xs border border-neutral-200 bg-neutral-0 p-5 md:p-7">
          <h2 className="m-0 font-heading text-h3 leading-[1.15] font-medium tracking-tight text-neutral-900">
            {find.title}
          </h2>
          <div className="mt-5 flex items-stretch gap-0">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">{find.searchPlaceholder}</span>
              <i
                className="ph ph-magnifying-glass pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2 text-neutral-500"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={find.searchPlaceholder}
                autoComplete="off"
                className={cn(
                  inputClassName,
                  "h-13 rounded-e-none border-e-0 pe-3 ps-10",
                )}
              />
            </label>
            <Button
              as="button"
              type="button"
              variant="secondary"
              size="lg"
              className="shrink-0 rounded-s-none"
              onClick={locateNearestSalon}
              disabled={locateStatus === "loading"}
            >
              <i className="ph ph-crosshair text-base" aria-hidden="true" />
              {locateStatus === "loading" ? find.locatingLabel : find.geoLabel}
            </Button>
          </div>
          {locateError ? (
            <p
              className="mt-3 mb-0 font-body text-sm text-red-700"
              role="alert"
            >
              {locateError}
            </p>
          ) : null}
        </div>
      </Container>

      {nearestThree.length > 0 ? (
        <section id="nearby-results">
          <Container size="content">
            <h2 className="m-0 font-heading text-h3 leading-[1.15] font-medium tracking-tight text-neutral-900">
              {nearby.title}
            </h2>
            <ul className="mt-5 m-0 grid list-none gap-4 p-0 md:grid-cols-3">
              {nearestThree.map(({ salon, distanceKm: km }) => (
                <li
                  key={salon.id}
                  className="rounded-xs border border-neutral-200 bg-neutral-0 p-5"
                >
                  <p className="m-0 font-heading text-lg font-medium text-neutral-900">
                    {cityLabelFor(salon)}
                  </p>
                  <p className="mt-1 mb-0 font-body text-sm text-neutral-600">
                    {salon.address}
                  </p>
                  {km != null ? (
                    <p className="mt-2 mb-0 font-body text-xs text-neutral-500">
                      {formatDistanceKm(km)}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      as="link"
                      href={salon.href}
                      variant="secondary"
                      size="sm"
                    >
                      {nearby.learnMoreLabel}
                    </Button>
                    <Button
                      as="button"
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => select(salon.id)}
                    >
                      {selectedSalon?.id === salon.id
                        ? "Wybrany"
                        : nearby.selectLabel}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <Container size="content" className="mainview">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="salons-directory-title"
            className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
          >
            {directory.title}
          </h2>
          <div
            className="inline-flex rounded-xs border border-neutral-200 p-1 lg:hidden"
            role="group"
            aria-label="Widok salonów"
          >
            {(
              [
                ["list", directory.listLabel],
                ["map", directory.mapLabel],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={view === value}
                className={cn(
                  "rounded-xs px-4 py-2 font-body text-sm transition-colors duration-fast",
                  view === value
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
                onClick={() => setView(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] xl:gap-10">
          {/* Stretch with the list so sticky has a tall containing block.
              Center with `top` only - translate would offset the map in normal flow too. */}
          <div
            className={cn(
              "min-h-0 lg:self-stretch",
              view === "list" && "max-lg:hidden",
            )}
          >
            <div className="lg:sticky lg:top-[max(8rem,calc(50svh-14rem))] header-concealed:lg:top-[max(5rem,calc(50svh-14rem))]">
              <PolandSalonsMap
                fluid
                tone="onLight"
                className="min-h-80 w-full"
                focusedVoivId={focusedVoivId}
                onVoivSelect={(voivId) => {
                  setFocusedVoivId(voivId);
                  setView("list");
                }}
              />
            </div>
          </div>

          <div className={cn(view === "map" && "max-lg:hidden")}>
            <div
              className="mb-5 flex flex-wrap gap-2"
              role="group"
              aria-label="Filtr województw"
            >
              <button
                type="button"
                aria-pressed={focusedVoivId == null}
                className={cn(
                  voivFilterChipClassName,
                  voivFilterChipToneClassName(focusedVoivId == null),
                )}
                onClick={() => setFocusedVoivId(null)}
              >
                {directory.allVoivLabel} · {allVoivCount}
              </button>
              {filteredVoivChips.map((group) => {
                const active = focusedVoivId === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    aria-pressed={active}
                    className={cn(
                      voivFilterChipClassName,
                      voivFilterChipToneClassName(active),
                    )}
                    onClick={() => setFocusedVoivId(group.id)}
                  >
                    {titleCaseVoiv(group.name)} · {group.count}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-8">
              {visibleGroups.map((group) => (
                <section
                  key={group.id}
                  aria-labelledby={`voiv-heading-${group.id}`}
                >
                  <h3
                    id={`voiv-heading-${group.id}`}
                    className="m-0 font-heading text-lg font-medium text-neutral-900"
                  >
                    {titleCaseVoiv(group.name)} ·{" "}
                    {salonCountLabel(group.cities.length)}
                  </h3>
                  <ul className="mt-4 m-0 flex list-none flex-col gap-4 p-0">
                    {group.cities.map((city) => {
                      const salon = salonByHref.get(city.href);
                      if (!salon) return null;
                      const isSelected = selectedSalon?.id === salon.id;
                      const phone = salon.phone;
                      const telHref = `tel:${phone.replace(/\s+/g, "")}`;
                      return (
                        <li
                          key={city.href}
                          className="grid gap-4 rounded-xs border border-neutral-200 bg-neutral-0 p-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5 md:p-5"
                        >
                          <div className="relative aspect-square overflow-hidden rounded-xs bg-neutral-100">
                            <img
                              src={imageForSalon(salon.id)}
                              alt=""
                              aria-hidden="true"
                              className="size-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
                            <div className="min-w-0">
                              <p className="m-0 font-heading text-lg leading-snug font-medium text-neutral-900">
                                {cityLabelFor(salon)}
                              </p>
                              <p className="mt-1.5 mb-0 text-sm leading-relaxed text-neutral-600">
                                {salon.address}
                              </p>

                              <dl className="mt-3 mb-0 grid gap-2 text-sm">
                                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                                  <dt className="font-medium text-neutral-800">
                                    {drawerCopy.phoneLabel}
                                  </dt>
                                  <dd className="m-0">
                                    <a
                                      href={telHref}
                                      className="text-neutral-800 underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-gold-600 hover:decoration-gold-500"
                                    >
                                      {phone}
                                    </a>
                                  </dd>
                                </div>
                                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                                  <dt className="font-medium text-neutral-800">
                                    {drawerCopy.hoursLabel}
                                  </dt>
                                  <dd className="m-0 text-neutral-700">
                                    {hours.map((line) => (
                                      <span key={line} className="block">
                                        {line}
                                      </span>
                                    ))}
                                  </dd>
                                </div>
                              </dl>
                            </div>

                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap md:flex-col md:items-stretch">
                              <Button
                                href={salon.href}
                                variant="primary"
                                size="md"
                                className="w-full sm:w-auto md:w-full"
                              >
                                {drawerCopy.contactLabel}
                                <i
                                  className="ph ph-arrow-right"
                                  aria-hidden="true"
                                />
                              </Button>
                              <Button
                                as="button"
                                type="button"
                                variant="secondary"
                                size="md"
                                className={cn(
                                  "w-full sm:w-auto md:w-full",
                                  isSelected &&
                                    "pointer-events-none opacity-70",
                                )}
                                onClick={() => select(salon.id)}
                                disabled={isSelected}
                              >
                                {isSelected
                                  ? drawerCopy.selectedLabel
                                  : drawerCopy.selectLabel}
                              </Button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
