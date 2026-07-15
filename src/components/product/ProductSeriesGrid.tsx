import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { RelatedProduct } from "../../types/product";
import { ProductCard } from "./ProductCard";

type ProductSeriesGridProps = {
  title: string;
  products: RelatedProduct[];
};

export function ProductSeriesGrid({ title, products }: ProductSeriesGridProps) {
  return (
    <section aria-labelledby="series-title">
      <Container>
        <SectionHeader title={title} titleId="series-title" />
        <div className="flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-[min(72vw,240px)] shrink-0 md:w-auto"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
