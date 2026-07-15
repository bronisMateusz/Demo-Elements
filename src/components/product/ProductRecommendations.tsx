import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { RelatedProduct } from "../../types/product";
import { productCarouselBleedWrapperClassName } from "./productCarouselClassName";
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
      <div className={productCarouselBleedWrapperClassName}>
        <ProductCarousel products={products} labelledBy="similar-title" layout="bleed" />
      </div>
    </section>
  );
}
