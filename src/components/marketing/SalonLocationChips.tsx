import { LayoutGroup, motion } from "motion/react";
import { useId } from "react";
import { cn } from "../../lib/cn";
import { SPRING_LAYOUT } from "../../lib/motionEase";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { MotionFieldGroup } from "../motion/MotionFieldGroup";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import { HorizontalScrollTrack } from "../ui/HorizontalScrollTrack";

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
   * `scroll` - underline subnav scroller. `chips` - bordered pill toggle.
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
  const reduce = useMotionReduced();

  if (!scroll) {
    return (
      <LayoutGroup id={`salon-location-chips-${selectedLayoutId}`}>
        <MotionFieldGroup>
          <SharedLayoutBg
            className={cn(
              "inline-flex flex-wrap gap-1",
              stretchOnMobile && "flex w-full sm:inline-flex sm:w-auto",
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
                    stretchOnMobile && "min-w-0 flex-1 sm:flex-none",
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
                      stretchOnMobile && "w-full sm:w-auto",
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
        </MotionFieldGroup>
      </LayoutGroup>
    );
  }

  const row = (
    <SharedLayoutUnderline
      className="w-max flex-nowrap justify-start gap-0"
      lineClassName="h-0.5 bg-neutral-900/45"
      insetX={12}
      bottom={0}
    >
      {chips.map((chip) => {
        const active = chip.id === activeId;

        return (
          <button
            key={chip.id}
            type="button"
            role={isTablist ? "tab" : undefined}
            aria-selected={isTablist ? active : undefined}
            aria-pressed={isTablist ? undefined : active}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border-0 bg-transparent font-body leading-none",
              "min-h-11 px-3 py-2 text-sm md:min-h-14.5 md:px-4 md:py-3 md:text-ui",
              "transition-colors duration-fast ease-out hover:text-neutral-900",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
              active ? "text-neutral-900" : "text-neutral-600",
            )}
            onClick={(event) => {
              onSelect(chip.id);
              if (event.detail > 0) event.currentTarget.blur();
            }}
          >
            {active ? (
              <motion.span
                layoutId={selectedLayoutId}
                className="pointer-events-none absolute inset-x-3 bottom-0 z-20 h-0.5 bg-neutral-900 md:inset-x-4"
                transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                aria-hidden="true"
              />
            ) : null}
            {chip.label}
          </button>
        );
      })}
    </SharedLayoutUnderline>
  );

  return (
    <LayoutGroup id={`salon-location-chips-${selectedLayoutId}`}>
      <MotionFieldGroup>
        <HorizontalScrollTrack
          className={scrollInsetClassName}
          activeKey={activeId}
        >
          {row}
        </HorizontalScrollTrack>
      </MotionFieldGroup>
    </LayoutGroup>
  );
}

/**
 * Location filters: bordered pills (`chips`) or underline subnav scroller (`scroll`).
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
