import { useCallback, useState, type MouseEvent } from "react";
import { cn } from "../../lib/cn";
import { useProductFavorites } from "../../hooks/useProductFavorites";
import type { RelatedProduct } from "../../types/product";

type ProductCarouselCardProps = {
  product: RelatedProduct;
  className?: string;
};

export function ProductCarouselCard({ product, className }: ProductCarouselCardProps) {
  const images = product.images?.length ? product.images : [product.image];
  const [cartAdded, setCartAdded] = useState(false);
  const { isFavorite, toggle } = useProductFavorites(product.id);

  const toggleFavorite = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      toggle();
    },
    [toggle],
  );

  const handleQuickAdd = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setCartAdded(true);
    window.setTimeout(() => setCartAdded(false), 2000);
  }, []);

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
      className={cn("product-card product-card--carousel group/card relative flex h-full flex-col", className)}
    >
      <a
        href={product.href}
        className="product-card__overlay-link"
        aria-label={`Przejdź do: ${product.title}`}
      >
        <span className="sr-only">Przejdź do: {product.title}</span>
      </a>

      <div
        className={cn(
          "product-card__media relative aspect-square shrink-0 overflow-hidden bg-bg-product-card",
          images.length > 1 && "product-card__media--multi",
        )}
      >
        {images.map((image, index) => (
          <img
            key={`${product.id}-${index}`}
            src={image.src}
            alt={image.alt || product.title}
            className="product-card__image product-card__image-layer absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ))}

        {product.badge ? (
          <span className="product-card__badge absolute left-3 top-3 z-[2]">{product.badge.label}</span>
        ) : null}

        <button
          type="button"
          className={cn(
            "product-card__wishlist absolute right-3 top-3 z-[2]",
            isFavorite && "product-card__wishlist--active",
          )}
          aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          aria-pressed={isFavorite}
          onClick={toggleFavorite}
        >
          <i className={cn("ph", isFavorite ? "ph-heart-fill" : "ph-heart")} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={cn(
            "product-card__quick-add",
            cartAdded && "product-card__quick-add--added",
          )}
          aria-live="polite"
          onClick={handleQuickAdd}
        >
          {cartAdded ? (
            <>
              <i className="ph ph-check" aria-hidden="true" />
              Dodano do koszyka
            </>
          ) : (
            <>
              <i className="ph ph-shopping-bag" aria-hidden="true" />
              Dodaj do koszyka
            </>
          )}
        </button>
      </div>

      <div className="product-card__body flex flex-1 flex-col px-4 pb-5 pt-4">
        <h3 className="m-0 font-heading text-[18px] leading-[1.35] text-text">{product.title}</h3>

        {product.subtitle ? (
          <p className="mt-1.5 mb-0 font-body text-small text-text-muted">{product.subtitle}</p>
        ) : null}

        {product.price ? (
          <p className="mt-2 mb-0 font-body text-ui text-text">{product.price}</p>
        ) : null}

        {product.swatch || variantMeta ? (
          <div className="mt-auto flex items-center gap-2.5 pt-4">
            {product.swatch ? (
              <img
                src={product.swatch.src}
                alt={product.swatch.alt || "Próbka koloru"}
                className="h-6 w-6 shrink-0 border border-border object-cover"
                loading="lazy"
              />
            ) : null}
            {variantMeta ? (
              <span className="font-body text-small text-text-muted">{variantMeta}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
