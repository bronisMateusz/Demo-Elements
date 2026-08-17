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
import { useSelectedSalon } from "../../hooks/useSelectedSalon";
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

type GroupBy = "voivodeship" | "city";

type TabChip = {
  id: string;
  label: string;
  salonIds: string[];
};

const FADE_S = 0.22;

const directoryCardPadXClassName = "px-4 sm:px-6 md:px-8";
const directoryCardPadXNegClassName = "-mx-4 sm:-mx-6 md:-mx-8";

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
  const byHref = new Map<string, string>(
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
    const byId = new Map<string, SalonOption>(
      salonOptions.map((salon) => [salon.id, salon]),
    );
    return activeTab.salonIds.flatMap((id) => {
      const salon = byId.get(id);
      return salon ? [salon] : [];
    });
  }, [activeTab]);

  const resultsKey = activeTab
    ? `${groupBy}:${activeTab.id}`
    : `${groupBy}:empty`;

  const fadeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: FADE_S, ease: EASE_LUXURY };

  const { stuck, sentinelRef } = useStickyUnderHeader();

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
          </div>

          <SalonLocationChips
            className="shrink-0"
            mobileAs="chips"
            stretchOnMobile
            size="lg"
            ariaLabel={location.groupByAria}
            chips={[
              { id: "voivodeship", label: location.groupByVoiv },
              { id: "city", label: location.groupByCity },
            ]}
            activeId={groupBy}
            onSelect={(id) => {
              const value = id as GroupBy;
              setGroupBy(value);
              const nextTabs = value === "voivodeship" ? voivTabs : cityTabs;
              setActiveTabId(nextTabs[0]?.id ?? "");
            }}
          />
        </div>

        <div ref={sentinelRef} className="mt-6 h-px" aria-hidden="true" />
        <div
          className={cn(
            stickyUnderHeaderClassName,
            "z-99 border-b border-transparent py-2",
            stuck
              ? "w-screen ms-[calc(50%-50vw)] border-neutral-200 bg-neutral-0/95 backdrop-blur-sm"
              : directoryCardPadXNegClassName,
          )}
        >
          <SalonLocationChips
            role="tablist"
            mobileAs="scroll"
            scrollInsetClassName={
              stuck ? pxGutterClassName : directoryCardPadXClassName
            }
            ariaLabel={location.title}
            chips={tabs.map((tab) => ({
              id: tab.id,
              label: tab.label,
            }))}
            activeId={activeTab?.id ?? ""}
            onSelect={setActiveTabId}
          />
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
