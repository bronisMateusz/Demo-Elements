import { Badge } from "../ui/Badge";
import { cn } from "../../lib/cn";
import type { ProductBadge, ProductPrice } from "../../types/product";
import { ProductAskRow } from "./ProductAskRow";

type ProductBadgesProps = {
  badges: ProductBadge[];
  price?: ProductPrice;
};

const PROMO_BADGE: ProductBadge = { label: "Promocja", variant: "promo" };

function isPromoPrice(price?: ProductPrice) {
  return Boolean(price?.previous || price?.discount);
}

export function ProductBadges({ badges, price }: ProductBadgesProps) {
  const hasPromoBadge = badges.some(
    (badge) => badge.variant === "promo" || badge.label.toLowerCase() === "promocja",
  );
  const displayBadges =
    isPromoPrice(price) && !hasPromoBadge ? [PROMO_BADGE, ...badges] : badges;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {displayBadges.map((badge) => (
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
    <div className="border-t border-neutral-200 pt-8">
      <div className="space-y-5">
        {price.note ? (
          <p className="font-body text-xs font-medium uppercase tracking-wide text-neutral-500">
            {price.note}
          </p>
        ) : null}

        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p
              className={cn(
                "font-heading text-[clamp(32px,3.2vw,40px)] leading-none tracking-tight",
                isPromo ? "text-promo" : "text-neutral-900",
              )}
            >
              {price.current}
            </p>
            {price.discount ? (
              <span className="inline-flex items-center rounded-xs bg-promo px-2.5 py-1 font-body text-xs font-medium tabular-nums leading-none text-neutral-0">
                {price.discount}
              </span>
            ) : null}
          </div>

          {price.previous || price.lowestPrice30Days ? (
            <dl className="mt-3 grid gap-x-6 gap-y-1 font-body text-xs text-neutral-500 sm:grid-cols-2">
              {price.previous ? (
                <div>
                  <dt className="sr-only">Cena przed obniżką</dt>
                  <dd>
                    Cena przed obniżką{" "}
                    <span className="tabular-nums line-through decoration-neutral-400">
                      {price.previous}
                    </span>
                  </dd>
                </div>
              ) : null}
              {price.lowestPrice30Days ? (
                <div>
                  <dt className="sr-only">Najniższa cena z ostatnich 30 dni przed obniżką</dt>
                  <dd>
                    Najniższa cena z ostatnich 30 dni przed obniżką{" "}
                    <span className="tabular-nums font-medium text-neutral-700">
                      {price.lowestPrice30Days}
                    </span>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>

        {price.legalNote ? (
          <p className="max-w-[52ch] font-body text-xs leading-relaxed text-neutral-500">
            {price.legalNote}
          </p>
        ) : null}
      </div>

      {askCta ? (
        <ProductAskRow
          className="mt-8"
          href={askCta.href}
          lead={askCta.lead}
          actionLabel={askCta.actionLabel}
        />
      ) : null}
    </div>
  );
}
