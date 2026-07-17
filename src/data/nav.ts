export type NavItem = {
  label: string;
  href: string;
  /** Opens mega-menu panel when true. */
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

/** Mega-menu columns — layout inspired by OKA; links from eh-mega prototype. */
export type MegaMenuLink = {
  label: string;
  href: string;
};

export type MegaMenuGroup = {
  title: string;
  href: string;
  links: MegaMenuLink[];
};

export type MegaMenuColumn = {
  groups: MegaMenuGroup[];
};

export const productsMegaMenu: MegaMenuColumn[] = [
  {
    groups: [
      {
        title: "Łazienka",
        href: "#lazienka",
        links: [
          { label: "Umywalki", href: "#umywalki" },
          { label: "Armatura", href: "#armatura" },
          { label: "Toaleta", href: "#toaleta" },
          { label: "Wanny", href: "#wanny" },
          { label: "Brodziki", href: "#brodziki" },
          { label: "Prysznic", href: "#prysznic" },
          { label: "Dodatki", href: "#dodatki" },
          { label: "Meble", href: "#meble" },
          { label: "Stelaże i przyciski", href: "#stelaze-i-przyciski" },
          { label: "Domowe spa", href: "#domowe-spa" },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: "Kuchnia",
        href: "#kuchnia",
        links: [
          { label: "Zlewozmywaki", href: "#zlewozmywaki" },
          { label: "Baterie zlewozmywakowe", href: "#baterie-zlewozmywakowe" },
        ],
      },
      {
        title: "Ogrzewanie",
        href: "#ogrzewanie",
        links: [
          { label: "Grzałki elektryczne", href: "#grzalki-elektryczne" },
          { label: "Grzejniki łazienkowe i dekoracyjne", href: "#grzejniki" },
          { label: "Podgrzewacze wody", href: "#podgrzewacze-wody" },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: "Płytki · rodzaje",
        href: "#plytki-rodzaje",
        links: [
          { label: "Monokolor", href: "#monokolor" },
          { label: "Multikolor", href: "#multikolor" },
          { label: "Mozaika", href: "#mozaika" },
          { label: "Panele MHC", href: "#panele-mhc" },
          { label: "Płytki 30×30", href: "#plytki-30x30" },
          { label: "Płytki 60×60", href: "#plytki-60x60" },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: "Płytki · imitacje",
        href: "#plytki-imitacje",
        links: [
          { label: "Imitujące beton", href: "#imitujace-beton" },
          { label: "Imitujące drewno", href: "#imitujace-drewno" },
          { label: "Imitujące kamień", href: "#imitujace-kamien" },
          { label: "Płytki na schody", href: "#plytki-na-schody" },
          { label: "Płytki podłogowe", href: "#plytki-podlogowe" },
          { label: "Płytki ścienne", href: "#plytki-scienne" },
        ],
      },
    ],
  },
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
