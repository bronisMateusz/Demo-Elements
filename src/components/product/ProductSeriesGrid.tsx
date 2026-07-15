import { Container } from "../ui/Container";
import type { RelatedProduct } from "../../types/product";
import { productCarouselBleedWrapperClassName } from "./productCarouselClassName";
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
            className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-wide text-neutral-600 no-underline transition-colors hover:text-neutral-900"
          >
            {linkLabel}
            <i className="ph ph-arrow-right text-sm" aria-hidden="true" />
          </a>
        </div>
      </Container>

      <div className={productCarouselBleedWrapperClassName}>
        <ProductCarousel
          products={products}
          labelledBy="series-title"
          layout="bleed"
        />
      </div>
    </div>
  );
}
