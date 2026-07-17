import { cn } from "../../../lib/cn";
import type { VariantChipProps } from "./types";

export function VariantChip({ label, selected, unavailable, onClick }: VariantChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={unavailable}
      aria-pressed={selected}
      className={cn(
        "variant-chip relative z-10 inline-flex min-h-11 min-w-[4.5rem] items-center justify-center rounded-xs border-0 bg-transparent px-4 py-2 text-sm font-medium leading-none",
        "transition-[color,opacity] duration-base ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
        selected ? "text-neutral-0" : "text-neutral-900",
        unavailable && "pointer-events-none cursor-not-allowed opacity-45",
      )}
    >
      {label}
    </button>
  );
}
