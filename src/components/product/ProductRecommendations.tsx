import type { RelatedProduct } from "../../types/product";
import { ProductBleedCarouselSection } from "./ProductBleedCarouselSection";

type ProductRecommendationsProps = {
  similarProducts: RelatedProduct[];
};

export function ProductRecommendations({
  similarProducts,
}: ProductRecommendationsProps) {
  return (
    <ProductBleedCarouselSection
      title="Produkty podobne"
      titleId="similar-title"
      products={similarProducts}
    />
  );
}
