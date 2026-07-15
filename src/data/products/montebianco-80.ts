import { assetUrl } from "../../app/assets";
import type { Product, ProductVariants, RelatedProduct } from "../../types/product";

const montebiancoFinishThumbImage = {
  src: assetUrl("products/montebianco/01-front.jpg"),
  alt: "Szafka podumywalkowa Montebianco — widok produktu",
};

const montebiancoVariants: ProductVariants = {
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
        legalNote:
          "Ceny brutto. Ostateczną ofertę potwierdzi doradca w salonie. Najniższa cena z ostatnich 30 dni przed obniżką.",
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
        legalNote:
          "Ceny brutto. Ostateczną ofertę potwierdzi doradca w salonie. Najniższa cena z ostatnich 30 dni przed obniżką.",
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
        legalNote:
          "Ceny brutto. Ostateczną ofertę potwierdzi doradca w salonie. Najniższa cena z ostatnich 30 dni przed obniżką.",
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
        legalNote:
          "Ceny brutto. Ostateczną ofertę potwierdzi doradca w salonie. Najniższa cena z ostatnich 30 dni przed obniżką.",
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
        legalNote:
          "Ceny brutto. Ostateczną ofertę potwierdzi doradca w salonie. Najniższa cena z ostatnich 30 dni przed obniżką.",
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
        legalNote:
          "Ceny brutto. Ostateczną ofertę potwierdzi doradca w salonie. Najniższa cena z ostatnich 30 dni przed obniżką.",
      },
    },
  ],
};

const placeholder = (name: string): RelatedProduct["image"] => ({
  src: assetUrl(`products/montebianco/${name}`),
  alt: "",
});

function related(
  id: string,
  brand: string,
  title: string,
  options: {
    hasStorage?: boolean;
    price?: string;
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
    src: assetUrl("products/montebianco/placeholder.jpg"),
    alt: title,
  };

  return {
    id,
    brand,
    title,
    image,
    images: options.images,
    href: "#",
    hasStorage: options.hasStorage ?? true,
    price: options.price,
    subtitle: options.subtitle,
    badge: options.badge,
    swatch: options.swatch,
    colorCount: options.colorCount,
    sizeCount: options.sizeCount,
  };
}

export const montebianco80: Product = {
  id: "montebianco-80",
  slug: "montebianco-80",
  brand: "ORiSTO",
  title: "Szafka podumywalkowa Montebianco 80 cm biały mat",
  sku: "KBN: MONTESU0802S02",
  badges: [
    { label: "ORiSTO", variant: "outline" },
    { label: "Bestseller", variant: "gold" },
    { label: "Nowość", variant: "default" },
  ],
  variants: montebiancoVariants,
  price: {
    current: "1 990 zł",
    previous: "2 390 zł",
    discount: "Taniej o 400 zł",
    note: "Wyjątkowa cena Elements",
    legalNote:
      "Ceny brutto. Ostateczną ofertę potwierdzi doradca w salonie. Najniższa cena z ostatnich 30 dni przed obniżką.",
  },
  cta: {
    label: "Interesuje Cię ten produkt? Zadaj pytanie",
    href: "#kontakt",
  },
  offerNote: {
    title: "Oferta indywidualna",
    description:
      "Skontaktuj się z nami — nasz doradca przygotuje dla Ciebie indywidualną ofertę i odpowie na wszystkie pytania. Bezpłatnie i bez zobowiązań.",
  },
  images: [
    {
      src: assetUrl("products/montebianco/01-front.jpg"),
      alt: "Szafka podumywalkowa Montebianco 80 cm biały mat — widok produktu",
    },
    {
      src: assetUrl("products/montebianco/02-detail.jpg"),
      alt: "Szafka Montebianco — detal szuflad i wnętrza",
      focalPoint: { x: 0, y: 48 },
    },
    {
      src: assetUrl("products/montebianco/03-room.jpg"),
      alt: "Szafka Montebianco w aranżacji łazienki",
    },
    {
      src: assetUrl("products/montebianco/04-angle.jpg"),
      alt: "Szafka Montebianco — aranżacja z umywalką i lustrem",
      focalPoint: { x: 58, y: 60 },
    },
  ],
  seriesTitle: "Inne produkty z tej serii",
  seriesProducts: [
    related("oristo-80", "ORiSTO", "Umywalka meblowa ORiSTO 80 cm, biała", {
      subtitle: "Lakier mat",
      price: "890 zł",
      badge: { label: "Elements Icon", variant: "brand" },
      image: { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Umywalka ORiSTO 80 cm" },
      images: [
        { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Umywalka ORiSTO — front" },
        { src: assetUrl("products/montebianco/02-detail.jpg"), alt: "Umywalka ORiSTO — detal" },
      ],
      swatch: { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Biały mat" },
      colorCount: 2,
      sizeCount: 1,
    }),
    related("montebianco-tall", "Montebianco", "Słupek wysoki Montebianco, biały mat", {
      subtitle: "Front MDF wilgocioodporny",
      price: "2 490 zł",
      image: { src: assetUrl("products/montebianco/03-room.jpg"), alt: "Słupek Montebianco" },
      images: [
        { src: assetUrl("products/montebianco/03-room.jpg"), alt: "Słupek Montebianco — aranżacja" },
        { src: assetUrl("products/montebianco/04-angle.jpg"), alt: "Słupek Montebianco — detal" },
      ],
      swatch: { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Biały mat" },
      colorCount: 3,
    }),
    related("montebianco-mirror", "Montebianco", "Lustro Montebianco 80 cm w ramie", {
      subtitle: "Wykończenie ręczne",
      price: "1 290 zł",
      badge: { label: "Bestseller", variant: "gold" },
      image: { src: assetUrl("products/montebianco/04-angle.jpg"), alt: "Lustro Montebianco" },
      images: [
        { src: assetUrl("products/montebianco/04-angle.jpg"), alt: "Lustro Montebianco — front" },
        { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Lustro Montebianco — detal ramy" },
      ],
      swatch: { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Biały mat" },
      colorCount: 2,
      sizeCount: 1,
    }),
    related("montebianco-side", "Montebianco", "Szafka boczna Montebianco, biały mat", {
      subtitle: "System modułowy",
      price: "1 690 zł",
      image: { src: assetUrl("products/montebianco/02-detail.jpg"), alt: "Szafka boczna Montebianco" },
      images: [
        { src: assetUrl("products/montebianco/02-detail.jpg"), alt: "Szafka boczna — detal" },
        { src: assetUrl("products/montebianco/03-room.jpg"), alt: "Szafka boczna — aranżacja" },
      ],
      swatch: { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Biały mat" },
      colorCount: 3,
      sizeCount: 1,
    }),
    related("montebianco-wall", "Montebianco", "Szafka wisząca Montebianco 60 cm", {
      subtitle: "Montaż wiszący",
      price: "1 490 zł",
      image: { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Szafka wisząca Montebianco" },
      images: [
        { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Szafka wisząca — front" },
        { src: assetUrl("products/montebianco/04-angle.jpg"), alt: "Szafka wisząca — perspektywa" },
      ],
      swatch: { src: assetUrl("products/montebianco/01-front.jpg"), alt: "Biały mat" },
      colorCount: 2,
    }),
  ],
  editorial: {
    eyebrow: "Informacje o produkcie",
    title: "Klasyczna forma, współczesna funkcjonalność",
    paragraphs: [
      "Kolekcja szafek podumywalkowych Montebianco zaprasza do aranżowania stylowej łazienki w dobrym guście. Starannie dopracowane proporcje i detale przywodzą na myśl czasy tradycyjnych wartości i estetyki, a klasyczna forma łączy się z perfekcją wykonania i funkcjonalnością, której wymagają dzisiejsze standardy.",
      "W miejsce standardowo dołączanych uchwytów w dekorze postarzanej cyny możesz dobrać uchwyty lakierowane w kolorze czarnego matu, złotego połysku lub błyszczące, kryształowe, które stworzą klimat glamour. Montebianco to seria uniwersalna i modułowa — dobierzesz do niej różnorodne umywalki z kolekcji ORiSTO i stworzysz unikalną aranżację.",
    ],
    features: [
      {
        title: "Front z MDF wilgocioodpornej",
        description:
          "Płyta odporna na parę i wilgoć — front nie pęcznieje i zachowuje geometrię przez lata.",
      },
      {
        title: "Wykończenie lakierowane",
        description:
          "Lakier w macie — głębia koloru i powierzchnia łatwa w utrzymaniu czystości.",
      },
      {
        title: "System modułowy",
        description:
          "Szafkę połączysz z umywalkami i meblami uzupełniającymi ORiSTO w spójną kompozycję.",
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
  },
  inspirations: [
    {
      id: "insp-1",
      title: "Klasyczna elegancja w jasnej łazience",
      image: placeholder("inspiration-1.jpg"),
      items: [
        "Szafka Montebianco 80 cm — ten produkt",
        "Umywalka meblowa ORiSTO 80 cm",
        "Bateria umywalkowa, złoto szczotkowane",
        "Lustro Montebianco 80 cm w ramie",
      ],
    },
    {
      id: "insp-2",
      title: "Ciepły minimalizm z akcentami drewna",
      image: placeholder("inspiration-2.jpg"),
      items: [
        "Szafka Montebianco 80 cm — ten produkt",
        "Słupek wysoki Montebianco, biały mat",
        "Bateria umywalkowa, czarny mat",
      ],
    },
    {
      id: "insp-3",
      title: "Klasyka glamour z połyskiem",
      image: placeholder("inspiration-3.jpg"),
      items: [
        "Szafka Montebianco 80 cm — ten produkt",
        "Lustro Montebianco 80 cm w ramie",
        "Uchwyty kryształowe, złoty połysk",
        "Bateria umywalkowa, złoto połysk",
      ],
    },
  ],
  visualizationCta: {
    title:
      "Chcesz zobaczyć możliwości Twojej nowej łazienki? Przygotujemy dla Ciebie jej wizualizację.",
    href: "#wizualizacja",
    label: "Poznaj szczegóły",
  },
  similarProducts: [
    related("d-neo", "Duravit", "Szafka podumywalkowa D-Neo 78 cm, len brąz"),
    related("mellow", "Elita", "Szafka Mellow 80 cm fume mat, dwie szuflady"),
    related("soho", "Elita", "Szafka Soho 80 cm fume mat, front ryflowane szkło"),
    related("ella", "Roca", "Szafka Ella 100 cm, zielony mat, soft-close"),
    related("larga", "Cersanit", "Szafka Larga 80 cm, czarny mat, dwie szuflady"),
  ],
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Łazienka", to: "#" },
    { label: "Meble łazienkowe", to: "#" },
    { label: "Montebianco 80 cm" },
  ],
};
