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

const PROMO_BADGE: ProductBadge = { label: "Promocja", variant: "promo" };

function isPromoPrice(price?: ProductPrice) {
  return Boolean(price?.previous || price?.discount);
}

export function ProductBadges({
  badges,
  price,
  brand,
  brandHref,
  className,
}: ProductBadgesProps) {
  const hasPromoBadge = badges.some(
    (badge) => badge.variant === "promo" || badge.label.toLowerCase() === "promocja",
  );
  const displayBadges =
    isPromoPrice(price) && !hasPromoBadge ? [PROMO_BADGE, ...badges] : badges;
  const href =
    brandHref ??
    (brand ? `#marka-${brand.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div className={cn("mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 md:mb-4", className)}>
      {brand && href ? (
        <a
          href={href}
          className={cn(
            "m-0 font-body text-xs uppercase tracking-wide text-neutral-600 no-underline",
            "transition-colors duration-fast ease-out hover:text-neutral-900",
            "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
          )}
        >
          {brand}
        </a>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {displayBadges.map((badge) => (
          <Badge key={badge.label} variant={badge.variant ?? "default"}>
            {badge.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

type ProductPriceBlockProps = {
  price: ProductPrice;
  askCta?: {
    href: string;
    lead: string;
    actionLabel: string;
    onAskOpen?: () => void;
  };
};

export function ProductPriceBlock({ price, askCta }: ProductPriceBlockProps) {
  return (
    <div className="pt-5 md:pt-8">
      <div className="overflow-hidden rounded-xs border border-neutral-200 bg-neutral-50">
        <div className="space-y-3 px-4 py-4 md:space-y-4 md:px-5 md:py-5">
          {price.note ? (
            <Eyebrow variant="gold" className="mb-0 text-promo">
              {price.note}
            </Eyebrow>
          ) : null}

          <div>
            <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
              <p
                className={cn(
                  "font-heading text-[clamp(36px,3.6vw,48px)] leading-none tracking-tight",
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
              <dl className="mt-3 space-y-1.5 font-body text-sm text-neutral-600 md:mt-4">
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
                    <dt className="text-neutral-500">Najniższa cena z 30 dni przed obniżką</dt>
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
          <div className="border-t border-neutral-200 bg-neutral-0 px-4 py-4 md:px-5 md:py-5">
            <ProductAskRow
              embedded
              href={askCta.href}
              lead={askCta.lead}
              actionLabel={askCta.actionLabel}
              onAskOpen={askCta.onAskOpen}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
