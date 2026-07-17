import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Mousewheel, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { EASE_LUXURY, EASE_OUT } from "../../lib/motionEase";
import { LIGHTBOX_MOTION, LIGHTBOX_SWIPER_SPEED_MS } from "../../lib/lightboxMotion";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { IconButton } from "../ui/IconButton";
import type { ProductImage } from "../../types/product";
import {
  ProductGalleryLightboxFlyer,
  type LightboxOpenOrigin,
} from "./ProductGalleryLightboxFlyer";
import "swiper/css";
import "swiper/css/zoom";

type ProductGalleryLightboxProps = {
  images: ProductImage[];
  index: number;
  origin: LightboxOpenOrigin;
  getSlideRect: (index: number) => DOMRectReadOnly | null;
  onClosingStart: () => void;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

type LightboxPhase = "enter" | "open" | "exit";

export function ProductGalleryLightbox({
  images,
  index,
  origin,
  getSlideRect,
  onClosingStart,
  onClose,
  onIndexChange,
}: ProductGalleryLightboxProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMotionReduced();
  const [isZoomed, setIsZoomed] = useState(false);
  const [phase, setPhase] = useState<LightboxPhase>(() => (reducedMotion ? "open" : "enter"));
  const [exitOrigin, setExitOrigin] = useState<LightboxOpenOrigin | null>(null);
  const [showFlyer, setShowFlyer] = useState(!reducedMotion);
  const [flyerFadingOut, setFlyerFadingOut] = useState(false);
  const [contentVisible, setContentVisible] = useState(reducedMotion);
  const [chromeVisible, setChromeVisible] = useState(true);
  const hasMultiple = images.length > 1;
  const activeImage = images[index];

  const handleFlyerPositionComplete = useCallback(() => {
    setPhase("open");
    if (reducedMotion) {
      setShowFlyer(false);
      setContentVisible(true);
      return;
    }
    setContentVisible(true);
    setFlyerFadingOut(true);
  }, [reducedMotion]);

  const handleFlyerFadeComplete = useCallback(() => {
    setShowFlyer(false);
    setFlyerFadingOut(false);
  }, []);

  const requestClose = useCallback(() => {
    if (reducedMotion || isZoomed) {
      if (isZoomed) {
        swiperRef.current?.zoom?.out();
        return;
      }
      onClose();
      return;
    }

    const slideRect = getSlideRect(index);
    if (!slideRect) {
      onClose();
      return;
    }

    setExitOrigin({
      rect: slideRect,
      objectPosition: productImageObjectPosition(activeImage),
    });
    setContentVisible(false);
    setChromeVisible(false);
    setShowFlyer(true);
    setFlyerFadingOut(false);
    onClosingStart();
    setPhase("exit");
  }, [activeImage, getSlideRect, index, isZoomed, onClose, onClosingStart, reducedMotion]);

  // Sync the swiper when the index is driven from outside (thumbnails/rail).
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (hasMultiple && swiper.realIndex !== index) {
      swiper.slideToLoop(index);
      return;
    }
    if (!hasMultiple && swiper.activeIndex !== index) {
      swiper.slideTo(index);
    }
  }, [hasMultiple, index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const swiper = swiperRef.current;
      if (swiper?.zoom && swiper.zoom.scale > 1) {
        swiper.zoom.out();
        return;
      }
      requestClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [requestClose]);

  // Measure the actual container so the flyer target matches the slide box
  // (window globals can differ by scrollbar / preview chrome).
  const getViewport = useCallback(() => {
    const el = containerRef.current;
    if (!el) {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    return { width: el.clientWidth, height: el.clientHeight };
  }, []);

  const toggleZoom = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper?.zoom) return;
    if (swiper.zoom.scale > 1) {
      swiper.zoom.out();
      return;
    }
    swiper.zoom.in();
  }, []);

  return createPortal(
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[400] h-svh max-h-svh w-full overflow-hidden overscroll-none",
        "[&_.swiper-slide-zoomed_.swiper-zoom-container]:cursor-grab [&_.swiper-slide:not(.swiper-slide-zoomed)_.swiper-zoom-container]:cursor-zoom-in",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Powiększone zdjęcie produktu"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-0"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{
          delay:
            phase === "enter" && !reducedMotion
              ? LIGHTBOX_MOTION.overlayEnterDelay
              : phase === "exit"
                ? LIGHTBOX_MOTION.overlayExitDelay
                : 0,
          duration:
            phase === "exit"
              ? LIGHTBOX_MOTION.overlayExitDuration
              : LIGHTBOX_MOTION.overlayEnterDuration,
          ease: phase === "exit" ? EASE_LUXURY : EASE_OUT,
        }}
      />

      {showFlyer && phase !== "exit" ? (
        <ProductGalleryLightboxFlyer
          image={activeImage}
          origin={origin}
          mode="enter"
          fadingOut={flyerFadingOut}
          getViewport={getViewport}
          onPositionComplete={handleFlyerPositionComplete}
          onFadeComplete={handleFlyerFadeComplete}
        />
      ) : null}

      {phase === "exit" && exitOrigin ? (
        <ProductGalleryLightboxFlyer
          image={activeImage}
          origin={exitOrigin}
          mode="exit"
          getViewport={getViewport}
          onPositionComplete={() => undefined}
          onFadeComplete={onClose}
        />
      ) : null}

      {phase === "open" || contentVisible ? (
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ duration: LIGHTBOX_MOTION.contentFadeDuration, ease: EASE_OUT }}
          style={{ pointerEvents: contentVisible ? "auto" : "none" }}
        >
          <Swiper
            className="absolute inset-0 z-10 h-full w-full [&_.swiper-slide]:box-border [&_.swiper-wrapper]:h-full"
            loop={hasMultiple}
            initialSlide={index}
            slidesPerView={1}
            speed={LIGHTBOX_SWIPER_SPEED_MS}
            resistanceRatio={0.85}
            modules={[Keyboard, Mousewheel, A11y, Zoom]}
            keyboard={{ enabled: true }}
            zoom={{ maxRatio: 3, toggle: false }}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 0.9,
            }}
            a11y={{
              prevSlideMessage: "Poprzednie zdjęcie",
              nextSlideMessage: "Następne zdjęcie",
            }}
            onClick={(swiper, event) => {
              swiper.zoom?.toggle(event);
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onTouchStart={handleFlyerFadeComplete}
            onSlideChangeTransitionStart={handleFlyerFadeComplete}
            onSlideChange={(swiper) => {
              onIndexChange(hasMultiple ? swiper.realIndex : swiper.activeIndex);
              setIsZoomed(false);
            }}
            onZoomChange={(swiper, scale) => {
              setIsZoomed(scale > 1);
              if (scale > 1) {
                swiper.mousewheel.disable();
                return;
              }
              swiper.mousewheel.enable();
            }}
          >
            {images.map((image) => (
              <SwiperSlide key={image.src} className="!flex !h-full items-start justify-center">
                <div className="swiper-zoom-container flex h-full w-full items-start justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="block h-full w-full object-contain object-top"
                    draggable={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      ) : null}

      <LightboxControls
        images={images}
        index={index}
        hasMultiple={hasMultiple}
        isZoomed={isZoomed}
        visible={chromeVisible}
        reducedMotion={reducedMotion}
        onToggleZoom={toggleZoom}
        onClose={requestClose}
        onPrev={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
        onSelect={(target) => swiperRef.current?.slideToLoop(target)}
      />
    </div>,
    document.body,
  );
}

type LightboxControlsProps = {
  images: ProductImage[];
  index: number;
  hasMultiple: boolean;
  isZoomed: boolean;
  visible: boolean;
  reducedMotion: boolean;
  onToggleZoom: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

/** Controls layer — kept above the flyer (z-[410]) so it never gets covered. */
function LightboxControls({
  images,
  index,
  hasMultiple,
  isZoomed,
  visible,
  reducedMotion,
  onToggleZoom,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: LightboxControlsProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[410]"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: LIGHTBOX_MOTION.chromeFadeDuration, ease: EASE_OUT }}
    >
      <div className="absolute top-gutter left-gutter">
        <IconButton
          label={isZoomed ? "Pomniejsz" : "Powiększ"}
          iconClass={isZoomed ? "ph ph-magnifying-glass-minus" : "ph ph-magnifying-glass-plus"}
          variant="elevated"
          className="pointer-events-auto shadow-subtle"
          onClick={onToggleZoom}
        />
      </div>

      <div className="absolute top-gutter right-gutter">
        <IconButton
          label="Zamknij"
          iconClass="ph ph-x"
          variant="elevated"
          className="pointer-events-auto shadow-subtle"
          onClick={onClose}
        />
      </div>

      {hasMultiple ? (
        <>
          <div className="absolute top-1/2 left-gutter -translate-y-1/2">
            <IconButton
              label="Poprzednie zdjęcie"
              iconClass="ph ph-caret-left"
              variant="elevated"
              className="pointer-events-auto shadow-subtle"
              onClick={onPrev}
            />
          </div>
          <div className="absolute top-1/2 right-gutter -translate-y-1/2">
            <IconButton
              label="Następne zdjęcie"
              iconClass="ph ph-caret-right"
              variant="elevated"
              className="pointer-events-auto shadow-subtle"
              onClick={onNext}
            />
          </div>
          <div className="absolute bottom-gutter left-gutter flex max-w-[min(100%-2*var(--spacing-gutter),36rem)] gap-2 overflow-x-auto">
            {images.map((image, thumbIndex) => {
              const isActive = thumbIndex === index;
              return (
                <button
                  key={image.src}
                  type="button"
                  className={cn(
                    "pointer-events-auto h-14 w-14 shrink-0 overflow-hidden border bg-neutral-50 transition-[border-color,opacity] duration-fast ease-out md:h-16 md:w-16",
                    isActive
                      ? "border-neutral-900 opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100",
                  )}
                  aria-label={`Pokaż zdjęcie ${thumbIndex + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => onSelect(thumbIndex)}
                >
                  <img
                    src={image.src}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ objectPosition: productImageObjectPosition(image) }}
                    draggable={false}
                  />
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </motion.div>
  );
}
