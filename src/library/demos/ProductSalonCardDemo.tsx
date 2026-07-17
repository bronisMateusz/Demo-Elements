import { useEffect } from "react";
import { ProductSalonCard } from "../../components/product/ProductSalonCard";
import { salonOptions } from "../../data/nav";
import { getStoredSalonId, useSelectedSalon } from "../../hooks/useSelectedSalon";

const salonCardDefaultProps = {
  eyebrow: "Obejrzyj na żywo",
  description: "Wybierz najbliższy salon Elements i umów się na prezentację.",
  href: "#salony",
  label: "Wybierz swój salon",
} as const;

/** Temporarily seeds / clears selected salon for library previews; restores previous on unmount. */
function useLibrarySalonSeed(salonId: string | null) {
  const { select, clear } = useSelectedSalon();

  useEffect(() => {
    const previous = getStoredSalonId();

    if (salonId) select(salonId);
    else clear();

    return () => {
      if (previous) select(previous);
      else clear();
    };
  }, [salonId, select, clear]);
}

export function ProductSalonCardEmptyDemo() {
  useLibrarySalonSeed(null);
  return <ProductSalonCard {...salonCardDefaultProps} />;
}

export function ProductSalonCardSelectedDemo() {
  useLibrarySalonSeed(salonOptions[0]?.id ?? null);
  return <ProductSalonCard {...salonCardDefaultProps} />;
}
