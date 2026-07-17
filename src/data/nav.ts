export type NavItem = {
  label: string;
  href: string;
  /** Visual chevron only — no mega-menu in this demo. */
  hasMenu?: boolean;
};

export const mainNavItems: NavItem[] = [
  { label: "Produkty", href: "#produkty", hasMenu: true },
  { label: "Inspiracje", href: "#inspiracje" },
  { label: "Nowości", href: "#nowosci" },
  { label: "Outlet", href: "#outlet" },
  { label: "Bestsellery", href: "#bestsellery" },
  { label: "Producenci", href: "#producenci" },
];

export const salonNav = {
  label: "Wybierz salon",
  note: "Umów spotkanie",
  href: "#salony",
} as const;

export const salonOptions = [
  { id: "warszawa", name: "Elements Warszawa", address: "ul. Mokotowska 12, Warszawa" },
  { id: "krakow", name: "Elements Kraków", address: "ul. Karmelicka 28, Kraków" },
  { id: "wroclaw", name: "Elements Wrocław", address: "ul. Świdnicka 8, Wrocław" },
  { id: "gdansk", name: "Elements Gdańsk", address: "ul. Długa 45, Gdańsk" },
] as const;

export const favoritesNav = {
  label: "Schowek",
  href: "#schowek",
} as const;

export const utilityTagline = "Od pomysłu do gotowej łazienki";

export const utilityNavItems = [
  { label: "Strefa architekta", href: "#strefa-architekta", iconClass: "ph ph-triangle" },
  { label: "Strefa instalatora", href: "#strefa-instalatora", iconClass: "ph ph-wrench", dividerAfter: true },
  { label: "Obsługa inwestycji", href: "#obsluga-inwestycji" },
  { label: "Konfigurator kabin", href: "#konfigurator-kabin" },
  { label: "Blog", href: "#blog" },
  { label: "Salony i kontakt", href: "#salony" },
] as const;

export const footerColumns = [
  {
    title: "Sklep",
    links: [
      { label: "Kolekcje", href: "#" },
      { label: "Produkty", href: "#" },
      { label: "Nowości", href: "#" },
      { label: "Salony", href: "#" },
    ],
  },
  {
    title: "Inspiracje",
    links: [
      { label: "Lookbook", href: "#" },
      { label: "Aranżacje", href: "#" },
      { label: "Strefa architekta", href: "#" },
      { label: "Wizualizacje 3D", href: "#" },
    ],
  },
  {
    title: "Pomoc",
    links: [
      { label: "Kontakt", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Dostawa i montaż", href: "#" },
      { label: "Gwarancja", href: "#" },
    ],
  },
  {
    title: "Elements",
    links: [
      { label: "O marce", href: "#" },
      { label: "Kariera", href: "#" },
      { label: "Polityka prywatności", href: "#" },
      { label: "Regulamin", href: "#" },
    ],
  },
] as const;

export const footerSocialLinks = [
  { label: "Instagram", href: "https://instagram.com", iconClass: "ph ph-instagram-logo" },
  { label: "Pinterest", href: "https://pinterest.com", iconClass: "ph ph-pinterest-logo" },
  { label: "LinkedIn", href: "https://linkedin.com", iconClass: "ph ph-linkedin-logo" },
] as const;
