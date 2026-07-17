export type PrototypeMenuItem = {
  label: string;
  to: string;
  iconClass: string;
};

export type PrototypeSection = {
  title: string;
  items: PrototypeMenuItem[];
};

export const prototypeHomeItem: PrototypeMenuItem = {
  label: "Product Detail Page",
  to: "/",
  iconClass: "ph ph-armchair",
};

export const prototypeSections: PrototypeSection[] = [
  {
    title: "Strony",
    items: [
      { label: "Product Detail Page", to: "/", iconClass: "ph ph-armchair" },
      { label: "404 - Strona nie znaleziona", to: "/404", iconClass: "ph ph-warning-circle" },
    ],
  },
  {
    title: "Biblioteka",
    items: [
      { label: "Katalog komponentów", to: "/biblioteka", iconClass: "ph ph-squares-four" },
      { label: "Nagłówek i stopka", to: "/biblioteka/naglowek-i-stopka", iconClass: "ph ph-layout" },
      { label: "Orientacja", to: "/biblioteka/orientacja-i-nawigacja", iconClass: "ph ph-signpost" },
      { label: "Produkt", to: "/biblioteka/produkt", iconClass: "ph ph-package" },
    ],
  },
];
