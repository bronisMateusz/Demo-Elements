import type { Product, RelatedProduct } from "../types/product";

export function productToRelatedProduct(
  product: Pick<Product, "id" | "brand" | "title" | "slug" | "images" | "price" | "badges">,
): RelatedProduct {
  return {
    id: product.id,
    brand: product.brand,
    title: product.title,
    image: product.images[0],
    href: "#",
    price: product.price.current,
    badge: product.badges[0],
    hasStorage: true,
  };
}
