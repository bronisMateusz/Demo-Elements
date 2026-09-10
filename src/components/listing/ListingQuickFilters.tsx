import { listingQuickFilters } from "../../data/listing";
import { cn } from "../../lib/cn";
import { toggleQuickFilter } from "../../lib/listingFilters";
import type { ListingFilterState } from "../../types/listing";
import { MotionFieldGroup } from "../motion/MotionFieldGroup";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";

type ListingQuickFiltersProps = {
  state: ListingFilterState;
  onChange: (next: ListingFilterState) => void;
  className?: string;
  /** Show the “Pokaż tylko:” label (toolbar uses it; drawer may omit). */
  showLabel?: boolean;
  /**
   * `toolbar` - compact inline chips.
   * `drawer` - equal 2×2 cells that fill the drawer width.
   */
  layout?: "toolbar" | "drawer";
};

export function ListingQuickFilters({
  state,
  onChange,
  className,
  showLabel = true,
  layout = "toolbar",
}: ListingQuickFiltersProps) {
  const isDrawer = layout === "drawer";

  return (
    <div
      className={cn(
        "flex max-w-full flex-wrap items-center gap-x-3 gap-y-2",
        isDrawer && "w-full flex-col items-stretch gap-3",
        className,
      )}
    >
      {showLabel ? (
        <p className="m-0 shrink-0 font-body text-sm font-medium text-neutral-900">
          Pokaż tylko:
        </p>
      ) : null}
      <div
        role="group"
        aria-label="Pokaż tylko"
        className={cn(
          "min-w-0",
          // @container needs an explicit width - drawer body gives it.
          isDrawer && "@container w-full",
        )}
      >
        <MotionFieldGroup>
          <SharedLayoutBg
            className={cn(
              "inline-flex flex-wrap gap-1",
              isDrawer && "flex w-full",
            )}
            pillClassName="rounded-xs bg-neutral-300"
            inset={0}
          >
            {listingQuickFilters.map((item) => {
              const active = state.quick.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "group relative shrink-0 rounded-xs bg-neutral-0",
                    isDrawer &&
                      "min-w-[calc(50%-0.125rem)] flex-1 @min-[24rem]:min-w-[calc(25%-0.1875rem)]",
                    // Border as overlay so SharedLayoutBg pill cannot cover it.
                    "after:pointer-events-none after:absolute after:inset-0 after:z-20 after:rounded-xs after:border after:transition-[border-color] after:duration-base after:ease-out",
                    active
                      ? "after:border-transparent"
                      : "after:border-neutral-800 hover:after:border-neutral-900",
                  )}
                >
                  {active ? (
                    <span
                      className="absolute inset-0 z-1 rounded-xs bg-neutral-900"
                      aria-hidden="true"
                    />
                  ) : null}
                  <button
                    type="button"
                    aria-pressed={active}
                    className={cn(
                      "relative z-10 inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-xs border-0 bg-transparent px-3 py-2 font-body text-sm font-medium leading-none",
                      isDrawer && "w-full",
                      "transition-[color] duration-base ease-out",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
                      active ? "text-neutral-0" : "text-neutral-900",
                    )}
                    onClick={() => onChange(toggleQuickFilter(state, item.id))}
                  >
                    {item.label}
                  </button>
                </div>
              );
            })}
          </SharedLayoutBg>
        </MotionFieldGroup>
      </div>
    </div>
  );
}
