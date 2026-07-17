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
    <section className="pb-[var(--spacing-section-sm)] md:pb-[var(--spacing-section)]" aria-label="Prezentacja produktu">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-0">
          <div className="min-w-0 lg:sticky lg:top-header-h lg:h-[calc(100svh-var(--spacing-header-h))]">
            <ProductGallery images={product.images} layout="viewport" />
          </div>

          <div className="min-w-0 lg:pt-10">
            <div className="w-full lg:sticky lg:top-[calc(var(--spacing-header-h)+2.5rem)] lg:mx-auto lg:w-5/6 lg:max-w-[650px]">
              <ProductBuyBox product={product} onAskOpen={onAskOpen} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
