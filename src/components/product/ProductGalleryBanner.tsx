import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { Eyebrow } from "../ui/Eyebrow";

type ProductGalleryBannerProps = {
  eyebrow: string;
  title: string;
  description?: string;
  href: string;
  label: string;
  image?: ProductImage;
  className?: string;
};

/** Slim optional promo strip under the PDP gallery. */
export function ProductGalleryBanner({
  eyebrow,
  title,
  description,
  href,
  label,
  image,
  className,
}: ProductGalleryBannerProps) {
  return (
    <a
      href={href}
      className={cn(
        "group/banner flex gap-3 rounded-xs border border-neutral-200 bg-gold-100 p-3 no-underline sm:gap-4 sm:p-4",
        "transition-[border-color,background-color] duration-base ease-out",
        "hover:border-gold-400 hover:bg-gold-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
        className,
      )}
    >
      {image ? (
        <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xs bg-neutral-0 sm:w-24">
          <img
            src={image.src}
            alt={image.alt}
            className="size-full object-cover"
            style={{ objectPosition: productImageObjectPosition(image) }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        <Eyebrow variant="gold" className="mb-0 text-gold-600">
          {eyebrow}
        </Eyebrow>
        <p className="m-0 font-heading text-base leading-snug font-medium text-balance text-neutral-900 sm:text-lg">
          {title}
        </p>
        {description ? (
          <p className="m-0 font-body text-sm leading-snug text-neutral-600">
            {description}
          </p>
        ) : null}
        <span
          className={cn(
            "mt-1 inline-flex items-center gap-1.5 font-body text-sm font-medium text-gold-600",
            "transition-colors duration-base ease-out group-hover/banner:text-neutral-900",
          )}
        >
          {label}
          <i
            className="ph ph-arrow-right text-base leading-none transition-transform duration-base ease-out group-hover/banner:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </a>
  );
}
