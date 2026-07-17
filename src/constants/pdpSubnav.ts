export type PdpSubnavItem = {
  id: string;
  label: string;
};

/** Full sticky site header height (utility + bar on lg+, bar only below). */
export const PDP_HEADER_HEIGHT_PX = 116;
export const PDP_HEADER_BAR_HEIGHT_PX = 72;
export const PDP_SUBNAV_HEIGHT_PX = 58;
export const PDP_SUBNAV_SCROLL_OFFSET_PX = PDP_HEADER_HEIGHT_PX + PDP_SUBNAV_HEIGHT_PX + 8;

export function buildPdpSubnavItems(): PdpSubnavItem[] {
  return [
    { id: "pdp-opis", label: "Opis" },
    { id: "pdp-specyfikacja", label: "Specyfikacja" },
    { id: "pdp-pliki", label: "Pliki do pobrania" },
    { id: "pdp-aranzacja", label: "W aranżacji" },
    { id: "pdp-podobne", label: "Produkty podobne" },
  ];
}

export const pdpSectionScrollMarginClassName =
  "scroll-mt-[calc(var(--spacing-header-offset)+58px+8px)]";
