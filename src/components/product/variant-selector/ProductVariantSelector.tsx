import type { ProductVariants } from "../../../types/product";
import { VariantAxisField } from "./VariantAxisField";

type ProductVariantSelectorProps = {
  variants: ProductVariants;
  selection: Record<string, string>;
  onSelect: (axisId: string, optionId: string) => void;
};

export function ProductVariantSelector({
  variants,
  selection,
  onSelect,
}: ProductVariantSelectorProps) {
  return (
    <div className="mb-6 flex flex-col gap-5 lg:mb-6 lg:gap-6">
      {variants.axes.map((axis) => (
        <VariantAxisField
          key={axis.id}
          axis={axis}
          selection={selection}
          onSelect={onSelect}
          labelId={`variant-axis-${axis.id}`}
        />
      ))}
    </div>
  );
}
