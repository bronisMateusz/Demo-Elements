import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import type { ProducerBrand } from "../../data/producers";

type BrandLogoTileProps = {
  brand: ProducerBrand;
  className?: string;
  /** Stronger logo contrast - use on featured / dark panels. */
  emphasized?: boolean;
  /** Brand name under the tile. Featured grid hides it. */
  showName?: boolean;
};

/**
 * Brand tile for producers directory - logo when available, else name placeholder.
 */
export function BrandLogoTile({
  brand,
  className,
  emphasized = false,
  showName = true,
}: BrandLogoTileProps) {
  const classNames = cn(
    "group flex flex-col items-center no-underline",
    showName && "gap-3",
    emphasized
      ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      : "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
    className,
  );

  const body = (
    <>
      <div
        className={cn(
          "flex h-21 w-full flex-col items-center justify-center gap-1.5 rounded-xs border border-neutral-200 bg-neutral-0 px-3",
          "transition-[border-color] duration-fast ease-out group-hover:border-gold-500",
          emphasized && "shadow-subtle",
        )}
      >
        {brand.logoSrc ? (
          <img
            src={brand.logoSrc}
            alt=""
            className={cn(
              "max-h-10 max-w-full object-contain transition-opacity duration-fast ease-out group-hover:opacity-100",
              emphasized ? "opacity-80" : "opacity-70",
            )}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : (
          <>
            <i
              className="ph ph-buildings text-2xl text-gold-600 opacity-65"
              aria-hidden="true"
            />
            <span className="font-body text-[0.5625rem] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              logo
            </span>
          </>
        )}
      </div>
      {showName ? (
        <span
          className={cn(
            "text-center font-body text-xs font-light tracking-[0.12em] uppercase",
            emphasized ? "text-neutral-300" : "text-neutral-500",
          )}
        >
          {brand.name}
        </span>
      ) : null}
    </>
  );

  if (brand.href.startsWith("/") && brand.href !== "#") {
    return (
      <Link
        to={brand.href}
        className={classNames}
        aria-label={showName ? undefined : brand.name}
      >
        {body}
      </Link>
    );
  }

  return (
    <a
      href={brand.href}
      className={classNames}
      aria-label={showName ? undefined : brand.name}
    >
      {body}
    </a>
  );
}
