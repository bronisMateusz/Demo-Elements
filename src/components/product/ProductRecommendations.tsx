import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { RelatedProduct } from "../../types/product";
import { ProductCard } from "./ProductCard";

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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
