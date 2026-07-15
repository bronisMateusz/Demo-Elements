import { cn } from "../../lib/cn";

export type ProductCarouselLayoutToken = "bleed" | "contained" | "inline" | "inline-bleed";

export const productCarouselBleedWrapperClassName = "box-border w-screen ml-[calc(50%-50vw)]";

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
    "w-full touch-pan-y overflow-hidden [touch-action:pan-y_pinch-zoom]",
    layout === "inline" || layout === "inline-bleed"
      ? "[&_.swiper-slide]:!h-auto [&_.swiper-slide]:!w-[clamp(192px,48%,240px)] [&_.swiper-slide]:shrink-0"
      : layout === "bleed"
        ? "[&_.swiper-slide]:!h-auto [&_.swiper-slide]:!w-[clamp(260px,calc((100%-48px)/4.15),424px)] [&_.swiper-slide]:shrink-0"
        : "[&_.swiper-slide]:!h-auto [&_.swiper-slide]:!w-[clamp(260px,72vw,424px)] [&_.swiper-slide]:shrink-0",
  );
}

export function productCarouselSlideClassName(layout: ProductCarouselLayoutToken) {
  if (layout === "inline" || layout === "inline-bleed") {
    return "!h-auto !w-[clamp(192px,48%,240px)] shrink-0";
  }

  if (layout === "bleed") {
    return "!h-auto !w-[clamp(260px,calc((100%-48px)/4.15),424px)] shrink-0";
  }

  return "!h-auto !w-[clamp(260px,72vw,424px)] shrink-0";
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
  const isInline = layout === "inline" || layout === "inline-bleed";
  const isBleed = layout === "bleed";

  return cn(
    placement === "header"
      ? "static inline-flex translate-none shadow-subtle"
      : cn(
          "absolute top-[36%] z-[2] hidden -translate-y-1/2 shadow-subtle md:inline-flex",
          placement === "prev" && (isBleed ? "left-gutter" : "-left-2 md:-left-4"),
          placement === "next" && (isBleed ? "right-gutter" : "right-4"),
        ),
    disabled && "pointer-events-none opacity-35",
    isInline && placement === "header" && "shadow-subtle",
  );
}
