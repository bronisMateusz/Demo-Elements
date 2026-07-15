export type PdpSubnavItem = {
  id: string;
  label: string;
};

/** Header + subnav + small gap — used for scroll-spy and anchor offset. */
export const PDP_HEADER_HEIGHT_PX = 72;
export const PDP_SUBNAV_SCROLL_OFFSET_PX = PDP_HEADER_HEIGHT_PX + 58 + 8;

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
  "scroll-mt-[calc(var(--spacing-header-h)+58px+8px)]";
