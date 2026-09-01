import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import {
  sectionHeaderTrackGapClassName,
  sectionMarginTopClassName,
} from "../../lib/layoutTokens";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import { useBleedRightWidth } from "../../hooks/useBleedRightWidth";
import { useContentInsetPx } from "../../hooks/useContentInsetPx";
import { useGutterPx } from "../../hooks/useGutterPx";
import { iconButtonClassName } from "../ui/iconButtonClassName";
import { TextRevealLead } from "../motion/TextRevealLead";
import type { RelatedProduct } from "../../types/product";
import {
  productCarouselNavClassName,
  productCarouselRootClassName,
  productCarouselSlideClassName,
  productCarouselSwiperClassName,
  type ProductCarouselLayoutToken,
} from "./productCarouselClassName";
import { ProductCard } from "./ProductCard";
import "swiper/css";

type ProductCarouselLayout = ProductCarouselLayoutToken;

type ProductCarouselHeader = {
  title: string;
  titleId?: string;
};

export type ProductCarouselControls = {
  slidePrev: () => void;
  slideNext: () => void;
  atStart: boolean;
  atEnd: boolean;
  loop: boolean;
  /** Index among unique `products` (not cloned loop slides). */
  activeIndex: number;
  count: number;
};

type ProductCarouselProps = {
  products: RelatedProduct[];
  labelledBy?: string;
  className?: string;
  /** Align to the container's left edge; bleed right to the viewport edge (OKA). */
  bleed?: boolean;
  layout?: ProductCarouselLayout;
  header?: ProductCarouselHeader;
  /** `header` - arrows beside the title; `footer` - arrows + index under the track; `overlay` - on the track edges; `none` - parent owns nav. */
  navPlacement?: "overlay" | "header" | "footer" | "none";
  /** Sync nav state for external arrows (`navPlacement="none"`). */
  onControlsChange?: (controls: ProductCarouselControls) => void;
};

/** Clone products until we have enough slides to fill wide viewports in loop mode. */
function withClonedSlides(
  products: RelatedProduct[],
  minSlides: number,
): RelatedProduct[] {
  if (products.length <= 1) return products;
  const slides: RelatedProduct[] = [];
  while (slides.length < minSlides) {
    slides.push(...products);
  }
  return slides;
}

export function ProductCarouselNavButtons({
  atStart,
  atEnd,
  layout,
  loop,
  onPrev,
  onNext,
  className,
}: {
  atStart: boolean;
  atEnd: boolean;
  layout: ProductCarouselLayout;
  loop: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  const prevDisabled = !loop && atStart;
  const nextDisabled = !loop && atEnd;

  return (
    <div className={cn("flex shrink-0 items-center gap-1", className)}>
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: productCarouselNavClassName({
            placement: "header",
            layout,
            disabled: prevDisabled,
          }),
        })}
        aria-label="Poprzednie produkty"
        disabled={prevDisabled}
        onClick={onPrev}
      >
        <i className="ph ph-caret-left" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: productCarouselNavClassName({
            placement: "header",
            layout,
            disabled: nextDisabled,
          }),
        })}
        aria-label="Następne produkty"
        disabled={nextDisabled}
        onClick={onNext}
      >
        <i className="ph ph-caret-right" aria-hidden="true" />
      </button>
    </div>
  );
}

function ProductCarouselFooterNav({
  activeIndex,
  count,
  atStart,
  atEnd,
  loop,
  layout,
  onPrev,
  onNext,
}: {
  activeIndex: number;
  count: number;
  atStart: boolean;
  atEnd: boolean;
  loop: boolean;
  layout: ProductCarouselLayout;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (count <= 1) return null;

  const prevDisabled = !loop && atStart;
  const nextDisabled = !loop && atEnd;
  const isBleed = layout === "bleed";

  return (
    <div
      className={cn(
        sectionMarginTopClassName,
        "flex items-center justify-center gap-3",
        isBleed &&
          "mx-auto w-full max-w-384 px-[clamp(0.75rem,2.222vw,2.5rem)]",
      )}
    >
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: cn(
            "shadow-subtle",
            prevDisabled && "pointer-events-none opacity-35",
          ),
        })}
        aria-label="Poprzednie produkty"
        disabled={prevDisabled}
        onClick={onPrev}
      >
        <i className="ph ph-caret-left" aria-hidden="true" />
      </button>
      <p
        className="m-0 min-w-14 text-center font-body text-sm tabular-nums tracking-[0.12em] text-neutral-600"
        aria-live="polite"
      >
        {formatSlideIndex(activeIndex, count)}
      </p>
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: cn(
            "shadow-subtle",
            nextDisabled && "pointer-events-none opacity-35",
          ),
        })}
        aria-label="Następne produkty"
        disabled={nextDisabled}
        onClick={onNext}
      >
        <i className="ph ph-caret-right" aria-hidden="true" />
      </button>
    </div>
  );
}

export function ProductCarousel({
  products,
  labelledBy,
  className,
  bleed = true,
  layout,
  header,
  navPlacement,
  onControlsChange,
}: ProductCarouselProps) {
  const resolvedLayout: ProductCarouselLayout =
    layout ?? (bleed ? "bleed" : "contained");
  const isInline =
    resolvedLayout === "inline" || resolvedLayout === "inline-bleed";
  const isInlineBleed = resolvedLayout === "inline-bleed";
  const isBleed = resolvedLayout === "bleed";
  const resolvedNavPlacement =
    navPlacement ?? (isInline ? "header" : "overlay");
  const showHeaderNav = Boolean(header) && resolvedNavPlacement === "header";
  const showFooterNav =
    resolvedNavPlacement === "footer" && products.length > 1;
  const showOverlayNav =
    resolvedNavPlacement === "overlay" && products.length > 1;
  const gutterPx = useGutterPx();
  const contentInsetPx = useContentInsetPx();
  const bleedInsetPx = isBleed ? contentInsetPx : gutterPx;
  const trackBleedRef = useRef<HTMLDivElement>(null);
  const bleedRightWidth = useBleedRightWidth(trackBleedRef);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const enableLoop = !isInline && products.length > 1;
  // Ultrawide needs enough duplicates so a clone always peeks past the right edge.
  const minLoopSlides = isBleed ? 20 : 12;
  const slides = useMemo(
    () => (enableLoop ? withClonedSlides(products, minLoopSlides) : products),
    [products, enableLoop, minLoopSlides],
  );
  const productCount = products.length;

  const syncEdges = (instance: SwiperInstance) => {
    const real = instance.realIndex ?? instance.activeIndex;
    setActiveIndex(productCount > 0 ? real % productCount : 0);

    if (instance.params.loop) {
      setAtStart(false);
      setAtEnd(false);
      return;
    }
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  const slidePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);
  const slideNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  const onControlsChangeRef = useRef(onControlsChange);
  useEffect(() => {
    onControlsChangeRef.current = onControlsChange;
  }, [onControlsChange]);

  useEffect(() => {
    onControlsChangeRef.current?.({
      slidePrev,
      slideNext,
      atStart,
      atEnd,
      loop: enableLoop,
      activeIndex,
      count: productCount,
    });
  }, [
    slidePrev,
    slideNext,
    atStart,
    atEnd,
    enableLoop,
    activeIndex,
    productCount,
  ]);

  const swiperKey = isBleed
    ? `bleed-${bleedInsetPx}-${slides.length}`
    : isInlineBleed
      ? `inline-bleed-${gutterPx}-${bleedRightWidth ?? 0}-${slides.length}`
      : `${resolvedLayout}-${slides.length}`;

  const prevDisabled = !enableLoop && atStart;
  const nextDisabled = !enableLoop && atEnd;

  return (
    <div
      className={productCarouselRootClassName({
        layout: resolvedLayout,
        className,
      })}
      aria-labelledby={labelledBy ?? header?.titleId}
    >
      {header ? (
        <div
          className={cn(
            "flex flex-wrap items-end justify-between gap-6",
            isBleed
              ? cn(
                  "mx-auto w-full max-w-384 px-[clamp(0.75rem,2.222vw,2.5rem)]",
                  sectionHeaderTrackGapClassName,
                )
              : "mb-4",
          )}
        >
          {isBleed && !isInline ? (
            <TextRevealLead
              id={header.titleId}
              revealUnit="word"
              className="min-w-0 max-w-2xl"
              typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
              mutedClassName="text-neutral-900/20"
              fillClassName="text-neutral-900"
            >
              {header.title}
            </TextRevealLead>
          ) : (
            <h2
              id={header.titleId}
              className={cn(
                "m-0 min-w-0 font-heading text-neutral-900",
                isInline ? "t-h3" : "t-h2",
              )}
            >
              {header.title}
            </h2>
          )}
          {showHeaderNav ? (
            <ProductCarouselNavButtons
              atStart={atStart}
              atEnd={atEnd}
              layout={resolvedLayout}
              loop={enableLoop}
              onPrev={slidePrev}
              onNext={slideNext}
            />
          ) : null}
        </div>
      ) : null}

      <div
        ref={isInlineBleed ? trackBleedRef : undefined}
        className={cn(isInlineBleed && "relative max-w-none overflow-visible")}
        style={
          isInlineBleed && bleedRightWidth
            ? { width: bleedRightWidth, maxWidth: "none" }
            : undefined
        }
      >
        <Swiper
          key={swiperKey}
          className={productCarouselSwiperClassName(resolvedLayout)}
          modules={[A11y, Mousewheel]}
          watchOverflow={!enableLoop}
          loop={enableLoop}
          loopAdditionalSlides={enableLoop ? Math.max(products.length, 4) : 0}
          slidesPerView="auto"
          spaceBetween={isInline ? 12 : 5}
          slidesOffsetBefore={isBleed ? bleedInsetPx : undefined}
          // Peek clones past the right edge on ultrawide (left stays content-aligned).
          slidesOffsetAfter={isBleed ? gutterPx : undefined}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: !enableLoop,
            sensitivity: 0.85,
          }}
          onSwiper={(instance) => {
            setSwiper(instance);
            syncEdges(instance);
          }}
          onSlideChange={syncEdges}
          onResize={syncEdges}
          onSlidesUpdated={syncEdges}
          a11y={{
            prevSlideMessage: "Poprzednie produkty",
            nextSlideMessage: "Następne produkty",
          }}
        >
          {slides.map((product, index) => (
            <SwiperSlide
              key={`${product.id}-${index}`}
              className={productCarouselSlideClassName(resolvedLayout)}
            >
              <ProductCard
                product={product}
                layout="carousel"
                compact={isInline}
                className="h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showOverlayNav ? (
        <>
          <button
            type="button"
            className={iconButtonClassName({
              variant: "elevated",
              className: productCarouselNavClassName({
                placement: "prev",
                layout: resolvedLayout,
                disabled: prevDisabled,
              }),
            })}
            aria-label="Poprzednie produkty"
            disabled={prevDisabled}
            onClick={slidePrev}
          >
            <i className="ph ph-caret-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={iconButtonClassName({
              variant: "elevated",
              className: productCarouselNavClassName({
                placement: "next",
                layout: resolvedLayout,
                disabled: nextDisabled,
              }),
            })}
            aria-label="Następne produkty"
            disabled={nextDisabled}
            onClick={slideNext}
          >
            <i className="ph ph-caret-right" aria-hidden="true" />
          </button>
        </>
      ) : null}

      {showFooterNav ? (
        <ProductCarouselFooterNav
          activeIndex={activeIndex}
          count={productCount}
          atStart={atStart}
          atEnd={atEnd}
          loop={enableLoop}
          layout={resolvedLayout}
          onPrev={slidePrev}
          onNext={slideNext}
        />
      ) : null}
    </div>
  );
}
