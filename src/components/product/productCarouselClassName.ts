import { cn } from "../../lib/cn";

export type ProductCarouselLayoutToken = "bleed" | "contained" | "inline" | "inline-bleed";

export const productCarouselBleedWrapperClassName = "box-border w-screen ms-[calc(50%-50vw)]";

export function productCarouselRootClassName({
  layout,
  className,
}: {
  layout: ProductCarouselLayoutToken;
  className?: string;
}) {
  return cn(
    "relative w-full",
    layout === "inline-bleed" && "overflow-visible",
    className,
  );
}

export function productCarouselSwiperClassName(layout: ProductCarouselLayoutToken) {
  return cn(
    "w-full touch-pan-y overflow-hidden touch-[pan-y_pinch-zoom]",
    layout === "inline" || layout === "inline-bleed"
      ? "[&_.swiper-slide]:h-auto! [&_.swiper-slide]:w-[clamp(13.75rem,calc((100%-0.75rem)/2.05),20rem)]! [&_.swiper-slide]:shrink-0"
      : layout === "bleed"
        ? // ~4.2 cards + peek of the next (clone) on wide screens
          "[&_.swiper-slide]:h-auto! [&_.swiper-slide]:w-[clamp(16.25rem,calc((100%-1.25rem)/4.2),25rem)]! [&_.swiper-slide]:shrink-0"
        : "[&_.swiper-slide]:h-auto! [&_.swiper-slide]:w-[clamp(16.25rem,72vw,26.5rem)]! [&_.swiper-slide]:shrink-0",
  );
}

export function productCarouselSlideClassName(layout: ProductCarouselLayoutToken) {
  if (layout === "inline" || layout === "inline-bleed") {
    return "h-auto! w-[clamp(13.75rem,calc((100%-0.75rem)/2.05),20rem)]! shrink-0";
  }

  if (layout === "bleed") {
    return "h-auto! w-[clamp(16.25rem,calc((100%-1.25rem)/4.2),25rem)]! shrink-0";
  }

  return "h-auto! w-[clamp(16.25rem,72vw,26.5rem)]! shrink-0";
}

export function productCarouselNavClassName({
  placement,
  layout,
  disabled,
}: {
  placement: "prev" | "next" | "header";
  layout: ProductCarouselLayoutToken;
  disabled?: boolean;
}) {
  const isBleed = layout === "bleed";

  return cn(
    placement === "header"
      ? "static inline-flex translate-none shadow-subtle"
      : cn(
          "absolute top-[36%] z-2 hidden -translate-y-1/2 shadow-subtle md:inline-flex",
          placement === "prev" && (isBleed ? "inset-s-[clamp(1.25rem,2.222vw,2.5rem)]" : "-inset-s-2 md:-inset-s-4"),
          placement === "next" && (isBleed ? "inset-e-[clamp(1.25rem,2.222vw,2.5rem)]" : "inset-e-4"),
        ),
    disabled && "pointer-events-none opacity-35",
  );
}
