import type { ProductImage } from "../../types/product";
import { PromoSplitCta } from "../structural/PromoSplitCta";

type ProductArchitectCTAProps = {
  title: string;
  description: string;
  href: string;
  label: string;
  eyebrow?: string;
  image: ProductImage;
  video?: string;
};

export function ProductArchitectCTA({
  title,
  description,
  href,
  label,
  eyebrow = "Strefa architekta",
  image,
  video,
}: ProductArchitectCTAProps) {
  return (
    <PromoSplitCta
      titleId="architect-cta-title"
      eyebrow={eyebrow}
      title={title}
      description={description}
      image={image}
      video={video}
      titleIconClass="ph ph-cube"
      primary={{ href, label }}
    />
  );
}
