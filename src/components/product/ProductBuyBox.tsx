import { Button } from "../ui/Button";
import type { Product } from "../../types/product";
import { ProductBadges, ProductPriceBlock } from "./ProductBuyBoxParts";

type ProductBuyBoxProps = {
  product: Pick<
    Product,
    "brand" | "title" | "sku" | "badges" | "price" | "cta" | "offerNote"
  >;
};

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
      <ProductBadges badges={product.badges} />

      <p className="mb-2 font-body text-eyebrow uppercase tracking-wide text-text-muted">
        {product.brand}
      </p>

      <h1 className="t-h2 mb-3">{product.title}</h1>

      <p className="mb-8 text-small text-text-muted">{product.sku}</p>

      <ProductPriceBlock price={product.price} />

      <div className="mt-8 flex flex-col gap-4">
        <Button href={product.cta.href} variant="primary" full>
          {product.cta.label}
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
