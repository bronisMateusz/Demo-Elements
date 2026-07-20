import type { RelatedProduct } from "../../types/product";
import { ProductCarousel } from "./ProductCarousel";

type ProductPairWithProps = {
  title: string;
  products: RelatedProduct[];
};

/** "Pair it with" carousel in the buy box column (OKA). */
export function ProductPairWith({ title, products }: ProductPairWithProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-10 overflow-x-visible pt-10 lg:pt-0" aria-labelledby="pair-with-title">
      <ProductCarousel
        products={products}
        labelledBy="pair-with-title"
        layout="inline-bleed"
        header={{ title, titleId: "pair-with-title" }}
      />
    </section>
  );
}
