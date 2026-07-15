import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { iconButtonClassName } from "../ui/iconButtonClassName";
import type { RelatedProduct } from "../../types/product";
import { ProductCard } from "./ProductCard";
import "swiper/css";

type ProductCarouselProps = {
  products: RelatedProduct[];
  labelledBy?: string;
  className?: string;
  /** Wyrównanie do lewej krawędzi kontenera, wystaje w prawo do krawędzi viewportu (OKA). */
  bleed?: boolean;
};

export function ProductCarousel({
  products,
  labelledBy,
  className,
  bleed = true,
}: ProductCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = (instance: SwiperInstance) => {
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  return (
    <div
      className={cn(
        "product-carousel relative",
        bleed ? "product-carousel--bleed" : "w-full",
        className,
      )}
      aria-labelledby={labelledBy}
    >
      <Swiper
        className="product-carousel__swiper w-full"
        modules={[A11y, Mousewheel]}
        watchOverflow
        grabCursor
        slidesPerView="auto"
        spaceBetween={16}
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
        a11y={{
          prevSlideMessage: "Poprzednie produkty",
          nextSlideMessage: "Następne produkty",
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="product-carousel__slide !h-auto">
            <ProductCard product={product} layout="carousel" className="h-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className={iconButtonClassName({
          variant: "bordered",
          className: cn(
            "product-carousel__nav product-carousel__nav--prev bg-bg",
            atStart && "product-carousel__nav--disabled",
          ),
        })}
        aria-label="Poprzednie produkty"
        disabled={atStart}
        onClick={() => swiper?.slidePrev()}
      >
        <i className="ph ph-caret-left" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={iconButtonClassName({
          variant: "bordered",
          className: cn(
            "product-carousel__nav product-carousel__nav--next bg-bg",
            atEnd && "product-carousel__nav--disabled",
          ),
        })}
        aria-label="Następne produkty"
        disabled={atEnd}
        onClick={() => swiper?.slideNext()}
      >
        <i className="ph ph-caret-right" aria-hidden="true" />
      </button>
    </div>
  );
}
