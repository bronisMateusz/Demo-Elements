import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";

export type CategorySubTileProps = {
  label: string;
  href: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  };
  className?: string;
};

/** 4:3 media + label below - same aspect as ImageBentoTile / home categories. */
export function CategorySubTile({
  label,
  href,
  image,
  className,
}: CategorySubTileProps) {
  const fit = image.fit ?? "cover";
  const tileClassName = cn(
    "group/tile flex h-full flex-col gap-3 text-neutral-900 no-underline",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
    className,
  );

  const body = (
    <>
      <div
        className={cn(
          "relative aspect-4/3 overflow-hidden rounded-xs border border-neutral-200 bg-neutral-50",
          "transition-[border-color,background-color] duration-base ease-out",
          "group-hover/tile:border-gold-500 group-hover/tile:bg-gold-50",
        )}
      >
        <img
          src={image.src}
          alt=""
          aria-hidden="true"
          className={cn(
            "size-full transition-transform duration-slow ease-luxury group-hover/tile:scale-105",
            fit === "contain" ? "object-contain p-4 md:p-5" : "object-cover",
          )}
          style={{ objectPosition: productImageObjectPosition(image) }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <span className="flex items-start justify-between gap-2 px-0.5">
        <span className="min-w-0 font-heading text-sm font-medium leading-snug text-balance md:text-ui">
          {label}
        </span>
        <i
          className={cn(
            "ph ph-arrow-right mt-0.5 shrink-0 text-sm leading-none text-gold-600",
            "transition-transform duration-fast ease-out group-hover/tile:translate-x-0.5",
          )}
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (href.startsWith("/") && href !== "#") {
    return (
      <Link to={href} className={tileClassName} aria-label={label}>
        {body}
      </Link>
    );
  }

  return (
    <a href={href} className={tileClassName} aria-label={label}>
      {body}
    </a>
  );
}
