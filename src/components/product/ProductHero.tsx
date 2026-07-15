import { Container } from "../ui/Container";
import type { Product } from "../../types/product";
import { ProductBuyBox } from "./ProductBuyBox";
import { ProductGallery } from "./ProductGallery";

type ProductHeroProps = {
  product: Pick<Product, "images" | "brand" | "title" | "sku" | "badges" | "price" | "cta" | "offerNote">;
};

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="pb-[var(--spacing-section-sm)] pt-4 md:pb-[var(--spacing-section)]" aria-label="Prezentacja produktu">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 xl:gap-20">
          <ProductGallery images={product.images} />
          <ProductBuyBox product={product} />
        </div>
      </Container>
    </section>
  );
}
