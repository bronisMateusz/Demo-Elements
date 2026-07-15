import type { VariantAxisGroupProps } from "./types";
import { VariantSwatch } from "./VariantSwatch";

export function VariantSwatchGroup({ options, selectedId, axisLabel, onSelect }: VariantAxisGroupProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={axisLabel}>
      {options.map((option) => (
        <VariantSwatch
          key={option.id}
          label={option.label}
          swatch={option.swatch ?? "#e8e4df"}
          selected={selectedId === option.id}
          onClick={() => onSelect(option.id)}
        />
      ))}
    </div>
  );
}
