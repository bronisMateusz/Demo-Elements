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

/** Mega-menu columns - layout inspired by OKA; links from eh-mega prototype. */
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
  changeNote: "Zmień salon",
  href: "#salony",
} as const;

export const salonDrawerCopy = {
  title: "Twój salon",
  description: "Umów spotkanie z doradcą w salonie w pobliżu.",
  searchPlaceholder: "Miasto lub kod pocztowy",
  locateLabel: "Użyj mojej lokalizacji",
  locatingLabel: "Pobieranie lokalizacji…",
  locateUnsupported: "Ta przeglądarka nie obsługuje geolokalizacji.",
  locateDenied: "Brak dostępu do lokalizacji. Zezwól w ustawieniach przeglądarki.",
  locateUnavailable: "Nie udało się pobrać lokalizacji. Spróbuj ponownie.",
  nearestHint: "Posortowano od najbliższego salonu",
  resultsHeading: "Salony w pobliżu",
  learnMoreLabel: "Dowiedz się więcej",
  selectLabel: "Wybierz",
  selectedLabel: "Wybrany",
  consent:
    "Korzystając z lokalizacji, wyrażasz zgodę na użycie plików cookies w celu wskazania najbliższego salonu.",
  consentLearnMoreLabel: "Dowiedz się więcej",
  learnMoreHref: "#cookies",
  emptyResults: "Brak salonów dla podanego zapytania.",
} as const;

export const salonCardCopy = {
  selectedEyebrow: "Twój salon",
  changeLabel: "Zmień",
  selectedDescription:
    "Chcesz zobaczyć ten produkt na żywo? Skontaktuj się z salonem - potwierdzimy dostępność i umówimy prezentację.",
  hoursToggle: "Adres i godziny otwarcia",
  addressColumnLabel: "Adres",
  hoursColumnLabel: "Godziny otwarcia",
  askLabel: "Wyślij pytanie do salonu",
  defaultPhone: "+48 22 000 00 00",
  defaultHours: ["pon.-pt. 10:00-18:00", "sob. 10:00-14:00"],
} as const;

/** Salon points - copy from eh-salon-results prototype. */
export const salonOptions = [
  {
    id: "warszawa",
    name: "ELEMENTS Warszawa",
    address: "ul. Przykładowa 12, 02-222 Warszawa",
    href: "#salon-warszawa",
    lat: 52.2297,
    lng: 21.0122,
  },
  {
    id: "sekocin",
    name: "ELEMENTS Warszawa Sękocin Nowy",
    address: "al. Krakowska 0, Sękocin Nowy",
    href: "#salon-sekocin",
    lat: 52.1152,
    lng: 20.8924,
  },
  {
    id: "krakow",
    name: "ELEMENTS Kraków",
    address: "ul. Przykładowa 5, Kraków",
    href: "#salon-krakow",
    lat: 50.0647,
    lng: 19.945,
  },
  {
    id: "poznan",
    name: "ELEMENTS Poznań - Swadzim",
    address: "ul. Przykładowa 3, Swadzim",
    href: "#salon-poznan",
    lat: 52.4484,
    lng: 16.7557,
  },
  {
    id: "wroclaw",
    name: "ELEMENTS Wrocław",
    address: "ul. Przykładowa 8, Wrocław",
    href: "#salon-wroclaw",
    lat: 51.1079,
    lng: 17.0385,
  },
  {
    id: "gdansk",
    name: "ELEMENTS Gdańsk",
    address: "ul. Przykładowa 11, Gdańsk",
    href: "#salon-gdansk",
    lat: 54.352,
    lng: 18.6466,
  },
  {
    id: "lodz",
    name: "ELEMENTS Łódź",
    address: "ul. Przykładowa 2, Łódź",
    href: "#salon-lodz",
    lat: 51.7592,
    lng: 19.456,
  },
  {
    id: "szczecin",
    name: "ELEMENTS Szczecin",
    address: "ul. Przykładowa 7, Szczecin",
    href: "#salon-szczecin",
    lat: 53.4285,
    lng: 14.5528,
  },
  {
    id: "bydgoszcz",
    name: "ELEMENTS Bydgoszcz",
    address: "ul. Przykładowa 4, Bydgoszcz",
    href: "#salon-bydgoszcz",
    lat: 53.1235,
    lng: 18.0084,
  },
  {
    id: "torun",
    name: "ELEMENTS Toruń",
    address: "ul. Przykładowa 9, Toruń",
    href: "#salon-torun",
    lat: 53.0138,
    lng: 18.5984,
  },
  {
    id: "kielce",
    name: "ELEMENTS Kielce",
    address: "ul. Przykładowa 6, Kielce",
    href: "#salon-kielce",
    lat: 50.8661,
    lng: 20.6286,
  },
  {
    id: "rzeszow",
    name: "ELEMENTS Rzeszów",
    address: "ul. Przykładowa 10, Rzeszów",
    href: "#salon-rzeszow",
    lat: 50.0412,
    lng: 21.9991,
  },
  {
    id: "opole",
    name: "ELEMENTS Opole",
    address: "ul. Przykładowa 1, Opole",
    href: "#salon-opole",
    lat: 50.6751,
    lng: 17.9213,
  },
  {
    id: "gliwice1",
    name: "ELEMENTS Gliwice - Pszczyńska",
    address: "ul. Pszczyńska 0, Gliwice",
    href: "#salon-gliwice1",
    lat: 50.2768,
    lng: 18.694,
  },
  {
    id: "gliwice2",
    name: "ELEMENTS Gliwice - Uszczyka",
    address: "ul. Uszczyka 0, Gliwice",
    href: "#salon-gliwice2",
    lat: 50.3108,
    lng: 18.6686,
  },
  {
    id: "jgora",
    name: "ELEMENTS Jelenia Góra",
    address: "ul. Przykładowa 13, Jelenia Góra",
    href: "#salon-jgora",
    lat: 50.9044,
    lng: 15.7194,
  },
  {
    id: "klodzko",
    name: "ELEMENTS Kłodzko",
    address: "ul. Przykładowa 14, Kłodzko",
    href: "#salon-klodzko",
    lat: 50.4344,
    lng: 16.6615,
  },
  {
    id: "koszalin1",
    name: "ELEMENTS Koszalin - Franciszkańska",
    address: "ul. Franciszkańska 0, Koszalin",
    href: "#salon-koszalin1",
    lat: 54.1985,
    lng: 16.1718,
  },
  {
    id: "koszalin2",
    name: "ELEMENTS Koszalin - Żytnia",
    address: "ul. Żytnia 0, Koszalin",
    href: "#salon-koszalin2",
    lat: 54.1648,
    lng: 16.1834,
  },
] as const;

export type SalonOption = (typeof salonOptions)[number];

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

export const footerBrand = {
  title: "ELEMENTS",
  descriptionParts: [
    "Sieć ",
    { bold: "19" },
    " salonów łazienek premium. ",
    { bold: "10 000" },
    " m² ekspozycji, ponad ",
    { bold: "40 000" },
    " produktów renomowanych marek i doradcy, którzy pomogą Ci dobrze wybrać.",
  ],
} as const;

export const footerColumns = [
  {
    title: "Na skróty",
    links: [
      { label: "Produkty", href: "#produkty" },
      { label: "Inspiracje", href: "#inspiracje" },
      { label: "Znajdź salon", href: "#salony" },
      { label: "Dla Architekta", href: "#strefa-architekta" },
    ],
  },
  {
    title: "Pomoc",
    links: [
      { label: "Kontakt", href: "#kontakt" },
      { label: "Do pobrania", href: "#do-pobrania" },
      { label: "Producenci", href: "#producenci" },
    ],
  },
  {
    title: "Informacje",
    links: [
      { label: "Polityka prywatności", href: "#polityka-prywatnosci" },
      { label: "Regulamin", href: "#regulamin" },
    ],
  },
] as const;

export const footerLegal = {
  copyright: "Elements Show / Grupa HBH",
} as const;

export const footerNewsletterCopy = {
  consent:
    "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji działań promocyjno-marketingowych, w tym przesyłania ofert handlowych przez Grupę HBH za pośrednictwem wskazanego powyżej adresu e-mail.",
  privacyLabel: "Polityka prywatności",
  privacyHref: "#polityka-prywatnosci",
} as const;

/** Pre-footer presence strip - stats + salon city finder (no socials). */
export const presenceStats = [
  {
    value: 19,
    label: "salonów w całej Polsce",
    format: (n: number) => Math.round(n).toLocaleString("pl-PL"),
  },
  {
    value: 10,
    label: "lat na rynku",
    format: (n: number) => Math.round(n).toLocaleString("pl-PL"),
  },
  {
    value: 10_000,
    label: "ekspozycji na żywo",
    format: (n: number) => `${Math.round(n).toLocaleString("pl-PL")} m²`,
  },
  {
    value: 40_000,
    label: "produktów w ofercie",
    format: (n: number) => `${Math.round(n).toLocaleString("pl-PL")}+`,
  },
] as const;

export const presenceSalonCities = [
  { label: "Warszawa", href: "#salon-warszawa" },
  { label: "Kraków", href: "#salon-krakow" },
  { label: "Poznań", href: "#salon-poznan" },
  { label: "Wrocław", href: "#salon-wroclaw" },
  { label: "Gdańsk", href: "#salon-gdansk" },
  { label: "Łódź", href: "#salon-lodz" },
  { label: "Szczecin", href: "#salon-szczecin" },
  { label: "Bydgoszcz", href: "#salon-bydgoszcz" },
  { label: "Toruń", href: "#salon-torun" },
  { label: "Kielce", href: "#salon-kielce" },
  { label: "Rzeszów", href: "#salon-rzeszow" },
  { label: "Opole", href: "#salon-opole" },
  { label: "Gliwice", href: "#salon-gliwice1" },
  { label: "Jelenia Góra", href: "#salon-jgora" },
  { label: "Kłodzko", href: "#salon-klodzko" },
  { label: "Koszalin", href: "#salon-koszalin1" },
] as const;

export const presenceSalonsCopy = {
  title: "Salony Elements w całej Polsce",
  description: "Wybierz miasto i sprawdź adres, godziny i dostępność ekspozycji.",
  allSalonsLabel: "Wszystkie salony",
  allSalonsHref: "#salony",
  mapPlaceholder: "Miejsce na mapę Polski z zaznaczonymi lokalizacjami salonów",
} as const;

export const footerSocialLinks = [
  { label: "Facebook", href: "https://facebook.com", iconClass: "ph ph-facebook-logo" },
  { label: "Instagram", href: "https://instagram.com", iconClass: "ph ph-instagram-logo" },
  { label: "Pinterest", href: "https://pinterest.com", iconClass: "ph ph-pinterest-logo" },
] as const;
