import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { assetUrl } from "../../app/assets";
import { useGutterPx } from "../../hooks/useGutterPx";
import { liftHeaderAboveLightbox, lockLightboxScroll } from "../../hooks/useSiteChrome";
import { cn } from "../../lib/cn";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import { peekImageAspectRatio } from "../../lib/lightboxImageRect";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { InspirationArrangement } from "../../types/product";
import { BrandMotif } from "../brand/BrandMotif";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { IconButton } from "../ui/IconButton";
import { iconButtonClassName } from "../ui/iconButtonClassName";
import { TextRevealLead } from "../motion/TextRevealLead";
import { ProductGalleryLightbox } from "./ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "./ProductGalleryLightboxFlyer";
import "swiper/css";

export type ProductInspirationControls = {
  slidePrev: () => void;
  slideNext: () => void;
  atStart: boolean;
  atEnd: boolean;
  activeIndex: number;
  count: number;
};

type ProductInspirationProps = {
  arrangements: InspirationArrangement[];
  eyebrow?: string;
  title?: string;
  /** `header` - beside title; `footer` - under the track (default); `none` - parent owns nav. */
  navPlacement?: "header" | "footer" | "none";
  onControlsChange?: (controls: ProductInspirationControls) => void;
};

export function ProductInspiration({
  arrangements,
  eyebrow = "Produkt w aranżacji",
  title = "Inspiracje producenta",
  navPlacement = "footer",
  onControlsChange,
}: ProductInspirationProps) {
  const gutterPx = useGutterPx();
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxOrigin, setLightboxOrigin] = useState<LightboxOpenOrigin | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());
  const frameRefs = useRef<Map<number, HTMLElement>>(new Map());
  const showHeaderNav = navPlacement === "header" && arrangements.length > 1;
  const showFooterNav = navPlacement === "footer" && arrangements.length > 1;

  const registerImage = useCallback((index: number, node: HTMLImageElement | null) => {
    if (node) {
      imageRefs.current.set(index, node);
      return;
    }
    imageRefs.current.delete(index);
  }, []);

  const registerFrame = useCallback((index: number, node: HTMLElement | null) => {
    if (node) {
      frameRefs.current.set(index, node);
      return;
    }
    frameRefs.current.delete(index);
  }, []);

  const getSlideRect = useCallback((index: number) => {
    // Prefer the unscaled media frame so hover zoom does not skew the FLIP origin.
    return (
      frameRefs.current.get(index)?.getBoundingClientRect() ??
      imageRefs.current.get(index)?.getBoundingClientRect() ??
      null
    );
  }, []);

  useEffect(() => {
    lockLightboxScroll(lightboxOpen);
    return () => lockLightboxScroll(false);
  }, [lightboxOpen]);

  useEffect(() => {
    return () => liftHeaderAboveLightbox(false);
  }, []);

  const lastIndex = arrangements.length - 1;

  const syncEdges = (instance: SwiperInstance) => {
    // Prefer realIndex for edges - with slidesPerView:"auto", isEnd can trip before the last slide is active.
    const index = instance.realIndex;
    setActiveIndex(index);
    setAtStart(index <= 0);
    setAtEnd(index >= lastIndex);
  };

  const goPrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const goNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  const onControlsChangeRef = useRef(onControlsChange);
  useEffect(() => {
    onControlsChangeRef.current = onControlsChange;
  }, [onControlsChange]);

  useEffect(() => {
    onControlsChangeRef.current?.({
      slidePrev: goPrev,
      slideNext: goNext,
      atStart,
      atEnd,
      activeIndex,
      count: arrangements.length,
    });
  }, [goPrev, goNext, atStart, atEnd, activeIndex, arrangements.length]);

  const openLightbox = (index: number, origin: LightboxOpenOrigin) => {
    setLightboxIndex(index);
    setLightboxOrigin(origin);
    setLightboxClosing(false);
    liftHeaderAboveLightbox(false);
    setLightboxOpen(true);
  };

  const startClosing = () => {
    setLightboxClosing(true);
    liftHeaderAboveLightbox(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxOrigin(null);
    setLightboxClosing(false);
    liftHeaderAboveLightbox(false);
  };

  const openAt = (index: number) => {
    const image = arrangements[index]?.image;
    if (!image) return;
    const img = imageRefs.current.get(index);
    // Lock before measuring so origin/target share the same viewport width.
    lockLightboxScroll(true);

    const open = () => {
      requestAnimationFrame(() => {
        const node = imageRefs.current.get(index);
        const rect = node?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
        const aspectRatio =
          node && node.naturalWidth > 0 && node.naturalHeight > 0
            ? node.naturalWidth / node.naturalHeight
            : peekImageAspectRatio(image.src) ?? undefined;
        openLightbox(index, {
          rect,
          objectPosition: productImageObjectPosition(image),
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

  const lightboxImages = arrangements.map((arrangement) => ({
    ...arrangement.image,
    alt: arrangement.image.alt || arrangement.title,
  }));

  return (
    <section
      aria-labelledby="inspiration-title"
      className="relative overflow-x-clip"
    >
      <BrandMotif
        name="dots-grid"
        className={cn(
          "pointer-events-none absolute top-0 hidden h-52 w-12 opacity-30",
          // Only in the side gutter outside max-w-content - avoids overlapping the title.
          "inset-s-[max(0px,calc((100%-96rem)/2-3rem))] min-[110rem]:block",
        )}
      />

      <Container size="content" className="relative z-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <div className="min-w-0 max-w-2xl">
            <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            <TextRevealLead
              id="inspiration-title"
              revealUnit="word"
              className="max-w-none"
              typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
              mutedClassName="text-neutral-900/20"
              fillClassName="text-neutral-900"
            >
              {title}
            </TextRevealLead>
          </div>

          {showHeaderNav ? (
            <div className="flex items-center gap-4">
              <p className="m-0 font-body text-sm tabular-nums tracking-[0.12em] text-neutral-600">
                {formatSlideIndex(activeIndex, arrangements.length)}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className={iconButtonClassName({
                    variant: "elevated",
                    className: cn("shadow-subtle", atStart && "pointer-events-none opacity-35"),
                  })}
                  aria-label="Poprzednia aranżacja"
                  disabled={atStart}
                  onClick={goPrev}
                >
                  <i className="ph ph-caret-left" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={iconButtonClassName({
                    variant: "elevated",
                    className: cn("shadow-subtle", atEnd && "pointer-events-none opacity-35"),
                  })}
                  aria-label="Następna aranżacja"
                  disabled={atEnd}
                  onClick={goNext}
                >
                  <i className="ph ph-caret-right" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Container>

      <div
        className="relative"
        style={{ "--inspiration-inset": `${gutterPx}px` } as CSSProperties}
      >
        <Swiper
          key={`inspiration-${gutterPx}`}
          className={cn(
            "w-full cursor-grab touch-pan-y touch-[pan-y_pinch-zoom] active:cursor-grabbing",
            // Start at page gutter; peek past the right edge on ultrawide.
            "[&_.swiper-slide]:h-auto! [&_.swiper-slide]:w-[min(calc(100vw-var(--inspiration-inset)*2-2rem),72rem)]! [&_.swiper-slide]:shrink-0",
          )}
          modules={[A11y, Mousewheel]}
          slidesPerView="auto"
          spaceBetween={12}
          slidesOffsetBefore={gutterPx}
          slidesOffsetAfter={gutterPx}
          // Keep a snap point for the last slide when slides are nearly full-width.
          snapToSlideEdge
          watchOverflow
          grabCursor
          simulateTouch
          // Image open controls are buttons - keep them out of focusableElements so drag still starts on them.
          focusableElements="input, select, option, textarea, video, label"
          threshold={6}
          mousewheel={{
            enabled: true,
            // Only horizontal trackpad / shift+wheel - never steal vertical page scroll.
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 0.85,
          }}
          onSwiper={(instance) => {
            setSwiper(instance);
            syncEdges(instance);
          }}
          onSlideChange={syncEdges}
          onSlideChangeTransitionEnd={syncEdges}
          onFromEdge={syncEdges}
          onResize={syncEdges}
          onSlidesUpdated={syncEdges}
          a11y={{
            prevSlideMessage: "Poprzednia aranżacja",
            nextSlideMessage: "Następna aranżacja",
          }}
        >
          {arrangements.map((arrangement, index) => {
            const image = arrangement.image;
            const alt = image.alt || arrangement.title;

            return (
              <SwiperSlide key={arrangement.id}>
                <article className="grid overflow-hidden bg-neutral-100 md:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.85fr)]">
                  <div
                    ref={(node) => registerFrame(index, node)}
                    className="relative min-h-60 overflow-hidden bg-neutral-200 md:min-h-[min(28rem,52vh)]"
                  >
                    <button
                      type="button"
                      className="group/insp absolute inset-0 block cursor-inherit"
                      onClick={() => openAt(index)}
                      aria-label={`Powiększ: ${alt}`}
                    >
                      {/* Scale a GPU layer, not the <img> - same pattern as product cards. */}
                      <div
                        className={cn(
                          "absolute inset-0 origin-center transform-gpu backface-hidden",
                          "transition-transform duration-500 ease-out motion-reduce:transition-none",
                          "group-hover/insp:scale-[1.05] group-focus-visible/insp:scale-[1.05]",
                          "motion-reduce:group-hover/insp:scale-100 motion-reduce:group-focus-visible/insp:scale-100",
                        )}
                      >
                        <img
                          ref={(node) => registerImage(index, node)}
                          src={image.src}
                          alt={alt}
                          className={cn(
                            "pointer-events-none absolute inset-0 size-full object-cover",
                            lightboxClosing && lightboxIndex === index && "opacity-0",
                          )}
                          style={{ objectPosition: productImageObjectPosition(image) }}
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                    </button>
                    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-2 flex justify-end px-4">
                      <IconButton
                        label="Powiększ zdjęcie"
                        iconClass="ph ph-magnifying-glass-plus"
                        variant="elevated"
                        className="pointer-events-auto shadow-subtle"
                        onClick={() => openAt(index)}
                      />
                    </div>
                  </div>

                  <div className="relative flex flex-col justify-center border-t border-neutral-200/80 px-6 py-8 md:border-t-0 md:border-s md:px-8 md:py-10 lg:px-10">
                    <div
                      className="pointer-events-none absolute inset-0 bg-radial-[at_100%_0%] from-gold-500/14 to-transparent to-55%"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <h3 className="t-h3 mb-6 max-w-[16ch] text-balance md:mb-8">
                        {arrangement.title}
                      </h3>
                      <ul className="m-0 flex list-none flex-col gap-3 p-0">
                        {arrangement.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-ui leading-[1.75] text-neutral-700"
                          >
                            <img
                              src={assetUrl("sygnet.svg")}
                              alt=""
                              aria-hidden="true"
                              className="mt-1 size-3.5 shrink-0 opacity-70"
                              width={14}
                              height={14}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {showFooterNav ? (
        <Container
          size="content"
          className="mt-8 flex items-center justify-center gap-3 md:mt-10"
        >
          <button
            type="button"
            className={iconButtonClassName({
              variant: "elevated",
              className: cn("shadow-subtle", atStart && "pointer-events-none opacity-35"),
            })}
            aria-label="Poprzednia aranżacja"
            disabled={atStart}
            onClick={goPrev}
          >
            <i className="ph ph-caret-left" aria-hidden="true" />
          </button>
          <p
            className="m-0 min-w-14 text-center font-body text-sm tabular-nums tracking-[0.12em] text-neutral-600"
            aria-live="polite"
          >
            {formatSlideIndex(activeIndex, arrangements.length)}
          </p>
          <button
            type="button"
            className={iconButtonClassName({
              variant: "elevated",
              className: cn("shadow-subtle", atEnd && "pointer-events-none opacity-35"),
            })}
            aria-label="Następna aranżacja"
            disabled={atEnd}
            onClick={goNext}
          >
            <i className="ph ph-caret-right" aria-hidden="true" />
          </button>
        </Container>
      ) : null}

      {lightboxOpen && lightboxOrigin ? (
        <ProductGalleryLightbox
          images={lightboxImages}
          index={lightboxIndex}
          origin={lightboxOrigin}
          getSlideRect={getSlideRect}
          onClosingStart={startClosing}
          onClose={closeLightbox}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
