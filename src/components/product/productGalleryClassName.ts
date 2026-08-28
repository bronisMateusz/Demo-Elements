/** PDP hero gallery - sticky shell (height set in ProductHero on lg). */
export const productGalleryStickyShellClassName = [
  "lg:sticky lg:self-start lg:top-(--site-header-bar-height,7.25rem)",
  "lg:flex lg:min-h-0 lg:flex-col lg:overflow-hidden xl:top-29",
].join(" ");

/** Viewport gallery root - fills sticky shell on desktop. */
export const productGalleryViewportShellClassName =
  "lg:flex lg:h-full lg:min-h-0 lg:flex-col";

/** Viewport stage area (slide + swiper) - grows within shell minus thumb row. */
export const productGalleryViewportStageAreaClassName =
  "lg:flex lg:min-h-0 lg:flex-1 lg:flex-col";

/** Slide / stage control - fills stage area on desktop. */
export const productGalleryViewportStageClassName = "lg:h-full lg:min-h-0";

/** Single-image viewport stage (no thumb row below). */
export const productGalleryViewportStageSoloClassName = "lg:h-full lg:min-h-0";

/** Swiper slide - match swiper track height. */
export const productGalleryViewportSlideClassName = "h-full";

/** Viewport stage button - capped on stack, full-height on desktop. */
export const productGalleryViewportStageButtonClassName = [
  "flex h-[min(56svh,28rem)] w-full items-center justify-center",
  "md:h-[min(52svh,32rem)]",
  "lg:h-full lg:min-h-0 lg:w-full lg:items-stretch lg:justify-stretch",
].join(" ");

/** Viewport stage image - contain on stack, cover-fill on desktop. */
export const productGalleryViewportImageClassName = [
  "max-h-full max-w-full object-contain",
  "lg:h-full lg:w-full lg:max-h-none lg:max-w-none lg:object-cover lg:object-center",
].join(" ");

/** Swiper root - full-height track on desktop viewport layout. */
export const productGalleryViewportSwiperClassName = [
  "h-[min(56svh,28rem)] [&_.swiper-slide]:h-full",
  "md:h-[min(52svh,32rem)]",
  "lg:h-full lg:min-h-0 lg:flex-1",
  "[&_.swiper-wrapper]:h-full",
].join(" ");
