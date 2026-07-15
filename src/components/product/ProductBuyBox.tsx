import { useProductVariants } from "../../hooks/useProductVariants";
import type { Product } from "../../types/product";
import { ProductBadges, ProductPriceBlock } from "./ProductBuyBoxParts";
import { ProductFavoriteButton } from "./ProductFavoriteButton";
import { ProductPairWith } from "./ProductPairWith";
import { ProductSalonCard } from "./ProductSalonCard";
import { ProductVariantSelector } from "./variant-selector";

type ProductBuyBoxProps = {
  product: Pick<
    Product,
    "brand" | "title" | "sku" | "badges" | "variants" | "price" | "cta" | "salonCard" | "seriesTitle" | "seriesProducts"
  >;
};

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  const { selection, resolved, selectOption } = useProductVariants(product.variants);

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
    <div className="lg:pt-6">
      <ProductBadges badges={product.badges} />

      <p className="mb-2 font-body text-xs uppercase tracking-wide text-neutral-500">
        {product.brand}
      </p>

      <div className="mb-3 flex items-start justify-between gap-4">
        <h1 className="t-h2 min-w-0 flex-1">{displayTitle}</h1>
        <ProductFavoriteButton sku={displaySku} className="mt-1 shrink-0" />
      </div>

      <p className="mb-8 text-sm text-neutral-500">{displaySku}</p>

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
        }}
      />

      <ProductPairWith title={product.seriesTitle} products={product.seriesProducts} />

      {product.salonCard ? (
        <ProductSalonCard className="mt-10" {...product.salonCard} />
      ) : null}
    </div>
  );
}
