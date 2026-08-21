export type PdpSubnavItem = {
  id: string;
  label: string;
};

/** Fired by `scrollToSection` so sections (e.g. downloads accordion) can react. */
export const PDP_SUBNAV_NAVIGATE_EVENT = "pdp-subnav:navigate";

/** Full sticky site header height (utility + bar on xl+, bar only below). */
export const PDP_HEADER_HEIGHT_PX = 116;
export const PDP_HEADER_BAR_HEIGHT_PX = 72;
/** Sticky subnav row height - mobile `min-h-11`, desktop `min-h-14.5`. Prefer live measure. */
export const PDP_SUBNAV_HEIGHT_MOBILE_PX = 44;
export const PDP_SUBNAV_HEIGHT_PX = 58;
export const PDP_SUBNAV_SCROLL_OFFSET_PX =
  PDP_HEADER_HEIGHT_PX + PDP_SUBNAV_HEIGHT_PX + 8;

export function buildPdpSubnavItems(): PdpSubnavItem[] {
  return [
    { id: "pdp-seria", label: "Z tej serii" },
    { id: "pdp-opis", label: "Opis" },
    { id: "pdp-specyfikacja", label: "Specyfikacja" },
    { id: "pdp-pliki", label: "Pliki do pobrania" },
    { id: "pdp-aranzacja", label: "W aranżacji" },
    { id: "pdp-podobne", label: "Produkty podobne" },
  ];
}

export const pdpSectionScrollMarginClassName =
  "scroll-mt-[calc(var(--site-header-bar-height,7.5rem)+var(--pdp-subnav-height,2.75rem)+0.5rem)] xl:scroll-mt-45.5 header-concealed:xl:scroll-mt-34.5";
