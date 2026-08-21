import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { peekImageAspectRatio } from "../../lib/lightboxImageRect";
import {
  productImageFitClassName,
  productImageObjectPosition,
} from "../../lib/productImageStyle";
import {
  liftHeaderAboveLightbox,
  lockLightboxScroll,
} from "../../hooks/useSiteChrome";
import type { ProductImage } from "../../types/product";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { IconButton } from "../ui/IconButton";
import { ProductGalleryLightbox } from "./ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "./ProductGalleryLightboxFlyer";
import "swiper/css";

type ProductGalleryProps = {
  images: ProductImage[];
  /** On PDP hero - fills the sticky desktop column from lg (viewport − header − peek). */
  layout?: "default" | "viewport";
};

type GalleryThumbnailRailProps = {
  images: ProductImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

/** Horizontal strip - same pattern as the lightbox thumbs. */
function GalleryThumbnailRail({
  images,
  activeIndex,
  onSelect,
  className,
}: GalleryThumbnailRailProps) {
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const reduce = useMotionReduced();

  useEffect(() => {
    const root = thumbsRef.current;
    if (!root) return;
    const active = root.querySelector<HTMLElement>("[aria-current='true']");
    active?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex, reduce]);

  return (
    <div
      ref={thumbsRef}
      className={cn(
        "flex max-w-full gap-2 overflow-x-auto",
        "scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      aria-label="Miniatury galerii"
    >
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={image.src}
            type="button"
            className={cn(
              "size-14 shrink-0 overflow-hidden rounded-xs border bg-neutral-50 transition-[border-color,opacity] duration-fast ease-out",
              isActive
                ? "border-neutral-900 opacity-100"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
            aria-label={`Przejdź do zdjęcia ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect(index)}
          >
            <img
              src={image.src}
              alt=""
              className="size-full object-cover"
              style={{ objectPosition: productImageObjectPosition(image) }}
              loading="lazy"
              draggable={false}
            />
          </button>
        );
      })}
    </div>
  );
}

function GalleryCounter({
  activeIndex,
  count,
  className,
}: {
  activeIndex: number;
  count: number;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 inline-flex h-12 min-w-12 items-center justify-center rounded-xs border border-neutral-200 bg-neutral-0 px-3 font-body text-sm tabular-nums tracking-[0.12em] text-neutral-800 shadow-subtle",
        className,
      )}
      aria-live="polite"
    >
      {activeIndex + 1}
      <span className="text-neutral-400"> / {count}</span>
    </p>
  );
}

type GalleryNavButtonsProps = {
  activeIndex: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
  onZoom?: () => void;
  showZoom?: boolean;
  className?: string;
};

function GalleryNavButtons({
  activeIndex,
  count,
  onPrev,
  onNext,
  onZoom,
  showZoom = false,
  className,
}: GalleryNavButtonsProps) {
  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= count - 1;

  return (
    <div className={cn("flex gap-1", className)}>
      {showZoom && onZoom ? (
        <IconButton
          label="Powiększ zdjęcie"
          iconClass="ph ph-magnifying-glass-plus"
          variant="elevated"
          className="shadow-subtle"
          onClick={onZoom}
        />
      ) : null}
      <IconButton
        label="Poprzednie zdjęcie"
        iconClass="ph ph-caret-left"
        variant="elevated"
        className={cn(
          "shadow-subtle",
          atStart && "pointer-events-none opacity-35",
        )}
        onClick={atStart ? undefined : onPrev}
      />
      <IconButton
        label="Następne zdjęcie"
        iconClass="ph ph-caret-right"
        variant="elevated"
        className={cn(
          "shadow-subtle",
          atEnd && "pointer-events-none opacity-35",
        )}
        onClick={atEnd ? undefined : onNext}
      />
    </div>
  );
}

/** Short galleries keep thumbs; longer sets fall back to a counter (lightbox rule). */
const GALLERY_THUMB_STRIP_MAX = 6;

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
    const rect =
      img?.getBoundingClientRect() ??
      event.currentTarget.getBoundingClientRect();
    const aspectRatio =
      img && img.naturalWidth > 0 && img.naturalHeight > 0
        ? img.naturalWidth / img.naturalHeight
        : undefined;
    onOpen({
      rect,
      objectPosition: productImageObjectPosition(image),
      aspectRatio,
    });
  };

  return (
    <figure className="m-0 size-full">
      <button
        type="button"
        className={cn(
          "relative w-full cursor-crosshair overflow-hidden bg-neutral-0",
          fillViewport
            ? cn(
                // Stack (mobile/tablet): capped height so the gallery does not dominate the viewport.
                "flex h-[min(56svh,28rem)] w-full items-center justify-center",
                "md:h-[min(52svh,32rem)]",
                "lg:aspect-auto lg:h-full lg:min-h-0",
              )
            : "block aspect-4/5 lg:aspect-3/4 lg:max-h-[min(36rem,70svh)]",
        )}
        onClick={handleOpen}
        aria-label={`Powiększ zdjęcie ${index + 1}`}
      >
        <img
          ref={(node) => registerImage(index, node)}
          src={image.src}
          alt={image.alt}
          className={cn(
            "size-full",
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

export function ProductGallery({
  images,
  layout = "default",
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOrigin, setLightboxOrigin] =
    useState<LightboxOpenOrigin | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);

  const swiperRef = useRef<SwiperInstance | null>(null);
  const slideImageRefs = useRef<Map<number, HTMLImageElement>>(new Map());

  const isMulti = images.length > 1;
  const fillViewport = layout === "viewport";
  const useThumbStrip = isMulti && images.length <= GALLERY_THUMB_STRIP_MAX;

  const registerSlideImage = useCallback(
    (index: number, node: HTMLImageElement | null) => {
      if (node) {
        slideImageRefs.current.set(index, node);
        return;
      }
      slideImageRefs.current.delete(index);
    },
    [],
  );

  const getSlideRect = useCallback((index: number) => {
    return slideImageRefs.current.get(index)?.getBoundingClientRect() ?? null;
  }, []);

  useEffect(() => {
    lockLightboxScroll(lightboxOpen);
    return () => lockLightboxScroll(false);
  }, [lightboxOpen]);

  // Imperatively disable the stage Keyboard module - the `enabled` prop alone can lag
  // behind open state and steal arrow keys from the lightbox.
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.keyboard) return;
    if (lightboxOpen) {
      swiper.keyboard.disable();
      return;
    }
    swiper.keyboard.enable();
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

  /** Lock scroll first, then remeasure - keeps FLIP origin aligned with the locked viewport. */
  const openLightboxMeasured = (index: number, origin: LightboxOpenOrigin) => {
    lockLightboxScroll(true);
    const img = slideImageRefs.current.get(index);

    const open = () => {
      requestAnimationFrame(() => {
        const node = slideImageRefs.current.get(index);
        const rect = node?.getBoundingClientRect() ?? origin.rect;
        const aspectRatio =
          node && node.naturalWidth > 0 && node.naturalHeight > 0
            ? node.naturalWidth / node.naturalHeight
            : (origin.aspectRatio ??
              (images[index]
                ? (peekImageAspectRatio(images[index].src) ?? undefined)
                : undefined));
        openLightbox(index, {
          ...origin,
          rect,
          aspectRatio,
        });
      });
    };

    if (img?.decode) {
      void img.decode().then(open).catch(open);
      return;
    }
    open();
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
    const img = slideImageRefs.current.get(activeIndex);
    const rect = img?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
    const aspectRatio =
      img && img.naturalWidth > 0 && img.naturalHeight > 0
        ? img.naturalWidth / img.naturalHeight
        : undefined;
    openLightboxMeasured(activeIndex, {
      rect,
      objectPosition: productImageObjectPosition(image),
      aspectRatio,
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
          fillViewport &&
            "flex flex-col gap-3 pb-2 lg:h-full lg:min-h-0 lg:gap-8 lg:pb-8",
        )}
      >
        <div
          aria-label="Galeria produktu"
          className={fillViewport ? "lg:h-full lg:min-h-0" : undefined}
        >
          <GallerySlideContent
            image={image}
            index={0}
            onOpen={(origin) => openLightboxMeasured(0, origin)}
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
        fillViewport && "flex flex-col pb-2 lg:h-full lg:min-h-0 lg:pb-8",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          fillViewport && "lg:min-h-0 lg:flex-1 lg:gap-4",
        )}
        aria-label="Galeria produktu"
      >
        <div
          className={cn(
            "relative min-w-0 overflow-x-clip",
            fillViewport && "lg:flex lg:min-h-0 lg:flex-1 lg:flex-col",
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
                : "max-h-[calc(100svh-4.5rem-3rem)] lg:max-h-[min(36rem,70svh)] [&_.swiper-slide]:h-auto",
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
                  onOpen={(origin) => openLightboxMeasured(index, origin)}
                  registerImage={registerSlideImage}
                  isHidden={lightboxClosing && lightboxIndex === index}
                  fillViewport={fillViewport}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Cover GPU/subpixel hairline on the stage’s right edge (not the next slide). */}
          <div
            className="pointer-events-none absolute inset-y-0 inset-e-0 z-1 w-px bg-neutral-50"
            aria-hidden
          />

          {/* Mobile: counter + arrows over the stage (no thumb strip). */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-2 flex items-end justify-between gap-3 px-4 lg:hidden">
            <GalleryCounter
              activeIndex={activeIndex}
              count={images.length}
              className="pointer-events-auto"
            />
            <GalleryNavButtons
              activeIndex={activeIndex}
              count={images.length}
              onPrev={goToPrev}
              onNext={goToNext}
              className="pointer-events-auto"
            />
          </div>
        </div>

        {/* Desktop: thumbs (or counter) + controls on one row. */}
        <div className="hidden min-w-0 shrink-0 items-center justify-between gap-3 lg:flex">
          {useThumbStrip ? (
            <GalleryThumbnailRail
              images={images}
              activeIndex={activeIndex}
              onSelect={goToSlide}
              className="min-w-0 flex-1"
            />
          ) : (
            <GalleryCounter activeIndex={activeIndex} count={images.length} />
          )}
          <GalleryNavButtons
            activeIndex={activeIndex}
            count={images.length}
            onPrev={goToPrev}
            onNext={goToNext}
            onZoom={openZoom}
            showZoom
            className="shrink-0"
          />
        </div>
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
