import { cn } from "../../lib/cn";
import type { RelatedProduct } from "../../types/product";
import { ProductCarouselCard } from "./ProductCarouselCard";

type ProductCardProps = {
  product: RelatedProduct;
  className?: string;
  layout?: "default" | "carousel";
};

export function ProductCard({ product, className, layout = "default" }: ProductCardProps) {
  if (layout === "carousel") {
    return <ProductCarouselCard product={product} className={className} />;
  }

  return (
    <article className={cn("product-card group", className)}>
      <a href={product.href} className="block no-underline">
        <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-bg-muted">
          <img
            src={product.image.src}
            alt={product.image.alt || product.title}
            className="product-card__image h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="mb-1 font-body text-eyebrow uppercase tracking-wide text-text-muted">
          {product.brand}
        </p>
        <h3 className="t-h4 mb-3 text-text transition-colors group-hover:text-gold">
          {product.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-ui text-text-body transition-colors group-hover:text-text">
          {product.hasStorage ? "+ Schowek " : null}
          Zobacz
          <i className="ph ph-arrow-right text-sm" aria-hidden="true" />
        </span>
      </a>
    </article>
  );
}
