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
        label: "Strefa architekta",
        to: "/strefa-architekta",
        iconClass: "ph ph-cube",
      },
      {
        label: "Schowek",
        to: "/schowek",
        iconClass: "ph ph-bookmark-simple",
      },
      {
        label: "404 - Strona nie znaleziona",
        to: "/404",
        iconClass: "ph ph-warning-circle",
      },
      {
        label: "403 - Brak dostępu",
        to: "/403",
        iconClass: "ph ph-lock-key",
      },
      {
        label: "Przerwa techniczna",
        to: "/przerwa",
        iconClass: "ph ph-wrench",
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
        label: "Prymitywy",
        to: "/biblioteka/prymitywy",
        iconClass: "ph ph-squares-four",
      },
      {
        label: "Puste stany",
        to: "/biblioteka/puste-stany",
        iconClass: "ph ph-warning-circle",
      },
      {
        label: "Nawigacja",
        to: "/biblioteka/nawigacja",
        iconClass: "ph ph-compass",
      },
      {
        label: "Drawery",
        to: "/biblioteka/drawery",
        iconClass: "ph ph-sidebar",
      },
      {
        label: "Karty",
        to: "/biblioteka/karty",
        iconClass: "ph ph-cards",
      },
      {
        label: "Hero i CTA",
        to: "/biblioteka/hero-i-cta",
        iconClass: "ph ph-megaphone",
      },
      {
        label: "Galerie",
        to: "/biblioteka/galerie",
        iconClass: "ph ph-images",
      },
      {
        label: "Listingi",
        to: "/biblioteka/listingi",
        iconClass: "ph ph-list-bullets",
      },
      {
        label: "Treść",
        to: "/biblioteka/tresc",
        iconClass: "ph ph-article",
      },
    ],
  },
];
