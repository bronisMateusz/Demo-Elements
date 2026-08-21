import { useProductVariants } from "../../hooks/useProductVariants";
import { cn } from "../../lib/cn";
import type { Product } from "../../types/product";
import { ProductBadges, ProductPriceBlock } from "./ProductBuyBoxParts";
import { ProductFavoriteButton } from "./ProductFavoriteButton";
import { ProductVariantSelector } from "./variant-selector";

type ProductBuyBoxProps = {
  product: Pick<
    Product,
    | "id"
    | "brand"
    | "title"
    | "collection"
    | "sku"
    | "badges"
    | "variants"
    | "price"
    | "cta"
  >;
  onAskOpen?: () => void;
};

export function ProductBuyBox({ product, onAskOpen }: ProductBuyBoxProps) {
  const { selection, resolved, selectOption } = useProductVariants(
    product.variants,
  );

  const displayTitle = resolved?.title ?? product.title;
  const displaySku = resolved?.sku ?? product.sku;
  const displayPrice = resolved?.price ?? product.price;
  const isAvailable = resolved?.available ?? true;
  const askLead = isAvailable
    ? (product.cta.lead ?? product.cta.label)
    : "Wybrany wariant jest niedostępny.";
  const askAction = isAvailable
    ? (product.cta.actionLabel ?? product.cta.label)
    : "Zapytaj o dostępność";

  return (
    <div className="overflow-x-visible">
      <ProductBadges
        brand={product.brand}
        badges={product.badges}
        price={displayPrice}
      />

      <div className="mb-3 flex items-start justify-between gap-4">
        <h1 className="t-h2 min-w-0 flex-1">{displayTitle}</h1>
        <ProductFavoriteButton
          sku={product.id}
          variant="bordered"
          showTooltip
          className="mt-1 shrink-0"
        />
      </div>

      <div className="mb-5 lg:mb-6">
        {product.collection ? (
          <p className="m-0 text-sm text-neutral-500">
            Kolekcja:{" "}
            <a
              href={product.collection.href}
              aria-label={`Kolekcja ${product.collection.name}`}
              className={cn(
                "underline decoration-neutral-500 decoration-1 underline-offset-[0.18em]",
                "transition-[color,text-decoration-color] duration-fast ease-out",
                "hover:text-gold-500 hover:decoration-gold-500",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
              )}
            >
              {product.collection.name}
            </a>
          </p>
        ) : null}
        <p
          className={cn(
            "m-0 text-sm text-neutral-500",
            product.collection && "mt-3",
          )}
        >
          {displaySku}
        </p>
      </div>

      {product.variants ? (
        <ProductVariantSelector
          variants={product.variants}
          selection={selection}
          onSelect={selectOption}
        />
      ) : null}

      {resolved?.availabilityNote ? (
        <p
          className="mb-6 rounded-xs border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600"
          role="status"
        >
          {resolved.availabilityNote}
        </p>
      ) : null}

      <ProductPriceBlock
        price={displayPrice}
        askCta={{
          href: product.cta.href,
          lead: askLead,
          actionLabel: askAction,
          secondaryLabel: product.cta.secondaryLabel,
          secondaryHref: product.cta.secondaryHref,
          onAskOpen,
        }}
      />
    </div>
  );
}
