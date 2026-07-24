import type { RelatedProduct } from "../../types/product";
import { cn } from "../../lib/cn";
import { BrandMotif } from "../brand/BrandMotif";
import { productCarouselBleedWrapperClassName } from "./productCarouselClassName";
import { ProductCarousel } from "./ProductCarousel";

type ProductPairWithProps = {
  title: string;
  products: RelatedProduct[];
};

/** Series / "pair with" carousel — full-width PDP section above product info. */
export function ProductPairWith({ title, products }: ProductPairWithProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="pair-with-title" className="relative overflow-x-clip">
      <BrandMotif
        name="dots-grid"
        className="absolute top-0 inset-e-[max(0,calc((100%-96rem)/2))] h-40 w-10 opacity-30 max-md:hidden md:h-52 md:w-12"
      />

      <div className={cn(productCarouselBleedWrapperClassName, "relative z-10")}>
        <ProductCarousel
          products={products}
          labelledBy="pair-with-title"
          layout="bleed"
          navPlacement="header"
          header={{ title, titleId: "pair-with-title" }}
        />
      </div>
    </section>
  );
}
