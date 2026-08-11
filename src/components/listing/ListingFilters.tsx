import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { listingFacetGroups } from "../../data/listing";
import { cn } from "../../lib/cn";
import { readHeaderOffsetPx } from "../../lib/layoutTokens";
import { EASE_LUXURY } from "../../lib/motionEase";
import {
  listingFilterHasActive,
  toggleFacetValue,
} from "../../lib/listingFilters";
import type { ListingFilterState } from "../../types/listing";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { Checkbox } from "../motion/Checkbox";
import { Button } from "../ui/Button";
import { ListingQuickFilters } from "./ListingQuickFilters";

/** Slow accordion open/close (scroll collapse + manual toggle). */
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
  /**
   * Collapse open accordions while the sticky column is stuck; restore them
   * when the column returns to its natural (top) position.
   */
  collapseOnScroll?: boolean;
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
  collapseOnScroll = false,
}: ListingFiltersProps) {
  const reduceMotion = useMotionReduced();
  const rootRef = useRef<HTMLDivElement>(null);
  const [openKeys, setOpenKeys] = useState<Set<string>>(() =>
    initialOpenKeys(defaultOpenAll),
  );
  const openKeysRef = useRef(openKeys);
  const pinnedKeysRef = useRef<Set<string>>(initialOpenKeys(defaultOpenAll));
  const collapsedByScrollRef = useRef(false);

  useEffect(() => {
    openKeysRef.current = openKeys;
  }, [openKeys]);

  useEffect(() => {
    if (!collapseOnScroll) return;

    const sync = () => {
      const el = rootRef.current;
      if (!el) return;

      // Matches stickyUnderHeaderClassName / readHeaderOffsetPx().
      const stickyTop = readHeaderOffsetPx();
      const isStuck = el.getBoundingClientRect().top <= stickyTop + 1;

      if (isStuck && !collapsedByScrollRef.current) {
        pinnedKeysRef.current = new Set(openKeysRef.current);
        collapsedByScrollRef.current = true;
        setOpenKeys(new Set());
        return;
      }

      if (!isStuck && collapsedByScrollRef.current) {
        collapsedByScrollRef.current = false;
        setOpenKeys(new Set(pinnedKeysRef.current));
      }
    };

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    const headerClassObserver = new MutationObserver(sync);
    headerClassObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    sync();

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      headerClassObserver.disconnect();
    };
  }, [collapseOnScroll]);

  const hasActive = listingFilterHasActive(state);

  const toggleGroup = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      // Remember user intent only while not force-collapsed by scroll.
      if (!collapsedByScrollRef.current) {
        pinnedKeysRef.current = next;
      }
      return next;
    });
  };

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: ACCORDION_DURATION_S, ease: EASE_LUXURY };

  return (
    <div ref={rootRef} className={cn("flex flex-col gap-8", className)}>
      {showQuickFilters ? (
        <ListingQuickFilters state={state} onChange={onChange} />
      ) : null}

      <div className="flex flex-col gap-1">
        <div className="mb-2 flex min-h-12 items-center justify-between gap-3">
          <p className="m-0 font-heading text-base font-medium tracking-tight text-neutral-900 md:text-lg">
            Filtry
          </p>
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
        </div>
        {listingFacetGroups.map((group) => {
          const open = openKeys.has(group.key);
          const selectedCount = state.facets[group.key].length;
          return (
            <div
              key={group.key}
              className="border-b border-neutral-200 last:border-b-0"
            >
              <button
                type="button"
                className={cn(
                  "flex min-h-12 w-full items-center justify-between gap-3 py-3 text-start",
                  "font-body text-sm font-medium text-neutral-900",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
                )}
                aria-expanded={open}
                onClick={() => toggleGroup(group.key)}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate">{group.label}</span>
                  <span
                    className={cn(
                      "min-w-6 shrink-0 text-neutral-500 tabular-nums",
                      selectedCount === 0 && "invisible",
                    )}
                    aria-hidden={selectedCount === 0}
                  >
                    ({selectedCount || 0})
                  </span>
                </span>
                <i
                  className={cn(
                    "ph shrink-0 text-base leading-none text-neutral-600 transition-transform duration-slow ease-luxury",
                    open ? "ph-caret-up" : "ph-caret-down",
                  )}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    key={`${group.key}-panel`}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={panelTransition}
                    className="overflow-hidden"
                  >
                    <ul className="m-0 flex list-none flex-col gap-2.5 pb-4 ps-0">
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
