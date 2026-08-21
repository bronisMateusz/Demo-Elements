import { assetUrl } from "../app/assets";
import {
  HOME_MAGAZINE_FLIPBOOK_HREF,
  HOME_MAGAZINE_PDF_HREF,
  homeMagazine,
} from "./home";
import { listingProducts } from "./listing";
import type { InspirationArrangement, RelatedProduct } from "../types/product";

export type ProducerBrand = {
  name: string;
  slug: string;
  href: string;
  logoSrc?: string;
};

const brandLogoModules = import.meta.glob(
  "../../assets/brands/*.{png,jpg,jpeg,png,svg,gif}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const BRAND_LOGOS: Record<string, string> = Object.fromEntries(
  Object.entries(brandLogoModules).map(([path, url]) => {
    const file = path.split("/").pop() ?? "";
    const slug = file.replace(/\.[^.]+$/, "");
    return [slug, url];
  }),
);

function slugifyBrand(name: string) {
  return name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function brandOf(name: string): ProducerBrand {
  const slug = slugifyBrand(name);
  return {
    name,
    slug,
    href: "/producent",
    logoSrc: BRAND_LOGOS[slug],
  };
}

/** Full directory list from the makieta (stable, not randomized). */
const BRAND_NAMES = [
  "ACO",
  "Acquabella",
  "Ariston",
  "Axor",
  "Bellacasa",
  "Bette",
  "Blanco",
  "Blauberg",
  "Bosch",
  "Brötje",
  "BWT",
  "Caesar",
  "Capricorn",
  "Century",
  "CeraStyle",
  "Cerrol",
  "Clage",
  "Conel",
  "Cosmo",
  "DAB",
  "Dallmer",
  "Danfoss",
  "De Dietrich",
  "Deante",
  "Defra",
  "Deftrans",
  "Del Conca",
  "Delabie",
  "Delfin",
  "Devo",
  "Dimplex",
  "Dornbracht",
  "Dunin",
  "Duravit",
  "Dyson",
  "Dyson Airblade",
  "Easy Sanitary Solutions",
  "Elektromet",
  "Elita",
  "Emco",
  "Ergo Plus",
  "Euroster",
  "Evo",
  "Florim",
  "Flowair",
  "Fondovalle",
  "Franke",
  "Frico",
  "Fujitsu",
  "Gazuno",
  "Geberit",
  "Golden Tile",
  "Gorgiel",
  "Graf",
  "Grespania",
  "Grohe",
  "Grundfos",
  "Hansgrohe",
  "Herz",
  "Hewalex",
  "Hewi",
  "HL",
  "Hoesch",
  "Honeywell",
  "Hüppe",
  "Hydrostop",
  "IBO",
  "Ideal Standard",
  "Impeco",
  "Impronta",
  "Jeremias",
  "Judo",
  "Kaisai",
  "Kaldewei",
  "Kessel",
  "Keuco",
  "KFA",
  "Kludi",
  "Kospel",
  "Kraft",
  "Kuchinox",
  "Laufen",
  "Laveo",
  "LG",
  "Lis Ceramika",
  "Luxrad",
  "Marazzi",
  "Marmite",
  "Megacer",
  "Meibes",
  "Monocibec",
  "Monotile",
  "Naxos",
  "New Trendy",
  "Nic Design",
  "Nicoll",
  "Nikles",
  "Nobili",
  "Novellini",
  "Omnires",
  "Opera",
  "Oras",
  "Oristo",
  "Panasonic",
  "Pentair",
  "Presto",
  "Radson",
  "Rako",
  "Redwell",
  "Reflex",
  "Roca",
  "Ronal",
  "Ruke",
  "Salus",
  "Sanitaone",
  "Sanitti",
  "Sanplast",
  "Santech",
  "Schedline",
  "Schedpol",
  "Schell",
  "SFA",
  "Stiebel Eltron",
  "Sunex",
  "SYR",
  "Tece",
  "Teka",
  "Terma",
  "Tesy",
  "Tonalite",
  "Trinnity",
  "Tubądzin",
  "Tweetop",
  "Valvex",
  "Vasco",
  "Venton",
  "Venture Industries",
  "Viega",
  "Vigour",
  "Villerock",
  "Villeroy & Boch",
  "Vinderen",
  "VIP",
  "Vogel&Noot",
  "VTS",
  "Wadex",
  "Watts",
  "Wilo",
  "XEA",
  "York",
  "Zehnder",
  "Zelvo",
] as const;

const FEATURED_NAMES = [
  "Geberit",
  "Duravit",
  "Hansgrohe",
  "Villeroy & Boch",
  "Roca",
  "Grohe",
  "Kludi",
  "Cersanit",
  "Excellent",
  "Deante",
  "Vigour",
  "Sanplast",
] as const;

export const producersPage = {
  title: "Producenci",
  description: [
    "Współpracujemy z ponad 150 producentami armatury, ceramiki, płytek i wyposażenia wnętrz - od światowych liderów po wyspecjalizowane polskie marki.",
    "Produkty każdego z nich obejrzysz i przetestujesz na żywo w salonach Elements w całej Polsce.",
  ],
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Producenci", current: true },
  ],
  featuredLabel: "Polecani producenci",
  indexAria: "Indeks A-Z",
  searchPlaceholder: "Szukaj producenta",
  emptyFilter:
    "Brak producentów dla wpisanej frazy. Sprawdź pisownię lub wyczyść wyszukiwarkę.",
  cta: {
    eyebrow: "Doradztwo",
    title: "Nie wiesz, którą markę wybrać?",
    description:
      "Doradzimy w salonie - zobaczysz produkty wybranych producentów na żywo i porównasz je w jednym miejscu.",
    askLabel: "Znajdź salon",
    bookLabel: "Umów spotkanie",
  },
  promoAfterLetter: "D",
  promo: {
    eyebrow: "Oferta specjalna",
    title: "Duravit - do -25% na wybrane serie",
    description:
      "Umywalki, miski WC i meble z serii D-Neo i Happy D.2. Zobacz je na żywo w najbliższym salonie Elements.",
    href: "/producent",
    label: "Zobacz ofertę",
    image: {
      src: assetUrl("home/hero-vanity-minimal.png"),
      alt: "Baner producenta - łazienka z ceramiką Duravit",
      fit: "cover" as const,
      focalPoint: { x: 55, y: 45 },
    },
  },
} as const;

export const producerBrands: ProducerBrand[] = BRAND_NAMES.map(brandOf);

export const featuredProducerBrands: ProducerBrand[] = FEATURED_NAMES.map(
  (name) => {
    const found = producerBrands.find((brand) => brand.name === name);
    return found ?? brandOf(name);
  },
);

export function letterOfBrand(name: string) {
  const normalized = name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .charAt(0)
    .toUpperCase();
  return /[A-Z]/.test(normalized) ? normalized : "#";
}

export function groupBrandsByLetter(brands: readonly ProducerBrand[]) {
  const groups = new Map<string, ProducerBrand[]>();
  for (const brand of brands) {
    const letter = letterOfBrand(brand.name);
    const bucket = groups.get(letter);
    if (bucket) bucket.push(brand);
    else groups.set(letter, [brand]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, items]) => ({ letter, items }));
}

export const producerAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type BrandSeries = {
  id: string;
  name: string;
  href: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  };
};

/** Single demo brand page (makieta /producent = Vigour). */
export const producerPage = {
  title: "Vigour",
  metaDescription:
    "Niemiecka marka łazienkowa - ceramika, armatura i meble Vigour w salonach Elements.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Producenci", to: "/producenci" },
    { label: "Vigour", current: true },
  ],
  hero: {
    logoLabel: "logo",
    logoSrc: BRAND_LOGOS.vigour,
    title: "Vigour",
    lead: "Niemiecka marka łazienkowa, która od ponad trzydziestu lat łączy trwałą ceramikę z prostym, ponadczasowym wzornictwem - kompletne serie do łazienki w każdym metrażu.",
    askLabel: "Zapytaj doradcę",
    productsLabel: "Zobacz produkty",
    productsHref: "#produkty",
    image: {
      src: assetUrl("producers/vigour-hero.png"),
      alt: "Zdjęcie kluczowe marki Vigour - łazienka z ceramiką i armaturą",
      fit: "cover" as const,
      focalPoint: { x: 50, y: 50 },
    },
  },
  about: {
    paragraphs: [
      "Bez względu na to, czy chodzi o małą łazienkę przeznaczoną dla gości, łazienkę rodzinną, stylowy salon kąpielowy ze strefą SPA, czy też łazienkę dla osób starszych lub niepełnosprawnych, VIGOUR, korzystając ze swojego doświadczenia i bogatego asortymentu, ma dla Ciebie dobre rozwiązania dostosowane do Twoich potrzeb i budżetu.",
      "Produkty marki Vigour zobaczysz na żywo w ekspozycji w salonach Elements w całej Polsce - miejsce na tekst o dostępności, promocjach i szczególnych seriach marki (do uzupełnienia przez klienta).",
    ],
  },
  seriesTitle: "Serie Vigour",
  series: [
    {
      id: "clivia",
      name: "Clivia",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/clivia.png"),
        alt: "Seria Vigour Clivia",
        fit: "cover" as const,
      },
    },
    {
      id: "derby",
      name: "Derby",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/derby.png"),
        alt: "Seria Vigour Derby",
        fit: "cover" as const,
      },
    },
    {
      id: "derby-plus",
      name: "Derby Plus",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/derby-plus.png"),
        alt: "Seria Vigour Derby Plus",
        fit: "cover" as const,
      },
    },
    {
      id: "derby-style",
      name: "Derby Style",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/derby-style.png"),
        alt: "Seria Vigour Derby Style",
        fit: "cover" as const,
      },
    },
    {
      id: "individual",
      name: "Individual",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/individual.png"),
        alt: "Seria Vigour Individual",
        fit: "cover" as const,
      },
    },
    {
      id: "individual-3-0",
      name: "Individual 3.0",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/individual-3-0.png"),
        alt: "Seria Vigour Individual 3.0",
        fit: "cover" as const,
      },
    },
    {
      id: "individual-4-0",
      name: "Individual 4.0",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/individual-4-0.png"),
        alt: "Seria Vigour Individual 4.0",
        fit: "cover" as const,
      },
    },
    {
      id: "meble",
      name: "Meble do Vigour",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/meble.png"),
        alt: "Meble do Vigour",
        fit: "cover" as const,
      },
    },
    {
      id: "one",
      name: "One",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/one.png"),
        alt: "Seria Vigour One",
        fit: "cover" as const,
      },
    },
    {
      id: "vogue",
      name: "Vogue",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/vogue.png"),
        alt: "Seria Vigour Vogue",
        fit: "cover" as const,
      },
    },
    {
      id: "white",
      name: "White",
      href: "#produkty",
      image: {
        src: assetUrl("producers/series/white.png"),
        alt: "Seria Vigour White",
        fit: "cover" as const,
      },
    },
  ] satisfies BrandSeries[],
  productsTitle: "Produkty Vigour",
  magazine: {
    ...homeMagazine,
    id: "magazyn-vigour",
    eyebrow: "Magazyn · jubileuszowe wydanie",
    title: "Zobacz produkty Vigour w magazynie TOP TRENDY",
    description:
      "Ceramika, armatura i meble Vigour razem z bestsellerami pozostałych marek - wszystko z cenami Elements, w jednym katalogu.",
    primaryCta: {
      label: "Zobacz magazyn online",
      href: HOME_MAGAZINE_FLIPBOOK_HREF,
    },
    secondaryCta: { label: "Pobierz PDF", href: HOME_MAGAZINE_PDF_HREF },
  },
  arrangementsTitle: "Aranżacje z produktami Vigour",
  arrangements: [
    {
      id: "vigour-derby-red",
      title: "Czerwona łazienka - Vigour Derby",
      href: "#inspiracje",
      image: {
        src: assetUrl("home/inspiration-warm-palette.jpg"),
        alt: "Czerwona łazienka - Vigour Derby",
        fit: "cover" as const,
      },
      items: ["Seria Derby", "Ciepła paleta", "Meble łazienkowe"],
    },
    {
      id: "vigour-individual-shower",
      title: "Strefa prysznica z odpływem Individual 4.0",
      href: "#inspiracje",
      image: {
        src: assetUrl("home/inspiration-walk-in.jpg"),
        alt: "Strefa prysznica z odpływem Individual 4.0",
        fit: "cover" as const,
      },
      items: ["Individual 4.0", "Walk-in", "Odpływ liniowy"],
    },
    {
      id: "vigour-family",
      title: "Rodzinna łazienka z meblami Derby",
      href: "#inspiracje",
      image: {
        src: assetUrl("home/inspiration-large-tiles.jpg"),
        alt: "Rodzinna łazienka z meblami Derby",
        fit: "cover" as const,
        focalPoint: { x: 50, y: 75 },
      },
      items: ["Derby", "Przestrzeń rodzinna", "Duże płytki"],
    },
    {
      id: "vigour-one-minimal",
      title: "Minimalistyczna strefa umywalki z serią One",
      href: "#inspiracje",
      image: {
        src: assetUrl("home/inspiration-compact.jpg"),
        alt: "Minimalistyczna strefa umywalki z serią One",
        fit: "cover" as const,
        focalPoint: { x: 50, y: 55 },
      },
      items: ["Seria One", "Minimalizm", "Strefa umywalki"],
    },
  ] satisfies InspirationArrangement[],
  cta: {
    eyebrow: "Doradztwo",
    title: "Zobacz Vigour na żywo w salonie",
    description:
      "Doradca pokaże serie Vigour na ekspozycji, porówna wykończenia i pomoże dobrać komplet do Twojej łazienki.",
    askLabel: "Znajdź salon",
    askHref: "/salony",
    bookLabel: "Umów spotkanie",
  },
} as const;

/** Demo product grid on the brand page - reuse listing catalog shots. */
export const producerPageProducts: RelatedProduct[] = listingProducts.map(
  (product) => ({
    ...product,
    brand: "Vigour",
  }),
);
