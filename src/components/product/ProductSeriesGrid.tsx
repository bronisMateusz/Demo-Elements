import { Container } from "../ui/Container";
import type { RelatedProduct } from "../../types/product";
import { ProductCarousel } from "./ProductCarousel";

type ProductSeriesGridProps = {
  title: string;
  products: RelatedProduct[];
  linkHref?: string;
  linkLabel?: string;
};

export function ProductSeriesGrid({
  title,
  products,
  linkHref = "#",
  linkLabel = "Zobacz całą serię",
}: ProductSeriesGridProps) {
  return (
    <div aria-labelledby="series-title">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 md:mb-10">
          <h2 className="t-h2" id="series-title">
            {title}
          </h2>
          <a
            href={linkHref}
            className="inline-flex items-center gap-2 font-body text-eyebrow uppercase tracking-wide text-text-body no-underline transition-colors hover:text-text"
          >
            {linkLabel}
            <i className="ph ph-arrow-right text-sm" aria-hidden="true" />
          </a>
        </div>
      </Container>

      <div className="product-carousel-bleed">
        <ProductCarousel products={products} labelledBy="series-title" bleed={false} />
      </div>
    </div>
  );
}
