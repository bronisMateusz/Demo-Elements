import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { EASE_LUXURY, EASE_OUT } from "../../lib/motionEase";
import {
  LIGHTBOX_MOTION,
  LIGHTBOX_SWIPER_SPEED_MS,
} from "../../lib/lightboxMotion";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import {
  computeLightboxTargetRect,
  peekImageAspectRatio,
} from "../../lib/lightboxImageRect";
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

function resolveAspect(image: ProductImage, fallback?: number): number {
  return (
    peekImageAspectRatio(image.src) ??
    fallback ??
    (image.focalPoint ? 4 / 3 : 3 / 2)
  );
}

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
  const reducedMotion = useMotionReduced();
  const [isZoomed, setIsZoomed] = useState(false);
  const [phase, setPhase] = useState<LightboxPhase>(() =>
    reducedMotion ? "open" : "enter",
  );
  const [exitOrigin, setExitOrigin] = useState<LightboxOpenOrigin | null>(null);
  const [showFlyer, setShowFlyer] = useState(!reducedMotion);
  const [flyerFadingOut, setFlyerFadingOut] = useState(false);
  const [contentVisible, setContentVisible] = useState(reducedMotion);
  const [stageReady, setStageReady] = useState(reducedMotion);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [viewportEpoch, setViewportEpoch] = useState(0);
  const hasMultiple = images.length > 1;
  const activeImage = images[index];
  const activeAspect = resolveAspect(activeImage, origin.aspectRatio);

  useEffect(() => {
    const onResize = () => setViewportEpoch((value) => value + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fixed inset-0 stage matches the window - derive the contained frame during render
  // so flyer and Swiper always share the same pixel size.
  void viewportEpoch;
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const activeFrame =
    viewportWidth > 0 && viewportHeight > 0
      ? computeLightboxTargetRect(viewportWidth, viewportHeight, activeAspect, {
          left: 0,
          top: 0,
        })
      : null;

  const handleFlyerPositionComplete = useCallback(() => {
    setPhase("open");
    if (reducedMotion) {
      setShowFlyer(false);
      setContentVisible(true);
      setStageReady(true);
      return;
    }
    // Mount Swiper under the flyer - images are pinned to the same pixel frame.
    setContentVisible(true);
  }, [reducedMotion]);

  // Drop the flyer only after the pinned slide has painted.
  useEffect(() => {
    if (
      reducedMotion ||
      !contentVisible ||
      !stageReady ||
      !showFlyer ||
      !activeFrame
    )
      return;
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        setShowFlyer(false);
        setFlyerFadingOut(false);
      });
    });
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [activeFrame, contentVisible, reducedMotion, showFlyer, stageReady]);

  useEffect(() => {
    if (reducedMotion || !contentVisible || stageReady) return;
    const timer = window.setTimeout(() => setStageReady(true), 400);
    return () => window.clearTimeout(timer);
  }, [contentVisible, reducedMotion, stageReady]);

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
      aspectRatio: peekImageAspectRatio(activeImage.src) ?? undefined,
    });
    setContentVisible(false);
    setChromeVisible(false);
    setShowFlyer(true);
    setFlyerFadingOut(false);
    onClosingStart();
    setPhase("exit");
  }, [
    activeImage,
    getSlideRect,
    index,
    isZoomed,
    onClose,
    onClosingStart,
    reducedMotion,
  ]);

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
      if (event.key === "Escape") {
        const swiper = swiperRef.current;
        if (swiper?.zoom && swiper.zoom.scale > 1) {
          swiper.zoom.out();
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        requestClose();
        return;
      }

      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
      if (!hasMultiple || isZoomed || phase === "exit") return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA")
      ) {
        return;
      }

      // Capture + stop so the underlying ProductGallery Keyboard module cannot steal arrows.
      event.preventDefault();
      event.stopPropagation();

      const swiper = swiperRef.current;
      const count = images.length;
      if (!swiper || count < 2) return;

      const current = hasMultiple ? swiper.realIndex : swiper.activeIndex;
      const delta = event.key === "ArrowLeft" ? -1 : 1;
      const next = (current + delta + count) % count;

      if (hasMultiple) {
        swiper.slideToLoop(next);
        return;
      }
      swiper.slideTo(next);
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [hasMultiple, images.length, isZoomed, phase, requestClose]);

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
      className={cn(
        "fixed inset-0 z-400 h-svh max-h-svh w-full overflow-hidden overscroll-none",
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

      {showFlyer && phase !== "exit" && activeFrame ? (
        <ProductGalleryLightboxFlyer
          image={activeImage}
          origin={origin}
          mode="enter"
          targetRect={activeFrame}
          fadingOut={flyerFadingOut}
          onPositionComplete={handleFlyerPositionComplete}
          onFadeComplete={handleFlyerFadeComplete}
        />
      ) : null}

      {phase === "exit" && exitOrigin && activeFrame ? (
        <ProductGalleryLightboxFlyer
          image={activeImage}
          origin={exitOrigin}
          mode="exit"
          targetRect={activeFrame}
          onPositionComplete={() => undefined}
          onFadeComplete={onClose}
        />
      ) : null}
      {phase !== "exit" ? (
        <motion.div
          className={cn(
            "absolute inset-0 z-10",
            !stageReady && "[&_.swiper-zoom-container]:transition-none!",
          )}
          initial={false}
          animate={{ opacity: contentVisible && stageReady ? 1 : 0 }}
          transition={{ duration: 0 }}
          style={{
            pointerEvents: contentVisible && stageReady ? "auto" : "none",
          }}
        >
          <Swiper
            className="size-full [&_.swiper-slide]:box-border [&_.swiper-wrapper]:h-full"
            loop={hasMultiple}
            initialSlide={index}
            slidesPerView={1}
            speed={LIGHTBOX_SWIPER_SPEED_MS}
            resistanceRatio={0.85}
            modules={[Mousewheel, A11y, Zoom]}
            zoom={{ maxRatio: 3, minRatio: 1, toggle: false }}
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
              onIndexChange(
                hasMultiple ? swiper.realIndex : swiper.activeIndex,
              );
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
            {images.map((image, imageIndex) => {
              const aspect = resolveAspect(
                image,
                imageIndex === index ? origin.aspectRatio : undefined,
              );
              const frame = computeLightboxTargetRect(
                viewportWidth || window.innerWidth,
                viewportHeight || window.innerHeight,
                aspect,
              );
              return (
                <SwiperSlide
                  key={image.src}
                  className="flex! h-full! items-center justify-center"
                >
                  <div className="swiper-zoom-container flex size-full items-center justify-center">
                    <img
                      src={image.src}
                      alt={image.alt}
                      // Pin to the same contained pixel size as the flyer - never full-bleed.
                      width={Math.round(frame.width)}
                      height={Math.round(frame.height)}
                      className="block max-h-full max-w-full object-contain"
                      style={{
                        width: frame.width,
                        height: frame.height,
                      }}
                      draggable={false}
                      onLoad={() => {
                        if (imageIndex === index) setStageReady(true);
                      }}
                      ref={(node) => {
                        if (imageIndex !== index || !node) return;
                        if (node.complete && node.naturalWidth > 0)
                          setStageReady(true);
                      }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
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

/** Controls layer - kept above the flyer (z-410) so it never gets covered. */
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
      className="pointer-events-none absolute inset-0 z-410"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{
        duration: LIGHTBOX_MOTION.chromeFadeDuration,
        ease: EASE_OUT,
      }}
    >
      <div className="absolute top-[clamp(1.25rem,2.222vw,2.5rem)] inset-s-[clamp(1.25rem,2.222vw,2.5rem)]">
        <IconButton
          label={isZoomed ? "Pomniejsz" : "Powiększ"}
          iconClass={
            isZoomed
              ? "ph ph-magnifying-glass-minus"
              : "ph ph-magnifying-glass-plus"
          }
          variant="elevated"
          className="pointer-events-auto shadow-subtle"
          onClick={onToggleZoom}
        />
      </div>

      <div className="absolute top-[clamp(1.25rem,2.222vw,2.5rem)] inset-e-[clamp(1.25rem,2.222vw,2.5rem)]">
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
          {/* Arrows float over the image (desktop). Mobile: swipe + thumbs. */}
          <div className="pointer-events-none absolute inset-y-0 inset-s-[clamp(1.25rem,2.222vw,2.5rem)] hidden items-center md:flex">
            <IconButton
              label="Poprzednie zdjęcie"
              iconClass="ph ph-caret-left"
              variant="elevated"
              className="pointer-events-auto shadow-subtle"
              onClick={onPrev}
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 inset-e-[clamp(1.25rem,2.222vw,2.5rem)] hidden items-center md:flex">
            <IconButton
              label="Następne zdjęcie"
              iconClass="ph ph-caret-right"
              variant="elevated"
              className="pointer-events-auto shadow-subtle"
              onClick={onNext}
            />
          </div>
          <div className="absolute bottom-[clamp(1.25rem,2.222vw,2.5rem)] inset-x-[clamp(1.25rem,2.222vw,2.5rem)] flex justify-center gap-2 overflow-x-auto md:justify-start md:max-w-[min(100%-2*clamp(1.25rem,2.222vw,2.5rem),36rem)] md:inset-x-auto md:inset-s-[clamp(1.25rem,2.222vw,2.5rem)]">
            {images.map((image, thumbIndex) => {
              const isActive = thumbIndex === index;
              return (
                <button
                  key={image.src}
                  type="button"
                  className={cn(
                    "pointer-events-auto size-14 shrink-0 overflow-hidden border bg-neutral-50 transition-[border-color,opacity] duration-fast ease-out md:size-16",
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
                    className="size-full object-cover"
                    style={{
                      objectPosition: productImageObjectPosition(image),
                    }}
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
