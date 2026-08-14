import { LayoutGroup, motion } from "motion/react";
import { useId } from "react";
import { cn } from "../../lib/cn";
import { MotionFieldGroup } from "../motion/MotionFieldGroup";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";
import { inputClassName } from "../ui/inputClassName";

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
   * Mobile UX for long lists. `select` shows a native dropdown below md;
   * `chips` keeps the chip row (use for short toggles like Województwa/Miasta).
   * Defaults to `select` when there are more than 4 chips.
   */
  mobileAs?: "select" | "chips";
  /** Stretch chips to fill the row on small screens (equal cells). */
  stretchOnMobile?: boolean;
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
  size = "md",
}: {
  chips: readonly SalonLocationChip[];
  activeId: string;
  onSelect: (id: string) => void;
  isTablist: boolean;
  selectedLayoutId: string;
  stretchOnMobile?: boolean;
  size?: "md" | "lg";
}) {
  const isLg = size === "lg";

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
                  onClick={() => onSelect(chip.id)}
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

/**
 * Location filter chips styled like PDP variant chips.
 * Long lists use a native select on mobile for clearer scanning.
 */
export function SalonLocationChips({
  chips,
  activeId,
  onSelect,
  ariaLabel,
  role = "group",
  mobileAs,
  stretchOnMobile = false,
  size = "md",
  className,
}: SalonLocationChipsProps) {
  const selectedLayoutId = useId();
  const isTablist = role === "tablist";
  const useMobileSelect =
    (mobileAs ?? (chips.length > 4 ? "select" : "chips")) === "select";

  return (
    <div
      className={cn(
        "min-w-0",
        stretchOnMobile && "w-full sm:w-auto",
        className,
      )}
    >
      {useMobileSelect ? (
        <div className="relative md:hidden">
          <select
            className={cn(inputClassName, "appearance-none pe-11")}
            aria-label={ariaLabel}
            value={activeId}
            onChange={(event) => onSelect(event.target.value)}
          >
            {chips.map((chip) => (
              <option key={chip.id} value={chip.id}>
                {chip.label}
              </option>
            ))}
          </select>
          <i
            className="ph ph-caret-down pointer-events-none absolute inset-e-4 top-1/2 -translate-y-1/2 text-base leading-none text-neutral-600"
            aria-hidden="true"
          />
        </div>
      ) : null}

      <div
        role={role}
        aria-label={ariaLabel}
        className={cn(useMobileSelect && "hidden md:block")}
      >
        <ChipRow
          chips={chips}
          activeId={activeId}
          onSelect={onSelect}
          isTablist={isTablist}
          selectedLayoutId={selectedLayoutId}
          stretchOnMobile={stretchOnMobile}
          size={size}
        />
      </div>
    </div>
  );
}
