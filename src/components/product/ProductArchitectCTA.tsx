import { SplitMediaCta } from "../structural/SplitMediaCta";
import { Button } from "../ui/Button";
import type { ProductImage } from "../../types/product";

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
    <SplitMediaCta
      titleId="architect-cta-title"
      eyebrow={eyebrow}
      title={title}
      description={description}
      image={image}
      video={video}
      titleIconClass="ph ph-cube"
      actions={
        <Button
          href={href}
          variant="primary"
          size="lg"
          className="w-full max-w-full px-5 whitespace-normal sm:w-auto sm:px-10 sm:whitespace-nowrap"
        >
          {label}
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </Button>
      }
    />
  );
}
