import { cn } from "../../lib/cn";
import { Badge } from "../ui/Badge";
import type { RelatedProduct } from "../../types/product";
import { ProductFavoriteButton } from "./ProductFavoriteButton";

type ProductCarouselCardProps = {
  product: RelatedProduct;
  className?: string;
  compact?: boolean;
};

export function ProductCarouselCard({
  product,
  className,
  compact = false,
}: ProductCarouselCardProps) {
  const images = product.images?.length ? product.images : [product.image];
  const hasMultipleImages = images.length > 1;

  return (
    <article
      className={cn(
        "group/card relative flex h-full cursor-pointer flex-col bg-neutral-0",
        className,
      )}
    >
      <a
        href={product.href}
        className="absolute inset-0 z-1 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800"
        aria-label={`Przejdź do: ${product.title}`}
      >
        <span className="sr-only">Przejdź do: {product.title}</span>
      </a>

      <div className="relative aspect-square shrink-0 overflow-hidden bg-product-stage">
        {/* Scale a GPU layer, not the <img> - avoids paint jank on object-cover images. */}
        <div
          className={cn(
            "absolute inset-0 origin-center transform-gpu backface-hidden",
            "transition-transform duration-500 ease-out",
            "motion-reduce:transition-none",
            "group-hover/card:scale-[1.07] group-focus-within/card:scale-[1.07]",
            "motion-reduce:group-hover/card:scale-100 motion-reduce:group-focus-within/card:scale-100",
          )}
        >
          {images.map((image, index) => {
            const isPrimary = index === 0;
            const isHoverImage = index === 1;

            return (
              <img
                key={`${product.id}-${index}`}
                src={image.src}
                alt={image.alt || product.title}
                className={cn(
                  "absolute inset-0 size-full object-cover",
                  hasMultipleImages &&
                    "transition-opacity duration-500 ease-out motion-reduce:transition-none",
                  isPrimary &&
                    cn(
                      "z-1 opacity-100",
                      hasMultipleImages &&
                        "group-hover/card:opacity-0 group-focus-within/card:opacity-0",
                    ),
                  isHoverImage &&
                    cn(
                      "z-0 opacity-0",
                      "group-hover/card:opacity-100 group-focus-within/card:opacity-100",
                    ),
                  !isPrimary && !isHoverImage && "hidden",
                )}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            );
          })}
        </div>

        {product.badge ? (
          <Badge
            variant={product.badge.variant ?? "default"}
            className="absolute inset-s-3 top-3 z-2"
          >
            {product.badge.label}
          </Badge>
        ) : null}

        <ProductFavoriteButton
          sku={product.id}
          stopPropagation
          variant="elevated"
          className="absolute inset-e-3 top-3 z-2"
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col pt-4",
          compact ? "px-3 pb-4" : "px-4 pb-5",
        )}
      >
        <h3
          className={cn(
            "m-0 font-heading text-neutral-900",
            compact
              ? "text-sm leading-[1.4]"
              : "text-base leading-[1.35] md:text-lg",
          )}
        >
          {product.title}
        </h3>

        {product.subtitle ? (
          <p className="mt-1.5 mb-0 font-body text-sm text-neutral-600">
            {product.subtitle}
          </p>
        ) : null}

        {product.price ? (
          <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p
              className={cn(
                "mb-0 font-body text-ui tabular-nums",
                product.pricePrevious ? "text-promo" : "text-neutral-900",
              )}
            >
              {product.price}
            </p>
            {product.pricePrevious ? (
              <p className="mb-0 font-body text-sm tabular-nums text-neutral-600 line-through decoration-neutral-400">
                {product.pricePrevious}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
