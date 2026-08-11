import { listingQuickFilters } from "../../data/listing";
import { cn } from "../../lib/cn";
import { toggleQuickFilter } from "../../lib/listingFilters";
import type { ListingFilterState } from "../../types/listing";
import { badgeClassName } from "../ui/badgeClassName";

type ListingQuickFiltersProps = {
  state: ListingFilterState;
  onChange: (next: ListingFilterState) => void;
  className?: string;
  /** Show the “Pokaż tylko:” label (toolbar uses it; drawer may omit). */
  showLabel?: boolean;
};

export function ListingQuickFilters({
  state,
  onChange,
  className,
  showLabel = true,
}: ListingQuickFiltersProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}
    >
      {showLabel ? (
        <p className="m-0 font-body text-sm font-medium text-neutral-900">
          Pokaż tylko:
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {listingQuickFilters.map((item) => {
          const active = state.quick.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              className={cn(
                badgeClassName({ variant: item.variant, size: "md" }),
                "min-h-9 cursor-pointer gap-1.5 px-2.5",
                "transition-[opacity,box-shadow,filter] duration-fast ease-out",
                "hover:brightness-95",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
                active
                  ? "ring-2 ring-neutral-900 ring-offset-2"
                  : "opacity-55 hover:opacity-100",
              )}
              onClick={() => onChange(toggleQuickFilter(state, item.id))}
            >
              {active ? (
                <i
                  className="ph ph-check text-sm leading-none"
                  aria-hidden="true"
                />
              ) : null}
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
