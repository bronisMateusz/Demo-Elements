import type { RelatedProduct } from "../../types/product";
import { cn } from "../../lib/cn";
import { BrandMotif } from "../brand/BrandMotif";
import { productCarouselBleedWrapperClassName } from "./productCarouselClassName";
import { ProductCarousel } from "./ProductCarousel";

type ProductBleedCarouselSectionProps = {
  title: string;
  titleId: string;
  products: RelatedProduct[];
};

/** Full-bleed product carousel section (pair-with / similar). */
export function ProductBleedCarouselSection({
  title,
  titleId,
  products,
}: ProductBleedCarouselSectionProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby={titleId} className="relative overflow-x-clip">
      <BrandMotif
        name="dots-grid"
        className={cn(
          "pointer-events-none absolute top-0 hidden h-52 w-12 opacity-30",
          "inset-s-[max(0px,calc((100%-96rem)/2-3rem))] min-[110rem]:block",
        )}
      />

      <div
        className={cn(productCarouselBleedWrapperClassName, "relative z-10")}
      >
        <ProductCarousel
          products={products}
          labelledBy={titleId}
          layout="bleed"
          navPlacement="footer"
          header={{ title, titleId }}
        />
      </div>
    </section>
  );
}
