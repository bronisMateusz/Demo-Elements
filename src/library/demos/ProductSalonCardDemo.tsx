import { ProductSalonCard } from "../../components/product/ProductSalonCard";
import { salonOptions } from "../../data/nav";

const salonCardDefaultProps = {
  eyebrow: "Obejrzyj na żywo",
  description: "Wybierz najbliższy salon Elements i umów się na prezentację.",
  href: "#salony",
  label: "Wybierz swój salon",
} as const;

/** Empty CTA - previewSalon freezes state so both library variants can coexist. */
export function ProductSalonCardEmptyDemo() {
  return (
    <ProductSalonCard
      {...salonCardDefaultProps}
      id="salonCard-empty"
      previewSalon={null}
    />
  );
}

export function ProductSalonCardSelectedDemo() {
  return (
    <ProductSalonCard
      {...salonCardDefaultProps}
      id="salonCard-selected"
      previewSalon={salonOptions[0] ?? null}
    />
  );
}
