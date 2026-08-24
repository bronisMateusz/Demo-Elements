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
  >;
  onAskOpen?: () => void;
};

export function ProductHero({ product, onAskOpen }: ProductHeroProps) {
  return (
    <section
      className="pb-4 md:pb-6"
      aria-label="Prezentacja produktu"
    >
      <Container size="wide" className="overflow-visible">
        {/* Tablet stacks like mobile; desktop (lg+) is two sticky columns.
            lg–xl: narrower buy column; shared column gap from lg (same rhythm as xl). */}
        <div className="grid gap-4 overflow-visible lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:grid-cols-2 xl:gap-x-12">
          {/* Stack (mobile + tablet): full-bleed gallery; lg+: sticky column. */}
          <div className="min-w-0 max-lg:-mx-[clamp(0.75rem,2.222vw,2.5rem)] lg:sticky lg:top-(--site-header-bar-height,7.25rem) lg:h-[calc(100svh-var(--site-header-bar-height,7.25rem))] lg:overflow-x-clip xl:top-29 xl:h-[calc(100svh-7.25rem)]">
            <ProductGallery images={product.images} layout="viewport" />
          </div>

          <div className="min-w-0 overflow-visible lg:pt-10">
            <div className="w-full overflow-visible lg:sticky lg:top-39 xl:max-w-162.5">
              <ProductBuyBox product={product} onAskOpen={onAskOpen} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
