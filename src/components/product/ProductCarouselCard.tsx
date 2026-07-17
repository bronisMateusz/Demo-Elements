import { cn } from "../../lib/cn";
import { Badge } from "../ui/Badge";
import type { RelatedProduct } from "../../types/product";
import { ProductFavoriteButton } from "./ProductFavoriteButton";

type ProductCarouselCardProps = {
  product: RelatedProduct;
  className?: string;
  compact?: boolean;
};

export function ProductCarouselCard({ product, className, compact = false }: ProductCarouselCardProps) {
  const images = product.images?.length ? product.images : [product.image];
  const hasMultipleImages = images.length > 1;

  const variantMeta = [
    product.colorCount ? `+${product.colorCount} kolory` : null,
    product.sizeCount
      ? `+${product.sizeCount} ${product.sizeCount === 1 ? "rozmiar" : "rozmiary"}`
      : null,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <article
      className={cn("group/card relative flex h-full cursor-pointer flex-col bg-neutral-0", className)}
    >
      <a
        href={product.href}
        className="absolute inset-0 z-[1] no-underline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800"
        aria-label={`Przejdź do: ${product.title}`}
      >
        <span className="sr-only">Przejdź do: {product.title}</span>
      </a>

      <div className="relative aspect-square shrink-0 overflow-hidden bg-[#eef1f4]">
        {images.map((image, index) => {
          const isPrimary = index === 0;
          const isHoverImage = index === 1;
          const imageMotion = cn(
            "origin-center",
            "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            "motion-reduce:transition-none",
          );

          return (
            <img
              key={`${product.id}-${index}`}
              src={image.src}
              alt={image.alt || product.title}
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                imageMotion,
                isPrimary &&
                  cn(
                    "z-[1] opacity-100",
                    hasMultipleImages &&
                      "group-hover/card:opacity-0 group-focus-within/card:opacity-0",
                  ),
                isHoverImage &&
                  cn(
                    // Use transform (not Tailwind scale-*) so opacity+scale animate together.
                    "z-0 opacity-0 [transform:scale(1.2)]",
                    "group-hover/card:opacity-100 group-hover/card:[transform:scale(1)]",
                    "group-focus-within/card:opacity-100 group-focus-within/card:[transform:scale(1)]",
                    "motion-reduce:[transform:scale(1)]",
                  ),
                !isPrimary && !isHoverImage && "hidden",
              )}
              loading="lazy"
            />
          );
        })}

        {product.badge && product.badge.variant !== "brand" ? (
          <Badge
            variant={product.badge.variant ?? "default"}
            size="sm"
            className="absolute left-3 top-3 z-[2]"
          >
            {product.badge.label}
          </Badge>
        ) : null}

        <ProductFavoriteButton
          sku={product.id}
          stopPropagation
          variant="elevated"
          className="absolute right-3 top-3 z-[2]"
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
            compact ? "text-sm leading-compact" : "text-[18px] leading-[1.35]",
          )}
        >
          {product.title}
        </h3>

        {product.subtitle ? (
          <p className="mt-1.5 mb-0 font-body text-sm text-neutral-500">{product.subtitle}</p>
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
              <p className="mb-0 font-body text-sm tabular-nums text-neutral-500 line-through decoration-neutral-400">
                {product.pricePrevious}
              </p>
            ) : null}
          </div>
        ) : null}

        {product.swatch || variantMeta ? (
          <div className="mt-auto flex items-center gap-2.5 pt-4">
            {product.swatch ? (
              <img
                src={product.swatch.src}
                alt={product.swatch.alt || "Próbka koloru"}
                className="h-6 w-6 shrink-0 bg-transparent object-contain"
                loading="lazy"
              />
            ) : null}
            {variantMeta ? (
              <span className="font-body text-sm text-neutral-500">{variantMeta}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
