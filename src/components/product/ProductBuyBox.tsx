import { Button } from "../ui/Button";
import { useProductVariants } from "../../hooks/useProductVariants";
import type { Product } from "../../types/product";
import { ProductBadges, ProductPriceBlock } from "./ProductBuyBoxParts";
import { ProductFavoriteButton } from "./ProductFavoriteButton";
import { ProductVariantSelector } from "./ProductVariantSelector";

type ProductBuyBoxProps = {
  product: Pick<
    Product,
    "brand" | "title" | "sku" | "badges" | "variants" | "price" | "cta" | "offerNote"
  >;
};

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  const { selection, resolved, selectOption } = useProductVariants(product.variants);

  const displayTitle = resolved?.title ?? product.title;
  const displaySku = resolved?.sku ?? product.sku;
  const displayPrice = resolved?.price ?? product.price;
  const isAvailable = resolved?.available ?? true;

  return (
    <div className="lg:pt-6">
      <ProductBadges badges={product.badges} />

      <p className="mb-2 font-body text-eyebrow uppercase tracking-wide text-text-muted">
        {product.brand}
      </p>

      <div className="mb-3 flex items-start justify-between gap-4">
        <h1 className="t-h2 min-w-0 flex-1">{displayTitle}</h1>
        <ProductFavoriteButton sku={displaySku} className="mt-1 shrink-0" />
      </div>

      <p className="mb-8 text-small text-text-muted">{displaySku}</p>

      {product.variants ? (
        <ProductVariantSelector
          variants={product.variants}
          selection={selection}
          onSelect={selectOption}
        />
      ) : null}

      {resolved?.availabilityNote ? (
        <p
          className="mb-6 rounded-sm border border-border bg-bg-muted px-4 py-3 text-small text-text-body"
          role="status"
        >
          {resolved.availabilityNote}
        </p>
      ) : null}

      <ProductPriceBlock price={displayPrice} />

      <div className="mt-8 flex flex-col gap-4">
        <Button href={product.cta.href} variant={isAvailable ? "primary" : "secondary"} full>
          {isAvailable
            ? product.cta.label
            : "Zapytaj o dostępność wybranego wariantu"}
        </Button>
      </div>

      {product.offerNote ? (
        <aside className="mt-10 border border-border bg-bg-muted p-6">
          <h2 className="t-h4 mb-2">{product.offerNote.title}</h2>
          <p className="t-body text-small">{product.offerNote.description}</p>
          <Button href={product.cta.href} variant="tertiary" className="mt-4">
            {product.cta.label}
          </Button>
        </aside>
      ) : null}
    </div>
  );
}
