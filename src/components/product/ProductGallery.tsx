import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { liftHeaderAboveLightbox, lockLightboxScroll } from "../../hooks/useSiteChrome";
import type { ProductImage } from "../../types/product";
import { ProductGalleryLightbox } from "./ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "./ProductGalleryLightboxFlyer";
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
            ? "flex h-full min-h-[min(60vh,640px)] lg:min-h-0"
            : "block aspect-[4/5]",
        )}
        onClick={handleOpen}
        aria-label={`Powiększ zdjęcie ${index + 1}`}
      >
        <img
          ref={(node) => registerImage(index, node)}
          src={image.src}
          alt={image.alt}
          className={cn("h-full w-full object-cover", isHidden && "opacity-0")}
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
      <div className={cn("min-w-0", fillViewport && "flex h-full min-h-0 flex-col gap-6 pb-6 lg:gap-8 lg:pb-8")}>
        <div aria-label="Galeria produktu" className={fillViewport ? "h-full min-h-0" : undefined}>
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
    <div className={cn("min-w-0", fillViewport && "flex h-full min-h-0 flex-col gap-6 pb-6 lg:gap-8 lg:pb-8")}>
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
      </div>

      <p
        className={cn(
          "text-sm text-neutral-500",
          fillViewport ? "shrink-0 lg:block" : "mt-3 hidden lg:block",
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
