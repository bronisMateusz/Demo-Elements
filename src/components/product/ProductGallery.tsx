import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { lockLightboxScroll } from "../../hooks/useSiteChrome";
import { IconButton } from "../ui/IconButton";
import type { ProductImage } from "../../types/product";
import "swiper/css";

type ProductGalleryProps = {
  images: ProductImage[];
  /** On PDP hero — fills the sticky column (100svh − header). */
  layout?: "default" | "viewport";
};

type GalleryProgressRailProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

function GalleryProgressRail({ count, activeIndex, onSelect }: GalleryProgressRailProps) {
  const segmentHeight = 100 / count;

  return (
    <div className="hidden h-full w-6 shrink-0 lg:block">
      <div className="relative h-full">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-neutral-200">
          <span
            className="absolute left-0 w-px bg-neutral-900 transition-[top,height] duration-base ease-out"
            style={{
              top: `${activeIndex * segmentHeight}%`,
              height: `${segmentHeight}%`,
            }}
          />
        </div>

        <div className="flex h-full flex-col">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              type="button"
              className="flex-1 cursor-pointer"
              aria-label={`Przejdź do zdjęcia ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type ProductGalleryLightboxProps = {
  images: ProductImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

function ProductGalleryLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: ProductGalleryLightboxProps) {
  const active = images[index];
  const hasMultiple = images.length > 1;

  return (
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
        onClick={onClose}
      />
      <div className="relative z-10 max-h-full max-w-5xl">
        <img
          src={active.src}
          alt={active.alt}
          className="max-h-[85vh] w-auto max-w-full object-contain"
        />
        {hasMultiple ? (
          <div className="absolute top-0 right-0 flex gap-2">
            <IconButton
              label="Poprzednie zdjęcie"
              iconClass="ph ph-caret-left"
              variant="on-dark"
              onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
            />
            <IconButton
              label="Następne zdjęcie"
              iconClass="ph ph-caret-right"
              variant="on-dark"
              onClick={() => onIndexChange((index + 1) % images.length)}
            />
            <IconButton
              label="Zamknij"
              iconClass="ph ph-x"
              variant="on-dark"
              onClick={onClose}
            />
          </div>
        ) : (
          <div className="absolute top-0 right-0">
            <IconButton label="Zamknij" iconClass="ph ph-x" variant="on-dark" onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
}

function GallerySlideContent({
  image,
  index,
  onOpen,
  fillViewport = false,
}: {
  image: ProductImage;
  index: number;
  onOpen: () => void;
  fillViewport?: boolean;
}) {
  return (
    <figure className="m-0 h-full w-full">
      <button
        type="button"
        className={cn(
          "relative w-full cursor-crosshair overflow-hidden bg-neutral-50",
          fillViewport
            ? "flex h-full min-h-[min(60vh,640px)] lg:min-h-0"
            : "block aspect-[4/5]",
        )}
        onClick={onOpen}
        aria-label={`Powiększ zdjęcie ${index + 1}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: productImageObjectPosition(image) }}
          loading={index === 0 ? "eager" : "lazy"}
          draggable={false}
        />
      </button>
    </figure>
  );
}

export function ProductGallery({ images, layout = "default" }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const swiperRef = useRef<SwiperInstance | null>(null);

  const isMulti = images.length > 1;
  const fillViewport = layout === "viewport";

  useEffect(() => {
    lockLightboxScroll(lightboxOpen);
    return () => lockLightboxScroll(false);
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (!isMulti) return;
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current - 1 + images.length) % images.length);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, isMulti, images.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  if (images.length === 0) return null;

  if (!isMulti) {
    const image = images[0];

    return (
      <div className={cn("min-w-0", fillViewport && "flex h-full min-h-0 flex-col")}>
        <div aria-label="Galeria produktu" className={fillViewport ? "h-full min-h-0" : undefined}>
          <GallerySlideContent
            image={image}
            index={0}
            onOpen={() => openLightbox(0)}
            fillViewport={fillViewport}
          />
        </div>

        {lightboxOpen ? (
          <ProductGalleryLightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onIndexChange={setLightboxIndex}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("min-w-0", fillViewport && "flex h-full min-h-0 flex-col")}>
      <div
        className={cn(
          "flex gap-4 lg:gap-6",
          fillViewport && "min-h-0 flex-1",
        )}
        aria-label="Galeria produktu"
      >
        <GalleryProgressRail
          count={images.length}
          activeIndex={activeIndex}
          onSelect={goToSlide}
        />

        <Swiper
          className={cn(
            "min-w-0 w-full flex-1 [&_.swiper-slide]:h-auto",
            fillViewport
              ? "h-full min-h-0 [&_.swiper-slide]:flex [&_.swiper-slide]:h-full [&_.swiper-slide]:items-center"
              : "max-h-[calc(100svh-var(--spacing-header-h)-48px)]",
          )}
          direction="vertical"
          slidesPerView={1}
          spaceBetween={fillViewport ? 0 : 8}
          speed={480}
          modules={[Mousewheel, Keyboard, A11y]}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 0.85,
          }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{
            prevSlideMessage: "Poprzednie zdjęcie",
            nextSlideMessage: "Następne zdjęcie",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.src}>
              <GallerySlideContent
                image={image}
                index={index}
                onOpen={() => openLightbox(index)}
                fillViewport={fillViewport}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p
        className={cn(
          "mt-3 text-sm text-neutral-500",
          fillViewport ? "shrink-0 lg:block" : "hidden lg:block",
        )}
        aria-live="polite"
      >
        Zdjęcie {activeIndex + 1} z {images.length}
      </p>

      {lightboxOpen ? (
        <ProductGalleryLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </div>
  );
}
