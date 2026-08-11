import { cn } from "../../lib/cn";
import { Badge } from "../ui/Badge";
import type { RelatedProduct } from "../../types/product";
import { ProductCardPrice } from "./ProductCardPrice";
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
  const image = product.images?.[0] ?? product.image;
  const isCover = image.fit === "cover";
  const badges = product.badges?.length
    ? product.badges
    : product.badge
      ? [product.badge]
      : [];

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

      <div className="relative aspect-square shrink-0 overflow-hidden bg-neutral-0">
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
          <img
            src={image.src}
            alt={image.alt || product.title}
            className={cn(
              "absolute inset-0 size-full",
              isCover ? "object-cover" : "object-contain p-4",
            )}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        {badges.length > 0 ? (
          <div className="absolute inset-s-3 top-3 z-2 flex max-w-[calc(100%-4.5rem)] flex-wrap gap-1">
            {badges.map((badge) => (
              <Badge
                key={`${badge.label}-${badge.variant ?? "default"}`}
                variant={badge.variant ?? "default"}
                href={badge.href}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
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
            "m-0 line-clamp-2 font-heading text-neutral-900",
            compact
              ? "min-h-[2.8em] text-sm leading-[1.4]"
              : "min-h-[2.7em] text-base leading-[1.35] md:text-lg",
          )}
        >
          {product.title}
        </h3>

        {product.subtitle ? (
          <p className="mt-1.5 mb-0 line-clamp-1 font-body text-sm text-neutral-600">
            {product.subtitle}
          </p>
        ) : null}

        {product.price ? (
          <ProductCardPrice
            price={product.price}
            pricePrevious={product.pricePrevious}
            className="mt-auto pt-3"
          />
        ) : null}
      </div>
    </article>
  );
}
