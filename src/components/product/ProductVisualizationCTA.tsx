import { SplitMediaCta } from "../structural/SplitMediaCta";
import { Button } from "../ui/Button";
import type { ProductImage } from "../../types/product";

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
    <SplitMediaCta
      titleId="viz-cta-title"
      eyebrow={eyebrow}
      title={title}
      description={description}
      note={note}
      image={image}
      actions={
        <>
          <Button
            href={href}
            variant="primary"
            size="lg"
            className="w-full max-w-full px-5 whitespace-normal sm:w-auto sm:px-10 sm:whitespace-nowrap"
          >
            {label}
            <i className="ph ph-arrow-right" aria-hidden="true" />
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              variant="secondary"
              size="lg"
              className="w-full max-w-full px-5 whitespace-normal sm:w-auto sm:px-10 sm:whitespace-nowrap"
            >
              {secondary.label}
            </Button>
          ) : null}
        </>
      }
    />
  );
}
