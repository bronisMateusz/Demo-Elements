import { assetUrl } from "../../app/assets";
import { ctaContextImages } from "../../lib/ctaContextImages";
import { inspirationCarouselArrangements } from "../inspirationCarousel";
import { homeCatalogProducts } from "../home";
import type {
  Product,
  ProductVariants,
  RelatedProduct,
} from "../../types/product";

const montebiancoFrontImage = {
  src: assetUrl("products/montebianco/01-front.png"),
  alt: "Szafka podumywalkowa Montebianco - widok produktu",
};

const montebiancoFinishThumbImage = montebiancoFrontImage;

const montebiancoPriceLegalNote =
  "Ceny brutto. Ostateczną ofertę potwierdzi doradca w salonie.";

export const montebiancoVariants: ProductVariants = {
  axes: [
    {
      id: "width",
      label: "Szerokość",
      type: "chip",
      options: [
        { id: "60", label: "60 cm" },
        { id: "80", label: "80 cm" },
        {
          id: "100",
          label: "100 cm",
          unavailable: true,
          unavailableNote: "Wersja 100 cm wraca do oferty w III kw. 2026.",
        },
      ],
    },
    {
      id: "finish",
      label: "Wykończenie",
      type: "thumbnail",
      options: [
        {
          id: "white-mat",
          label: "Biały mat",
          image: montebiancoFinishThumbImage,
        },
        {
          id: "graphite-mat",
          label: "Grafit mat",
          image: montebiancoFinishThumbImage,
        },
        {
          id: "oak-natural",
          label: "Dąb naturalny",
          image: montebiancoFinishThumbImage,
        },
      ],
    },
  ],
  defaultSelection: { width: "80", finish: "white-mat" },
  combinations: [
    {
      selection: { width: "60", finish: "white-mat" },
      sku: "KBN: MONTESU0602S02",
      title: "Szafka podumywalkowa Montebianco 60 cm biały mat",
      price: {
        current: "1 790 zł",
        previous: "2 190 zł",
        discount: "Taniej o 400 zł",
        note: "Wyjątkowa cena Elements",
        lowestPrice30Days: "2 090 zł",
        legalNote: montebiancoPriceLegalNote,
      },
    },
    {
      selection: { width: "60", finish: "graphite-mat" },
      sku: "KBN: MONTESU0602S04",
      title: "Szafka podumywalkowa Montebianco 60 cm grafit mat",
      price: {
        current: "1 890 zł",
        previous: "2 290 zł",
        discount: "Taniej o 400 zł",
        note: "Wyjątkowa cena Elements",
        lowestPrice30Days: "2 190 zł",
        legalNote: montebiancoPriceLegalNote,
      },
    },
    {
      selection: { width: "60", finish: "oak-natural" },
      sku: "KBN: MONTESU0602S06",
      title: "Szafka podumywalkowa Montebianco 60 cm dąb naturalny",
      price: {
        current: "2 090 zł",
        previous: "2 490 zł",
        discount: "Taniej o 400 zł",
        note: "Wyjątkowa cena Elements",
        lowestPrice30Days: "2 390 zł",
        legalNote: montebiancoPriceLegalNote,
      },
      available: false,
      availabilityNote:
        "Wykończenie dąb naturalny w szerokości 60 cm jest chwilowo niedostępne. Doradca potwierdzi termin dostawy.",
    },
    {
      selection: { width: "80", finish: "white-mat" },
      sku: "KBN: MONTESU0802S02",
      title: "Szafka podumywalkowa Montebianco 80 cm biały mat",
      price: {
        current: "1 990 zł",
        previous: "2 390 zł",
        discount: "Taniej o 400 zł",
        note: "Wyjątkowa cena Elements",
        lowestPrice30Days: "2 190 zł",
        legalNote: montebiancoPriceLegalNote,
      },
    },
    {
      selection: { width: "80", finish: "graphite-mat" },
      sku: "KBN: MONTESU0802S04",
      title: "Szafka podumywalkowa Montebianco 80 cm grafit mat",
      price: {
        current: "2 090 zł",
        previous: "2 490 zł",
        discount: "Taniej o 400 zł",
        note: "Wyjątkowa cena Elements",
        lowestPrice30Days: "2 290 zł",
        legalNote: montebiancoPriceLegalNote,
      },
    },
    {
      selection: { width: "80", finish: "oak-natural" },
      sku: "KBN: MONTESU0802S06",
      title: "Szafka podumywalkowa Montebianco 80 cm dąb naturalny",
      price: {
        current: "2 290 zł",
        previous: "2 690 zł",
        discount: "Taniej o 400 zł",
        note: "Wyjątkowa cena Elements",
        lowestPrice30Days: "2 490 zł",
        legalNote: montebiancoPriceLegalNote,
      },
    },
  ],
};

function related(
  id: string,
  brand: string,
  title: string,
  options: {
    hasStorage?: boolean;
    price?: string;
    pricePrevious?: string;
    subtitle?: string;
    badge?: RelatedProduct["badge"];
    image?: RelatedProduct["image"];
    images?: RelatedProduct["images"];
    swatch?: RelatedProduct["swatch"];
    colorCount?: number;
    sizeCount?: number;
  } = {},
): RelatedProduct {
  const image = options.image ?? {
    src: assetUrl("products/montebianco/01-front.png"),
    alt: title,
  };

  return {
    id,
    brand,
    title,
    image,
    images: options.images,
    href: "/produkt",
    hasStorage: options.hasStorage ?? true,
    price: options.price,
    pricePrevious: options.pricePrevious,
    subtitle: options.subtitle,
    badge: options.badge,
    swatch: options.swatch,
    colorCount: options.colorCount,
    sizeCount: options.sizeCount,
  };
}

const montebiancoRecentlyViewed: RelatedProduct[] = [
  related("oristo-80", "ORiSTO", "Umywalka meblowa ORiSTO 80 cm, biała", {
    subtitle: "Lakier mat",
    price: "890 zł",
    image: { src: montebiancoFrontImage.src, alt: "Umywalka ORiSTO 80 cm" },
    swatch: { src: montebiancoFrontImage.src, alt: "Biały mat" },
    colorCount: 2,
    sizeCount: 1,
  }),
  related(
    "montebianco-mirror",
    "Montebianco",
    "Lustro Montebianco 80 cm w ramie",
    {
      subtitle: "Wykończenie ręczne",
      price: "1 290 zł",
      badge: { label: "Bestseller", variant: "gold" },
      image: {
        src: assetUrl("products/montebianco/04-angle.jpg"),
        alt: "Lustro Montebianco",
      },
      swatch: { src: montebiancoFrontImage.src, alt: "Biały mat" },
      colorCount: 2,
      sizeCount: 1,
    },
  ),
  related(
    "montebianco-side",
    "Montebianco",
    "Szafka boczna Montebianco, biały mat",
    {
      subtitle: "System modułowy",
      price: "1 690 zł",
      image: {
        src: assetUrl("products/montebianco/02-detail.jpg"),
        alt: "Szafka boczna Montebianco",
      },
      swatch: { src: montebiancoFrontImage.src, alt: "Biały mat" },
      colorCount: 3,
      sizeCount: 1,
    },
  ),
  related("mellow", "Elita", "Szafka Mellow 80 cm fume mat, dwie szuflady", {
    subtitle: "Front MDF wilgocioodporny",
    price: "1 790 zł",
    image: {
      src: assetUrl("products/montebianco/02-detail.jpg"),
      alt: "Szafka Mellow 80 cm",
    },
    swatch: { src: montebiancoFrontImage.src, alt: "Fume mat" },
    colorCount: 2,
    sizeCount: 1,
  }),
];

export const montebianco80: Product = {
  id: "montebianco-80",
  slug: "montebianco-80",
  brand: "ORiSTO",
  title: "Szafka podumywalkowa Montebianco 80 cm biały mat",
  collection: {
    name: "Montebianco",
    href: "#kolekcja-montebianco",
  },
  sku: "KBN: MONTESU0802S02",
  badges: [{ label: "Bestseller", variant: "gold", href: "#bestsellery" }],
  variants: montebiancoVariants,
  price: {
    current: "1 990 zł",
    previous: "2 390 zł",
    discount: "Taniej o 400 zł",
    note: "Wyjątkowa cena Elements",
    lowestPrice30Days: "2 190 zł",
    legalNote: montebiancoPriceLegalNote,
  },
  cta: {
    label: "Interesuje Cię ten produkt? Zadaj pytanie",
    lead: "Interesuje Cię ten produkt?",
    actionLabel: "Zadaj pytanie",
    href: "#kontakt",
    secondaryLabel: "Obejrzyj w salonie",
    secondaryHref: "/salony",
  },
  galleryBanner: {
    eyebrow: "Kolekcja Montebianco",
    title: "Dobierz umywalkę ORiSTO do szafki",
    description:
      "Modułowy system - spójna ceramika i meble w jednej kompozycji.",
    href: "#kolekcja-montebianco",
    label: "Zobacz kolekcję",
    image: {
      src: assetUrl("home/inspiration-green-marble.jpg"),
      alt: "Umywalka nablatowa ORiSTO z zieloną szafką Montebianco",
      fit: "cover",
      focalPoint: { x: 38, y: 32 },
    },
  },
  images: [
    {
      src: assetUrl("products/montebianco/01-front.png"),
      alt: "Szafka podumywalkowa Montebianco 80 cm biały mat - widok produktu",
    },
    {
      src: assetUrl("products/montebianco/02-detail.jpg"),
      alt: "Szafka Montebianco - detal szuflad i wnętrza",
      fit: "cover",
      focalPoint: { x: 0, y: 48 },
    },
    {
      src: assetUrl("products/montebianco/03-room.jpg"),
      alt: "Szafka Montebianco w aranżacji łazienki",
      fit: "cover",
    },
    {
      src: assetUrl("products/montebianco/04-angle.jpg"),
      alt: "Szafka Montebianco - aranżacja z umywalką i lustrem",
      fit: "cover",
      focalPoint: { x: 58, y: 60 },
    },
  ],
  seriesTitle: "Inne produkty z tej serii",
  seriesProducts: homeCatalogProducts(
    "series",
    ["omnires-ottawa", "trinnity-m16", "montebianco-80", "florim-tundra"],
    {
      "omnires-ottawa": { label: "Promocja", variant: "promo" },
      "trinnity-m16": { label: "Bestseller", variant: "gold" },
      "montebianco-80": { label: "Promocja", variant: "promo" },
      "florim-tundra": { label: "Nowość", variant: "brand" },
    },
  ),
  editorial: {
    eyebrow: "Informacje o produkcie",
    title: "Klasyczna forma, współczesna funkcjonalność",
    lead: "Kolekcja szafek podumywalkowych Montebianco zaprasza do aranżowania stylowej łazienki w dobrym guście. Starannie dopracowane proporcje i detale przywodzą na myśl czasy tradycyjnych wartości i estetyki, a klasyczna forma łączy się z perfekcją wykonania i funkcjonalnością, której wymagają dzisiejsze standardy.",
    paragraphs: [
      "W miejsce standardowo dołączanych uchwytów w dekorze postarzanej cyny możesz dobrać uchwyty lakierowane w kolorze czarnego matu, złotego połysku lub błyszczące, kryształowe, które stworzą klimat glamour. Montebianco to seria uniwersalna i modułowa - dobierzesz do niej różnorodne umywalki z kolekcji ORiSTO i stworzysz unikalną aranżację.",
    ],
    features: [
      {
        title: "Front z MDF wilgocioodpornej",
        description:
          "Płyta odporna na parę i wilgoć - front nie pęcznieje i zachowuje geometrię przez lata.",
        iconClass: "ph ph-drop-slash",
      },
      {
        title: "Wykończenie lakierowane",
        description:
          "Lakier w macie - głębia koloru i powierzchnia łatwa w utrzymaniu czystości.",
        iconClass: "ph ph-paint-brush",
      },
      {
        title: "System modułowy",
        description:
          "Szafkę połączysz z umywalkami i meblami uzupełniającymi ORiSTO w spójną kompozycję.",
        iconClass: "ph ph-squares-four",
      },
    ],
  },
  specifications: [
    { label: "Szerokość", value: "796 mm" },
    { label: "Materiał frontu", value: "MDF wilgocioodporna" },
    { label: "Wysokość", value: "603 mm" },
    { label: "Powierzchnia", value: "lakier" },
    { label: "Głębokość", value: "459 mm" },
    { label: "Wykończenie / dekor", value: "lakierowany" },
    { label: "Liczba szuflad", value: "2" },
    { label: "Kolor", value: "biały" },
    { label: "Montaż", value: "wiszący" },
    { label: "Poziom połysku", value: "mat" },
  ],
  downloads: [
    { title: "Plik 1", format: "PDF", size: "0,8 MB", href: "#" },
    { title: "Plik 2", format: "PDF", size: "1,2 MB", href: "#" },
    { title: "Plik 3", format: "PDF", size: "4,6 MB", href: "#" },
    { title: "Plik 4", format: "PDF", size: "1,1 MB", href: "#" },
  ],
  architectCta: {
    title: "Projektujesz zawodowo?",
    description:
      "W naszej Strefie architekta znajdziesz katalogi, tekstury, modele 3D i inne przydatne pliki.",
    href: "/strefa-architekta",
    label: "Przejdź do strefy architekta",
    eyebrow: "Strefa architekta",
    image: ctaContextImages.washbasin,
    video: "video/architect-cta.mp4",
  },
  inspirations: inspirationCarouselArrangements("pdp-insp"),
  visualizationCta: {
    title: "Chcesz zobaczyć możliwości Twojej nowej łazienki?",
    description: "Przygotujemy dla Ciebie jej wizualizację.",
    href: "#wizualizacja",
    label: "Poznaj szczegóły",
    note: "Bezpłatna wizualizacja · Bez zobowiązań",
    eyebrow: "Wizualizacja",
    image: ctaContextImages.bathroomGreen,
    secondary: {
      href: "/salony",
      label: "Znajdź salon",
    },
  },
  similarProducts: homeCatalogProducts(
    "similar",
    ["florim-tundra", "omnires-ottawa", "trinnity-m16", "montebianco-80"],
    {
      "florim-tundra": { label: "Nowość", variant: "brand" },
      "omnires-ottawa": { label: "Promocja", variant: "promo" },
      "trinnity-m16": { label: "Bestseller", variant: "gold" },
      "montebianco-80": { label: "Promocja", variant: "promo" },
    },
  ),
  recentlyViewedProducts: montebiancoRecentlyViewed,
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Łazienka", to: "/kategoria" },
    { label: "Meble łazienkowe", to: "#" },
  ],
};
