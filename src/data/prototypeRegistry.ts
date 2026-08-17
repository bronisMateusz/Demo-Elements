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
  label: "Strona główna",
  to: "/",
  iconClass: "ph ph-house",
};

export const prototypeSections: PrototypeSection[] = [
  {
    title: "Strony",
    items: [
      {
        label: "Product Detail Page",
        to: "/produkt",
        iconClass: "ph ph-armchair",
      },
      {
        label: "Salon",
        to: "/salon",
        iconClass: "ph ph-storefront",
      },
      {
        label: "Salony",
        to: "/salony",
        iconClass: "ph ph-map-trifold",
      },
      {
        label: "Salony B (zakładki)",
        to: "/salony-b",
        iconClass: "ph ph-rows",
      },
      {
        label: "Kategoria",
        to: "/kategoria",
        iconClass: "ph ph-squares-four",
      },
      {
        label: "Podkategoria",
        to: "/podkategoria",
        iconClass: "ph ph-rows",
      },
      {
        label: "Listing produktów",
        to: "/listing",
        iconClass: "ph ph-squares-four",
      },
      {
        label: "Producenci",
        to: "/producenci",
        iconClass: "ph ph-buildings",
      },
      {
        label: "Producent",
        to: "/producent",
        iconClass: "ph ph-factory",
      },
      {
        label: "404 - Strona nie znaleziona",
        to: "/404",
        iconClass: "ph ph-warning-circle",
      },
    ],
  },
  {
    title: "Biblioteka",
    items: [
      {
        label: "Katalog komponentów",
        to: "/biblioteka",
        iconClass: "ph ph-squares-four",
      },
      {
        label: "Nagłówek i stopka",
        to: "/biblioteka/naglowek-i-stopka",
        iconClass: "ph ph-layout",
      },
      {
        label: "Orientacja",
        to: "/biblioteka/orientacja-i-nawigacja",
        iconClass: "ph ph-signpost",
      },
      {
        label: "Produkt",
        to: "/biblioteka/produkt",
        iconClass: "ph ph-package",
      },
      {
        label: "Strona główna",
        to: "/biblioteka/strona-glowna",
        iconClass: "ph ph-house-line",
      },
      {
        label: "Marketing",
        to: "/biblioteka/marketing",
        iconClass: "ph ph-megaphone",
      },
    ],
  },
];
