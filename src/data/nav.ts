export type NavItem = {
  label: string;
  href: string;
  /** Opens mega-menu panel when true. */
  hasMenu?: boolean;
  /** Phosphor icon class for mobile drawer (and similar lists). */
  iconClass?: string;
};

export const mainNavItems: NavItem[] = [
  {
    label: "Produkty",
    href: "#produkty",
    hasMenu: true,
    iconClass: "ph ph-squares-four",
  },
  { label: "Inspiracje", href: "#inspiracje", iconClass: "ph ph-images" },
  { label: "Nowości", href: "#nowosci", iconClass: "ph ph-sparkle" },
  { label: "Outlet", href: "#outlet", iconClass: "ph ph-tag" },
  { label: "Bestsellery", href: "#bestsellery", iconClass: "ph ph-fire" },
  { label: "Producenci", href: "#producenci", iconClass: "ph ph-buildings" },
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
  /** Phosphor icon class for category group headers (mobile drawer + mega menu). */
  iconClass?: string;
};

export type MegaMenuColumn = {
  groups: MegaMenuGroup[];
};

export const productsMegaMenu: MegaMenuColumn[] = [
  {
    groups: [
      {
        title: "Łazienka",
        href: "/kategoria",
        iconClass: "ph ph-bathtub",
        links: [
          { label: "Umywalki", href: "/podkategoria" },
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
        iconClass: "ph ph-cooking-pot",
        links: [
          { label: "Zlewozmywaki", href: "#zlewozmywaki" },
          { label: "Baterie zlewozmywakowe", href: "#baterie-zlewozmywakowe" },
        ],
      },
      {
        title: "Ogrzewanie",
        href: "#ogrzewanie",
        iconClass: "ph ph-thermometer-simple",
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
        iconClass: "ph ph-grid-four",
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
        iconClass: "ph ph-stack",
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
  href: "/salony",
} as const;

export const salonDrawerCopy = {
  title: "Twój salon",
  description: "Umów spotkanie z doradcą w salonie w pobliżu.",
  searchPlaceholder: "Miasto lub kod pocztowy",
  locateLabel: "Użyj mojej lokalizacji",
  locatingLabel: "Pobieranie lokalizacji…",
  locateUnsupported: "Ta przeglądarka nie obsługuje geolokalizacji.",
  locateDenied:
    "Brak dostępu do lokalizacji. Zezwól w ustawieniach przeglądarki.",
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
  defaultHours: ["PN - PT 10:00 - 18:00", "SOB 10:00 - 14:00"],
} as const;

/** Salon points - live data from elements-show.pl/salony?showall=1. */
export const salonOptions = [
  {
    id: "warszawa",
    name: "ELEMENTS Warszawa",
    address: "Elektronowa 2, bud. B, paw. 1, Warszawa",
    phone: "+48 22 510 78 21",
    phones: ["+48 22 510 78 21", "+48 22 510 79 22"] as const,
    email: "warszawa@elements-show.pl",
    href: "/salony/warszawa",
    lat: 52.294091024059,
    lng: 21.00321493979,
  },
  {
    id: "sekocin",
    name: "ELEMENTS Warszawa Sękocin Nowy",
    address: "Al. Krakowska 57, Sękocin Nowy",
    phone: "+48 797 903 994",
    phones: ["+48 797 903 994", "+48 510 204 624", "+48 22 735 83 50"] as const,
    email: "sekocinnowy@elements-show.pl",
    href: "/salony/sekocin",
    lat: 52.115178,
    lng: 20.89239,
  },
  {
    id: "krakow",
    name: "ELEMENTS Kraków",
    address: "Instalatorów 1, Kraków (Modlniczka, przy Futura Park)",
    phone: "+48 12 255 67 72",
    phones: ["+48 12 255 67 72"] as const,
    email: "krakow@elements-show.pl",
    href: "/salony/krakow",
    lat: 50.112202,
    lng: 19.848125,
  },
  {
    id: "poznan",
    name: "ELEMENTS Poznań - Swadzim",
    address: "Świętego Mikołaja 9, Swadzim",
    phone: "+48 61 849 81 26",
    phones: ["+48 61 849 81 26", "+48 797 903 904"] as const,
    email: "poznan@elements-show.pl",
    href: "/salony/poznan",
    lat: 52.4484003,
    lng: 16.7556874,
  },
  {
    id: "wroclaw",
    name: "ELEMENTS Wrocław",
    address: "ul. Bolesława Krzywoustego 82-86, Wrocław",
    phone: "+48 571 311 922",
    phones: ["+48 571 311 922", "+48 510 023 021", "+48 571 311 923", "+48 572 007 933", "+48 71 334 99 35"] as const,
    email: "wroclaw@elements-show.pl",
    href: "/salony/wroclaw",
    lat: 51.139442,
    lng: 17.079363,
  },
  {
    id: "gdansk",
    name: "ELEMENTS Gdańsk",
    address: "Przywidzka 4, Gdańsk",
    phone: "+48 500 334 343",
    phones: ["+48 500 334 343", "+48 573 808 516", "+48 58 668 71 16", "+48 58 668 71 19"] as const,
    email: "gdansk@elements-show.pl",
    href: "/salony/gdansk",
    lat: 54.3234731,
    lng: 18.5490069,
  },
  {
    id: "lodz",
    name: "ELEMENTS Łódź",
    address: "Papiernicza 5, Łódź",
    phone: "+48 42 677 49 33",
    phones: ["+48 42 677 49 33"] as const,
    email: "lodz@elements-show.pl",
    href: "/salony/lodz",
    lat: 51.7466764,
    lng: 19.5168523,
  },
  {
    id: "szczecin",
    name: "ELEMENTS Szczecin",
    address: "Warzymice 200, Szczecin",
    phone: "+48 510 022 945",
    phones: ["+48 510 022 945", "+48 510 204 666", "+48 571 308 772"] as const,
    email: "szczecin@elements-show.pl",
    href: "/salony/szczecin",
    lat: 53.3835899,
    lng: 14.4801318,
  },
  {
    id: "bydgoszcz",
    name: "ELEMENTS Bydgoszcz",
    address: "Hermana Frankego 1, Bydgoszcz",
    phone: "+48 523 269 626",
    phones: ["+48 523 269 626"] as const,
    email: "bydgoszcz@elements-show.pl",
    href: "/salony/bydgoszcz",
    lat: 53.0911665,
    lng: 18.0562797,
  },
  {
    id: "torun",
    name: "ELEMENTS Toruń",
    address: "Polna 105, Toruń",
    phone: "+48 56 619 48 41",
    phones: ["+48 56 619 48 41"] as const,
    email: "torun@elements-show.pl",
    href: "/salony/torun",
    lat: 53.0430413,
    lng: 18.6938141,
  },
  {
    id: "kielce",
    name: "ELEMENTS Kielce",
    address: "Krakowska 287A, Kielce",
    phone: "+48 572 007 991",
    phones: ["+48 572 007 991", "+48 510 221 804"] as const,
    email: "kielce@elements-show.pl",
    href: "/salony/kielce",
    lat: 50.8547845,
    lng: 20.5694244,
  },
  {
    id: "rzeszow",
    name: "ELEMENTS Rzeszów",
    address: "Stanisława Trembeckiego 5B, Rzeszów",
    phone: "+48 510 010 865",
    phones: ["+48 510 010 865", "+48 178 723 763"] as const,
    email: "rzeszow@elements-show.pl",
    href: "/salony/rzeszow",
    lat: 50.0562126,
    lng: 22.0112324,
  },
  {
    id: "opole",
    name: "ELEMENTS Opole",
    address: "ul. Budowlanych 44B, Opole",
    phone: "+48 510 022 974",
    phones: ["+48 510 022 974"] as const,
    email: "opole@elements-show.pl",
    href: "/salony/opole",
    lat: 50.688818,
    lng: 17.914117,
  },
  {
    id: "gliwice1",
    name: "ELEMENTS Gliwice - Pszczyńska",
    address: "Pszczyńska 192, Gliwice",
    phone: "+48 510 017 920",
    phones: ["+48 510 017 920"] as const,
    email: "gliwice.pszczynska@elements-show.pl",
    href: "/salony/gliwice1",
    lat: 50.2768056,
    lng: 18.6939927,
  },
  {
    id: "gliwice2",
    name: "ELEMENTS Gliwice - Uszczyka",
    address: "ul. Uszczyka 3, Gliwice",
    phone: "+48 32 279 19 50",
    phones: ["+48 32 279 19 50"] as const,
    email: "gliwice@elements-show.pl",
    href: "/salony/gliwice2",
    lat: 50.3107746,
    lng: 18.6686045,
  },
  {
    id: "jgora",
    name: "ELEMENTS Jelenia Góra",
    address: "ul. Grunwaldzka 53, Jelenia Góra",
    phone: "+48 75 752 85 04",
    phones: ["+48 75 752 85 04", "+48 510 023 822", "+48 75 752 85 07", "+48 510 010 452"] as const,
    email: "jeleniagora@elements-show.pl",
    href: "/salony/jgora",
    lat: 50.9121541,
    lng: 15.7340103,
  },
  {
    id: "klodzko",
    name: "ELEMENTS Kłodzko",
    address: "Zajęcza 4, Kłodzko",
    phone: "+48 510 998 941",
    phones: ["+48 510 998 941", "+48 573 488 629", "+48 510 022 914"] as const,
    email: "klodzko@elements-show.pl",
    href: "/salony/klodzko",
    lat: 50.445272522883,
    lng: 16.631314095107,
  },
  {
    id: "koszalin1",
    name: "ELEMENTS Koszalin - Franciszkańska",
    address: "Franciszkańska 22, Koszalin",
    phone: "+48 510 175 045",
    phones: ["+48 510 175 045"] as const,
    email: "koszalin@elements-show.pl",
    href: "/salony/koszalin1",
    lat: 54.1985037,
    lng: 16.1718022,
  },
  {
    id: "koszalin2",
    name: "ELEMENTS Koszalin - Żytnia",
    address: "ul. Żytnia 9, Koszalin",
    phone: "+48 510 010 708",
    phones: ["+48 510 010 708", "+48 510 023 000"] as const,
    email: "koszalin.zytnia@elements-show.pl",
    href: "/salony/koszalin2",
    lat: 54.1647578,
    lng: 16.1833546,
  },
] as const;

export type SalonOption = (typeof salonOptions)[number];

export const favoritesNav = {
  label: "Schowek",
  href: "#schowek",
} as const;

export const utilityTagline = "Od pomysłu do gotowej łazienki";

export const utilityNavItems = [
  {
    label: "Strefa architekta",
    href: "#strefa-architekta",
    iconClass: "ph ph-cube",
  },
  {
    label: "Strefa instalatora",
    href: "#strefa-instalatora",
    iconClass: "ph ph-wrench",
    dividerAfter: true,
  },
  { label: "Obsługa inwestycji", href: "#obsluga-inwestycji" },
  { label: "Konfigurator kabin", href: "#konfigurator-kabin" },
  { label: "Blog", href: "#blog" },
  { label: "Salony i kontakt", href: "/salony" },
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

/** Untitled link columns — matches Elements footer IA (categories / discovery / services). */
export const footerColumns = [
  {
    links: [
      { label: "Łazienka", href: "/kategoria" },
      { label: "Kuchnia", href: "#kuchnia" },
      { label: "Ogrzewanie", href: "#ogrzewanie" },
      { label: "Płytki - rodzaje", href: "#plytki-rodzaje" },
      { label: "Płytki - imitacje", href: "#plytki-imitacje" },
      { label: "Konfigurator kabin", href: "#konfigurator-kabin" },
    ],
  },
  {
    links: [
      { label: "Inspiracje", href: "#inspiracje" },
      { label: "Nowości", href: "#nowosci" },
      { label: "Outlet", href: "#outlet" },
      { label: "Bestsellery", href: "#bestsellery" },
      { label: "Producenci", href: "#producenci" },
    ],
  },
  {
    links: [
      { label: "Strefa architekta", href: "#strefa-architekta" },
      { label: "Strefa instalatora", href: "#strefa-instalatora" },
      { label: "Obsługa inwestycji", href: "#obsluga-inwestycji" },
      { label: "Konfigurator kabin", href: "#konfigurator-kabin" },
      { label: "Blog", href: "#blog" },
      { label: "Salony i kontakt", href: "/salony" },
      { label: "Usługa projektowa", href: "#usluga-projektowa" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },
] as const;

export const footerLegal = {
  copyright: "Elements Show / Grupa HBH",
  links: [
    { label: "Polityka prywatności", href: "#polityka-prywatnosci" },
    { label: "Regulamin", href: "#regulamin" },
  ],
} as const;

export const footerNewsletterCopy = {
  consent:
    "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji działań promocyjno-marketingowych, w tym przesyłania ofert handlowych przez Grupę HBH za pośrednictwem wskazanego powyżej adresu e-mail.",
  privacyLabel: "Polityka prywatności",
  privacyHref: "#polityka-prywatnosci",
} as const;

/** Pre-footer presence strip — stats + salon city finder (socials above the map). */
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
  { label: "Warszawa - Elektronowa", href: "/salony/warszawa" },
  { label: "Warszawa - Sękocin Nowy", href: "/salony/sekocin" },
  { label: "Kraków", href: "/salony/krakow" },
  { label: "Poznań", href: "/salony/poznan" },
  { label: "Wrocław", href: "/salony/wroclaw" },
  { label: "Gdańsk", href: "/salony/gdansk" },
  { label: "Łódź", href: "/salony/lodz" },
  { label: "Szczecin", href: "/salony/szczecin" },
  { label: "Bydgoszcz", href: "/salony/bydgoszcz" },
  { label: "Toruń", href: "/salony/torun" },
  { label: "Kielce", href: "/salony/kielce" },
  { label: "Rzeszów", href: "/salony/rzeszow" },
  { label: "Opole", href: "/salony/opole" },
  { label: "Gliwice - Pszczyńska", href: "/salony/gliwice1" },
  { label: "Gliwice - Uszczyka", href: "/salony/gliwice2" },
  { label: "Jelenia Góra", href: "/salony/jgora" },
  { label: "Kłodzko", href: "/salony/klodzko" },
  { label: "Koszalin - Franciszkańska", href: "/salony/koszalin1" },
  { label: "Koszalin - Żytnia", href: "/salony/koszalin2" },
] as const;

export const presenceVoivodeshipDrawerCopy = {
  description: "Salony Elements w wybranym województwie.",
  contactLabel: "Pełny kontakt",
  selectLabel: "Wybierz salon",
  selectedLabel: "Wybrany",
  closeLabel: "Zamknij listę salonów",
  hoursLabel: "Godziny",
  phoneLabel: "Telefon",
} as const;

export const presenceSalonsCopy = {
  title: "Salony Elements w całej Polsce",
  description:
    "Wybierz miasto i sprawdź adres, godziny i dostępność ekspozycji.",
  allSalonsLabel: "Wszystkie salony",
  allSalonsHref: "/salony",
  socialLabel: "Znajdź nas w sieci",
  mapPlaceholder: "Miejsce na mapę Polski z zaznaczonymi lokalizacjami salonów",
} as const;

export const footerSocialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    iconClass: "ph ph-facebook-logo",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    iconClass: "ph ph-instagram-logo",
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    iconClass: "ph ph-pinterest-logo",
  },
] as const;
