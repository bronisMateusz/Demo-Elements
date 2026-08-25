import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  presenceSalonCities,
  salonOptions,
  type SalonOption,
} from "../../data/nav";
import { groupSalonCitiesByVoivodeship } from "../../data/polandVoivodeships";
import { salonCityChipLabel, salonsPageB } from "../../data/salons";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { useStickyUnderHeader } from "../../hooks/useStickyUnderHeader";
import { cn } from "../../lib/cn";
import {
  pxGutterClassName,
  stickyUnderHeaderClassName,
} from "../../lib/layoutTokens";
import { EASE_LUXURY } from "../../lib/motionEase";
import { Container } from "../ui/Container";
import { SalonLocationChips } from "./SalonLocationChips";
import { SalonTabCard } from "./SalonTabCard";

export type SalonsGroupBy = "voivodeship" | "city";

type TabChip = {
  id: string;
  label: string;
  salonIds: SalonOption["id"][];
};

const FADE_S = 0.22;

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
  const byHref = new Map<string, SalonOption["id"]>(
    salonOptions.map((salon) => [salon.href, salon.id]),
  );

  return groups.map((group) => ({
    id: group.id,
    label: titleCaseVoiv(group.name),
    salonIds: group.cities.flatMap((city) => {
      const id = byHref.get(city.href);
      return id ? [id] : [];
    }),
  }));
}

function buildCityTabs(): TabChip[] {
  const collator = new Intl.Collator("pl", { sensitivity: "base" });
  const byHref = new Map<string, SalonOption>(
    salonOptions.map((salon) => [salon.href, salon]),
  );
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
      salonIds: salons.map((salon) => salon.id),
    }))
    .sort((a, b) => collator.compare(a.label, b.label));
}

type SalonsTabsDirectoryProps = {
  groupBy?: SalonsGroupBy;
  className?: string;
  /** Opens booking / ask flow for the chosen salon (drawer). */
  onBookSalon?: (salon: SalonOption) => void;
};

export function SalonsTabsDirectory({
  groupBy = "voivodeship",
  className,
  onBookSalon,
}: SalonsTabsDirectoryProps) {
  const { location } = salonsPageB;
  const reduceMotion = useMotionReduced();

  const voivTabs = useMemo(() => buildVoivTabs(), []);
  const cityTabs = useMemo(() => buildCityTabs(), []);
  const tabs = groupBy === "voivodeship" ? voivTabs : cityTabs;

  const [activeTabId, setActiveTabId] = useState(() => voivTabs[0]?.id ?? "");

  const resolvedTabId = tabs.some((tab) => tab.id === activeTabId)
    ? activeTabId
    : (tabs[0]?.id ?? "");
  const activeTab = tabs.find((tab) => tab.id === resolvedTabId) ?? tabs[0];

  const salonsById = useMemo(
    () => new Map(salonOptions.map((salon) => [salon.id, salon])),
    [],
  );

  const visibleSalons = useMemo(() => {
    if (!activeTab) return [];
    return activeTab.salonIds
      .map((id) => salonsById.get(id))
      .filter((salon): salon is NonNullable<typeof salon> => Boolean(salon));
  }, [activeTab, salonsById]);

  const resultsKey = `${groupBy}:${resolvedTabId}`;
  const fadeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: FADE_S, ease: EASE_LUXURY };

  const { stuck, sentinelRef } = useStickyUnderHeader();

  return (
    <Container size="content" className={className}>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
      <div
        className={cn(
          stickyUnderHeaderClassName,
          "z-99 border-b border-transparent",
          stuck &&
            "w-screen ms-[calc(50%-50vw)] border-neutral-200 bg-neutral-0/95 backdrop-blur-sm",
        )}
      >
        <SalonLocationChips
          role="tablist"
          mobileAs="scroll"
          scrollInsetClassName={stuck ? pxGutterClassName : undefined}
          ariaLabel={location.title}
          chips={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
          }))}
          activeId={activeTab?.id ?? ""}
          onSelect={setActiveTabId}
        />
      </div>

      <div className="mt-4 rounded-xs border border-neutral-200 bg-neutral-0 p-4 sm:mt-6 sm:p-6 md:p-8">
        <div className="relative bg-neutral-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={resultsKey}
              role="tabpanel"
              aria-label={activeTab?.label ?? location.title}
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
                      onBook={() => onBookSalon?.(salon)}
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
