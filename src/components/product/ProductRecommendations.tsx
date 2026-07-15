import { useState } from "react";
import { Container } from "../ui/Container";
import type { RelatedProduct } from "../../types/product";
import { useRecentlyViewedProducts } from "../../hooks/useRecentlyViewedProducts";
import { productCarouselBleedWrapperClassName } from "./productCarouselClassName";
import { ProductCarousel } from "./ProductCarousel";
import {
  ProductCarouselTabsHeader,
  type ProductCarouselTab,
} from "./ProductCarouselTabsHeader";

type ProductRecommendationsProps = {
  similarProducts: RelatedProduct[];
  recentlyViewedProducts?: RelatedProduct[];
  currentProductId: string;
};

export function ProductRecommendations({
  similarProducts,
  recentlyViewedProducts = [],
  currentProductId,
}: ProductRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<ProductCarouselTab>("similar");
  const recentProducts = useRecentlyViewedProducts(currentProductId, recentlyViewedProducts);
  const showRecentTab = recentProducts.length > 0;
  const activeProducts = activeTab === "similar" ? similarProducts : recentProducts;
  const labelledBy = activeTab === "similar" ? "similar-title" : "recent-title";

  return (
    <section aria-labelledby={labelledBy}>
      <Container>
        <ProductCarouselTabsHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showRecentTab={showRecentTab}
        />
      </Container>
      <div
        className={productCarouselBleedWrapperClassName}
        role="tabpanel"
        aria-labelledby={labelledBy}
      >
        <ProductCarousel
          key={activeTab}
          products={activeProducts}
          labelledBy={labelledBy}
          layout="bleed"
        />
      </div>
    </section>
  );
}
