import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { buttonClassName } from "../ui/buttonClassName";
import { IconButton } from "../ui/IconButton";
import { ArrangementFavoriteButton } from "./ArrangementFavoriteButton";
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
  /** When set, shows a bookmark control on the media. */
  favoriteId?: string;
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
          "group-hover/card:scale-[1.07] group-focus-within/card:scale-[1.07]",
          "motion-reduce:group-hover/card:scale-100 motion-reduce:group-focus-within/card:scale-100",
        )
      : cn(
          "group-hover/insp:scale-[1.07] group-focus-visible/insp:scale-[1.07]",
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
  favoriteId,
  className,
}: InspirationGalleryCardProps) {
  const alt = image.alt || title;
  const isLink = action === "link" && Boolean(href);
  const isProducts = action === "products";

  const favoriteButton = favoriteId ? (
    <ArrangementFavoriteButton
      id={favoriteId}
      className="absolute inset-e-3 top-3 z-2"
    />
  ) : null;

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
              zoomOnHover
              zoomHoverGroup="card"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-2 flex justify-end px-4">
            <span
              className={buttonClassName({
                variant: "secondary",
                size: "sm",
                className: cn(
                  "shadow-subtle",
                  "group-hover/card:border-neutral-800 group-hover/card:text-neutral-0 group-hover/card:before:scale-y-100",
                  "group-focus-within/card:border-neutral-800 group-focus-within/card:text-neutral-0 group-focus-within/card:before:scale-y-100",
                ),
              })}
            >
              <i className="ph ph-list" aria-hidden="true" />
              Pokaż produkty ({productCount})
            </span>
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
      {favoriteButton}
    </div>
  );

  const titleNode = (
    <h3 className={inspirationGalleryCardTitleClassName()}>{title}</h3>
  );

  if (isLink && href) {
    const linkClassName = cn(
      inspirationGalleryCardClassName(className),
      "relative group/card cursor-pointer text-inherit no-underline",
    );
    const overlayClassName =
      "absolute inset-0 z-1 text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800";

    if (href.startsWith("#") || href.startsWith("http")) {
      return (
        <div className={linkClassName}>
          <a href={href} className={overlayClassName} aria-label={title} />
          {media}
          {titleNode}
        </div>
      );
    }

    return (
      <div className={linkClassName}>
        <Link to={href} className={overlayClassName} aria-label={title} />
        {media}
        {titleNode}
      </div>
    );
  }

  if (isProducts) {
    return (
      <article
        className={cn(
          inspirationGalleryCardClassName(className),
          "group/card relative cursor-pointer",
        )}
      >
        <button
          type="button"
          className="absolute inset-0 z-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800"
          onClick={onProductsOpen}
          aria-label={`Pokaż produkty (${productCount}): ${title}`}
        />
        {media}
        {titleNode}
      </article>
    );
  }

  return (
    <article className={inspirationGalleryCardClassName(className)}>
      {media}
      {titleNode}
    </article>
  );
}
