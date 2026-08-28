/** Layout lengths shared by class strings and JS probes (not CSS theme tokens). */

/** Content gutter - 12px mobile floor, fluid mid, 40px desktop cap. */
export const GUTTER = "clamp(0.75rem,2.222vw,2.5rem)";
export const SECTION_SM = "clamp(2rem,5vw,3rem)";
export const SECTION = "clamp(2.5rem,6vw,4rem)";
export const CONTENT_MAX = "96rem";
export const WIDE_MAX = "112rem";

export const CONTENT_MAX_FALLBACK_PX = 1536; // 96rem at 16px root
export const WIDE_MAX_FALLBACK_PX = 1792; // 112rem at 16px root

export const HEADER_BAR_PX = 72;
export const HEADER_BAR_MOBILE_PX = 56; // h-14
/** Mobile bar + HeaderSalonStrip (approx; prefer live measure). */
export const HEADER_H_MOBILE_PX = 120;
export const HEADER_UTILITY_PX = 44;
export const HEADER_H_DESKTOP_PX = 116;
export const LG_MIN_WIDTH_PX = 1024; // 64rem
/** Desktop chrome: utility strip + full main nav (matches Tailwind `xl`). */
export const XL_MIN_WIDTH_PX = 1280; // 80rem
/** Keep in sync with Header conceal: utility stays visible near the top. */
export const HEADER_UTILITY_CONCEAL_TOP_PX = 64;
export const HEADER_UTILITY_CONCEAL_DELTA_PX = 6;

/** Static class fragments - full literals so Tailwind can detect them. */
export const pxGutterClassName = "px-[clamp(0.75rem,2.222vw,2.5rem)]";
export const maxLgPxGutterClassName =
  "max-lg:px-[clamp(0.75rem,2.222vw,2.5rem)]";
export const pGutterClassName = "p-[clamp(0.75rem,2.222vw,2.5rem)]";
export const mxNegGutterClassName = "mx-[-clamp(0.75rem,2.222vw,2.5rem)]";
export const insetSGutterClassName = "inset-s-[clamp(0.75rem,2.222vw,2.5rem)]";
export const insetEGutterClassName = "inset-e-[clamp(0.75rem,2.222vw,2.5rem)]";
export const insetXGutterClassName = "inset-x-[clamp(0.75rem,2.222vw,2.5rem)]";
export const topGutterClassName = "top-[clamp(0.75rem,2.222vw,2.5rem)]";
export const bottomGutterClassName = "bottom-[clamp(0.75rem,2.222vw,2.5rem)]";

export const pySectionSmClassName = "py-[clamp(2rem,5vw,3rem)]";
export const ptSectionSmClassName = "pt-[clamp(2rem,5vw,3rem)]";
export const pbSectionSmClassName = "pb-[clamp(2rem,5vw,3rem)]";
export const pySectionClassName = "py-[clamp(2.5rem,6vw,4rem)]";
export const ptSectionClassName = "pt-[clamp(2.5rem,6vw,4rem)]";
export const pbSectionClassName = "pb-[clamp(2.5rem,6vw,4rem)]";
export const mdPySectionClassName = "md:py-[clamp(2.5rem,6vw,4rem)]";
export const mdPtSectionClassName = "md:pt-[clamp(2.5rem,6vw,4rem)]";
export const mdPbSectionClassName = "md:pb-[clamp(2.5rem,6vw,4rem)]";

/** Legacy section padding - prefer pageSectionStackClassName + sectionMarginYClassName. */
export const sectionPaddingClassName = [
  pySectionSmClassName,
  mdPySectionClassName,
].join(" ");

/** Top-only section padding - e.g. footer-adjacent bands that keep a tight bottom. */
export const sectionTopPaddingClassName = [
  ptSectionSmClassName,
  mdPtSectionClassName,
].join(" ");

/** Bottom-only section padding - e.g. page intros before the next content block. */
export const sectionBottomPaddingClassName = [
  pbSectionSmClassName,
  mdPbSectionClassName,
].join(" ");

/** Canonical vertical margin block - 48px; keep in sync with @utility page-section-stack. */
const sectionMarginBlockClasses = ["my-12"] as const;

/** Pixel height of one section margin step (`my-12` / `mt-12` at 16px root). */
export const SECTION_MARGIN_BLOCK_PX = 48;

/** Top-only margin for one-off blocks outside PageSectionStack. */
export const sectionMarginTopClassName = "mt-12";

/** Bottom-only margin before the next page block (e.g. hero before optional banner/subnav). */
export const sectionMarginBottomClassName = "mb-12";

/** Symmetric vertical margin for blocks outside PageSectionStack (e.g. newsletter). */
export const sectionMarginYClassName = sectionMarginBlockClasses.join(" ");

/** Bottom margin for internal sticky subnav (top spacing comes from page header cluster gap). */
export const internalSubnavMarginBottomClassName = "mb-12";

/** Symmetric margin for internal sticky subnav after a hero/banner outside a header cluster. */
export const internalSubnavMarginClassName = sectionMarginYClassName;

/** Shared tab link styling for ProductSubnav, wishlist segments, brand A-Z index, etc. */
export const internalSubnavLinkClassName = [
  "relative inline-flex shrink-0 min-h-11 items-center px-3 py-2 font-body text-sm leading-none no-underline transition-colors duration-fast ease-out md:min-h-14.5 md:px-4 md:py-3 md:text-ui",
  "hover:text-neutral-900",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
].join(" ");

/** Hover preview line for SharedLayoutUnderline (position via insetX inline style). */
export const internalSubnavHoverLineClassName = "h-0.5 bg-neutral-900/45";

/** Active tab line - same inset as SharedLayoutUnderline hover (insetX={12}). */
export const internalSubnavActiveLineClassName =
  "pointer-events-none absolute inset-x-3 bottom-0 z-20 h-0.5 bg-neutral-900";

/** Intro + internal subnav in one PageSectionStack child - tight top, 48px below subnav. */
export const pageHeaderClusterClassName = "flex flex-col gap-6 md:gap-8";

/** Applied on PageSectionStack root - see @utility page-section-stack in app.css. */
export const pageSectionStackClassName = "page-section-stack";

/** Drop stack top margin when the page opens with a descriptive hero (pair with pageIntroHeroTopPaddingClassName). */
export const pageSectionStackFlushTopClassName = "mt-0";

/** Top padding on descriptive hero copy column - below breadcrumbs, replaces stack mt-12. */
export const pageIntroHeroTopPaddingClassName = "pt-12";

export const maxWContentClassName = "max-w-384";
export const maxWWideClassName = "max-w-448";

/**
 * Stick just under the full site header. Mobile uses the live bar height
 * (`--site-header-bar-height`, includes HeaderSalonStrip) so a 1px slit
 * does not open under the chrome. xl+ is the utility + bar stack; when the
 * utility strip conceals, drop to bar height. Full literals for Tailwind.
 */
export const stickyUnderHeaderClassName =
  "sticky top-[calc(var(--site-header-bar-height,7.25rem)-1px)] transition-[top] duration-base ease-luxury xl:top-29 header-concealed:top-18";

/**
 * Listing sidebar shell: stick under header with capped height.
 * Extra 1rem under the header so Filtry / Wyczyść are not flush to the bar.
 * Scroll + fades live on the inner element (ListingFiltersSticky).
 */
export const stickyListingFiltersShellClassName = [
  "sticky top-33 transition-[top] duration-base ease-luxury header-concealed:top-22",
  "relative max-h-[calc(100svh-8.25rem)] header-concealed:max-h-[calc(100svh-5.5rem)]",
].join(" ");

export const stickyListingFiltersScrollClassName = [
  "max-h-[inherit] overflow-y-auto overscroll-contain scrollbar-none",
  "[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
].join(" ");

export function readHeaderHeightPx(): number {
  const isXl = window.matchMedia(`(min-width: ${XL_MIN_WIDTH_PX}px)`).matches;
  const bar = document.getElementById("siteHeaderBar");
  const barH = bar?.offsetHeight ?? 0;

  if (!isXl) {
    return barH > 0 ? barH : HEADER_H_MOBILE_PX;
  }

  const utility = document.getElementById("siteHeaderUtility");
  const utilH = utility?.offsetHeight ?? HEADER_UTILITY_PX;
  const barOnly = barH > 0 ? barH : HEADER_BAR_PX;
  // Full sticky stack (utility always counted for stuck observer).
  return utilH + barOnly;
}

export function readHeaderBarPx(): number {
  const bar = document.getElementById("siteHeaderBar");
  const barH = bar?.offsetHeight ?? 0;
  const isXl = window.matchMedia(`(min-width: ${XL_MIN_WIDTH_PX}px)`).matches;
  if (!isXl) {
    return barH > 0 ? barH : HEADER_H_MOBILE_PX;
  }
  return barH > 0 ? barH : HEADER_BAR_PX;
}

export function readHeaderOffsetPx(): number {
  return readHeaderOffsetForConcealStatePx(
    document.documentElement.classList.contains("site-header-concealed"),
  );
}

/** Header stack height for a known utility-strip state (xl+). */
export function readHeaderOffsetForConcealStatePx(concealed: boolean): number {
  const isXl = window.matchMedia(`(min-width: ${XL_MIN_WIDTH_PX}px)`).matches;
  if (!isXl || !concealed) {
    return isXl ? readHeaderHeightPx() : readHeaderBarPx();
  }
  return readHeaderBarPx();
}

/**
 * Utility strip follows scroll direction. Destination chrome can differ from
 * the chrome at click time - predict it so scroll-to-section does not clip.
 */
export function predictHeaderUtilityConcealed(
  fromY: number,
  toY: number,
): boolean {
  if (!window.matchMedia(`(min-width: ${XL_MIN_WIDTH_PX}px)`).matches) {
    return false;
  }
  if (toY <= HEADER_UTILITY_CONCEAL_TOP_PX) return false;
  if (toY > fromY + HEADER_UTILITY_CONCEAL_DELTA_PX) return true;
  if (toY < fromY - HEADER_UTILITY_CONCEAL_DELTA_PX) return false;
  return document.documentElement.classList.contains("site-header-concealed");
}
