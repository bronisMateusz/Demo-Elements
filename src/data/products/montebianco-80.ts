import { assetUrl } from "../../app/assets";
import { homeCatalogProducts } from "../home";
import type { Product, ProductVariants, RelatedProduct } from "../../types/product";

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
  related("montebianco-mirror", "Montebianco", "Lustro Montebianco 80 cm w ramie", {
    subtitle: "Wykończenie ręczne",
    price: "1 290 zł",
    badge: { label: "Bestseller", variant: "gold" },
    image: { src: assetUrl("products/montebianco/04-angle.jpg"), alt: "Lustro Montebianco" },
    swatch: { src: montebiancoFrontImage.src, alt: "Biały mat" },
    colorCount: 2,
    sizeCount: 1,
  }),
  related("montebianco-side", "Montebianco", "Szafka boczna Montebianco, biały mat", {
    subtitle: "System modułowy",
    price: "1 690 zł",
    image: { src: assetUrl("products/montebianco/02-detail.jpg"), alt: "Szafka boczna Montebianco" },
    swatch: { src: montebiancoFrontImage.src, alt: "Biały mat" },
    colorCount: 3,
    sizeCount: 1,
  }),
  related("mellow", "Elita", "Szafka Mellow 80 cm fume mat, dwie szuflady", {
    subtitle: "Front MDF wilgocioodporny",
    price: "1 790 zł",
    image: { src: assetUrl("products/montebianco/02-detail.jpg"), alt: "Szafka Mellow 80 cm" },
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
  sku: "KBN: MONTESU0802S02",
  badges: [{ label: "Bestseller", variant: "gold" }],
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
  },
  salonCard: {
    eyebrow: "Obejrzyj na żywo",
    description: "Wybierz najbliższy salon Elements i umów się na prezentację.",
    href: "#salony",
    label: "Wybierz swój salon",
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
    ["omnires-ottawa", "trinnity-m16", "grespania-halley", "florim-tundra"],
    {
      "omnires-ottawa": { label: "Promocja", variant: "promo" },
      "trinnity-m16": { label: "Bestseller", variant: "gold" },
      "grespania-halley": { label: "Promocja", variant: "promo" },
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
        image: {
          src: assetUrl("products/montebianco/02-detail.jpg"),
          alt: "Detal frontu szafki Montebianco - MDF wilgocioodporna",
          focalPoint: { x: 50, y: 45 },
        },
      },
      {
        title: "Wykończenie lakierowane",
        description:
          "Lakier w macie - głębia koloru i powierzchnia łatwa w utrzymaniu czystości.",
        image: {
          src: assetUrl("products/montebianco/04-angle.jpg"),
          alt: "Matowe wykończenie frontu Montebianco",
          focalPoint: { x: 55, y: 40 },
        },
      },
      {
        title: "System modułowy",
        description:
          "Szafkę połączysz z umywalkami i meblami uzupełniającymi ORiSTO w spójną kompozycję.",
        image: {
          src: assetUrl("products/montebianco/03-room.jpg"),
          alt: "Modułowa aranżacja łazienki z kolekcją Montebianco",
          focalPoint: { x: 50, y: 55 },
        },
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
    href: "#strefa-architekta",
    label: "Przejdź do strefy architekta",
    eyebrow: "Strefa architekta",
    image: {
      src: assetUrl("products/montebianco/03-room.jpg"),
      alt: "Łazienka z kolekcją Montebianco - aranżacja dla architektów",
      focalPoint: { x: 50, y: 55 },
    },
    video: "video/architect-cta.mp4",
  },
  inspirations: [
    {
      id: "insp-1",
      title: "Klasyczna elegancja w jasnej łazience",
      image: {
        src: assetUrl("home/inspiration-oristo-pillow.jpg"),
        alt: "Klasyczna elegancja w jasnej łazience",
        fit: "cover",
        focalPoint: { x: 50, y: 55 },
      },
      items: [
        "Szafka Montebianco 80 cm - ten produkt",
        "Umywalka meblowa ORiSTO 80 cm",
        "Bateria umywalkowa, złoto szczotkowane",
        "Lustro Montebianco 80 cm w ramie",
      ],
    },
    {
      id: "insp-2",
      title: "Ciepły minimalizm z akcentami drewna",
      image: {
        src: assetUrl("home/inspiration-warm-minimal.jpg"),
        alt: "Ciepły minimalizm z akcentami drewna",
        fit: "cover",
        focalPoint: { x: 50, y: 55 },
      },
      items: [
        "Wanna wolnostojąca, biały mat",
        "Bateria wannowa podtynkowa, złoto szczotkowane",
        "Słuchawka prysznicowa z wężem, złoto szczotkowane",
        "Półka drewniana na wannę",
      ],
    },
    {
      id: "insp-3",
      title: "Głęboka zieleń i marmur",
      image: {
        src: assetUrl("home/inspiration-green-marble.jpg"),
        alt: "Głęboka zieleń i marmur",
        fit: "cover",
        focalPoint: { x: 50, y: 55 },
      },
      items: [
        "Szafka podumywalkowa, zielony mat, fronty ryflowane",
        "Umywalka nablatowa, zieleń / biały",
        "Bateria umywalkowa podtynkowa, czarny mat",
        "Płytki imitujące czarny marmur",
      ],
    },
  ],
  visualizationCta: {
    title:
      "Chcesz zobaczyć możliwości Twojej nowej łazienki? Przygotujemy dla Ciebie jej wizualizację.",
    href: "#wizualizacja",
    label: "Poznaj szczegóły",
    note: "Bezpłatna wizualizacja · Bez zobowiązań",
    secondary: {
      href: "#salony",
      label: "Znajdź salon",
    },
  },
  similarProducts: homeCatalogProducts(
    "similar",
    ["florim-tundra", "omnires-ottawa", "trinnity-m16", "grespania-halley"],
    {
      "florim-tundra": { label: "Nowość", variant: "brand" },
      "omnires-ottawa": { label: "Promocja", variant: "promo" },
      "trinnity-m16": { label: "Bestseller", variant: "gold" },
      "grespania-halley": { label: "Promocja", variant: "promo" },
    },
  ),
  recentlyViewedProducts: montebiancoRecentlyViewed,
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Łazienka", to: "#" },
    { label: "Meble łazienkowe", to: "#" },
  ],
};
