import { assetUrl } from "../app/assets";
import { homeInspiration } from "./home";
import type { SeoBlock } from "./seoBlocks";
import type {
  ListingCuratedTile,
  ListingFacetGroup,
  ListingFilterState,
  ListingProduct,
  ListingQuickFilterOption,
  ListingSortOption,
} from "../types/listing";
import type { ProductBadge, ProductImage } from "../types/product";

const packshot = (path: string, alt: string): ProductImage => ({
  src: assetUrl(path),
  alt,
  fit: "contain",
});

/** Demo packshots (RGBA / plain backdrop) - same set as home / PDP carousels. */
const PACKSHOTS = {
  montebianco: packshot(
    "products/montebianco/01-front.png",
    "Szafka podumywalkowa Montebianco",
  ),
  florim: packshot(
    "home/product-florim-tundra.png",
    "Florim Nature Mood Tundra",
  ),
  ottawa: packshot("home/ottawa.png", "Omnires Ottawa Comfort"),
  trinnity: packshot("home/przycisk-trinnity.png", "Przycisk TRINNITY M16"),
} as const;

const PACKSHOT_LIST = [
  PACKSHOTS.montebianco,
  PACKSHOTS.ottawa,
  PACKSHOTS.florim,
  PACKSHOTS.trinnity,
] as const;

function packshotFor(seedId: string): ProductImage {
  let hash = 0;
  for (let i = 0; i < seedId.length; i += 1) {
    hash = (hash + seedId.charCodeAt(i) * (i + 1)) % 997;
  }
  return PACKSHOT_LIST[hash % PACKSHOT_LIST.length]!;
}

function badgesForFlags(flags: ListingProduct["flags"]): ProductBadge[] {
  // Match badgeClassName semantics + home product tabs / quick filters.
  const badges: ProductBadge[] = [];
  if (flags.bestseller) badges.push({ label: "Bestseller", variant: "gold" });
  if (flags.outlet) badges.push({ label: "Outlet", variant: "neutral" });
  if (flags.new) badges.push({ label: "Nowość", variant: "brand" });
  if (flags.promo) badges.push({ label: "Promocja", variant: "promo" });
  return badges;
}

type Seed = {
  id: string;
  brand: string;
  title: string;
  collection: string;
  purpose: string;
  mount: string;
  size: string;
  structure: string;
  color: string;
  price: string;
  pricePrevious?: string;
  flags: ListingProduct["flags"];
  popularity: number;
};

function toListingProduct(seed: Seed): ListingProduct {
  const badges = badgesForFlags(seed.flags);
  const image = packshotFor(seed.id);
  return {
    id: seed.id,
    brand: seed.brand,
    title: seed.title,
    href: "/produkt",
    price: seed.price,
    pricePrevious: seed.pricePrevious,
    badge: badges[0],
    badges,
    image,
    collection: seed.collection,
    purpose: seed.purpose,
    mount: seed.mount,
    size: seed.size,
    structure: seed.structure,
    color: seed.color,
    flags: seed.flags,
    popularity: seed.popularity,
  };
}

const seeds: Seed[] = [
  {
    id: "lw-dneo-40",
    brand: "Duravit",
    title: "Umywalka wisząca D-Neo 40 cm biały",
    collection: "D-Neo",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "40 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "689,00 zł",
    pricePrevious: "829,00 zł",
    flags: { promo: true, bestseller: true },
    popularity: 98,
  },
  {
    id: "lw-dneo-50",
    brand: "Duravit",
    title: "Umywalka wisząca D-Neo 50 cm biały",
    collection: "D-Neo",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "50 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "749,00 zł",
    flags: { bestseller: true },
    popularity: 95,
  },
  {
    id: "lw-dneo-60",
    brand: "Duravit",
    title: "Umywalka wisząca D-Neo 60 cm biały",
    collection: "D-Neo",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "60 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "819,00 zł",
    flags: { new: true },
    popularity: 88,
  },
  {
    id: "lw-happyd2-60",
    brand: "Duravit",
    title: "Umywalka wisząca Happy D.2 60 cm biały",
    collection: "Happy D.2",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "60 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 190,00 zł",
    pricePrevious: "1 390,00 zł",
    flags: { promo: true },
    popularity: 86,
  },
  {
    id: "lw-happyd2-80",
    brand: "Duravit",
    title: "Umywalka wisząca Happy D.2 80 cm biały",
    collection: "Happy D.2",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "80 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 490,00 zł",
    flags: { bestseller: true },
    popularity: 84,
  },
  {
    id: "lw-laufen-pro-55",
    brand: "Laufen",
    title: "Umywalka wisząca Pro S 55 cm biały",
    collection: "Pro S",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "50 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "920,00 zł",
    flags: {},
    popularity: 72,
  },
  {
    id: "lw-laufen-pro-65-black",
    brand: "Laufen",
    title: "Umywalka wisząca Pro S 65 cm czarny mat",
    collection: "Pro S",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "60 cm",
    structure: "Monokolor",
    color: "Czarny",
    price: "1 280,00 zł",
    flags: { new: true },
    popularity: 78,
  },
  {
    id: "lw-roca-gap-45",
    brand: "Roca",
    title: "Umywalka wisząca Gap 45 cm biały",
    collection: "Gap",
    purpose: "Toaleta",
    mount: "Ścienna",
    size: "40 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "459,00 zł",
    pricePrevious: "549,00 zł",
    flags: { promo: true, outlet: true },
    popularity: 70,
  },
  {
    id: "lw-roca-gap-60",
    brand: "Roca",
    title: "Umywalka wisząca Gap 60 cm biały",
    collection: "Gap",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "60 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "589,00 zł",
    flags: { bestseller: true },
    popularity: 82,
  },
  {
    id: "lw-villeroy-subway-50",
    brand: "Villeroy & Boch",
    title: "Umywalka wisząca Subway 3.0 50 cm biały",
    collection: "Subway 3.0",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "50 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 050,00 zł",
    flags: {},
    popularity: 76,
  },
  {
    id: "lw-villeroy-subway-80",
    brand: "Villeroy & Boch",
    title: "Umywalka wisząca Subway 3.0 80 cm biały",
    collection: "Subway 3.0",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "80 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 490,00 zł",
    flags: { bestseller: true },
    popularity: 90,
  },
  {
    id: "lw-geberit-smyle-60",
    brand: "Geberit",
    title: "Umywalka wisząca Smyle Square 60 cm biały",
    collection: "Smyle",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "60 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "870,00 zł",
    flags: { new: true },
    popularity: 74,
  },
  {
    id: "lw-oristo-monte-60",
    brand: "ORiSTO",
    title: "Umywalka meblowa Montebianco 60 cm biały mat",
    collection: "Montebianco",
    purpose: "Łazienka",
    mount: "Meblowa",
    size: "60 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 190,00 zł",
    flags: { bestseller: true },
    popularity: 91,
  },
  {
    id: "lw-oristo-monte-80",
    brand: "ORiSTO",
    title: "Umywalka meblowa Montebianco 80 cm biały mat",
    collection: "Montebianco",
    purpose: "Łazienka",
    mount: "Meblowa",
    size: "80 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 390,00 zł",
    pricePrevious: "1 590,00 zł",
    flags: { promo: true },
    popularity: 93,
  },
  {
    id: "lw-oristo-szafka-80",
    brand: "ORiSTO",
    title: "Szafka podumywalkowa Montebianco 80 cm biały mat",
    collection: "Montebianco",
    purpose: "Łazienka",
    mount: "Meblowa",
    size: "80 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 990,00 zł",
    pricePrevious: "2 390,00 zł",
    flags: { promo: true, bestseller: true },
    popularity: 99,
  },
  {
    id: "lw-omnires-ottawa-nab",
    brand: "Omnires",
    title: "Umywalka nablatowa Ottawa 40 cm biały",
    collection: "Ottawa",
    purpose: "Łazienka",
    mount: "Wpuszczana / nablatowa",
    size: "40 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "690,00 zł",
    flags: { new: true },
    popularity: 80,
  },
  {
    id: "lw-omnires-ottawa-black",
    brand: "Omnires",
    title: "Umywalka nablatowa Ottawa 40 cm czarny mat",
    collection: "Ottawa",
    purpose: "Łazienka",
    mount: "Wpuszczana / nablatowa",
    size: "40 cm",
    structure: "Monokolor",
    color: "Czarny",
    price: "790,00 zł",
    flags: { bestseller: true },
    popularity: 87,
  },
  {
    id: "lw-omnires-stone",
    brand: "Omnires",
    title: "Umywalka nablatowa Concrete 45 cm kamień",
    collection: "Concrete",
    purpose: "Łazienka",
    mount: "Wpuszczana / nablatowa",
    size: "50 cm",
    structure: "Kamień",
    color: "Kolorowa",
    price: "1 120,00 zł",
    flags: { new: true },
    popularity: 68,
  },
  {
    id: "lw-excellent-luna-55",
    brand: "Excellent",
    title: "Umywalka nablatowa Luna 55 cm biały",
    collection: "Luna",
    purpose: "Łazienka",
    mount: "Wpuszczana / nablatowa",
    size: "50 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "540,00 zł",
    pricePrevious: "620,00 zł",
    flags: { outlet: true, promo: true },
    popularity: 65,
  },
  {
    id: "lw-excellent-luna-color",
    brand: "Excellent",
    title: "Umywalka nablatowa Luna 45 cm kolorowa",
    collection: "Luna",
    purpose: "Łazienka",
    mount: "Wpuszczana / nablatowa",
    size: "40 cm",
    structure: "Multikolor",
    color: "Kolorowa",
    price: "610,00 zł",
    flags: { new: true },
    popularity: 62,
  },
  {
    id: "lw-kludi-metal-40",
    brand: "Kludi",
    title: "Umywalka wisząca Metal Line 40 cm stal",
    collection: "Metal Line",
    purpose: "Kuchnia",
    mount: "Ścienna",
    size: "40 cm",
    structure: "Metal",
    color: "Kolorowa",
    price: "1 850,00 zł",
    flags: {},
    popularity: 55,
  },
  {
    id: "lw-hansgrohe-beton",
    brand: "Hansgrohe",
    title: "Umywalka nablatowa Xelu Soft 50 cm beton",
    collection: "Xelu Soft",
    purpose: "Łazienka",
    mount: "Wpuszczana / nablatowa",
    size: "50 cm",
    structure: "Beton",
    color: "Kolorowa",
    price: "2 190,00 zł",
    flags: { new: true },
    popularity: 71,
  },
  {
    id: "lw-roca-pralnia",
    brand: "Roca",
    title: "Umywalka gospodarcza Utility 60 cm biały",
    collection: "Utility",
    purpose: "Pralnia",
    mount: "Ścienna",
    size: "60 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "390,00 zł",
    pricePrevious: "450,00 zł",
    flags: { outlet: true },
    popularity: 48,
  },
  {
    id: "lw-villeroy-meble-100",
    brand: "Villeroy & Boch",
    title: "Umywalka meblowa Subway 3.0 100 cm biały",
    collection: "Subway 3.0",
    purpose: "Łazienka",
    mount: "Meblowa",
    size: "80 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 890,00 zł",
    flags: { bestseller: true },
    popularity: 85,
  },
  {
    id: "lw-duravit-meble-120",
    brand: "Duravit",
    title: "Umywalka meblowa D-Neo 120 cm biały",
    collection: "D-Neo",
    purpose: "Łazienka",
    mount: "Meblowa",
    size: "80 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "1 690,00 zł",
    pricePrevious: "1 990,00 zł",
    flags: { promo: true },
    popularity: 79,
  },
  {
    id: "lw-laufen-half",
    brand: "Laufen",
    title: "Półpostument Pro S biały",
    collection: "Pro S",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "40 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "520,00 zł",
    flags: {},
    popularity: 58,
  },
  {
    id: "lw-geberit-black-80",
    brand: "Geberit",
    title: "Umywalka wisząca Smyle Square 80 cm czarny mat",
    collection: "Smyle",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "80 cm",
    structure: "Monokolor",
    color: "Czarny",
    price: "1 320,00 zł",
    flags: { bestseller: true, new: true },
    popularity: 83,
  },
  {
    id: "lw-oristo-mozaika",
    brand: "ORiSTO",
    title: "Umywalka nablatowa Mosaic Bowl 40 cm",
    collection: "Mosaic",
    purpose: "Łazienka",
    mount: "Wpuszczana / nablatowa",
    size: "40 cm",
    structure: "Mozaika",
    color: "Kolorowa",
    price: "980,00 zł",
    flags: { outlet: true },
    popularity: 52,
  },
  {
    id: "lw-excellent-toaleta",
    brand: "Excellent",
    title: "Umywalka wisząca Compact 40 cm biały",
    collection: "Compact",
    purpose: "Toaleta",
    mount: "Ścienna",
    size: "40 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "349,00 zł",
    flags: { bestseller: true },
    popularity: 77,
  },
  {
    id: "lw-hansgrohe-kuchenna",
    brand: "Hansgrohe",
    title: "Umywalka gospodarcza Axor 50 cm stal",
    collection: "Axor",
    purpose: "Kuchnia",
    mount: "Wpuszczana / nablatowa",
    size: "50 cm",
    structure: "Metal",
    color: "Kolorowa",
    price: "2 450,00 zł",
    flags: {},
    popularity: 45,
  },
  {
    id: "lw-roca-wpuszczana",
    brand: "Roca",
    title: "Umywalka wpuszczana Gap 55 cm biały",
    collection: "Gap",
    purpose: "Łazienka",
    mount: "Wpuszczana / nablatowa",
    size: "50 cm",
    structure: "Monokolor",
    color: "Biały",
    price: "510,00 zł",
    flags: {},
    popularity: 66,
  },
  {
    id: "lw-villeroy-premium-black",
    brand: "Villeroy & Boch",
    title: "Umywalka wisząca Subway 3.0 60 cm czarny mat",
    collection: "Subway 3.0",
    purpose: "Łazienka",
    mount: "Ścienna",
    size: "60 cm",
    structure: "Monokolor",
    color: "Czarny",
    price: "1 590,00 zł",
    flags: { promo: true, bestseller: true },
    popularity: 89,
  },
];

export const listingProducts: ListingProduct[] = seeds.map(toListingProduct);

export const listingFacetGroups: ListingFacetGroup[] = [
  {
    key: "brand",
    label: "Marka",
    options: [
      { value: "Duravit", label: "Duravit" },
      { value: "Geberit", label: "Geberit" },
      { value: "Laufen", label: "Laufen" },
      { value: "Roca", label: "Roca" },
      { value: "Villeroy & Boch", label: "Villeroy & Boch" },
      { value: "ORiSTO", label: "ORiSTO" },
      { value: "Omnires", label: "Omnires" },
      { value: "Excellent", label: "Excellent" },
      { value: "Kludi", label: "Kludi" },
      { value: "Hansgrohe", label: "Hansgrohe" },
    ],
  },
  {
    key: "collection",
    label: "Kolekcja",
    options: [
      { value: "D-Neo", label: "D-Neo" },
      { value: "Happy D.2", label: "Happy D.2" },
      { value: "Pro S", label: "Pro S" },
      { value: "Gap", label: "Gap" },
      { value: "Subway 3.0", label: "Subway 3.0" },
      { value: "Smyle", label: "Smyle" },
      { value: "Montebianco", label: "Montebianco" },
      { value: "Ottawa", label: "Ottawa" },
      { value: "Concrete", label: "Concrete" },
      { value: "Luna", label: "Luna" },
      { value: "Metal Line", label: "Metal Line" },
      { value: "Xelu Soft", label: "Xelu Soft" },
      { value: "Utility", label: "Utility" },
      { value: "Mosaic", label: "Mosaic" },
      { value: "Compact", label: "Compact" },
      { value: "Axor", label: "Axor" },
    ],
  },
  {
    key: "purpose",
    label: "Przeznaczenie",
    options: [
      { value: "Łazienka", label: "Łazienka" },
      { value: "Kuchnia", label: "Kuchnia" },
      { value: "Toaleta", label: "Toaleta" },
      { value: "Pralnia", label: "Pralnia" },
    ],
  },
  {
    key: "mount",
    label: "Typ montażu",
    options: [
      { value: "Ścienna", label: "Ścienna" },
      { value: "Meblowa", label: "Meblowa" },
      { value: "Wpuszczana / nablatowa", label: "Wpuszczana / nablatowa" },
    ],
  },
  {
    key: "size",
    label: "Rozmiar",
    options: [
      { value: "40 cm", label: "40 cm" },
      { value: "50 cm", label: "50 cm" },
      { value: "60 cm", label: "60 cm" },
      { value: "80 cm", label: "80 cm" },
    ],
  },
  {
    key: "structure",
    label: "Struktura",
    options: [
      { value: "Kamień", label: "Kamień" },
      { value: "Beton", label: "Beton" },
      { value: "Metal", label: "Metal" },
      { value: "Monokolor", label: "Monokolor" },
      { value: "Multikolor", label: "Multikolor" },
      { value: "Mozaika", label: "Mozaika" },
    ],
  },
  {
    key: "color",
    label: "Kolor",
    options: [
      { value: "Biały", label: "Biały" },
      { value: "Czarny", label: "Czarny" },
      { value: "Kolorowa", label: "Kolorowa" },
    ],
  },
];

export const listingQuickFilters: ListingQuickFilterOption[] = [
  { id: "bestseller", label: "Bestseller", variant: "gold" },
  { id: "outlet", label: "Outlet", variant: "neutral" },
  { id: "new", label: "Nowość", variant: "brand" },
  { id: "promo", label: "Promocja", variant: "promo" },
];

export const listingSortOptions: ListingSortOption[] = [
  { id: "popular", label: "Popularność" },
  { id: "price-asc", label: "Cena: od najniższej" },
  { id: "price-desc", label: "Cena: od najwyższej" },
  { id: "name", label: "Nazwa A-Z" },
];

export function createEmptyListingFilterState(
  sort: ListingFilterState["sort"] = "popular",
): ListingFilterState {
  return {
    facets: {
      brand: [],
      collection: [],
      purpose: [],
      mount: [],
      size: [],
      structure: [],
      color: [],
    },
    quick: [],
    sort,
  };
}

export const listingPage = {
  title: "Umywalki wiszące",
  description:
    "Umywalki ścienne (wiszące) optycznie odciążają wnętrze i ułatwiają utrzymanie porządku - od kompaktowych 40 cm po modele meblowe 80 - 120 cm.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Łazienka", to: "/kategoria" },
    { label: "Umywalki", to: "/podkategoria" },
    { label: "Umywalki wiszące", current: true },
  ],
  locate: {
    slogan: ["Twoja nowa łazienka", "zaczyna się od spotkania"] as const,
    title: "Umów spotkanie w salonie",
    description:
      "Nasz doradca będzie czekał na Ciebie w salonie - pozna Twój projekt, pokaże umywalki na żywo i pomoże dobrać całe wyposażenie. Bez pośpiechu, w dogodnym terminie.",
    ctaLabel: "Umów spotkanie",
    image: {
      src: assetUrl("home/about-salon.jpg"),
      alt: "Salon Elements - ekspozycja łazienki",
      fit: "cover" as const,
    },
  },
  curated: {
    title: "Zobacz wyselekcjonowane produkty",
    description: "Najczęściej wybierane warianty i gotowe zestawienia.",
  },
  empty: {
    title: "Brak produktów dla wybranych filtrów",
    description:
      "Spróbuj zmienić kryteria albo wyczyść filtry, aby zobaczyć pełną ofertę.",
    actionLabel: "Wyczyść filtry",
  },
  inspiration: {
    title: "Poznaj nasze aranżacje i zainspiruj się",
    arrangements: homeInspiration.arrangements.map((item, index) => {
      const titles = [
        "Umywalka wisząca w minimalistycznej łazience",
        "Podwójna umywalka w łazience rodzinnej",
        "Beton i czarna armatura",
        "Sprytny metraż do 4 m²",
        "Elegancja w ciepłej palecie",
        "Głębokie kolory i matowe wykończenia",
      ];
      return {
        ...item,
        id: `listing-insp-${index + 1}`,
        title: titles[index] ?? item.title,
        image: {
          ...item.image,
          alt: titles[index] ?? item.image.alt,
        },
      };
    }),
  },
} as const;

const curatedImg = (
  path: string,
  alt: string,
  focalPoint?: { x: number; y: number },
): ProductImage => ({
  src: assetUrl(path),
  alt,
  fit: "cover",
  ...(focalPoint ? { focalPoint } : {}),
});

export const listingCuratedTiles: ListingCuratedTile[] = [
  {
    label: "Wiszące 40 cm",
    href: "/listing",
    image: curatedImg("listing/curated/wiszace-40.png", "Wiszące 40 cm"),
  },
  {
    label: "Wiszące 50 cm",
    href: "/listing",
    image: curatedImg("listing/curated/wiszace-50.png", "Wiszące 50 cm"),
  },
  {
    label: "Wiszące 60 cm",
    href: "/listing",
    image: curatedImg("listing/curated/wiszace-60.png", "Wiszące 60 cm"),
  },
  {
    label: "Wiszące 80 cm",
    href: "/listing",
    image: curatedImg("listing/curated/wiszace-80.png", "Wiszące 80 cm"),
  },
  {
    label: "Białe",
    href: "/listing",
    image: curatedImg("listing/curated/biale.png", "Białe"),
  },
  {
    label: "Czarne",
    href: "/listing",
    image: curatedImg("listing/curated/czarne.png", "Czarne"),
  },
];

export const listingSeoBlocks: SeoBlock[] = [
  { type: "h2", text: "Umywalki wiszące - funkcjonalność i design" },
  {
    type: "h3",
    text: "Dlaczego umywalka wisząca?",
  },
  {
    type: "p",
    text: "Umywalki wiszące (ścienne) to eleganckie i praktyczne rozwiązanie do nowoczesnych, jak i klasycznych łazienek. Montowane bezpośrednio na ścianie optycznie odciążają wnętrze i ułatwiają utrzymanie porządku - sprawdzają się zarówno w małych, jak i dużych łazienkach.",
  },
  { type: "h3", text: "Formaty i wykończenia" },
  {
    type: "p",
    text: "W ofercie Elements znajdziesz umywalki wiszące w wielu formatach - od kompaktowych modeli 40 - 45 cm do małych łazienek i toalet, po szerokie umywalki meblowe 80 - 120 cm do zabudowy. Dostępne są warianty prostokątne, owalne i półokrągłe, w wykończeniu białym połysk, białym macie oraz w wersjach kolorowych.",
  },
  { type: "h2", text: "Marki i ekspozycja" },
  {
    type: "p",
    text: "Wszystkie produkty pochodzą od renomowanych producentów, takich jak Duravit, Geberit, Laufen, Roca czy Villeroy & Boch, i możesz je obejrzeć na żywo na naszej ekspozycji. Umywalki wiszące montowane bezpośrednio na ścianie optycznie odciążają wnętrze i ułatwiają utrzymanie porządku.",
  },
  { type: "h3", text: "Montaż podtynkowy" },
  {
    type: "p",
    text: "Umywalki ścienne sprawdzają się szczególnie dobrze w połączeniu z podtynkowym systemem montażowym - dzięki temu można swobodnie regulować wysokość zawieszenia i ułatwić sprzątanie. Produkty dostępne na ekspozycji w salonach Elements na terenie całej Polski.",
  },
  { type: "h3", text: "Doradztwo w salonie" },
  {
    type: "p",
    text: "Nie wiesz, który model wybrać do swojej łazienki? Nasi doradcy pomogą dobrać wymiary, typ montażu i pasujące elementy - od baterii po szafkę podumywalkową.",
  },
];
