import type { ProductVariantAxis } from "../../../types/product";
import { VariantChipGroup } from "./VariantChipGroup";
import { VariantSwatchGroup } from "./VariantSwatchGroup";
import { VariantThumbnailGroup } from "./VariantThumbnailGroup";

type VariantAxisFieldProps = {
  axis: ProductVariantAxis;
  selection: Record<string, string>;
  onSelect: (axisId: string, optionId: string) => void;
  labelId: string;
};

export function VariantAxisField({ axis, selection, onSelect, labelId }: VariantAxisFieldProps) {
  const selectedOption = axis.options.find((option) => option.id === selection[axis.id]);
  const groupProps = {
    options: axis.options,
    selectedId: selection[axis.id],
    axisLabel: axis.label,
    onSelect: (optionId: string) => onSelect(axis.id, optionId),
  };

  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className="mb-2 block text-sm text-neutral-900 md:mb-3">
        <span className="text-neutral-600">{axis.label}:</span>{" "}
        {selectedOption ? <span>{selectedOption.label}</span> : null}
      </p>

      {axis.type === "chip" ? <VariantChipGroup {...groupProps} /> : null}
      {axis.type === "thumbnail" ? <VariantThumbnailGroup {...groupProps} /> : null}
      {axis.type === "swatch" ? <VariantSwatchGroup {...groupProps} /> : null}

      {selectedOption?.unavailableNote ? (
        <p className="mt-2 text-sm text-neutral-500">{selectedOption.unavailableNote}</p>
      ) : null}
    </div>
  );
}
