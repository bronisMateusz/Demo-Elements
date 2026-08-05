import { Container } from "../ui/Container";
import type { Product } from "../../types/product";
import { ProductBuyBox } from "./ProductBuyBox";
import { ProductGallery } from "./ProductGallery";
import { ProductGalleryBanner } from "./ProductGalleryBanner";

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
    | "galleryBanner"
  >;
  onAskOpen?: () => void;
};

export function ProductHero({ product, onAskOpen }: ProductHeroProps) {
  const banner = product.galleryBanner;

  return (
    <section
      className="pb-[clamp(2rem,5vw,3rem)] md:pb-[clamp(2.5rem,6vw,4rem)]"
      aria-label="Prezentacja produktu"
    >
      <Container size="wide" className="overflow-visible">
        {/* Tablet stacks like mobile; desktop (lg+) is two sticky columns.
            lg–xl: narrower buy column; shared column gap from lg (same rhythm as xl). */}
        <div className="grid gap-4 overflow-visible lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:grid-cols-2 xl:gap-x-12">
          {/* Stack (mobile + tablet): full-bleed gallery; lg+: sticky column.
              Optional banner shares sticky viewport height so it stays under the carousel. */}
          <div className="flex min-w-0 flex-col gap-3 lg:sticky lg:top-29 lg:h-[calc(100svh-7.25rem)] lg:overflow-x-clip">
            <div className="min-w-0 max-lg:-mx-[clamp(1.25rem,2.222vw,2.5rem)] lg:min-h-0 lg:flex-1">
              <ProductGallery images={product.images} layout="viewport" />
            </div>
            {banner ? (
              <ProductGalleryBanner
                className="hidden shrink-0 lg:flex"
                eyebrow={banner.eyebrow}
                title={banner.title}
                description={banner.description}
                href={banner.href}
                label={banner.label}
                image={banner.image}
              />
            ) : null}
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
