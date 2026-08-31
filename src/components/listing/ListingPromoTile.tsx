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
};

/** Magazine / campaign cell for the PLP grid - styled after HomeMagazine. */
export function ListingPromoTile({ promo, className }: ListingPromoTileProps) {
  const titleId = useId();
  const isExternal = /^https?:\/\//i.test(promo.href);
  const linkTarget = isExternal ? "_blank" : undefined;
  const linkRel = isExternal ? "noopener noreferrer" : undefined;

  return (
    <article
      className={cn(
        "relative flex min-h-72 flex-col overflow-hidden rounded-xs",
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
          className="absolute top-5 inset-e-4 h-24 w-7 opacity-40 brightness-0 invert sm:top-6 sm:inset-e-5"
        />
        <BrandMotif
          name="arc-light"
          className="absolute -bottom-8 -inset-e-6 size-[min(42vw,14rem)] opacity-35"
        />
      </div>

      <div className="relative z-2 flex flex-1 flex-col items-stretch gap-5 p-5 sm:flex-row sm:items-center sm:justify-center sm:gap-8 sm:p-6 md:gap-10 md:p-8 lg:gap-12 lg:p-10">
        <div className="flex min-w-0 flex-col items-stretch gap-3 sm:max-w-md sm:items-start md:max-w-lg">
          <Eyebrow variant="gold" className="text-gold-400">
            {promo.eyebrow}
          </Eyebrow>
          <h3
            id={titleId}
            className="m-0 max-w-md font-heading text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.15] tracking-tight font-medium text-neutral-0"
          >
            {promo.title}
          </h3>
          <p className="m-0 max-w-md font-body text-sm leading-relaxed text-neutral-200 md:text-ui">
            {promo.description}
          </p>
          <Button
            href={promo.href}
            variant="primary"
            tone="onDark"
            size="lg"
            className="mt-1 w-full sm:w-auto"
            target={linkTarget}
            rel={linkRel}
          >
            {promo.ctaLabel}
            <i className="ph ph-arrow-right" aria-hidden="true" />
          </Button>
        </div>

        <div
          className="relative mx-auto aspect-3/4 w-44 shrink-0 overflow-hidden rounded-xs bg-neutral-0 shadow-2 sm:mx-0 sm:w-48 md:w-52 lg:w-60"
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
