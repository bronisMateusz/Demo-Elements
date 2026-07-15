import { Badge } from "../ui/Badge";
import type { ProductBadge, ProductPrice } from "../../types/product";

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
};

export function ProductPriceBlock({ price }: ProductPriceBlockProps) {
  return (
    <div className="border-y border-border py-6">
      {price.note ? (
        <p className="mb-2 font-body text-eyebrow uppercase tracking-wide text-gold">{price.note}</p>
      ) : null}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="font-heading text-[clamp(28px,3vw,36px)] text-text">{price.current}</p>
        {price.discount ? (
          <span className="text-small text-gold">{price.discount}</span>
        ) : null}
      </div>
      {price.previous ? (
        <p className="mt-1 text-small text-text-muted">
          Cena przed obniżką{" "}
          <span className="line-through">{price.previous}</span>
        </p>
      ) : null}
      {price.legalNote ? (
        <p className="mt-4 text-small leading-relaxed text-text-muted">{price.legalNote}</p>
      ) : null}
    </div>
  );
}
