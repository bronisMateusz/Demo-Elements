import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import type { ProducerBrand } from "../../data/producers";

type BrandLogoTileProps = {
  brand: ProducerBrand;
  className?: string;
  /** Brand name under the tile. Featured grid hides it. */
  showName?: boolean;
};

/**
 * Brand tile for producers directory - logo when available, else name placeholder.
 */
export function BrandLogoTile({
  brand,
  className,
  showName = true,
}: BrandLogoTileProps) {
  const classNames = cn(
    "group flex flex-col items-center no-underline",
    showName && "gap-3",
    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-500",
    className,
  );

  const body = (
    <>
      <div className="flex h-21 w-full flex-col items-center justify-center gap-1.5 bg-transparent px-3 transition-colors duration-fast ease-out group-hover:bg-neutral-100">
        {brand.logoSrc ? (
          <img
            src={brand.logoSrc}
            alt=""
            className="max-h-10 max-w-full object-contain opacity-70 transition-opacity duration-fast ease-out group-hover:opacity-100"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : (
          <>
            <i
              className="ph ph-buildings text-2xl text-gold-600 opacity-65 transition-opacity duration-fast ease-out group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="font-body text-[0.5625rem] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              logo
            </span>
          </>
        )}
      </div>
      {showName ? (
        <span className="text-center font-body text-xs font-light tracking-[0.12em] text-neutral-500 uppercase">
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
