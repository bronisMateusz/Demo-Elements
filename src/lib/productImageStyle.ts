import type { ProductImage } from "../types/product";

/** Converts focal point (0–100, Drupal convention) to a CSS object-position value. */
export function productImageObjectPosition(image: ProductImage): string | undefined {
  if (!image.focalPoint) return undefined;
  return `${image.focalPoint.x}% ${image.focalPoint.y}%`;
}
