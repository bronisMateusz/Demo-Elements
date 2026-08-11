import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGutterPx } from "../../hooks/useGutterPx";
import {
  liftHeaderAboveLightbox,
  lockLightboxScroll,
} from "../../hooks/useSiteChrome";
import { cn } from "../../lib/cn";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import { peekImageAspectRatio } from "../../lib/lightboxImageRect";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { InspirationArrangement } from "../../types/product";
import { BrandMotif } from "../brand/BrandMotif";
import { TextRevealLead } from "../motion/TextRevealLead";
import { ProductGalleryLightbox } from "../product/ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "../product/ProductGalleryLightboxFlyer";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { iconButtonClassName } from "../ui/iconButtonClassName";
import {
  InspirationGalleryCard,
  type InspirationGalleryCardAction,
} from "./InspirationGalleryCard";
import {
  inspirationGalleryCardTitleClassName,
  inspirationGalleryEndCapClassName,
  inspirationGalleryEndCapDecoClassName,
  inspirationGalleryEndCapMediaClassName,
  inspirationGallerySlideClassName,
  inspirationGallerySwiperClassName,
} from "./inspirationGalleryClassName";
import { requestInspirationProductsDrawer } from "../../hooks/useInspirationProductsDrawer";
import "swiper/css";

export type InspirationGalleryControls = {
  slidePrev: () => void;
  slideNext: () => void;
  atStart: boolean;
  atEnd: boolean;
  activeIndex: number;
  count: number;
};

type InspirationGalleryProps = {
  arrangements: InspirationArrangement[];
  eyebrow?: string;
  title?: string;
  titleId?: string;
  /** `header` - beside title; `footer` - under the track (default); `none` - parent owns nav. */
  navPlacement?: "header" | "footer" | "none";
  /** Trailing hint slide - fills the empty peek beside the last card (not a link). */
  endCap?: {
    /** Optional footer hint (e.g. “Kliknij poniżej” when a see-more CTA follows). */
    label?: string;
    title?: string;
    description?: string;
  };
  /** Footer CTA under the track (same pattern as home inspirations). */
  seeMoreHref?: string;
  seeMoreLabel?: string;
  onControlsChange?: (controls: InspirationGalleryControls) => void;
};

function cardActionFor(
  arrangement: InspirationArrangement,
): InspirationGalleryCardAction {
  if (arrangement.href) return "link";
  if (arrangement.showProducts) return "products";
  return "lightbox";
}

/** Trailing inset so every arrangement can become the leftmost snap. With an
 *  endCap slide we only need the gutter - the CTA fills the empty peek. */
function endOffsetPx(
  instance: SwiperInstance,
  gutter: number,
  hasEndCap: boolean,
) {
  if (hasEndCap) return gutter;
  const slide = instance.slides[0] as HTMLElement | undefined;
  const slideWidth = slide?.getBoundingClientRect().width ?? 0;
  if (slideWidth <= 0) return gutter;
  return Math.max(gutter, Math.ceil(instance.width - slideWidth));
}

export function InspirationGallery({
  arrangements,
  eyebrow = "Inspiracje",
  title = "Poznaj nasze aranżacje i zainspiruj się",
  titleId = "inspiration-gallery-title",
  navPlacement = "footer",
  endCap,
  seeMoreHref,
  seeMoreLabel = "Zobacz więcej aranżacji",
  onControlsChange,
}: InspirationGalleryProps) {
  const gutterPx = useGutterPx();
  const [offsetAfterPx, setOffsetAfterPx] = useState(gutterPx);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxOrigin, setLightboxOrigin] =
    useState<LightboxOpenOrigin | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());
  const frameRefs = useRef<Map<number, HTMLElement>>(new Map());
  const showHeaderNav = navPlacement === "header" && arrangements.length > 1;
  const showFooterNav = navPlacement === "footer" && arrangements.length > 1;
  const showFooterCta = navPlacement === "footer" && Boolean(seeMoreHref);
  const showFooter = showFooterNav || showFooterCta;
  const arrangementCount = arrangements.length;
  const lastArrangementIndex = Math.max(0, arrangementCount - 1);
  const hasEndCap = Boolean(endCap);

  const registerImage = useCallback(
    (index: number, node: HTMLImageElement | null) => {
      if (node) {
        imageRefs.current.set(index, node);
        return;
      }
      imageRefs.current.delete(index);
    },
    [],
  );

  const registerFrame = useCallback(
    (index: number, node: HTMLElement | null) => {
      if (node) {
        frameRefs.current.set(index, node);
        return;
      }
      frameRefs.current.delete(index);
    },
    [],
  );

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

  const lastIndex = lastArrangementIndex;

  const syncEdges = useCallback(
    (instance: SwiperInstance) => {
      const real = instance.realIndex;
      // End-cap is an extra slide - counter still tracks arrangements only.
      const onCap = hasEndCap && real >= arrangementCount;
      setActiveIndex(onCap ? lastArrangementIndex : real);
      setAtStart(instance.isBeginning);
      setAtEnd(instance.isEnd || onCap);
    },
    [arrangementCount, hasEndCap, lastArrangementIndex],
  );

  const refreshTrackOffsets = useCallback(
    (instance: SwiperInstance) => {
      const next = endOffsetPx(instance, gutterPx, hasEndCap);
      if (instance.params.slidesOffsetAfter !== next) {
        instance.params.slidesOffsetAfter = next;
        instance.update();
      }
      setOffsetAfterPx((prev) => (prev === next ? prev : next));
      syncEdges(instance);
    },
    [gutterPx, hasEndCap, syncEdges],
  );

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

  // Keep the background slider in sync while the lightbox is open, so the
  // closing fly-back targets the slide the user is actually leaving from.
  const handleLightboxIndexChange = (index: number) => {
    setLightboxIndex(index);
    swiper?.slideTo(index, 0);
    setActiveIndex(index);
    setAtStart(index <= 0);
    setAtEnd(index >= lastIndex);
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
            : (peekImageAspectRatio(image.src) ?? undefined);
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
    <section aria-labelledby={titleId} className="relative overflow-x-clip">
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
              id={titleId}
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
                    className: cn(
                      "shadow-subtle",
                      atStart && "pointer-events-none opacity-35",
                    ),
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
                    className: cn(
                      "shadow-subtle",
                      atEnd && "pointer-events-none opacity-35",
                    ),
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

      <div className="relative">
        <Swiper
          key={`inspiration-gallery-${gutterPx}`}
          className={inspirationGallerySwiperClassName()}
          modules={[A11y, Mousewheel]}
          slidesPerView="auto"
          spaceBetween={20}
          slidesOffsetBefore={gutterPx}
          slidesOffsetAfter={offsetAfterPx}
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
            refreshTrackOffsets(instance);
          }}
          onSlideChange={syncEdges}
          onSlideChangeTransitionEnd={syncEdges}
          onResize={refreshTrackOffsets}
          onSlidesUpdated={refreshTrackOffsets}
          a11y={{
            prevSlideMessage: "Poprzednia aranżacja",
            nextSlideMessage: "Następna aranżacja",
          }}
        >
          {arrangements.map((arrangement, index) => {
            const action = cardActionFor(arrangement);

            return (
              <SwiperSlide
                key={arrangement.id}
                className={inspirationGallerySlideClassName()}
              >
                <InspirationGalleryCard
                  title={arrangement.title}
                  image={arrangement.image}
                  action={action}
                  href={arrangement.href}
                  productCount={
                    arrangement.products?.length ?? arrangement.items.length
                  }
                  imageRef={(node) => registerImage(index, node)}
                  frameRef={(node) => registerFrame(index, node)}
                  imageHidden={lightboxClosing && lightboxIndex === index}
                  onLightboxOpen={
                    action === "lightbox" ? () => openAt(index) : undefined
                  }
                  onProductsOpen={
                    action === "products"
                      ? () => requestInspirationProductsDrawer(arrangement)
                      : undefined
                  }
                />
              </SwiperSlide>
            );
          })}
          {endCap ? (
            <SwiperSlide
              key="inspiration-end-cap"
              className={inspirationGallerySlideClassName()}
            >
              <div className={inspirationGalleryEndCapClassName()}>
                <div className={inspirationGalleryEndCapMediaClassName()}>
                  <i
                    className={cn(
                      "ph ph-arrow-down",
                      inspirationGalleryEndCapDecoClassName(),
                    )}
                    aria-hidden="true"
                  />
                  <p className="relative m-0 font-heading text-h3 leading-tight text-neutral-900">
                    {endCap.title ?? "Więcej aranżacji"}
                  </p>
                  {endCap.description ? (
                    <p className="relative m-0 max-w-xs font-body text-ui leading-relaxed text-neutral-600">
                      {endCap.description}
                    </p>
                  ) : null}
                  {endCap.label ? (
                    <p className="relative m-0 inline-flex items-center gap-2 font-body text-ui font-medium text-neutral-700">
                      {endCap.label}
                      <i className="ph ph-arrow-down" aria-hidden="true" />
                    </p>
                  ) : null}
                </div>
                <p
                  className={inspirationGalleryCardTitleClassName()}
                  aria-hidden="true"
                >
                  &nbsp;
                </p>
              </div>
            </SwiperSlide>
          ) : null}
        </Swiper>
      </div>

      {showFooter ? (
        <Container
          size="content"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:mt-10"
        >
          {showFooterNav ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={iconButtonClassName({
                  variant: "elevated",
                  className: cn(
                    "shadow-subtle",
                    atStart && "pointer-events-none opacity-35",
                  ),
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
                  className: cn(
                    "shadow-subtle",
                    atEnd && "pointer-events-none opacity-35",
                  ),
                })}
                aria-label="Następna aranżacja"
                disabled={atEnd}
                onClick={goNext}
              >
                <i className="ph ph-caret-right" aria-hidden="true" />
              </button>
            </div>
          ) : null}

          {showFooterCta && seeMoreHref ? (
            <Button href={seeMoreHref} variant="secondary" className="w-fit">
              {seeMoreLabel}
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </Button>
          ) : null}
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
          onIndexChange={handleLightboxIndexChange}
        />
      ) : null}
    </section>
  );
}
