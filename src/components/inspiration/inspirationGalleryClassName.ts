import { cn } from "../../lib/cn";

/** Slide widths: mobile ~1.15 with peek; md+ ~2.1 like makieta bleed track. */
export function inspirationGallerySwiperClassName(className?: string) {
  return cn(
    "w-full cursor-grab touch-pan-y touch-[pan-y_pinch-zoom] active:cursor-grabbing",
    "[&_.swiper-slide]:h-auto! [&_.swiper-slide]:shrink-0",
    // Mobile: ~86% / 1.15 cards with peek of the next.
    "[&_.swiper-slide]:w-[calc((100%-0.75rem)/1.15)]!",
    // md+: two large cards + light peek (makieta: (100% - gap) / 2.1).
    "md:[&_.swiper-slide]:w-[calc((100%-1.25rem)/2.1)]!",
    className,
  );
}

export function inspirationGallerySlideClassName() {
  return cn(
    "h-auto! shrink-0",
    "w-[calc((100%-0.75rem)/1.15)]!",
    "md:w-[calc((100%-1.25rem)/2.1)]!",
  );
}

export function inspirationGalleryCardClassName(className?: string) {
  return cn("flex flex-col", className);
}

export function inspirationGalleryCardMediaClassName() {
  return "relative aspect-16/10 overflow-hidden bg-neutral-200";
}

export function inspirationGalleryCardTitleClassName() {
  return "m-0 mt-4 font-body text-base leading-snug font-medium text-neutral-900 md:mt-5 md:text-lg";
}

/** Static end hint - not a link (points users to the section footer CTA). */
export function inspirationGalleryEndCapClassName() {
  return "flex h-full flex-col";
}

export function inspirationGalleryEndCapMediaClassName() {
  return cn(
    inspirationGalleryCardMediaClassName(),
    "flex flex-col justify-end gap-3 bg-neutral-100 p-6 md:p-8",
  );
}

/** Oversized deco arrow - clipped by the media frame (top-end). */
export function inspirationGalleryEndCapDecoClassName() {
  return cn(
    "pointer-events-none absolute -top-8 -end-6 select-none",
    "font-heading text-[9rem] leading-none text-neutral-300/70",
    "md:-top-10 md:-end-8 md:text-[11rem]",
  );
}
