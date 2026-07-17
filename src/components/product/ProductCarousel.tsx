import { useMemo, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { useBleedRightWidth } from "../../hooks/useBleedRightWidth";
import { useGutterPx } from "../../hooks/useGutterPx";
import { iconButtonClassName } from "../ui/iconButtonClassName";
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

type ProductCarouselProps = {
  products: RelatedProduct[];
  labelledBy?: string;
  className?: string;
  /** Align to the container's left edge; bleed right to the viewport edge (OKA). */
  bleed?: boolean;
  layout?: ProductCarouselLayout;
  header?: ProductCarouselHeader;
};

/** Clone products until we have enough slides to fill wide viewports in loop mode. */
function withClonedSlides(products: RelatedProduct[], minSlides: number): RelatedProduct[] {
  if (products.length <= 1) return products;
  const slides: RelatedProduct[] = [];
  while (slides.length < minSlides) {
    slides.push(...products);
  }
  return slides;
}

function CarouselNavButtons({
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

export function ProductCarousel({
  products,
  labelledBy,
  className,
  bleed = true,
  layout,
  header,
}: ProductCarouselProps) {
  const resolvedLayout: ProductCarouselLayout = layout ?? (bleed ? "bleed" : "contained");
  const isInline = resolvedLayout === "inline" || resolvedLayout === "inline-bleed";
  const isInlineBleed = resolvedLayout === "inline-bleed";
  const gutterPx = useGutterPx();
  const trackBleedRef = useRef<HTMLDivElement>(null);
  const bleedRightWidth = useBleedRightWidth(trackBleedRef);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const enableLoop = products.length > 1;
  const slides = useMemo(
    () => (enableLoop ? withClonedSlides(products, isInline ? 8 : 12) : products),
    [products, enableLoop, isInline],
  );

  const syncEdges = (instance: SwiperInstance) => {
    if (instance.params.loop) {
      setAtStart(false);
      setAtEnd(false);
      return;
    }
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  const slidePrev = () => swiper?.slidePrev();
  const slideNext = () => swiper?.slideNext();
  const headerNav = isInline && header;
  const swiperKey =
    resolvedLayout === "bleed"
      ? `bleed-${gutterPx}-${slides.length}`
      : isInlineBleed
        ? `inline-bleed-${gutterPx}-${bleedRightWidth ?? 0}-${slides.length}`
        : `${resolvedLayout}-${slides.length}`;

  const prevDisabled = !enableLoop && atStart;
  const nextDisabled = !enableLoop && atEnd;

  return (
    <div
      className={productCarouselRootClassName({ layout: resolvedLayout, className })}
      aria-labelledby={labelledBy ?? header?.titleId}
    >
      {header ? (
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id={header.titleId}
            className={cn(
              "m-0 min-w-0 font-heading text-neutral-900",
              isInline ? "t-h3" : "t-h2",
            )}
          >
            {header.title}
          </h2>
          {headerNav ? (
            <CarouselNavButtons
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
        className={cn(isInlineBleed && "max-w-none")}
        style={isInlineBleed && bleedRightWidth ? { width: bleedRightWidth } : undefined}
      >
        <Swiper
          key={swiperKey}
          className={productCarouselSwiperClassName(resolvedLayout)}
          modules={[A11y, Mousewheel]}
          watchOverflow={!enableLoop}
          loop={enableLoop}
          loopAdditionalSlides={enableLoop ? products.length : 0}
          slidesPerView="auto"
          spaceBetween={isInline ? 12 : 5}
          slidesOffsetBefore={resolvedLayout === "bleed" ? gutterPx : undefined}
          slidesOffsetAfter={resolvedLayout === "bleed" || isInlineBleed ? gutterPx : undefined}
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

      {!headerNav ? (
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
    </div>
  );
}
