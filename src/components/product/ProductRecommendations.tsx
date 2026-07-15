import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { RelatedProduct } from "../../types/product";
import { ProductCarousel } from "./ProductCarousel";

type ProductRecommendationsProps = {
  title?: string;
  products: RelatedProduct[];
};

export function ProductRecommendations({
  title = "Produkty podobne",
  products,
}: ProductRecommendationsProps) {
  return (
    <section aria-labelledby="similar-title">
      <Container>
        <SectionHeader title={title} titleId="similar-title" />
      </Container>
      <div className="product-carousel-bleed">
        <ProductCarousel products={products} labelledBy="similar-title" bleed={false} />
      </div>
    </section>
  );
}
