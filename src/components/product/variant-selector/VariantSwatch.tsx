import { cn } from "../../../lib/cn";
import type { VariantSwatchProps } from "./types";

export function VariantSwatch({ label, swatch, selected, onClick }: VariantSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full border transition-[box-shadow,transform] duration-fast ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
        selected
          ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2 ring-offset-neutral-0"
          : "border-neutral-300 hover:scale-[1.03]",
      )}
    >
      <span
        className="block size-8 rounded-full border border-black/10"
        style={{ backgroundColor: swatch }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
