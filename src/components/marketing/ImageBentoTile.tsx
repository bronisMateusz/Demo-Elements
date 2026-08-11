import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";

type ImageBentoTileProps = {
  label: string;
  href: string;
  image: ProductImage;
  featured?: boolean;
  className?: string;
};

/** Image tile with gradient overlay + label + arrow (home / subcategory bento). */
export function ImageBentoTile({
  label,
  href,
  image,
  featured = false,
  className,
}: ImageBentoTileProps) {
  const isExternalOrHash = href.startsWith("http") || href.startsWith("#");
  const shellClassName = cn(
    "group/bento relative flex h-full flex-col justify-end overflow-hidden rounded-xs no-underline",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
    className,
  );

  const body = (
    <>
      <img
        src={image.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover transition-transform duration-slow ease-luxury group-hover/bento:scale-[1.03]"
        style={{ objectPosition: productImageObjectPosition(image) }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <span
        className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/35 to-neutral-950/10"
        aria-hidden="true"
      />
      <span
        className={cn(
          "relative z-10 flex items-end justify-between gap-3 p-4 sm:p-5",
          featured && "md:p-6",
        )}
      >
        <span
          className={cn(
            "max-w-[90%] font-heading font-medium text-balance text-neutral-0",
            featured
              ? "text-h3 leading-[1.1] tracking-tight"
              : "text-base leading-snug md:text-lg",
          )}
        >
          {label}
        </span>
        <i
          className="ph ph-arrow-right mb-0.5 shrink-0 text-lg leading-none text-gold-400 transition-transform duration-base ease-out group-hover/bento:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (isExternalOrHash) {
    return (
      <a href={href} aria-label={label} className={shellClassName}>
        {body}
      </a>
    );
  }

  return (
    <Link to={href} aria-label={label} className={shellClassName}>
      {body}
    </Link>
  );
}
