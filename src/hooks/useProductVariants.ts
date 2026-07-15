import { useMemo, useState } from "react";
import type { ProductPrice, ProductVariants } from "../types/product";

export type ResolvedProductVariant = {
  selection: Record<string, string>;
  sku: string;
  title: string;
  price: ProductPrice;
  available: boolean;
  availabilityNote?: string;
  isExactMatch: boolean;
};

function findExactCombination(
  variants: ProductVariants,
  selection: Record<string, string>,
) {
  return variants.combinations.find((combination) =>
    variants.axes.every(
      (axis) => combination.selection[axis.id] === selection[axis.id],
    ),
  );
}

function findFallbackCombination(
  variants: ProductVariants,
  selection: Record<string, string>,
  changedAxisId: string,
) {
  const changedValue = selection[changedAxisId];
  return (
    variants.combinations.find(
      (combination) =>
        combination.selection[changedAxisId] === changedValue &&
        combination.available !== false,
    ) ??
    variants.combinations.find(
      (combination) => combination.selection[changedAxisId] === changedValue,
    ) ??
    null
  );
}

export function resolveProductVariant(
  variants: ProductVariants,
  selection: Record<string, string>,
): ResolvedProductVariant {
  const exact = findExactCombination(variants, selection);

  if (exact) {
    return {
      selection: { ...exact.selection },
      sku: exact.sku,
      title: exact.title,
      price: exact.price,
      available: exact.available !== false,
      availabilityNote: exact.availabilityNote,
      isExactMatch: true,
    };
  }

  const partial = variants.combinations.find((combination) =>
    variants.axes.every(
      (axis) =>
        !selection[axis.id] ||
        combination.selection[axis.id] === selection[axis.id],
    ),
  );

  const fallback = partial ?? variants.combinations[0];

  return {
    selection: { ...fallback.selection },
    sku: fallback.sku,
    title: fallback.title,
    price: fallback.price,
    available: false,
    availabilityNote: "Wybrana konfiguracja jest chwilowo niedostępna. Poniżej najbliższy dostępny wariant.",
    isExactMatch: false,
  };
}

export function useProductVariants(variants: ProductVariants | undefined) {
  const [selection, setSelection] = useState<Record<string, string>>(
    () => variants?.defaultSelection ?? {},
  );

  const resolved = useMemo(
    () => (variants ? resolveProductVariant(variants, selection) : null),
    [variants, selection],
  );

  const selectOption = (axisId: string, optionId: string) => {
    if (!variants) return;

    const axis = variants.axes.find((entry) => entry.id === axisId);
    const option = axis?.options.find((entry) => entry.id === optionId);
    if (!option || option.unavailable) return;

    const nextSelection = { ...selection, [axisId]: optionId };
    const exact = findExactCombination(variants, nextSelection);

    if (exact) {
      setSelection(exact.selection);
      return;
    }

    const fallback = findFallbackCombination(variants, nextSelection, axisId);
    if (fallback) {
      setSelection(fallback.selection);
      return;
    }

    setSelection(nextSelection);
  };

  return {
    selection,
    resolved,
    selectOption,
  };
}
