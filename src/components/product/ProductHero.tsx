import { Container } from "../ui/Container";
import type { Product } from "../../types/product";
import { ProductBuyBox } from "./ProductBuyBox";
import { ProductGallery } from "./ProductGallery";

type ProductHeroProps = {
  product: Pick<
    Product,
    | "id"
    | "images"
    | "brand"
    | "title"
    | "sku"
    | "badges"
    | "variants"
    | "price"
    | "cta"
    | "salonCard"
    | "seriesTitle"
    | "seriesProducts"
  >;
  onAskOpen?: () => void;
};

export function ProductHero({ product, onAskOpen }: ProductHeroProps) {
  return (
    <section
      className="pb-[var(--spacing-section-sm)] md:pb-[var(--spacing-section)]"
      aria-label="Prezentacja produktu"
    >
      <Container size="wide" className="overflow-visible">
        {/* Tablet stacks like mobile; desktop (lg+) is two sticky columns.
            lg–xl: narrower buy column; shared column gap from lg (same rhythm as xl). */}
        <div className="grid gap-4 overflow-visible lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:grid-cols-2 xl:gap-x-12">
          {/* Stack (mobile + tablet): full-bleed gallery; lg+: sticky column. */}
          <div className="min-w-0 max-lg:-mx-gutter lg:sticky lg:top-header-h lg:h-[calc(100svh-var(--spacing-header-h))] lg:overflow-x-clip">
            <ProductGallery images={product.images} layout="viewport" />
          </div>

          <div className="min-w-0 overflow-visible lg:pt-10">
            <div className="w-full overflow-visible lg:sticky lg:top-[calc(var(--spacing-header-h)+2.5rem)] xl:max-w-[650px]">
              <ProductBuyBox product={product} onAskOpen={onAskOpen} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
