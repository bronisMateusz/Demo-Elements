import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { RelatedProduct } from "../../types/product";
import { productCarouselBleedWrapperClassName } from "./productCarouselClassName";
import { ProductCarousel } from "./ProductCarousel";

type ProductRecommendationsProps = {
  similarProducts: RelatedProduct[];
};

export function ProductRecommendations({ similarProducts }: ProductRecommendationsProps) {
  return (
    <section aria-labelledby="similar-title">
      <Container size="content">
        <SectionHeader title="Produkty podobne" titleId="similar-title" />
      </Container>
      <div className={productCarouselBleedWrapperClassName}>
        <ProductCarousel
          products={similarProducts}
          labelledBy="similar-title"
          layout="bleed"
        />
      </div>
    </section>
  );
}
