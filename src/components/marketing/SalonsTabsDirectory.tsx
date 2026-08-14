import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  presenceSalonCities,
  salonOptions,
  type SalonOption,
} from "../../data/nav";
import { groupSalonCitiesByVoivodeship } from "../../data/polandVoivodeships";
import {
  salonCityChipLabel,
  salonsPageB,
} from "../../data/salons";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { useSelectedSalon } from "../../hooks/useSelectedSalon";
import { cn } from "../../lib/cn";
import { EASE_LUXURY } from "../../lib/motionEase";
import { Container } from "../ui/Container";
import { SalonTabCard } from "./SalonTabCard";

type GroupBy = "voivodeship" | "city";

type TabChip = {
  id: string;
  label: string;
  count: number;
  salonIds: string[];
};

const FADE_S = 0.22;

const tabChipClassName = cn(
  "inline-flex min-h-11 items-center rounded-xs border px-3 py-2 font-body text-sm leading-none tracking-[0.04em]",
  "transition-colors duration-fast ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
);

function tabChipToneClassName(active: boolean): string {
  return active
    ? "border-neutral-900 bg-neutral-900 text-neutral-0"
    : "border-neutral-200 bg-neutral-0 text-neutral-700 hover:border-neutral-800";
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

function buildVoivTabs(): TabChip[] {
  const groups = groupSalonCitiesByVoivodeship(presenceSalonCities);
  const byHref = new Map(salonOptions.map((salon) => [salon.href, salon.id]));

  return groups.map((group) => ({
    id: group.id,
    label: titleCaseVoiv(group.name),
    count: group.cities.length,
    salonIds: group.cities
      .map((city) => byHref.get(city.href))
      .filter((id): id is string => Boolean(id)),
  }));
}

function buildCityTabs(): TabChip[] {
  const collator = new Intl.Collator("pl", { sensitivity: "base" });
  const byHref = new Map(salonOptions.map((salon) => [salon.href, salon]));
  const byCity = new Map<string, SalonOption[]>();

  for (const city of presenceSalonCities) {
    const salon = byHref.get(city.href);
    if (!salon) continue;
    const label = salonCityChipLabel(city.label);
    const list = byCity.get(label) ?? [];
    list.push(salon);
    byCity.set(label, list);
  }

  return [...byCity.entries()]
    .map(([label, salons]) => ({
      id: `city:${label}`,
      label,
      count: salons.length,
      salonIds: salons.map((salon) => salon.id),
    }))
    .sort((a, b) => collator.compare(a.label, b.label));
}

function chipLabel(tab: TabChip): string {
  return tab.count > 1 ? `${tab.label} · ${tab.count}` : tab.label;
}

export function SalonsTabsDirectory({ className }: { className?: string }) {
  const { location } = salonsPageB;
  const reduceMotion = useMotionReduced();
  const { select, salon: selectedSalon } = useSelectedSalon();
  const [groupBy, setGroupBy] = useState<GroupBy>("voivodeship");

  const voivTabs = useMemo(() => buildVoivTabs(), []);
  const cityTabs = useMemo(() => buildCityTabs(), []);
  const tabs = groupBy === "voivodeship" ? voivTabs : cityTabs;

  const [activeTabId, setActiveTabId] = useState(() => voivTabs[0]?.id ?? "");
  const resolvedTabId = tabs.some((tab) => tab.id === activeTabId)
    ? activeTabId
    : (tabs[0]?.id ?? "");

  const activeTab = tabs.find((tab) => tab.id === resolvedTabId) ?? tabs[0];
  const visibleSalons = useMemo(() => {
    if (!activeTab) return [];
    const byId = new Map(salonOptions.map((salon) => [salon.id, salon]));
    return activeTab.salonIds
      .map((id) => byId.get(id))
      .filter((salon): salon is SalonOption => Boolean(salon));
  }, [activeTab]);

  const resultsKey = activeTab
    ? `${groupBy}:${activeTab.id}`
    : `${groupBy}:empty`;

  const fadeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: FADE_S, ease: EASE_LUXURY };

  return (
    <Container size="content" className={cn("mainview", className)}>
      <div className="rounded-xs border border-neutral-200 bg-neutral-0 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h2
              id="salons-tabs-title"
              className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
            >
              {location.title}
            </h2>
            <p className="mt-2 mb-0 font-body text-sm text-neutral-600">
              {groupBy === "voivodeship"
                ? location.voivLabel
                : location.cityLabel}
            </p>
          </div>

          <div
            className="inline-flex shrink-0 rounded-xs border border-neutral-200 p-1"
            role="group"
            aria-label={location.groupByAria}
          >
            {(
              [
                ["voivodeship", location.groupByVoiv],
                ["city", location.groupByCity],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={groupBy === value}
                className={cn(
                  "rounded-xs px-3 py-2 font-body text-sm transition-colors duration-fast ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
                  groupBy === value
                    ? "bg-neutral-900 text-neutral-0"
                    : "text-neutral-600 hover:text-neutral-900",
                )}
                onClick={() => {
                  setGroupBy(value);
                  const nextTabs =
                    value === "voivodeship" ? voivTabs : cityTabs;
                  setActiveTabId(nextTabs[0]?.id ?? "");
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label={location.title}
        >
          {tabs.map((tab) => {
            const active = tab.id === activeTab?.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={cn(
                  tabChipClassName,
                  tabChipToneClassName(active),
                )}
                onClick={() => setActiveTabId(tab.id)}
              >
                {chipLabel(tab)}
              </button>
            );
          })}
        </div>

        <div className="relative mt-2 bg-neutral-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={resultsKey}
              role="tabpanel"
              aria-labelledby="salons-tabs-title"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, transition: fadeTransition }
              }
              transition={fadeTransition}
            >
              {visibleSalons.length > 0 ? (
                <div className="flex flex-col">
                  {visibleSalons.map((salon) => (
                    <SalonTabCard
                      key={salon.id}
                      salon={salon}
                      selected={selectedSalon?.id === salon.id}
                      onBook={() => select(salon.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="py-10 font-body text-sm text-neutral-600">
                  Brak salonów w tej lokalizacji.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
