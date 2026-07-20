import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { productImageFitClassName, productImageObjectPosition } from "../../lib/productImageStyle";
import { liftHeaderAboveLightbox, lockLightboxScroll } from "../../hooks/useSiteChrome";
import type { ProductImage } from "../../types/product";
import { IconButton } from "../ui/IconButton";
import { ProductGalleryLightbox } from "./ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "./ProductGalleryLightboxFlyer";
import "swiper/css";

type ProductGalleryProps = {
  images: ProductImage[];
  /** On PDP hero - fills the sticky desktop column (100svh − header) from lg. */
  layout?: "default" | "viewport";
};

type GalleryThumbnailRailProps = {
  images: ProductImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

function GalleryThumbnailRail({ images, activeIndex, onSelect }: GalleryThumbnailRailProps) {
  return (
    <div className="hidden h-full w-14 shrink-0 flex-col xl:flex" aria-label="Miniatury galerii">
      <div className="mx-auto min-h-4 w-px flex-1 bg-neutral-200" aria-hidden="true" />

      <div className="flex flex-col justify-end gap-2">
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={image.src}
              type="button"
              className={cn(
                "relative aspect-square w-full cursor-pointer overflow-hidden rounded-xs border bg-neutral-50 transition-[opacity,border-color] duration-base ease-out",
                isActive
                  ? "border-neutral-900 opacity-100"
                  : "border-neutral-200 opacity-55 hover:opacity-100",
              )}
              aria-label={`Przejdź do zdjęcia ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onSelect(index)}
            >
              <img
                src={image.src}
                alt=""
                className="absolute inset-0 h-full w-full object-contain"
                style={{ objectPosition: productImageObjectPosition(image) }}
                loading="lazy"
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

type GalleryControlsProps = {
  activeIndex: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
  onZoom: () => void;
};

function GalleryPagination({
  activeIndex,
  count,
}: {
  activeIndex: number;
  count: number;
}) {
  if (count <= 1) return null;

  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-[2] xl:hidden">
      <p
        className="m-0 inline-flex h-12 min-w-12 items-center justify-center rounded-xs border border-neutral-200 bg-neutral-0 px-3 font-body text-sm tabular-nums tracking-wide text-neutral-800 shadow-subtle"
        aria-live="polite"
      >
        {activeIndex + 1}
        <span className="text-neutral-400"> / {count}</span>
      </p>
    </div>
  );
}

function GalleryControls({
  activeIndex,
  count,
  onPrev,
  onNext,
  onZoom,
}: GalleryControlsProps) {
  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= count - 1;

  return (
    <>
      <GalleryPagination activeIndex={activeIndex} count={count} />

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[2] flex justify-end px-4">
        <div className="pointer-events-auto flex gap-1">
          {/* Zoom is redundant on mobile - tap the image opens the lightbox. */}
          <IconButton
            label="Powiększ zdjęcie"
            iconClass="ph ph-magnifying-glass-plus"
            variant="elevated"
            className="hidden shadow-subtle lg:inline-flex"
            onClick={onZoom}
          />
          <IconButton
            label="Poprzednie zdjęcie"
            iconClass="ph ph-caret-left"
            variant="elevated"
            className={cn("shadow-subtle", atStart && "pointer-events-none opacity-35")}
            onClick={atStart ? undefined : onPrev}
          />
          <IconButton
            label="Następne zdjęcie"
            iconClass="ph ph-caret-right"
            variant="elevated"
            className={cn("shadow-subtle", atEnd && "pointer-events-none opacity-35")}
            onClick={atEnd ? undefined : onNext}
          />
        </div>
      </div>
    </>
  );
}

function GallerySlideContent({
  image,
  index,
  onOpen,
  registerImage,
  isHidden = false,
  fillViewport = false,
}: {
  image: ProductImage;
  index: number;
  onOpen: (origin: LightboxOpenOrigin) => void;
  registerImage: (index: number, node: HTMLImageElement | null) => void;
  isHidden?: boolean;
  fillViewport?: boolean;
}) {
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    const img = event.currentTarget.querySelector("img");
    const rect = img?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect();
    onOpen({
      rect,
      objectPosition: productImageObjectPosition(image),
    });
  };

  return (
    <figure className="m-0 h-full w-full">
      <button
        type="button"
        className={cn(
          "relative w-full cursor-crosshair overflow-hidden bg-neutral-50",
          fillViewport
            ? cn(
                // Stack (mobile/tablet): capped height so the gallery does not dominate the viewport.
                "flex h-[min(56svh,28rem)] w-full items-center justify-center",
                "md:h-[min(52svh,32rem)]",
                "lg:aspect-auto lg:h-full lg:min-h-0",
              )
            : "block aspect-[4/5]",
        )}
        onClick={handleOpen}
        aria-label={`Powiększ zdjęcie ${index + 1}`}
      >
        <img
          ref={(node) => registerImage(index, node)}
          src={image.src}
          alt={image.alt}
          className={cn(
            "h-full w-full",
            productImageFitClassName(image),
            isHidden && "opacity-0",
          )}
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
  const [lightboxOrigin, setLightboxOrigin] = useState<LightboxOpenOrigin | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);

  const swiperRef = useRef<SwiperInstance | null>(null);
  const slideImageRefs = useRef<Map<number, HTMLImageElement>>(new Map());

  const isMulti = images.length > 1;
  const fillViewport = layout === "viewport";

  const registerSlideImage = useCallback((index: number, node: HTMLImageElement | null) => {
    if (node) {
      slideImageRefs.current.set(index, node);
      return;
    }
    slideImageRefs.current.delete(index);
  }, []);

  const getSlideRect = useCallback((index: number) => {
    return slideImageRefs.current.get(index)?.getBoundingClientRect() ?? null;
  }, []);

  useEffect(() => {
    lockLightboxScroll(lightboxOpen);
    return () => lockLightboxScroll(false);
  }, [lightboxOpen]);

  useEffect(() => {
    return () => liftHeaderAboveLightbox(false);
  }, []);

  const openLightbox = (index: number, origin: LightboxOpenOrigin) => {
    setLightboxIndex(index);
    setLightboxOrigin(origin);
    setLightboxClosing(false);
    liftHeaderAboveLightbox(false);
    setLightboxOpen(true);
  };

  // While the fly-back plays, lift the sticky site header above the lightbox so
  // the shrinking image tucks under it instead of covering it.
  const startClosing = () => {
    setLightboxClosing(true);
    liftHeaderAboveLightbox(true);
  };

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  const goToPrev = () => {
    if (activeIndex <= 0) return;
    goToSlide(activeIndex - 1);
  };

  const goToNext = () => {
    if (activeIndex >= images.length - 1) return;
    goToSlide(activeIndex + 1);
  };

  const openZoom = () => {
    const image = images[activeIndex];
    if (!image) return;
    const rect = getSlideRect(activeIndex) ?? new DOMRect(0, 0, 0, 0);
    openLightbox(activeIndex, {
      rect,
      objectPosition: productImageObjectPosition(image),
    });
  };

  // Keep the background gallery in sync while the lightbox is open, so the
  // closing fly-back targets the slide the user is actually leaving from.
  const handleLightboxIndexChange = (index: number) => {
    setLightboxIndex(index);
    swiperRef.current?.slideTo(index, 0);
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxOrigin(null);
    setLightboxClosing(false);
    liftHeaderAboveLightbox(false);
  };

  if (images.length === 0) return null;

  if (!isMulti) {
    const image = images[0];

    return (
      <div
        className={cn(
          "min-w-0",
          fillViewport && "flex flex-col gap-3 pb-2 lg:h-full lg:min-h-0 lg:gap-8 lg:pb-8",
        )}
      >
        <div
          aria-label="Galeria produktu"
          className={fillViewport ? "lg:h-full lg:min-h-0" : undefined}
        >
          <GallerySlideContent
            image={image}
            index={0}
            onOpen={(origin) => openLightbox(0, origin)}
            registerImage={registerSlideImage}
            isHidden={lightboxClosing && lightboxIndex === 0}
            fillViewport={fillViewport}
          />
        </div>

        {lightboxOpen && lightboxOrigin ? (
          <ProductGalleryLightbox
            images={images}
            index={lightboxIndex}
            origin={lightboxOrigin}
            getSlideRect={getSlideRect}
            onClosingStart={startClosing}
            onClose={closeLightbox}
            onIndexChange={handleLightboxIndexChange}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-w-0",
        fillViewport && "flex flex-col gap-3 pb-2 lg:h-full lg:min-h-0 lg:gap-8 lg:pb-8",
      )}
    >
      <div
        className={cn(
          "flex gap-4 lg:gap-6",
          fillViewport && "lg:min-h-0 lg:flex-1",
        )}
        aria-label="Galeria produktu"
      >
        <GalleryThumbnailRail
          images={images}
          activeIndex={activeIndex}
          onSelect={goToSlide}
        />

        <div
          className={cn(
            "relative min-w-0 flex-1 overflow-x-clip",
            fillViewport && "lg:flex lg:h-full lg:min-h-0 lg:flex-col",
          )}
        >
          <Swiper
            className={cn(
              "min-w-0 w-full overflow-x-clip",
              /* Isolate the transform layer so a 1px compositing fringe does not show beside the stage. */
              "[&_.swiper-slide]:backface-hidden",
              fillViewport
                ? cn(
                    "h-[min(56svh,28rem)] [&_.swiper-slide]:h-full",
                    "md:h-[min(52svh,32rem)]",
                    "lg:h-full lg:min-h-0 lg:flex-1",
                    "lg:[&_.swiper-slide]:flex lg:[&_.swiper-slide]:h-full lg:[&_.swiper-slide]:items-center",
                  )
                : "max-h-[calc(100svh-var(--spacing-header-h)-48px)] [&_.swiper-slide]:h-auto",
            )}
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={0}
            speed={480}
            roundLengths
            resistanceRatio={0}
            modules={[Mousewheel, Keyboard, A11y]}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 0.85,
            }}
            keyboard={{ enabled: !lightboxOpen, onlyInViewport: true }}
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
                  onOpen={(origin) => openLightbox(index, origin)}
                  registerImage={registerSlideImage}
                  isHidden={lightboxClosing && lightboxIndex === index}
                  fillViewport={fillViewport}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Cover GPU/subpixel hairline on the stage’s right edge (not the next slide). */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-px bg-neutral-50"
            aria-hidden
          />

          <GalleryControls
            activeIndex={activeIndex}
            count={images.length}
            onPrev={goToPrev}
            onNext={goToNext}
            onZoom={openZoom}
          />
        </div>
      </div>

      <p
        className={cn(
          "text-sm text-neutral-500",
          fillViewport
            ? "mt-3 hidden shrink-0 xl:mt-0 xl:block"
            : "mt-3 hidden xl:block",
        )}
        aria-live="polite"
      >
        Zdjęcie {activeIndex + 1} z {images.length}
      </p>

      {lightboxOpen && lightboxOrigin ? (
        <ProductGalleryLightbox
          images={images}
          index={lightboxIndex}
          origin={lightboxOrigin}
          getSlideRect={getSlideRect}
          onClosingStart={startClosing}
          onClose={closeLightbox}
          onIndexChange={handleLightboxIndexChange}
        />
      ) : null}
    </div>
  );
}
