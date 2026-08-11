import type { ProductImage } from "../../types/product";
import { PromoSplitCta } from "../structural/PromoSplitCta";

type ProductVisualizationCTAProps = {
  title: string;
  description?: string;
  href: string;
  label: string;
  note?: string;
  eyebrow?: string;
  image: ProductImage;
  secondary?: {
    href: string;
    label: string;
  };
};

export function ProductVisualizationCTA({
  title,
  description,
  href,
  label,
  note = "Bezpłatna wizualizacja · Bez zobowiązań",
  eyebrow = "Wizualizacja",
  image,
  secondary,
}: ProductVisualizationCTAProps) {
  return (
    <PromoSplitCta
      titleId="viz-cta-title"
      eyebrow={eyebrow}
      title={title}
      description={description}
      note={note}
      image={image}
      primary={{ href, label }}
      secondary={secondary}
    />
  );
}
