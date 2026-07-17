import { useRef, useState } from "react";
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

function CarouselNavButtons({
  atStart,
  atEnd,
  layout,
  onPrev,
  onNext,
  className,
}: {
  atStart: boolean;
  atEnd: boolean;
  layout: ProductCarouselLayout;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex shrink-0 items-center gap-1", className)}>
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: productCarouselNavClassName({
            placement: "header",
            layout,
            disabled: atStart,
          }),
        })}
        aria-label="Poprzednie produkty"
        disabled={atStart}
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
            disabled: atEnd,
          }),
        })}
        aria-label="Następne produkty"
        disabled={atEnd}
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

  const syncEdges = (instance: SwiperInstance) => {
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  const slidePrev = () => swiper?.slidePrev();
  const slideNext = () => swiper?.slideNext();
  const headerNav = isInline && header;
  const swiperKey =
    resolvedLayout === "bleed"
      ? `bleed-${gutterPx}`
      : isInlineBleed
        ? `inline-bleed-${gutterPx}-${bleedRightWidth ?? 0}`
        : resolvedLayout;

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
          watchOverflow
          slidesPerView="auto"
          spaceBetween={isInline ? 12 : 5}
          slidesOffsetBefore={resolvedLayout === "bleed" ? gutterPx : undefined}
          slidesOffsetAfter={resolvedLayout === "bleed" || isInlineBleed ? gutterPx : undefined}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
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
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
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
                disabled: atStart,
              }),
            })}
            aria-label="Poprzednie produkty"
            disabled={atStart}
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
                disabled: atEnd,
              }),
            })}
            aria-label="Następne produkty"
            disabled={atEnd}
            onClick={slideNext}
          >
            <i className="ph ph-caret-right" aria-hidden="true" />
          </button>
        </>
      ) : null}
    </div>
  );
}
