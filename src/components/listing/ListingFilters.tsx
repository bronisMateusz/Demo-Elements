import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { listingFacetGroups } from "../../data/listing";
import { cn } from "../../lib/cn";
import { EASE_LUXURY } from "../../lib/motionEase";
import {
  listingFilterActiveCount,
  listingFilterHasActive,
  toggleFacetValue,
} from "../../lib/listingFilters";
import type { ListingFilterState } from "../../types/listing";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { Checkbox } from "../motion/Checkbox";
import { Button } from "../ui/Button";
import { ListingQuickFilters } from "./ListingQuickFilters";

/** Accordion open/close duration. */
const ACCORDION_DURATION_S = 0.62;

type ListingFiltersProps = {
  state: ListingFilterState;
  onChange: (next: ListingFilterState) => void;
  onClear: () => void;
  className?: string;
  /** When true, open all facet groups (e.g. mobile drawer). */
  defaultOpenAll?: boolean;
  /** Include quick filters (mobile drawer - desktop has them in the toolbar). */
  showQuickFilters?: boolean;
  /** Section title “Filtry”. Hide in the drawer (header already says Filtry). */
  showHeading?: boolean;
  /** Clear filters control. Hide when the drawer header owns “Wyczyść”. */
  showClear?: boolean;
};

function initialOpenKeys(defaultOpenAll: boolean) {
  if (defaultOpenAll) {
    return new Set(listingFacetGroups.map((group) => group.key));
  }
  return new Set(["brand", "mount"]);
}

export function ListingFilters({
  state,
  onChange,
  onClear,
  className,
  defaultOpenAll = false,
  showQuickFilters = false,
  showHeading = true,
  showClear = true,
}: ListingFiltersProps) {
  const reduceMotion = useMotionReduced();
  const [openKeys, setOpenKeys] = useState<Set<string>>(() =>
    initialOpenKeys(defaultOpenAll),
  );

  const hasActive = listingFilterHasActive(state);
  const activeFilterCount = listingFilterActiveCount(state);

  const toggleGroup = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: ACCORDION_DURATION_S, ease: EASE_LUXURY };

  return (
    <div
      className={cn(
        "flex flex-col",
        showQuickFilters ? "gap-6" : "gap-8",
        className,
      )}
    >
      {showQuickFilters ? (
        <ListingQuickFilters state={state} onChange={onChange} />
      ) : null}

      <div className="flex flex-col gap-1">
        {showHeading || (showClear && hasActive) ? (
          <div
            className={cn(
              "mb-2 flex min-h-12 items-center gap-3",
              showHeading ? "justify-between" : "justify-end",
            )}
          >
            {showHeading ? (
              <p className="m-0 font-heading text-base font-medium tracking-tight text-neutral-900 md:text-lg">
                Filtry
                {activeFilterCount > 0 ? (
                  <span className="ms-1 text-neutral-500 tabular-nums">
                    ({activeFilterCount})
                  </span>
                ) : null}
              </p>
            ) : null}
            {showClear ? (
              <Button
                as="button"
                type="button"
                variant="secondary"
                size="sm"
                className={cn("shrink-0", !hasActive && "invisible")}
                onClick={onClear}
                disabled={!hasActive}
                ariaLabel="Wyczyść filtry"
              >
                Wyczyść
              </Button>
            ) : null}
          </div>
        ) : null}
        {listingFacetGroups.map((group) => {
          const open = openKeys.has(group.key);
          const selectedCount = state.facets[group.key].length;
          return (
            <div
              key={group.key}
              className="border-b border-neutral-300 last:border-b-0"
            >
              <button
                type="button"
                className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 py-1 text-start"
                aria-expanded={open}
                onClick={() => toggleGroup(group.key)}
              >
                <span className="font-body text-sm font-medium text-neutral-900">
                  {group.label}
                  <span
                    className={cn(
                      "ms-1 text-neutral-500 tabular-nums",
                      selectedCount === 0 && "invisible",
                    )}
                    aria-hidden={selectedCount === 0}
                  >
                    ({selectedCount || 0})
                  </span>
                </span>
                <i
                  className={cn(
                    "ph text-base leading-none text-neutral-500 transition-transform duration-base ease-luxury",
                    open ? "ph-caret-up" : "ph-caret-down",
                  )}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    key="panel"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={
                      reduceMotion
                        ? { height: 0, opacity: 0 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={panelTransition}
                    className="overflow-hidden"
                  >
                    <ul className="m-0 flex list-none flex-col gap-2.5 pt-1 pb-4 ps-0">
                      {group.options.map((option) => {
                        const checked = state.facets[group.key].includes(
                          option.value,
                        );
                        return (
                          <li key={option.value}>
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() =>
                                onChange(
                                  toggleFacetValue(
                                    state,
                                    group.key,
                                    option.value,
                                  ),
                                )
                              }
                              className="w-full font-body text-sm text-neutral-800"
                              label={option.label}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
