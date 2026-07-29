import type { RelatedProduct } from "../../types/product";
import { cn } from "../../lib/cn";
import { BrandMotif } from "../brand/BrandMotif";
import { productCarouselBleedWrapperClassName } from "./productCarouselClassName";
import { ProductCarousel } from "./ProductCarousel";

type ProductRecommendationsProps = {
  similarProducts: RelatedProduct[];
};

export function ProductRecommendations({
  similarProducts,
}: ProductRecommendationsProps) {
  return (
    <section
      aria-labelledby="similar-title"
      className="relative overflow-x-clip"
    >
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
          products={similarProducts}
          labelledBy="similar-title"
          layout="bleed"
          navPlacement="footer"
          header={{ title: "Produkty podobne", titleId: "similar-title" }}
        />
      </div>
    </section>
  );
}
