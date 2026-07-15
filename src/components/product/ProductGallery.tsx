import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { lockLightboxScroll } from "../../hooks/useSiteChrome";
import { IconButton } from "../ui/IconButton";
import type { ProductImage } from "../../types/product";

type ProductGalleryProps = {
  images: ProductImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    lockLightboxScroll(lightboxOpen);
    return () => lockLightboxScroll(false);
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
      if (event.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + images.length) % images.length);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, images.length]);

  const active = images[activeIndex];

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={cn(
                "relative aspect-[4/5] w-16 shrink-0 overflow-hidden border bg-bg-muted transition-[border-color,opacity] duration-fast lg:w-20",
                index === activeIndex
                  ? "border-text opacity-100"
                  : "border-border opacity-70 hover:opacity-100",
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Pokaż zdjęcie ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <img
                src={image.src}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: productImageObjectPosition(image) }}
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <div className="relative order-1 flex-1 lg:order-2">
          <button
            type="button"
            className="group relative aspect-[4/5] w-full overflow-hidden bg-bg-muted"
            onClick={() => setLightboxOpen(true)}
            aria-label="Powiększ zdjęcie produktu"
          >
            <img
              key={active.src}
              src={active.src}
              alt={active.alt}
              className="product-gallery__main-img h-full w-full object-cover"
              style={{ objectPosition: productImageObjectPosition(active) }}
            />
            <span className="absolute right-4 bottom-4 flex items-center gap-2 bg-bg/90 px-3 py-2 text-small text-text-body opacity-0 transition-opacity group-hover:opacity-100">
              <i className="ph ph-magnifying-glass-plus" aria-hidden="true" />
              Powiększ
            </span>
          </button>
        </div>
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-neutral-900/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Powiększone zdjęcie produktu"
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Zamknij podgląd"
            onClick={() => setLightboxOpen(false)}
          />
          <div className="relative z-10 max-h-full max-w-5xl">
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
            <div className="absolute top-0 right-0 flex gap-2">
              <IconButton
                label="Poprzednie zdjęcie"
                iconClass="ph ph-caret-left"
                variant="on-dark"
                onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
              />
              <IconButton
                label="Następne zdjęcie"
                iconClass="ph ph-caret-right"
                variant="on-dark"
                onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
              />
              <IconButton
                label="Zamknij"
                iconClass="ph ph-x"
                variant="on-dark"
                onClick={() => setLightboxOpen(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
