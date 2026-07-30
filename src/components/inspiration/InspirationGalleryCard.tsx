import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import {
  inspirationGalleryCardClassName,
  inspirationGalleryCardMediaClassName,
  inspirationGalleryCardTitleClassName,
} from "./inspirationGalleryClassName";

export type InspirationGalleryCardAction = "lightbox" | "link" | "products";

type InspirationGalleryCardProps = {
  title: string;
  image: ProductImage;
  action?: InspirationGalleryCardAction;
  href?: string;
  productCount?: number;
  imageRef?: (node: HTMLImageElement | null) => void;
  frameRef?: (node: HTMLElement | null) => void;
  imageHidden?: boolean;
  onLightboxOpen?: () => void;
  onProductsOpen?: () => void;
  className?: string;
};

function CardMediaImage({
  image,
  alt,
  imageRef,
  imageHidden,
  zoomOnHover,
  zoomHoverGroup = "insp",
}: {
  image: ProductImage;
  alt: string;
  imageRef?: (node: HTMLImageElement | null) => void;
  imageHidden?: boolean;
  zoomOnHover: boolean;
  /** Which named group drives the hover zoom (card = whole link). */
  zoomHoverGroup?: "insp" | "card";
}) {
  const hoverScale =
    zoomHoverGroup === "card"
      ? cn(
          "group-hover/card:scale-[1.05] group-focus-visible/card:scale-[1.05]",
          "motion-reduce:group-hover/card:scale-100 motion-reduce:group-focus-visible/card:scale-100",
        )
      : cn(
          "group-hover/insp:scale-[1.05] group-focus-visible/insp:scale-[1.05]",
          "motion-reduce:group-hover/insp:scale-100 motion-reduce:group-focus-visible/insp:scale-100",
        );

  return (
    <div
      className={cn(
        "absolute inset-0 origin-center transform-gpu backface-hidden",
        zoomOnHover &&
          cn(
            "transition-transform duration-500 ease-out motion-reduce:transition-none",
            hoverScale,
          ),
      )}
    >
      <img
        ref={imageRef}
        src={image.src}
        alt={alt}
        className={cn(
          "pointer-events-none absolute inset-0 size-full object-cover",
          imageHidden && "opacity-0",
        )}
        style={{
          objectPosition: productImageObjectPosition(image),
        }}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

export function InspirationGalleryCard({
  title,
  image,
  action = "lightbox",
  href,
  productCount = 0,
  imageRef,
  frameRef,
  imageHidden = false,
  onLightboxOpen,
  onProductsOpen,
  className,
}: InspirationGalleryCardProps) {
  const alt = image.alt || title;
  const isLink = action === "link" && Boolean(href);
  const isProducts = action === "products";

  const media = (
    <div ref={frameRef} className={inspirationGalleryCardMediaClassName()}>
      {isLink ? (
        <span className="absolute inset-0 block">
          <CardMediaImage
            image={image}
            alt=""
            imageRef={imageRef}
            imageHidden={imageHidden}
            zoomOnHover
            zoomHoverGroup="card"
          />
        </span>
      ) : isProducts ? (
        <>
          <div className="absolute inset-0">
            <CardMediaImage
              image={image}
              alt={alt}
              imageRef={imageRef}
              imageHidden={imageHidden}
              zoomOnHover={false}
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-2 flex justify-end px-4">
            <Button
              as="button"
              type="button"
              variant="secondary"
              size="sm"
              className="pointer-events-auto shadow-subtle"
              onClick={onProductsOpen}
            >
              <i className="ph ph-list" aria-hidden="true" />
              Pokaż produkty ({productCount})
            </Button>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            className="group/insp absolute inset-0 block cursor-inherit"
            onClick={onLightboxOpen}
            aria-label={`Powiększ: ${alt}`}
          >
            <CardMediaImage
              image={image}
              alt={alt}
              imageRef={imageRef}
              imageHidden={imageHidden}
              zoomOnHover
            />
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-2 flex justify-end px-4">
            <IconButton
              label="Powiększ zdjęcie"
              iconClass="ph ph-magnifying-glass-plus"
              variant="elevated"
              className="pointer-events-auto shadow-subtle"
              onClick={onLightboxOpen}
            />
          </div>
        </>
      )}
    </div>
  );

  const titleNode = (
    <h3
      className={cn(
        inspirationGalleryCardTitleClassName(),
        isLink &&
          "transition-colors duration-fast ease-out group-hover/card:text-gold-500",
      )}
    >
      {title}
    </h3>
  );

  if (isLink && href) {
    const linkClassName = cn(
      inspirationGalleryCardClassName(className),
      "group/card text-inherit no-underline",
    );

    if (href.startsWith("#") || href.startsWith("http")) {
      return (
        <a href={href} className={linkClassName}>
          {media}
          {titleNode}
        </a>
      );
    }

    return (
      <Link to={href} className={linkClassName}>
        {media}
        {titleNode}
      </Link>
    );
  }

  return (
    <article className={inspirationGalleryCardClassName(className)}>
      {media}
      {titleNode}
    </article>
  );
}
