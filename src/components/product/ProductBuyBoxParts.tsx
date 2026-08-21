import { Badge } from "../ui/Badge";
import { Eyebrow } from "../ui/Eyebrow";
import { cn } from "../../lib/cn";
import type { ProductBadge, ProductPrice } from "../../types/product";
import { ProductAskRow } from "./ProductAskRow";

type ProductBadgesProps = {
  badges: ProductBadge[];
  price?: ProductPrice;
  brand?: string;
  brandHref?: string;
  className?: string;
};

const PROMO_BADGE: ProductBadge = {
  label: "Promocja",
  variant: "promo",
  href: "#promocje",
};

function isPromoPrice(price?: ProductPrice) {
  return Boolean(price?.previous || price?.discount);
}

function badgeHref(badge: ProductBadge): string {
  if (badge.href) return badge.href;
  const key = badge.label.trim().toLowerCase();
  if (key.includes("promoc")) return "#promocje";
  if (key.includes("bestseller")) return "#bestsellery";
  if (key.includes("nowo")) return "#nowosci";
  return `#${key.replace(/\s+/g, "-")}`;
}

export function ProductBadges({
  badges,
  price,
  brand,
  brandHref,
  className,
}: ProductBadgesProps) {
  const hasPromoBadge = badges.some(
    (badge) =>
      badge.variant === "promo" || badge.label.toLowerCase() === "promocja",
  );
  const displayBadges =
    isPromoPrice(price) && !hasPromoBadge ? [PROMO_BADGE, ...badges] : badges;
  const href = brandHref ?? (brand ? "/producent" : undefined);

  return (
    <div
      className={cn(
        "mb-3 flex flex-wrap items-center gap-2 lg:mb-4",
        className,
      )}
    >
      {brand && href ? (
        <Badge
          href={href}
          variant="outline"
          ariaLabel={`Produkty marki ${brand}`}
        >
          {brand}
        </Badge>
      ) : null}
      {displayBadges.map((badge) => {
        const target = badgeHref(badge);
        return (
          <Badge
            key={badge.label}
            variant={badge.variant ?? "default"}
            href={target}
            ariaLabel={`${badge.label} - zobacz produkty`}
          >
            {badge.label}
          </Badge>
        );
      })}
    </div>
  );
}

type ProductPriceBlockProps = {
  price: ProductPrice;
  askCta?: {
    href: string;
    lead: string;
    actionLabel: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    onAskOpen?: () => void;
  };
};

export function ProductPriceBlock({ price, askCta }: ProductPriceBlockProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-xs border border-neutral-200 bg-neutral-50">
        <div className="space-y-3 px-4 py-4 lg:space-y-4 lg:px-5 lg:py-5">
          {price.note ? (
            <Eyebrow variant="gold" className="mb-0 text-promo">
              {price.note}
            </Eyebrow>
          ) : null}

          <div>
            <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
              <p
                className={cn(
                  "font-heading text-[clamp(2.25rem,3.6vw,3rem)] leading-none tracking-tight",
                  price.discount ? "text-promo" : "text-neutral-900",
                )}
              >
                {price.current}
              </p>
              {price.discount ? (
                <span className="mb-1 inline-flex items-center rounded-xs bg-promo px-2.5 py-1 font-body text-xs font-medium tabular-nums leading-none text-neutral-0">
                  {price.discount}
                </span>
              ) : null}
            </div>

            {price.previous || price.lowestPrice30Days ? (
              <dl className="mt-3 space-y-1.5 font-body text-sm text-neutral-600 lg:mt-4">
                {price.previous ? (
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <dt className="text-neutral-500">Cena przed obniżką</dt>
                    <dd className="m-0 tabular-nums line-through decoration-neutral-400">
                      {price.previous}
                    </dd>
                  </div>
                ) : null}
                {price.lowestPrice30Days ? (
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <dt className="text-neutral-500">
                      Najniższa cena z 30 dni przed obniżką
                    </dt>
                    <dd className="m-0 tabular-nums font-medium text-neutral-800">
                      {price.lowestPrice30Days}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>

          {price.legalNote ? (
            <p className="m-0 max-w-[52ch] font-body text-xs leading-relaxed text-neutral-500">
              {price.legalNote}
            </p>
          ) : null}
        </div>

        {askCta ? (
          <div className="border-t border-neutral-200 bg-neutral-0 px-4 py-4 lg:px-5 lg:py-5">
            <ProductAskRow
              embedded
              href={askCta.href}
              lead={askCta.lead}
              actionLabel={askCta.actionLabel}
              secondaryLabel={askCta.secondaryLabel}
              secondaryHref={askCta.secondaryHref}
              onAskOpen={askCta.onAskOpen}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
