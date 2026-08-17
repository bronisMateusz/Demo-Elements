import { LayoutGroup, motion } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { cn } from "../../lib/cn";
import { isMotionPaused } from "../../lib/a11yPreferences";
import { MotionFieldGroup } from "../motion/MotionFieldGroup";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";

export type SalonLocationChip = {
  id: string;
  label: string;
};

type SalonLocationChipsProps = {
  chips: readonly SalonLocationChip[];
  activeId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
  /** `tablist` for salony-b; `group` for /salony filters. */
  role?: "tablist" | "group";
  /**
   * `scroll` - one-row scroller (producers A-Z). `chips` keeps a wrapping row.
   * `select` is an alias of `scroll`. Defaults to `scroll` when there are
   * more than 4 chips.
   */
  mobileAs?: "select" | "chips" | "scroll";
  /** Stretch chips to fill the row on small screens (equal cells). */
  stretchOnMobile?: boolean;
  /** Padding on the scrolling row so extremes keep a gutter. */
  scrollInsetClassName?: string;
  /** Larger hit area - use for primary toggles (Województwa / Miasta). */
  size?: "md" | "lg";
  className?: string;
};

const scrollerClassName =
  "min-w-0 touch-pan-x overflow-x-auto overscroll-x-contain scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

function ChipRow({
  chips,
  activeId,
  onSelect,
  isTablist,
  selectedLayoutId,
  stretchOnMobile,
  scroll,
  scrollInsetClassName,
  size = "md",
}: {
  chips: readonly SalonLocationChip[];
  activeId: string;
  onSelect: (id: string) => void;
  isTablist: boolean;
  selectedLayoutId: string;
  stretchOnMobile?: boolean;
  scroll?: boolean;
  scrollInsetClassName?: string;
  size?: "md" | "lg";
}) {
  const isLg = size === "lg";
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scroll) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const selected = scroller.querySelector<HTMLElement>(
      '[aria-current="true"]',
    );
    if (!selected) return;

    const scrollerBox = scroller.getBoundingClientRect();
    const selectedBox = selected.getBoundingClientRect();
    const nextLeft =
      scroller.scrollLeft +
      (selectedBox.left + selectedBox.width / 2) -
      (scrollerBox.left + scrollerBox.width / 2);

    scroller.scrollTo({
      left: nextLeft,
      behavior: isMotionPaused() ? "auto" : "smooth",
    });
  }, [activeId, scroll]);

  const row = (
    <SharedLayoutBg
      className={cn(
        scroll
          ? [scrollInsetClassName, "w-max flex-nowrap justify-start gap-1"]
          : [
              "inline-flex flex-wrap gap-1",
              stretchOnMobile && "flex w-full sm:inline-flex sm:w-auto",
            ],
      )}
      pillClassName="rounded-xs bg-neutral-300"
      inset={0}
    >
      {chips.map((chip) => {
        const active = chip.id === activeId;

        return (
          <div
            key={chip.id}
            className={cn(
              "group relative shrink-0 rounded-xs bg-neutral-0",
              stretchOnMobile && !scroll && "min-w-0 flex-1 sm:flex-none",
              "after:pointer-events-none after:absolute after:inset-0 after:z-20 after:rounded-xs after:border after:transition-[border-color] after:duration-base after:ease-out",
              active
                ? "after:border-transparent"
                : "after:border-neutral-800 hover:after:border-neutral-900",
            )}
          >
            {active ? (
              <motion.span
                layoutId={selectedLayoutId}
                className="absolute inset-0 z-1 rounded-xs bg-neutral-900"
                aria-hidden="true"
              />
            ) : null}
            <button
              type="button"
              role={isTablist ? "tab" : undefined}
              aria-selected={isTablist ? active : undefined}
              aria-pressed={isTablist ? undefined : active}
              aria-current={active ? "true" : undefined}
              className={cn(
                "relative z-10 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-xs border-0 bg-transparent font-body font-medium leading-none",
                isLg
                  ? "min-h-12 px-6 py-3 text-ui sm:min-h-12 sm:min-w-40"
                  : "min-h-11 px-3 py-2 text-sm",
                stretchOnMobile && !scroll && "w-full sm:w-auto",
                "transition-[color] duration-base ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
                active ? "text-neutral-0" : "text-neutral-900",
              )}
              onClick={(event) => {
                onSelect(chip.id);
                if (event.detail > 0) event.currentTarget.blur();
              }}
            >
              {chip.label}
            </button>
          </div>
        );
      })}
    </SharedLayoutBg>
  );

  return (
    <LayoutGroup id={`salon-location-chips-${selectedLayoutId}`}>
      <MotionFieldGroup>
        {scroll ? (
          <div ref={scrollerRef} className={scrollerClassName}>
            {row}
          </div>
        ) : (
          row
        )}
      </MotionFieldGroup>
    </LayoutGroup>
  );
}

/**
 * Location filter chips styled like PDP variant chips.
 * Long lists use a horizontal scroller (same pattern as producers A-Z).
 */
export function SalonLocationChips({
  chips,
  activeId,
  onSelect,
  ariaLabel,
  role = "group",
  mobileAs,
  stretchOnMobile = false,
  scrollInsetClassName,
  size = "md",
  className,
}: SalonLocationChipsProps) {
  const selectedLayoutId = useId();
  const isTablist = role === "tablist";
  const layout = mobileAs ?? (chips.length > 4 ? "scroll" : "chips");
  const scroll = layout === "scroll" || layout === "select";

  return (
    <div
      className={cn(
        "min-w-0",
        stretchOnMobile && !scroll && "w-full sm:w-auto",
        className,
      )}
      role={role}
      aria-label={ariaLabel}
    >
      <ChipRow
        chips={chips}
        activeId={activeId}
        onSelect={onSelect}
        isTablist={isTablist}
        selectedLayoutId={selectedLayoutId}
        stretchOnMobile={stretchOnMobile}
        scroll={scroll}
        scrollInsetClassName={scrollInsetClassName}
        size={size}
      />
    </div>
  );
}
