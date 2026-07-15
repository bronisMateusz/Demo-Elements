import { cn } from "../../lib/cn";
import type { RelatedProduct } from "../../types/product";
import { ProductCarouselCard } from "./ProductCarouselCard";

type ProductCardProps = {
  product: RelatedProduct;
  className?: string;
  layout?: "default" | "carousel";
  compact?: boolean;
};

export function ProductCard({ product, className, layout = "default", compact = false }: ProductCardProps) {
  if (layout === "carousel") {
    return <ProductCarouselCard product={product} className={className} compact={compact} />;
  }

  return (
    <article className={cn("group", className)}>
      <a href={product.href} className="block no-underline">
        <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-neutral-50">
          <img
            src={product.image.src}
            alt={product.image.alt || product.title}
            className="h-full w-full object-cover transition-transform duration-slow ease-luxury group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <p className="mb-1 font-body text-xs uppercase tracking-wide text-neutral-500">
          {product.brand}
        </p>
        <h3 className="t-h4 mb-3 text-neutral-900 transition-colors group-hover:text-gold-500">
          {product.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-ui text-neutral-600 transition-colors group-hover:text-neutral-900">
          {product.hasStorage ? "+ Schowek " : null}
          Zobacz
          <i className="ph ph-arrow-right text-sm" aria-hidden="true" />
        </span>
      </a>
    </article>
  );
}
