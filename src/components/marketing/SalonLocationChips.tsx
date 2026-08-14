import { LayoutGroup, motion } from "motion/react";
import { useId } from "react";
import { cn } from "../../lib/cn";
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
  className?: string;
};

/**
 * Location filter chips styled like PDP variant chips
 * (SharedLayoutBg hover + dark selected fill).
 */
export function SalonLocationChips({
  chips,
  activeId,
  onSelect,
  ariaLabel,
  role = "group",
  className,
}: SalonLocationChipsProps) {
  const selectedLayoutId = useId();
  const isTablist = role === "tablist";

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={cn("min-w-0", className)}
    >
      <LayoutGroup id={`salon-location-chips-${selectedLayoutId}`}>
        <MotionFieldGroup>
          <SharedLayoutBg
            className="inline-flex flex-wrap gap-1"
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
                      "relative z-10 inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-xs border-0 bg-transparent px-3 py-2 font-body text-sm font-medium leading-none",
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
    </div>
  );
}
