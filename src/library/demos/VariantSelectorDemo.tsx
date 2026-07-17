import { useState } from "react";
import { montebiancoVariants } from "../../data/products/montebianco-80";
import {
  ProductVariantSelector,
  VariantChipGroup,
  VariantThumbnailGroup,
} from "../../components/product/variant-selector";

const chipAxis = montebiancoVariants.axes.find((axis) => axis.type === "chip")!;
const thumbnailAxis = montebiancoVariants.axes.find((axis) => axis.type === "thumbnail")!;

function useAxisSelection(defaultId: string) {
  const [selectedId, setSelectedId] = useState(defaultId);
  return { selectedId, onSelect: setSelectedId };
}

export function VariantChipGroupDemo() {
  const { selectedId, onSelect } = useAxisSelection("80");

  return (
    <VariantChipGroup
      options={chipAxis.options}
      selectedId={selectedId}
      axisLabel={chipAxis.label}
      onSelect={onSelect}
    />
  );
}

export function VariantThumbnailGroupDemo() {
  const { selectedId, onSelect } = useAxisSelection("white-mat");

  return (
    <VariantThumbnailGroup
      options={thumbnailAxis.options}
      selectedId={selectedId}
      axisLabel={thumbnailAxis.label}
      onSelect={onSelect}
    />
  );
}

export function ProductVariantSelectorDemo() {
  const [selection, setSelection] = useState(montebiancoVariants.defaultSelection);

  return (
    <ProductVariantSelector
      variants={montebiancoVariants}
      selection={selection}
      onSelect={(axisId, optionId) =>
        setSelection((current) => ({ ...current, [axisId]: optionId }))
      }
    />
  );
}
