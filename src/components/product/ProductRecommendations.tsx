import type { RelatedProduct } from "../../types/product";
import { cn } from "../../lib/cn";
import { BrandMotif } from "../brand/BrandMotif";
import { productCarouselBleedWrapperClassName } from "./productCarouselClassName";
import { ProductCarousel } from "./ProductCarousel";

type ProductRecommendationsProps = {
  similarProducts: RelatedProduct[];
};

export function ProductRecommendations({ similarProducts }: ProductRecommendationsProps) {
  return (
    <section aria-labelledby="similar-title" className="relative overflow-x-clip">
      <BrandMotif
        name="dots-grid"
        className="absolute top-0 inset-e-[max(0,calc((100%-96rem)/2))] h-40 w-10 opacity-30 max-md:hidden md:h-52 md:w-12"
      />

      <div className={cn(productCarouselBleedWrapperClassName, "relative z-10")}>
        <ProductCarousel
          products={similarProducts}
          labelledBy="similar-title"
          layout="bleed"
          navPlacement="header"
          header={{ title: "Produkty podobne", titleId: "similar-title" }}
        />
      </div>
    </section>
  );
}
