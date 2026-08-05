import { cn } from "../../lib/cn";

type ProductCardPriceProps = {
  price: string;
  pricePrevious?: string;
  className?: string;
  /** Larger type for carousel tiles; denser for drawer rows. */
  size?: "card" | "row";
};

/** Shared product price - current + optional struck previous (promo). */
export function ProductCardPrice({
  price,
  pricePrevious,
  className,
  size = "card",
}: ProductCardPriceProps) {
  const isPromo = Boolean(pricePrevious);

  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
        className,
      )}
    >
      <p
        className={cn(
          "m-0 tabular-nums tracking-tight",
          size === "card"
            ? "font-heading text-lg leading-none font-medium md:text-xl"
            : "font-body text-ui leading-none font-medium",
          isPromo ? "text-promo" : "text-neutral-900",
        )}
      >
        {price}
      </p>
      {pricePrevious ? (
        <p className="m-0 font-body text-sm tabular-nums text-neutral-500 line-through decoration-neutral-400">
          {pricePrevious}
        </p>
      ) : null}
    </div>
  );
}
