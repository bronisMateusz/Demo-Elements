import type { Product, RelatedProduct } from "../types/product";
import { homeInspiration, homeProductTabs } from "./home";
import { listingProducts } from "./listing";
import { montebianco80 } from "./products/montebianco-80";

function relatedFromPdp(product: Product): RelatedProduct {
  const image = product.images[0] ?? {
    src: "",
    alt: product.title,
  };

  return {
    id: product.id,
    brand: product.brand,
    title: product.title,
    href: "/produkt",
    price: product.price.current,
    pricePrevious: product.price.previous,
    badge: product.badges[0],
    badges: product.badges,
    image,
    images: product.images,
  };
}

function indexById(
  items: readonly RelatedProduct[],
): Map<string, RelatedProduct> {
  const byId = new Map<string, RelatedProduct>();
  for (const item of items) {
    if (!byId.has(item.id)) byId.set(item.id, item);
  }
  return byId;
}

/** Every demo product that can be bookmarked - home tabs, listing, PDP, drawers. */
const favoriteProductById = indexById([
  ...listingProducts,
  ...homeProductTabs.flatMap((tab) => tab.products),
  relatedFromPdp(montebianco80),
  ...montebianco80.seriesProducts,
  ...montebianco80.similarProducts,
  ...(montebianco80.recentlyViewedProducts ?? []),
  ...homeInspiration.arrangements.flatMap((item) => item.products ?? []),
]);

export function resolveFavoriteProducts(
  ids: readonly string[],
): RelatedProduct[] {
  return ids.flatMap((id) => {
    const product = favoriteProductById.get(id);
    return product ? [product] : [];
  });
}
