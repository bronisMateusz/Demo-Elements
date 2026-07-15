import { Badge } from "../ui/Badge";
import { cn } from "../../lib/cn";
import type { ProductBadge, ProductPrice } from "../../types/product";
import { ProductAskRow } from "./ProductAskRow";

type ProductBadgesProps = {
  badges: ProductBadge[];
};

export function ProductBadges({ badges }: ProductBadgesProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {badges.map((badge) => (
        <Badge key={badge.label} variant={badge.variant ?? "default"}>
          {badge.label}
        </Badge>
      ))}
    </div>
  );
}

type ProductPriceBlockProps = {
  price: ProductPrice;
  askCta?: {
    href: string;
    lead: string;
    actionLabel: string;
  };
};

export function ProductPriceBlock({ price, askCta }: ProductPriceBlockProps) {
  const isPromo = Boolean(price.previous || price.discount);

  return (
    <div className="border-y border-neutral-200 py-6">
      {price.note ? (
        <p className="mb-2 font-body text-xs uppercase tracking-wide text-gold-500">{price.note}</p>
      ) : null}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p
          className={cn(
            "font-heading text-[clamp(28px,3vw,36px)]",
            isPromo ? "text-[#a54840]" : "text-neutral-900",
          )}
        >
          {price.current}
        </p>
        {price.discount ? (
          <span className="text-sm text-gold-500">{price.discount}</span>
        ) : null}
      </div>
      {price.previous ? (
        <p className="mt-1 text-sm text-neutral-500">
          Cena przed obniżką{" "}
          <span className="line-through">{price.previous}</span>
        </p>
      ) : null}
      {price.legalNote ? (
        <p className="mt-4 text-sm leading-relaxed text-neutral-500">{price.legalNote}</p>
      ) : null}
      {askCta ? (
        <ProductAskRow
          className={price.legalNote ? "mt-4" : "mt-6"}
          href={askCta.href}
          lead={askCta.lead}
          actionLabel={askCta.actionLabel}
        />
      ) : null}
    </div>
  );
}
