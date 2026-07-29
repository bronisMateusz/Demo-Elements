import { assetUrl } from "../app/assets";
import type { InspirationArrangement, ProductImage, RelatedProduct } from "../types/product";

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
    hint: "Elements - Twoja wymarzona łazienka",
    kind: "main",
    title: "Twoja wymarzona łazienka zaczyna się tutaj.",
    lead: "Obejrzyj na żywo, dobierz z doradcą i zaplanuj wszystko w jednym miejscu.",
    image: {
      src: assetUrl("home/hero-elements.png"),
      alt: "Szeroka aranżacja łazienki z ekspozycji Elements",
      fit: "cover" as const,
      focalPoint: { x: 50, y: 100 },
    },
    primaryCta: { label: "Napisz do doradcy", href: "#kontakt" },
    secondaryCta: { label: "Pobierz magazyn Elements", href: "#magazyn" },
  },
  {
    id: "delabie",
    hint: "Meble łazienkowe - wisząca szafka",
    kind: "promo",
    brand: "Meble łazienkowe",
    title: "Wisząca szafka podumywalkowa",
    description:
      "Lekka bryła z zintegrowaną umywalką i chromowaną baterią. Minimalistyczna łazienka ze spokojnym rytmem i miejscem na kosmetyki - zobacz na żywo w salonie.",
    href: "#",
    image: {
      src: assetUrl("home/hero-vanity-minimal.png"),
      alt: "Baner - wisząca szafka podumywalkowa",
      fit: "cover" as const,
      focalPoint: { x: 55, y: 45 },
    },
  },
  {
    id: "geberit-caluna",
    hint: "Geberit Caluna - ceramika i meble",
    kind: "promo",
    brand: "Geberit Caluna",
    title: "Ceramika i meble łazienkowe",
    description:
      "Nowa kolekcja Geberit Caluna: spójna ceramika, meble i armatura. Dobierz zestaw z doradcą i zobacz wykończenia na ekspozycji.",
    href: "#",
    image: {
      src: assetUrl("home/hero-geberit-caluna.png"),
      alt: "Baner Geberit Caluna - ceramika i meble",
      fit: "cover" as const,
      focalPoint: { x: 50, y: 55 },
    },
  },
  {
    id: "outlet",
    hint: "Outlet Elements - do -40%",
    kind: "promo",
    brand: "Outlet Elements",
    title: "Do -40% na produkty z ekspozycji",
    description:
      "Wyprzedaż ekspozycji w salonach Elements - sprawdzone modele w niższych cenach, dostępne od ręki. Ilość sztuk ograniczona.",
    href: "#outlet",
    image: {
      src: assetUrl("home/hero-outlet-ekspozycja.png"),
      alt: "Baner Outlet Elements - do -40%",
      fit: "cover" as const,
    },
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
    badge?: RelatedProduct["badge"];
    image: RelatedProduct["image"];
    href?: string;
  },
): RelatedProduct {
  return {
    id,
    brand,
    title,
    href: options.href ?? "/produkt",
    price: options.price,
    pricePrevious: options.pricePrevious,
    badge: options.badge,
    image: options.image,
  };
}

export type HomeProductTabId = "promocje" | "nowosci" | "bestsellery" | "outlet";

type HomeProductCatalogItem = {
  key: string;
  brand: string;
  title: string;
  price: string;
  pricePrevious?: string;
  href?: string;
  image: RelatedProduct["image"];
};

/** Shared catalog for home product tabs - order is shuffled per tab, badges stay tab-specific. */
const homeProductCatalog: HomeProductCatalogItem[] = [
  {
    key: "grespania-halley",
    brand: "Grespania",
    title: "Płytka gresowa Halley White Mat 60×120 cm",
    price: "119,00 zł",
    pricePrevious: "139,00 zł",
    image: {
      src: assetUrl("home/inspiration-large-tiles.jpg"),
      alt: "Grespania Halley White Mat",
      fit: "cover",
    },
  },
  {
    key: "florim-tundra",
    brand: "Florim",
    title: "Nature Mood Tundra Comfort 120×120 cm",
    price: "254,00 zł",
    pricePrevious: "279,00 zł",
    image: {
      src: assetUrl("home/product-florim-tundra.png"),
      alt: "Florim Nature Mood Tundra",
      fit: "cover",
    },
  },
  {
    key: "omnires-ottawa",
    brand: "Omnires",
    title: "Ottawa Comfort miska WC wisząca z deską wolnoopadającą",
    price: "1 280,00 zł",
    pricePrevious: "1 337,80 zł",
    image: {
      src: assetUrl("home/ottawa.png"),
      alt: "Omnires Ottawa Comfort",
      fit: "cover",
    },
  },
  {
    key: "trinnity-m16",
    brand: "Trinnity",
    title: "Przycisk TRINNITY M16 zlicowany, złoty brąz",
    price: "258,00 zł",
    href: "https://www.elements-show.pl/lazienka/toaleta/przyciski-splukujace/przyciski-splukujace/przycisk-trinnity-m16-zlicowany-zloty-braz",
    image: {
      src: assetUrl("home/przycisk-trinnity.png"),
      alt: "Przycisk TRINNITY M16 zlicowany, złoty brąz",
      fit: "cover",
    },
  },
];

function productsForTab(
  tabId: string,
  order: readonly string[],
  badge: RelatedProduct["badge"],
): RelatedProduct[] {
  const byKey = new Map(homeProductCatalog.map((item) => [item.key, item]));
  return order.map((key) => {
    const item = byKey.get(key);
    if (!item) throw new Error(`Unknown home product key: ${key}`);
    return product(`${tabId}-${item.key}`, item.brand, item.title, {
      price: item.price,
      pricePrevious: item.pricePrevious,
      href: item.href,
      badge,
      image: item.image,
    });
  });
}

/** Same home catalog as product tabs - reusable on PDP carousels etc. */
export function homeCatalogProducts(
  idPrefix: string,
  order: readonly string[],
  badgeByKey: Partial<Record<string, RelatedProduct["badge"]>> = {},
): RelatedProduct[] {
  const byKey = new Map(homeProductCatalog.map((item) => [item.key, item]));
  return order.map((key) => {
    const item = byKey.get(key);
    if (!item) throw new Error(`Unknown home product key: ${key}`);
    return product(`${idPrefix}-${item.key}`, item.brand, item.title, {
      price: item.price,
      pricePrevious: item.pricePrevious,
      href: item.href,
      badge: badgeByKey[key],
      image: item.image,
    });
  });
}

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
    products: productsForTab(
      "promocje",
      ["grespania-halley", "florim-tundra", "omnires-ottawa", "trinnity-m16"],
      { label: "Promocja", variant: "promo" },
    ),
  },
  {
    id: "nowosci",
    label: "Nowości",
    seeAllLabel: "Zobacz wszystkie nowości",
    seeAllHref: "#nowosci",
    products: productsForTab(
      "nowosci",
      ["omnires-ottawa", "trinnity-m16", "grespania-halley", "florim-tundra"],
      { label: "Nowość", variant: "brand" },
    ),
  },
  {
    id: "bestsellery",
    label: "Bestsellery",
    seeAllLabel: "Zobacz wszystkie bestsellery",
    seeAllHref: "#bestsellery",
    products: productsForTab(
      "bestsellery",
      ["florim-tundra", "grespania-halley", "trinnity-m16", "omnires-ottawa"],
      { label: "Bestseller", variant: "gold" },
    ),
  },
  {
    id: "outlet",
    label: "Outlet",
    seeAllLabel: "Zobacz cały Outlet",
    seeAllHref: "#outlet",
    products: productsForTab(
      "outlet",
      ["trinnity-m16", "omnires-ottawa", "florim-tundra", "grespania-halley"],
      { label: "Outlet", variant: "neutral" },
    ),
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
  cycleIntervalMs: 7000,
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
      title: "Prysznic walk-in w ciepłej palecie",
      image: {
        src: assetUrl("home/inspiration-walk-in.jpg"),
        alt: "Prysznic walk-in w ciepłej palecie",
        fit: "cover" as const,
      },
      items: ["Prysznic walk-in", "Czarna armatura", "Teksturowane ściany"],
    },
    {
      id: "insp-2",
      title: "Jasne płytki wielkoformatowe",
      image: {
        src: assetUrl("home/inspiration-large-tiles.jpg"),
        alt: "Jasne płytki wielkoformatowe",
        fit: "cover" as const,
        focalPoint: { x: 50, y: 75 },
      },
      items: ["Płytki wielkoformatowe", "Minimalistyczna armatura", "Dużo światła"],
    },
    {
      id: "insp-3",
      title: "Beton i czarna armatura",
      image: {
        src: assetUrl("home/inspiration-concrete-black.jpg"),
        alt: "Beton i czarna armatura",
        fit: "cover" as const,
        focalPoint: { x: 50, y: 100 },
      },
      items: ["Imitacja betonu", "Czarny mat", "Kontrastowe detale"],
    },
    {
      id: "insp-4",
      title: "Sprytny metraż do 4 m²",
      image: {
        src: assetUrl("home/inspiration-compact.jpg"),
        alt: "Sprytny metraż do 4 m²",
        fit: "cover" as const,
        focalPoint: { x: 50, y: 55 },
      },
      items: ["Szafka wisząca", "Lustro z podświetleniem LED", "WC podwieszane"],
    },
    {
      id: "insp-5",
      title: "Elegancja w ciepłej palecie",
      image: {
        src: assetUrl("home/inspiration-warm-palette.jpg"),
        alt: "Elegancja w ciepłej palecie",
        fit: "cover" as const,
      },
      items: ["Beże i złoto", "Meble drewnopodobne", "Miękkie tekstury"],
    },
    {
      id: "insp-6",
      title: "Głębokie kolory i matowe wykończenia",
      image: {
        src: assetUrl("home/inspiration-deep-green.jpg"),
        alt: "Głębokie kolory i matowe wykończenia",
        fit: "cover" as const,
        // Bias toward the vanity base - show more of the lower half.
        focalPoint: { x: 50, y: 75 },
      },
      items: ["Głęboka zieleń", "Matowa ceramika", "Akcenty metaliczne"],
    },
  ] satisfies InspirationArrangement[],
} as const;

export const HOME_MAGAZINE_FLIPBOOK_HREF =
  "https://www.elements-show.pl/flipbook/1";

export const HOME_MAGAZINE_PDF_HREF =
  "https://www.elements-show.pl/sites/default/files/2026-07/Top_Trendy_online_2026.pdf";

export const homeMagazine = {
  id: "magazyn",
  eyebrow: "Jubileuszowe wydanie",
  title: "Magazyn TOP TRENDY 2026",
  description:
    "Przeglądaj bestsellery, nowości i inspiracje w jednym miejscu. Najpopularniejsze wzory ceramiki, armatury, wanien, kabin, płytek i dodatków - z wyjątkowymi cenami Elements.",
  image: {
    src: assetUrl("magazine/top-trendy-2026-cover.jpg"),
    alt: "Okładka magazynu TOP TRENDY 2026",
    fit: "cover" as const,
  },
  primaryCta: { label: "Zobacz magazyn online", href: HOME_MAGAZINE_FLIPBOOK_HREF },
  secondaryCta: { label: "Pobierz PDF", href: HOME_MAGAZINE_PDF_HREF },
} as const;

export const homePartners = {
  title: "Współpracuj z Elements",
  lead:
    "Specjalne warunki dla architektów i instalatorów - dołącz do grona partnerów, którzy realizują projekty z najlepszymi markami.",
  cards: [
    {
      id: "architects",
      title: "Dla architektów",
      iconClass: "ph ph-cube",
      description:
        "Dedykowane wsparcie, materiały projektowe i program partnerski, który realnie ułatwia Twoją pracę i buduje relację z klientem.",
      image: {
        src: assetUrl("home/partners-architects.jpg"),
        alt: "Architekt przy pracy z materiałami Elements",
        fit: "cover" as const,
        // Keep the face in frame - default center crop cuts the top of the head.
        focalPoint: { x: 55, y: 22 },
      },
      href: "#strefa-architekta",
      ctaLabel: "Przejdź do strefy architekta",
      benefits: [
        "Materiały do projektu - modele 3D, pliki CAD/DWG, tekstury i karty techniczne",
        "19 salonów z przestrzenią do spotkań z klientem",
        "Program lojalnościowy „Elements w Podróży” - szkolenia i wyjazdy",
      ],
    },
    {
      id: "installers",
      title: "Dla instalatorów",
      iconClass: "ph ph-wrench",
      description:
        "Atrakcyjne warunki handlowe, błyskawiczny dostęp do towaru i narzędzia, które przekładają się na realny zysk każdej ekipy.",
      image: {
        src: assetUrl("home/partners-installers.jpg"),
        alt: "Instalator na budowie z produktami Elements",
        fit: "cover" as const,
      },
      href: "#strefa-instalatora",
      ctaLabel: "Przejdź do strefy instalatora",
      benefits: [
        "Atrakcyjne warunki współpracy i indywidualne limity kupieckie",
        "Zakupy online - ponad 500 000 produktów z dostawą",
        "Podgląd stanów magazynowych w czasie rzeczywistym",
        "Darmowa dostawa na wskazany adres",
        "Cykliczne szkolenia produktowe - stacjonarne i wyjazdowe",
      ],
    },
  ],
} as const;

export const homeAbout = {
  title: "Elements - tu powstają wyjątkowe łazienki",
  lead:
    "Elements to sieć salonów, które powstały z myślą o spełnianiu marzeń o idealnej łazience - znajdziesz nas w 19 lokalizacjach w całej Polsce. Inspirujemy do tworzenia wnętrz, które łączą modny design, komfort i funkcjonalność. Niezależnie od tego, czy marzysz o domowej strefie SPA, eleganckim salonie kąpielowym czy przytulnej łazience, nasze salony to miejsce, w którym Twoje pomysły mogą stać się rzeczywistością.",
  body: [
    "Każdy z ",
    { bold: "salonów łazienkowych" },
    " Elements to miejsce, gdzie znajdziesz najmodniejsze wzory i modele ceramiki, armatury, mebli oraz dodatków łazienkowych. Co więcej, to właśnie tutaj najnowsze trendy łączą się z różnorodnymi stylami, tworząc ofertę dopasowaną do gustów nawet najbardziej wymagających klientów. Oferujemy również szeroki wybór płytek ceramicznych, które doskonale sprawdzą się, jeśli myślisz o stworzeniu wyjątkowej aranżacji. W naszych ",
    { bold: "salonach płytek" },
    " mamy dla Ciebie wiele modeli w różnych kolorach, jak również o odmiennych fakturach i wzorach, co pozwala tworzyć wnętrza zarówno klasyczne, jak i nowoczesne.",
  ] as const,
  image: {
    src: assetUrl("home/about-salon.jpg"),
    alt: "Aranżacja łazienki z ekspozycji Elements",
    fit: "cover" as const,
  },
} as const;
