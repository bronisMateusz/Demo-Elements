import { cn } from "./cn";
import type { ProductImage } from "../types/product";

/** Converts focal point (0–100, Drupal convention) to a CSS object-position value. */
export function productImageObjectPosition(image: ProductImage): string | undefined {
  if (!image.focalPoint) return undefined;
  return `${image.focalPoint.x}% ${image.focalPoint.y}%`;
}

/**
 * Gallery object-fit classes.
 * Lifestyle (`fit: "cover"`) fills the frame on mobile; packshots stay contained.
 */
export function productImageFitClassName(image: ProductImage): string {
  if (image.fit === "cover") {
    return cn("object-cover object-center md:object-contain");
  }
  return "object-contain";
}
