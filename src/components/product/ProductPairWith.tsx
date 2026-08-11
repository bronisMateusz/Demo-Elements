import type { RelatedProduct } from "../../types/product";
import { ProductBleedCarouselSection } from "./ProductBleedCarouselSection";

type ProductPairWithProps = {
  title: string;
  products: RelatedProduct[];
};

/** Series / "pair with" carousel - full-width PDP section above product info. */
export function ProductPairWith({ title, products }: ProductPairWithProps) {
  return (
    <ProductBleedCarouselSection
      title={title}
      titleId="pair-with-title"
      products={products}
    />
  );
}
