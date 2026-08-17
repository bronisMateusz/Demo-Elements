import { useState } from "react";
import { montebiancoVariants } from "../../data/products/montebianco-80";
import {
  VariantChipGroup,
  VariantThumbnailGroup,
} from "../../components/product/variant-selector";

const chipAxis = montebiancoVariants.axes.find((axis) => axis.type === "chip")!;
const thumbnailAxis = montebiancoVariants.axes.find(
  (axis) => axis.type === "thumbnail",
)!;

function useAxisSelection(defaultId: string) {
  const [selectedId, setSelectedId] = useState(defaultId);
  return { selectedId, onSelect: setSelectedId };
}

export function VariantChipGroupDemo() {
  const { selectedId, onSelect } = useAxisSelection("80");
  const selected = chipAxis.options.find((option) => option.id === selectedId);

  return (
    <div>
      <p className="mb-2 block text-sm text-neutral-900">
        <span className="text-neutral-600">{chipAxis.label}:</span>{" "}
        {selected ? <span>{selected.label}</span> : null}
      </p>
      <VariantChipGroup
        options={chipAxis.options}
        selectedId={selectedId}
        axisLabel={chipAxis.label}
        onSelect={onSelect}
      />
    </div>
  );
}

export function VariantThumbnailGroupDemo() {
  const { selectedId, onSelect } = useAxisSelection("white-mat");
  const selected = thumbnailAxis.options.find(
    (option) => option.id === selectedId,
  );

  return (
    <div>
      <p className="mb-2 block text-sm text-neutral-900">
        <span className="text-neutral-600">{thumbnailAxis.label}:</span>{" "}
        {selected ? <span>{selected.label}</span> : null}
      </p>
      <VariantThumbnailGroup
        options={thumbnailAxis.options}
        selectedId={selectedId}
        axisLabel={thumbnailAxis.label}
        onSelect={onSelect}
      />
    </div>
  );
}
