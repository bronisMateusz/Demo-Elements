import { Container } from "../ui/Container";
import type { Product } from "../../types/product";
import { ProductBuyBox } from "./ProductBuyBox";
import { ProductGallery } from "./ProductGallery";

type ProductHeroProps = {
  product: Pick<
    Product,
    "images" | "brand" | "title" | "sku" | "badges" | "variants" | "price" | "cta" | "offerNote"
  >;
};

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="pb-[var(--spacing-section-sm)] md:pb-[var(--spacing-section)]" aria-label="Prezentacja produktu">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-16 xl:gap-20">
          <div className="min-w-0 lg:sticky lg:top-[var(--header-h)] lg:h-[calc(100svh-var(--header-h))]">
            <ProductGallery images={product.images} layout="viewport" />
          </div>
          <div className="min-w-0">
            <ProductBuyBox product={product} />
          </div>
        </div>
      </Container>
    </section>
  );
}
