export type PrototypePageStatus = "accepted" | "round2" | "round1" | "new";

export type PrototypeMenuItem = {
  label: string;
  to: string;
  iconClass: string;
  /** Review round / acceptance state shown in the prototype FAB menu. */
  status?: PrototypePageStatus;
};

export type PrototypeSection = {
  title: string;
  items: PrototypeMenuItem[];
};

export const prototypeHomeItem: PrototypeMenuItem = {
  label: "Strona główna",
  to: "/",
  iconClass: "ph ph-house",
  status: "round2",
};

export const prototypeSections: PrototypeSection[] = [
  {
    title: "Strony",
    items: [
      {
        label: "Product Detail Page",
        to: "/produkt",
        iconClass: "ph ph-armchair",
        status: "round2",
      },
      {
        label: "Salon",
        to: "/salon",
        iconClass: "ph ph-storefront",
        status: "round1",
      },
      {
        label: "Salony",
        to: "/salony",
        iconClass: "ph ph-rows",
        status: "round1",
      },
      {
        label: "Kategoria",
        to: "/kategoria",
        iconClass: "ph ph-squares-four",
        status: "round1",
      },
      {
        label: "Podkategoria",
        to: "/podkategoria",
        iconClass: "ph ph-rows",
        status: "accepted",
      },
      {
        label: "Listing produktów",
        to: "/listing",
        iconClass: "ph ph-squares-four",
        status: "round1",
      },
      {
        label: "Galeria inspiracji",
        to: "/inspiracje-listing",
        iconClass: "ph ph-images",
      },
      {
        label: "Galeria aranżacji",
        to: "/galeria-aranzacji",
        iconClass: "ph ph-image",
      },
      {
        label: "Artykuł inspiracji",
        to: "/inspiracja-artykul",
        iconClass: "ph ph-article",
      },
      {
        label: "Producenci",
        to: "/producenci",
        iconClass: "ph ph-buildings",
        status: "round1",
      },
      {
        label: "Producent",
        to: "/producent",
        iconClass: "ph ph-factory",
        status: "accepted",
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
        status: "round1",
      },
      {
        label: "404 - Strona nie znaleziona",
        to: "/404",
        iconClass: "ph ph-warning-circle",
        status: "accepted",
      },
      {
        label: "403 - Brak dostępu",
        to: "/403",
        iconClass: "ph ph-lock-key",
        status: "accepted",
      },
      {
        label: "Przerwa techniczna",
        to: "/przerwa",
        iconClass: "ph ph-wrench",
        status: "accepted",
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
        label: "Katalog banerów CTA",
        to: "/banery-cta",
        iconClass: "ph ph-images-square",
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
