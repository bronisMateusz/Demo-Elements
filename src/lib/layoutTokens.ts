/** Layout lengths shared by class strings and JS probes (not CSS theme tokens). */

export const GUTTER = "clamp(1.25rem,2.222vw,2.5rem)";
export const SECTION_SM = "clamp(2rem,5vw,3rem)";
export const SECTION = "clamp(2.5rem,6vw,4rem)";
export const CONTENT_MAX = "96rem";
export const WIDE_MAX = "112rem";

export const CONTENT_MAX_FALLBACK_PX = 1536; // 96rem at 16px root
export const WIDE_MAX_FALLBACK_PX = 1792; // 112rem at 16px root

export const HEADER_BAR_PX = 72;
export const HEADER_UTILITY_PX = 44;
export const HEADER_H_MOBILE_PX = 72;
export const HEADER_H_DESKTOP_PX = 116;
export const LG_MIN_WIDTH_PX = 1024; // 64rem

/** Static class fragments - full literals so Tailwind can detect them. */
export const pxGutterClassName = "px-[clamp(1.25rem,2.222vw,2.5rem)]";
export const pGutterClassName = "p-[clamp(1.25rem,2.222vw,2.5rem)]";
export const mxNegGutterClassName = "-mx-[clamp(1.25rem,2.222vw,2.5rem)]";
export const insetSGutterClassName = "inset-s-[clamp(1.25rem,2.222vw,2.5rem)]";
export const insetEGutterClassName = "inset-e-[clamp(1.25rem,2.222vw,2.5rem)]";
export const insetXGutterClassName = "inset-x-[clamp(1.25rem,2.222vw,2.5rem)]";
export const topGutterClassName = "top-[clamp(1.25rem,2.222vw,2.5rem)]";
export const bottomGutterClassName = "bottom-[clamp(1.25rem,2.222vw,2.5rem)]";

export const pySectionSmClassName = "py-[clamp(2rem,5vw,3rem)]";
export const ptSectionSmClassName = "pt-[clamp(2rem,5vw,3rem)]";
export const pbSectionSmClassName = "pb-[clamp(2rem,5vw,3rem)]";
export const pySectionClassName = "py-[clamp(2.5rem,6vw,4rem)]";
export const ptSectionClassName = "pt-[clamp(2.5rem,6vw,4rem)]";
export const pbSectionClassName = "pb-[clamp(2.5rem,6vw,4rem)]";
export const mdPySectionClassName = "md:py-[clamp(2.5rem,6vw,4rem)]";
export const mdPtSectionClassName = "md:pt-[clamp(2.5rem,6vw,4rem)]";
export const mdPbSectionClassName = "md:pb-[clamp(2.5rem,6vw,4rem)]";

export const maxWContentClassName = "max-w-[96rem]";
export const maxWWideClassName = "max-w-[112rem]";

export function readHeaderHeightPx(): number {
  return window.matchMedia(`(min-width: ${LG_MIN_WIDTH_PX}px)`).matches
    ? HEADER_H_DESKTOP_PX
    : HEADER_H_MOBILE_PX;
}

export function readHeaderOffsetPx(): number {
  if (document.documentElement.classList.contains("site-header-concealed")) return 0;
  return readHeaderHeightPx();
}
