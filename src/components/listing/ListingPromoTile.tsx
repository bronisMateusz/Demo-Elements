import { useId } from "react";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ListingGridPromo } from "../../types/listing";
import { BrandMotif } from "../brand/BrandMotif";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

type ListingPromoTileProps = {
  promo: ListingGridPromo;
  className?: string;
  onCtaClick?: () => void;
  /**
   * `grid` - tighter padding and wider content layout for listing cells.
   * Default keeps the standalone / library preview scale.
   */
  density?: "default" | "grid";
};

/** Magazine / campaign cell for the PLP grid - styled after HomeMagazine. */
export function ListingPromoTile({
  promo,
  className,
  onCtaClick,
  density = "default",
}: ListingPromoTileProps) {
  const titleId = useId();
  const isExternal = /^https?:\/\//i.test(promo.href);
  const linkTarget = isExternal ? "_blank" : undefined;
  const linkRel = isExternal ? "noopener noreferrer" : undefined;
  const isGrid = density === "grid";

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xs",
        isGrid ? "min-h-96 sm:min-h-104" : "min-h-72",
        className,
      )}
      aria-labelledby={titleId}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-br from-neutral-700 via-brown-600 to-neutral-800" />
        <div className="absolute inset-0 bg-radial-[at_85%_15%] from-gold-500/25 via-gold-600/10 to-transparent to-55%" />
        <div className="absolute inset-0 bg-radial-[at_10%_90%] from-brown-700/50 to-transparent to-45%" />
        <BrandMotif
          name="dots-grid"
          className={cn(
            "absolute top-5 inset-e-4 h-24 w-7 opacity-40 brightness-0 invert sm:top-6 sm:inset-e-5",
            !isGrid && "md:top-8 md:inset-e-6 md:h-32 md:w-8",
          )}
        />
        <BrandMotif
          name="arc-light"
          className={cn(
            "absolute -bottom-8 -inset-e-6 size-[min(42vw,14rem)] opacity-35",
            !isGrid && "md:-bottom-10 md:-inset-e-8 md:size-[min(48vw,18rem)]",
          )}
        />
      </div>

      <div
        className={cn(
          "relative z-2 flex flex-col items-stretch sm:flex-row",
          isGrid
            ? "min-h-96 flex-1 gap-5 p-5 sm:min-h-104 sm:items-center sm:justify-between sm:gap-8 sm:p-6 md:gap-10 md:p-7"
            : "flex-1 gap-5 p-5 sm:items-center sm:justify-center sm:gap-8 sm:p-6 md:gap-10 md:p-8 lg:gap-12 lg:p-10",
        )}
      >
        <div
          className={cn(
            "flex min-w-0 flex-col items-stretch sm:items-start",
            isGrid ? "flex-1 gap-3.5 sm:pe-2" : "gap-3 sm:max-w-md md:max-w-lg",
          )}
        >
          <Eyebrow
            variant="gold"
            className={cn("mb-0 text-gold-400", isGrid && "text-sm")}
          >
            {promo.eyebrow}
          </Eyebrow>
          <h3
            id={titleId}
            className={cn(
              "m-0 font-heading leading-[1.15] tracking-tight font-medium text-neutral-0",
              isGrid
                ? "max-w-xl text-[clamp(1.35rem,2.4vw,1.875rem)]"
                : "max-w-md text-[clamp(1.25rem,2.2vw,1.75rem)]",
            )}
          >
            {promo.title}
          </h3>
          <p
            className={cn(
              "m-0 font-body leading-relaxed text-neutral-200",
              isGrid
                ? "max-w-xl text-sm md:text-base"
                : "max-w-md text-sm md:text-ui",
            )}
          >
            {promo.description}
          </p>
          {onCtaClick ? (
            <Button
              as="button"
              type="button"
              variant="primary"
              tone="onDark"
              size={isGrid ? "md" : "lg"}
              className="mt-1 w-full sm:w-auto"
              onClick={onCtaClick}
            >
              {promo.ctaLabel}
            </Button>
          ) : (
            <Button
              href={promo.href}
              variant="primary"
              tone="onDark"
              size={isGrid ? "md" : "lg"}
              className="mt-1 w-full sm:w-auto"
              target={linkTarget}
              rel={linkRel}
            >
              {promo.ctaLabel}
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </Button>
          )}
        </div>

        <div
          className={cn(
            "relative mx-auto aspect-3/4 shrink-0 overflow-hidden rounded-xs bg-neutral-0 shadow-2 sm:mx-0",
            isGrid
              ? "w-44 sm:w-48 md:w-56 lg:w-60"
              : "w-44 sm:w-48 md:w-52 lg:w-60",
          )}
          aria-hidden="true"
        >
          <span className="pointer-events-none absolute inset-y-0 inset-s-0 z-10 w-2.5 bg-linear-to-r from-neutral-900/25 via-neutral-900/8 to-transparent" />
          <span className="pointer-events-none absolute inset-y-0 inset-e-0 z-10 w-px bg-neutral-300" />
          <img
            src={promo.image.src}
            alt=""
            className="size-full object-cover object-top"
            style={{
              objectPosition: productImageObjectPosition(promo.image),
            }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </article>
  );
}
