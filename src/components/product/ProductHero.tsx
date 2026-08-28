import { Container } from "../ui/Container";
import type { Product } from "../../types/product";
import { usePdpHeroGalleryHeight } from "../../hooks/usePdpHeroGalleryHeight";
import { ProductBuyBox } from "./ProductBuyBox";
import { ProductGallery } from "./ProductGallery";
import { productGalleryStickyShellClassName } from "./productGalleryClassName";
import { cn } from "../../lib/cn";
import { sectionMarginBottomClassName } from "../../lib/layoutTokens";

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
  const { buyColumnRef, buyContentRef, galleryMaxHeightPx } =
    usePdpHeroGalleryHeight();

  return (
    <section
      aria-label="Prezentacja produktu"
      className={sectionMarginBottomClassName}
    >
      <Container size="content" className="overflow-visible">
        {/* Tablet stacks like mobile; desktop (lg+) is two sticky columns.
            lg–xl: narrower buy column; shared column gap from lg (same rhythm as xl). */}
        <div className="grid gap-4 overflow-visible lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:grid-cols-2 xl:gap-x-12">
          {/* Stack (mobile + tablet): full-bleed gallery; lg+: sticky column. */}
          <div
            className={cn(
              "min-w-0 max-lg:mx-[-clamp(0.75rem,2.222vw,2.5rem)]",
              productGalleryStickyShellClassName,
            )}
            style={
              galleryMaxHeightPx != null
                ? {
                    height: galleryMaxHeightPx,
                    maxHeight: galleryMaxHeightPx,
                  }
                : undefined
            }
          >
            <ProductGallery images={product.images} layout="viewport" />
          </div>

          <div
            ref={buyColumnRef}
            className="min-w-0 overflow-visible lg:self-start"
          >
            <div
              ref={buyContentRef}
              className="w-full overflow-visible lg:sticky lg:top-39"
            >
              <ProductBuyBox product={product} onAskOpen={onAskOpen} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
