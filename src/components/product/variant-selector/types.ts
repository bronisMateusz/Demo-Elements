import type { ProductImage, ProductVariantAxis } from "../../../types/product";

export type VariantAxisGroupProps = {
  options: ProductVariantAxis["options"];
  selectedId: string;
  axisLabel: string;
  onSelect: (optionId: string) => void;
};

export type VariantChipProps = {
  label: string;
  selected: boolean;
  unavailable?: boolean;
  onClick: () => void;
};

export type VariantThumbnailProps = {
  label: string;
  image: ProductImage;
  selected: boolean;
  unavailable?: boolean;
  onClick: () => void;
};

export type VariantSwatchProps = {
  label: string;
  swatch: string;
  selected: boolean;
  onClick: () => void;
};
