import { Container } from "../ui/Container";
import type { Product } from "../../types/product";
import { ProductBuyBox } from "./ProductBuyBox";
import { ProductGallery } from "./ProductGallery";

type ProductHeroProps = {
  product: Pick<
    Product,
    | "id"
    | "images"
    | "brand"
    | "title"
    | "sku"
    | "badges"
    | "variants"
    | "price"
    | "cta"
    | "salonCard"
    | "seriesTitle"
    | "seriesProducts"
  >;
  onAskOpen?: () => void;
};

export function ProductHero({ product, onAskOpen }: ProductHeroProps) {
  return (
    <section
      className="pb-[var(--spacing-section-sm)] md:pb-[var(--spacing-section)]"
      aria-label="Prezentacja produktu"
    >
      <Container>
        {/* Tablet+: gallery + buy box side by side so the first viewport shows more than media. */}
        <div className="grid gap-4 md:grid-cols-2 md:items-start md:gap-8 lg:gap-0">
          {/* Mobile: full-bleed gallery edge-to-edge; tablet+ stays in the grid column. */}
          <div className="min-w-0 max-md:-mx-gutter md:sticky md:top-header-h md:h-[calc(100svh-var(--spacing-header-h))]">
            <ProductGallery images={product.images} layout="viewport" />
          </div>

          <div className="min-w-0 md:pt-6 lg:pt-10">
            <div className="w-full md:sticky md:top-[calc(var(--spacing-header-h)+1.5rem)] lg:top-[calc(var(--spacing-header-h)+2.5rem)] lg:mx-auto lg:w-5/6 lg:max-w-[650px]">
              <ProductBuyBox product={product} onAskOpen={onAskOpen} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
