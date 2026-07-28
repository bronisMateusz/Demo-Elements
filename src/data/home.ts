import { assetUrl } from "../app/assets";
import type { InspirationArrangement, ProductImage, RelatedProduct } from "../types/product";

const img = (name: string, alt: string): ProductImage => ({
  src: assetUrl(`products/montebianco/${name}`),
  alt,
  fit: "cover",
});

export const HOME_HERO_AUTOPLAY_MS = 6000;

type HomeHeroMainSlide = {
  id: string;
  hint: string;
  kind: "main";
  title: string;
  lead: string;
  image: ProductImage;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

type HomeHeroPromoSlide = {
  id: string;
  hint: string;
  kind: "promo";
  brand: string;
  title: string;
  description: string;
  href: string;
  image: ProductImage;
};

export type HomeHeroSlide = HomeHeroMainSlide | HomeHeroPromoSlide;

/** Hero carousel: main story + promo banners (hints / arrows / progress in UI). */
export const homeHeroSlides: HomeHeroSlide[] = [
  {
    id: "elements",
    hint: "Elements — Twoja wymarzona łazienka",
    kind: "main",
    title: "Twoja wymarzona łazienka zaczyna się tutaj.",
    lead: "Obejrzyj na żywo, dobierz z doradcą i zaplanuj wszystko w jednym miejscu.",
    image: img("03-room.jpg", "Szeroka aranżacja łazienki z ekspozycji Elements"),
    primaryCta: { label: "Napisz do doradcy", href: "#kontakt" },
    secondaryCta: { label: "Pobierz magazyn Elements", href: "#magazyn" },
  },
  {
    id: "delabie",
    hint: "Delabie — szafka z lustrem 3 w 1",
    kind: "promo",
    brand: "Delabie",
    title: "Szafka z lustrem 3 w 1",
    description: "Lustro – Mydło – Suszarka",
    href: "#",
    image: img("04-angle.jpg", "Baner Delabie — szafka z lustrem 3 w 1"),
  },
  {
    id: "geberit-caluna",
    hint: "Geberit Caluna — ceramika i meble",
    kind: "promo",
    brand: "Geberit Caluna",
    title: "Ceramika i meble łazienkowe",
    description: "Nowa kolekcja w salonach Elements",
    href: "#",
    image: img("inspiration-1.jpg", "Baner Geberit Caluna — ceramika i meble"),
  },
  {
    id: "outlet",
    hint: "Outlet Elements — do −40%",
    kind: "promo",
    brand: "Outlet Elements",
    title: "Do −40% na produkty z ekspozycji",
    description: "Wyprzedaż ekspozycji w salonach",
    href: "#outlet",
    image: img("inspiration-2.jpg", "Baner Outlet Elements — do −40%"),
  },
];


export const homeCategories = {
  title: "Czego dziś szukasz do swojej łazienki?",
  items: [
    { label: "Płytki", href: "#plytki-rodzaje", iconClass: "ph ph-squares-four" },
    { label: "Domowe SPA", href: "#domowe-spa", iconClass: "ph ph-flower-lotus" },
    { label: "Wanny", href: "#wanny", iconClass: "ph ph-bathtub" },
    { label: "Armatura", href: "#armatura", iconClass: "ph ph-drop" },
    { label: "Umywalki", href: "#umywalki", iconClass: "ph ph-circle" },
    { label: "Meble", href: "#meble", iconClass: "ph ph-stack" },
    { label: "Prysznic", href: "#prysznic", iconClass: "ph ph-shower" },
    { label: "Kabiny", href: "#konfigurator-kabin", iconClass: "ph ph-corners-out" },
    {
      label: "Płytki imitujące drewno",
      href: "#imitujace-drewno",
      iconClass: "ph ph-tree",
    },
  ],
} as const;

function product(
  id: string,
  brand: string,
  title: string,
  options: {
    price: string;
    pricePrevious?: string;
    badge: RelatedProduct["badge"];
    image: RelatedProduct["image"];
  },
): RelatedProduct {
  return {
    id,
    brand,
    title,
    href: "/produkt",
    price: options.price,
    pricePrevious: options.pricePrevious,
    badge: options.badge,
    image: options.image,
  };
}

export type HomeProductTabId = "promocje" | "nowosci" | "bestsellery" | "outlet";

export const homeProductTabs: {
  id: HomeProductTabId;
  label: string;
  seeAllLabel: string;
  seeAllHref: string;
  products: RelatedProduct[];
}[] = [
  {
    id: "promocje",
    label: "Promocje",
    seeAllLabel: "Zobacz wszystkie promocje",
    seeAllHref: "#promocje",
    products: [
      product("promo-1", "Grespania", "Płytka gresowa Halley White Mat 60×120 cm", {
        price: "119,00 zł",
        pricePrevious: "139,00 zł",
        badge: { label: "Promocja", variant: "promo" },
        image: img("01-front.png", "Grespania Halley White Mat"),
      }),
      product("promo-2", "Florim", "Nature Mood Tundra Comfort 120×120 cm", {
        price: "254,00 zł",
        pricePrevious: "279,00 zł",
        badge: { label: "Promocja", variant: "promo" },
        image: img("02-detail.jpg", "Florim Nature Mood Tundra"),
      }),
      product("promo-3", "Omnires", "Ottawa Comfort miska WC wisząca z deską wolnoopadającą", {
        price: "1 280,00 zł",
        pricePrevious: "1 337,80 zł",
        badge: { label: "Promocja", variant: "promo" },
        image: img("04-angle.jpg", "Omnires Ottawa Comfort"),
      }),
      product("promo-4", "Villeroy&Boch", "Miska z deską + stelaż Grohe Rapid SL z przyciskiem chrom", {
        price: "1 585,10 zł",
        badge: { label: "Promocja", variant: "promo" },
        image: img("03-room.jpg", "Zestaw Villeroy&Boch + Grohe"),
      }),
    ],
  },
  {
    id: "nowosci",
    label: "Nowości",
    seeAllLabel: "Zobacz wszystkie nowości",
    seeAllHref: "#nowosci",
    products: [
      product("new-1", "Marazzi", "Płytka imitująca trawertyn, mat 60×120 cm", {
        price: "159,00 zł",
        badge: { label: "Nowość", variant: "brand" },
        image: img("inspiration-1.jpg", "Marazzi trawertyn"),
      }),
      product("new-2", "Hansgrohe", "Bateria umywalkowa podtynkowa, czarny mat", {
        price: "899,00 zł",
        badge: { label: "Nowość", variant: "brand" },
        image: img("02-detail.jpg", "Hansgrohe bateria podtynkowa"),
      }),
      product("new-3", "Villeroy&Boch", "Umywalka nablatowa okrągła, biały CeramicPlus", {
        price: "1 190,00 zł",
        badge: { label: "Nowość", variant: "brand" },
        image: img("01-front.png", "Villeroy&Boch umywalka nablatowa"),
      }),
      product("new-4", "ORiSTO", "Szafka podumywalkowa 100 cm, dąb naturalny", {
        price: "1 349,00 zł",
        badge: { label: "Nowość", variant: "brand" },
        image: img("04-angle.jpg", "ORiSTO szafka 100 cm"),
      }),
    ],
  },
  {
    id: "bestsellery",
    label: "Bestsellery",
    seeAllLabel: "Zobacz wszystkie bestsellery",
    seeAllHref: "#bestsellery",
    products: [
      product("best-1", "Grespania", "Płytka gresowa imitująca kamień naturalny 60×60 cm", {
        price: "129 zł",
        pricePrevious: "169 zł",
        badge: { label: "Bestseller", variant: "gold" },
        image: img("inspiration-2.jpg", "Grespania kamień"),
      }),
      product("best-2", "Roca", "Bateria umywalkowa stojąca z wylewką, chrom", {
        price: "399 zł",
        pricePrevious: "549 zł",
        badge: { label: "Bestseller", variant: "gold" },
        image: img("02-detail.jpg", "Roca bateria umywalkowa"),
      }),
      product("best-3", "Excellent", "Wanna wolnostojąca akrylowa 170 cm, biały połysk", {
        price: "2 190 zł",
        pricePrevious: "2 890 zł",
        badge: { label: "Bestseller", variant: "gold" },
        image: img("inspiration-3.jpg", "Excellent wanna wolnostojąca"),
      }),
      product("best-4", "ORiSTO", "Szafka podumywalkowa z blatem 80 cm", {
        price: "899 zł",
        pricePrevious: "1 199 zł",
        badge: { label: "Bestseller", variant: "gold" },
        image: img("03-room.jpg", "ORiSTO szafka 80 cm"),
      }),
    ],
  },
  {
    id: "outlet",
    label: "Outlet",
    seeAllLabel: "Zobacz cały Outlet",
    seeAllHref: "#outlet",
    products: [
      product("out-1", "Marazzi", "Płytka imitująca drewno 20×120 cm — ekspozycja", {
        price: "83 zł",
        pricePrevious: "139 zł",
        badge: { label: "Ekspozycja", variant: "neutral" },
        image: img("inspiration-1.jpg", "Marazzi drewno ekspozycja"),
      }),
      product("out-2", "Geberit", "Stelaż podtynkowy Duofix z przyciskiem — końcówka serii", {
        price: "649 zł",
        pricePrevious: "999 zł",
        badge: { label: "Końcówka serii", variant: "neutral" },
        image: img("01-front.png", "Geberit Duofix"),
      }),
      product("out-3", "Kludi", "Zestaw prysznicowy natynkowy, chrom — z ekspozycji", {
        price: "459 zł",
        pricePrevious: "729 zł",
        badge: { label: "Outlet", variant: "neutral" },
        image: img("04-angle.jpg", "Kludi zestaw prysznicowy"),
      }),
      product("out-4", "Cersanit", "Umywalka meblowa 60 cm, biały — powystawowa", {
        price: "149 zł",
        pricePrevious: "299 zł",
        badge: { label: "Powystawowe", variant: "neutral" },
        image: img("02-detail.jpg", "Cersanit umywalka powystawowa"),
      }),
    ],
  },
];

export const homeProductsSection = {
  title: "Wybrane produkty w cenach Elements",
} as const;

export const homeBrands = {
  title: "Renomowane marki w naszej ofercie",
  seeAllLabel: "Zobacz wszystkie 300+ marek",
  seeAllHref: "#producenci",
  /** Visible grid slots; pool below is larger so cells can rotate. */
  slotCount: 8,
  cycleIntervalMs: 3800,
  items: [
    { label: "Villeroy&Boch", href: "#producenci/villeroy-boch" },
    { label: "Geberit", href: "#producenci/geberit" },
    { label: "Grespania", href: "#producenci/grespania" },
    { label: "Marazzi", href: "#producenci/marazzi" },
    { label: "Roca", href: "#producenci/roca" },
    { label: "Tubądzin", href: "#producenci/tubadzin" },
    { label: "Cersanit", href: "#producenci/cersanit" },
    { label: "Paradyż", href: "#producenci/paradyz" },
    { label: "Excellent", href: "#producenci/excellent" },
    { label: "ORiSTO", href: "#producenci/oristo" },
    { label: "Kludi", href: "#producenci/kludi" },
    { label: "Hansgrohe", href: "#producenci/hansgrohe" },
    { label: "Grohe", href: "#producenci/grohe" },
    { label: "Duravit", href: "#producenci/duravit" },
    { label: "Ideal Standard", href: "#producenci/ideal-standard" },
    { label: "Omnires", href: "#producenci/omnires" },
    { label: "Koło", href: "#producenci/kolo" },
    { label: "TECE", href: "#producenci/tece" },
    { label: "Deante", href: "#producenci/deante" },
    { label: "Blanco", href: "#producenci/blanco" },
  ],
} as const;

export const homeAppointment = {
  eyebrow: "Twoja nowa łazienka zaczyna się od spotkania",
  title: "Umów spotkanie w salonie",
  description:
    "Nasz doradca będzie czekał na Ciebie w salonie — pozna Twój projekt, pokaże produkty na żywo i pomoże dobrać całe wyposażenie. Bez pośpiechu, w dogodnym terminie.",
  ctaLabel: "Umów spotkanie",
} as const;

export const homeAdvisorCta = {
  title: "Nie wiesz, od czego zacząć? Porozmawiaj z doradcą.",
  description:
    "Napisz do nas online albo umów się na spotkanie w salonie — doradca pomoże dobrać całe wyposażenie Twojej łazienki.",
  primaryCta: { label: "Napisz do doradcy", href: "#kontakt" },
  secondaryCta: { label: "Umów spotkanie" },
} as const;

export const homeInspiration = {
  eyebrow: "Inspiracje",
  title: "Poznaj nasze aranżacje i zainspiruj się",
  seeMoreLabel: "Zobacz więcej aranżacji",
  seeMoreHref: "#inspiracje",
  arrangements: [
    {
      id: "insp-1",
      title: "Strefa relaksu z wanną wolnostojącą",
      image: img("inspiration-1.jpg", "Strefa relaksu z wanną wolnostojącą"),
      items: ["Wanna wolnostojąca", "Ciepłe oświetlenie", "Naturalne materiały"],
    },
    {
      id: "insp-2",
      title: "Jasne płytki wielkoformatowe",
      image: img("inspiration-2.jpg", "Jasne płytki wielkoformatowe"),
      items: ["Płytki 120×120", "Minimalistyczna armatura", "Dużo światła"],
    },
    {
      id: "insp-3",
      title: "Beton i czarna armatura",
      image: img("inspiration-3.jpg", "Beton i czarna armatura"),
      items: ["Imitacja betonu", "Czarny mat", "Kontrastowe detale"],
    },
    {
      id: "insp-4",
      title: "Sprytny metraż do 4 m²",
      image: img("03-room.jpg", "Sprytny metraż do 4 m²"),
      items: ["Kompaktowa zabudowa", "Prysznic walk-in", "Przechowywanie"],
    },
    {
      id: "insp-5",
      title: "Elegancja w ciepłej palecie",
      image: img("04-angle.jpg", "Elegancja w ciepłej palecie"),
      items: ["Beże i złoto", "Meble drewnopodobne", "Miękkie tekstury"],
    },
    {
      id: "insp-6",
      title: "Głębokie kolory i matowe wykończenia",
      image: img("02-detail.jpg", "Głębokie kolory i matowe wykończenia"),
      items: ["Głęboka zieleń", "Matowa ceramika", "Akcenty metaliczne"],
    },
  ] satisfies InspirationArrangement[],
} as const;

export const HOME_MAGAZINE_PDF_HREF =
  "https://www.elements-show.pl/sites/default/files/2026-02/Top%20Trendy_2025-26_wydanie2.pdf";

export const homeMagazine = {
  id: "magazyn",
  eyebrow: "Najlepsze produkty w super cenach · jubileuszowe wydanie",
  title: "Magazyn TOP TRENDY 2026",
  description:
    "Przeglądaj bestsellery, nowości i inspiracje w jednym miejscu. Najpopularniejsze wzory ceramiki, armatury, wanien, kabin, płytek i dodatków — z wyjątkowymi cenami Elements.",
  badge: "10-lecie",
  image: {
    src: assetUrl("magazine/top-trendy-2025-26-cover.jpg"),
    alt: "Okładka magazynu TOP TRENDY 2025/26",
    fit: "cover" as const,
  },
  primaryCta: { label: "Zobacz magazyn online", href: HOME_MAGAZINE_PDF_HREF },
  secondaryCta: { label: "Pobierz PDF", href: HOME_MAGAZINE_PDF_HREF },
} as const;

export const homePartners = {
  title: "Współpracuj z Elements",
  lead:
    "Specjalne warunki dla architektów i instalatorów — dołącz do grona partnerów, którzy realizują projekty z najlepszymi markami.",
  cards: [
    {
      id: "architects",
      title: "Dla architektów",
      description:
        "Dedykowane wsparcie, materiały projektowe i program partnerski, który realnie ułatwia Twoją pracę i buduje relację z klientem.",
      image: img("03-room.jpg", "Architekt przy pracy z materiałami Elements"),
      href: "#strefa-architekta",
      ctaLabel: "Przejdź do strefy architekta",
      benefits: [
        "Materiały do projektu — modele 3D, pliki CAD/DWG, tekstury i karty techniczne",
        "19 salonów z przestrzenią do spotkań z klientem",
        "Program lojalnościowy „Elements w Podróży” — szkolenia i wyjazdy",
      ],
    },
    {
      id: "installers",
      title: "Dla instalatorów",
      description:
        "Atrakcyjne warunki handlowe, błyskawiczny dostęp do towaru i narzędzia, które przekładają się na realny zysk każdej ekipy.",
      image: img("inspiration-3.jpg", "Instalator na budowie z produktami Elements"),
      href: "#strefa-instalatora",
      ctaLabel: "Przejdź do strefy instalatora",
      benefits: [
        "Atrakcyjne warunki współpracy i indywidualne limity kupieckie",
        "Zakupy online — ponad 500 000 produktów z dostawą",
        "Podgląd stanów magazynowych w czasie rzeczywistym",
        "Darmowa dostawa na wskazany adres",
        "Cykliczne szkolenia produktowe — stacjonarne i wyjazdowe",
      ],
    },
  ],
} as const;

export const homeAbout = {
  title: "Elements — tu powstają wyjątkowe łazienki",
  lead:
    "Elements to sieć salonów, które powstały z myślą o spełnianiu marzeń o idealnej łazience — znajdziesz nas w 19 lokalizacjach w całej Polsce. Inspirujemy do tworzenia wnętrz, które łączą modny design, komfort i funkcjonalność. Niezależnie od tego, czy marzysz o domowej strefie SPA, eleganckim salonie kąpielowym czy przytulnej łazience, nasze salony to miejsce, w którym Twoje pomysły mogą stać się rzeczywistością.",
  subtitle: "Szeroki wybór produktów — armatura, płytki oraz dodatki",
  body: [
    "Każdy z ",
    { bold: "salonów łazienkowych" },
    " Elements to miejsce, gdzie znajdziesz najmodniejsze wzory i modele ceramiki, armatury, mebli oraz dodatków łazienkowych. Co więcej, to właśnie tutaj najnowsze trendy łączą się z różnorodnymi stylami, tworząc ofertę dopasowaną do gustów nawet najbardziej wymagających klientów. Oferujemy również szeroki wybór płytek ceramicznych, które doskonale sprawdzą się, jeśli myślisz o stworzeniu wyjątkowej aranżacji. W naszych ",
    { bold: "salonach płytek" },
    " mamy dla Ciebie wiele modeli w różnych kolorach, jak również o odmiennych fakturach i wzorach, co pozwala tworzyć wnętrza zarówno klasyczne, jak i nowoczesne.",
  ] as const,
  image: img("inspiration-2.jpg", "Aranżacja łazienki z ekspozycji Elements"),
} as const;
