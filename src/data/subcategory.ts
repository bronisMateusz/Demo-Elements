import { assetUrl } from "../app/assets";
import { ctaContextImages } from "../lib/ctaContextImages";
import { inspirationCarouselArrangements } from "./inspirationCarousel";
import type { SeoBlock } from "./seoBlocks";

export type SubcategoryTypeTile = {
  label: string;
  href: string;
  featured?: boolean;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  };
};

export const subcategoryPage = {
  title: "Umywalki",
  description:
    "Umywalki łazienkowe to niezbędny element każdej toalety - publicznej i prywatnej. Powinny łączyć w sobie funkcjonalność i estetyczny wygląd. Wybierz typ, kolor lub markę i przejdź prosto do dopasowanej oferty.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Łazienka", to: "/kategoria" },
    { label: "Umywalki", current: true },
  ],
  locate: {
    slogan: ["Twoja nowa łazienka", "zaczyna się od spotkania"] as const,
    title: "Umów spotkanie w salonie",
    description:
      "Nasz doradca będzie czekał na Ciebie w salonie - pozna Twój projekt, pokaże umywalki na żywo i pomoże dobrać całe wyposażenie. Bez pośpiechu, w dogodnym terminie.",
    ctaLabel: "Umów spotkanie",
    image: ctaContextImages.locateCta,
  },
  inspiration: {
    title: "Poznaj nasze aranżacje i zainspiruj się",
    arrangements: inspirationCarouselArrangements("sub-insp"),
  },
  blog: {
    title: "Porady i inspiracje na naszym blogu",
    seeAllLabel: "Więcej artykułów",
    seeAllHref: "https://www.elements-show.pl/blog",
    articles: [
      {
        id: "blog-1",
        title: "Jak wybrać miskę WC do łazienki? Praktyczny poradnik",
        excerpt:
          "Wybór miski WC to coś więcej niż kwestia estetyki. Odpowiedni model powinien być dopasowany do instalacji, metrażu łazienki i codziennych potrzeb użytkowników. Sprawdź, na co zwrócić uwagę przy zakupie miski WC, aby zapewnić sobie wygodę, funkcjonalność i łatwe utrzymanie czystości.",
        href: "https://www.elements-show.pl/blog/jak-wybrac-miske-wc-do-lazienki",
        image: {
          src: assetUrl("blog/jak-wybrac-miske-wc-do-lazienki.webp"),
          alt: "Jasna łazienka z miską WC - poradnik wyboru",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-2",
        title:
          "Prostokątna łazienka - jak wykorzystać jej układ i urządzić ją funkcjonalnie?",
        excerpt:
          "Prostokątna łazienka daje wiele możliwości aranżacyjnych, ale wymaga dobrze przemyślanego projektu. Odpowiedni układ wyposażenia, kolory, płytki i oświetlenie pozwalają stworzyć funkcjonalne oraz optycznie lepiej wyważone wnętrze. Sprawdź, jak urządzić prostokątną łazienkę i jakich błędów unikać podczas jej projektowania.",
        href: "https://www.elements-show.pl/blog/prostokatna-lazienka",
        image: {
          src: assetUrl("blog/prostokatna-lazienka.webp"),
          alt: "Nowoczesna prostokątna łazienka z prysznicem",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-3",
        title: "Marmurowa łazienka - jak urządzić elegancką przestrzeń?",
        excerpt:
          "Sprawdź, jak urządzić marmurową łazienkę. Poznaj różnice między naturalnym marmurem a płytkami marmuropodobnymi oraz pomysły na elegancką aranżację.",
        href: "https://www.elements-show.pl/blog/marmurowa-lazienka-jak-urzadzic-elegancka-przestrzen",
        image: {
          src: assetUrl(
            "blog/marmurowa-lazienka-jak-urzadzic-elegancka-przestrzen.webp",
          ),
          alt: "Elegancka łazienka z wykończeniem marmurowym",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-4",
        title: "Jak urządzić szarą łazienkę? Pomysły i inspiracje",
        excerpt:
          "Sprawdź, jak urządzić szarą łazienkę, aby była elegancka, przytulna i funkcjonalna. Poznaj pomysły na płytki, meble, armaturę, światło i dodatki.",
        href: "https://www.elements-show.pl/blog/jak-urzadzic-szara-lazienke-pomysly-i-inspiracje",
        image: {
          src: assetUrl(
            "blog/jak-urzadzic-szara-lazienke-pomysly-i-inspiracje.webp",
          ),
          alt: "Szara łazienka - inspiracje aranżacyjne",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-5",
        title: "Bateria z termostatem - jak wybrać i na co zwrócić uwagę?",
        excerpt:
          "Bateria termostatyczna - jak działa i kiedy warto ją wybrać? Sprawdź zalety, ograniczenia oraz dowiedz się, na co zwrócić uwagę przed zakupem.",
        href: "https://www.elements-show.pl/blog/bateria-z-termostatem-jak-wybrac-i-na-co-zwrocic-uwage",
        image: {
          src: assetUrl(
            "blog/bateria-z-termostatem-jak-wybrac-i-na-co-zwrocic-uwage.webp",
          ),
          alt: "Bateria prysznicowa z termostatem",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-6",
        title: "Jak odświeżyć łazienkę bez remontu?",
        excerpt:
          "Planujesz odświeżenie łazienki? Sprawdź, jak niewielkim kosztem odmienić wnętrze i poznaj wyposażenie, które znajdziesz w salonach Elements.",
        href: "https://www.elements-show.pl/blog/jak-odswiezyc-lazienke-bez-remontu",
        image: {
          src: assetUrl("blog/jak-odswiezyc-lazienke-bez-remontu.webp"),
          alt: "Odświeżona łazienka bez generalnego remontu",
          fit: "cover" as const,
        },
      },
    ],
  },
} as const;

export const subcategoryTypes: SubcategoryTypeTile[] = [
  {
    label: "Umywalki wiszące",
    href: "/listing",
    featured: true,
    image: {
      src: assetUrl("home/categories/umywalki.png"),
      alt: "Umywalki wiszące",
      fit: "cover",
      focalPoint: { x: 50, y: 45 },
    },
  },
  {
    label: "Umywalki nablatowe",
    href: "/listing",
    image: {
      src: assetUrl("home/inspiration-concrete-black.jpg"),
      alt: "Umywalki nablatowe",
      fit: "cover",
    },
  },
  {
    label: "Umywalki meblowe",
    href: "/listing",
    image: {
      src: assetUrl("home/inspiration-large-tiles.jpg"),
      alt: "Umywalki meblowe",
      fit: "cover",
      focalPoint: { x: 50, y: 75 },
    },
  },
  {
    label: "Umywalki z szafką",
    href: "/listing",
    image: {
      src: assetUrl("products/montebianco/01-front.png"),
      alt: "Umywalki z szafką",
      fit: "cover",
    },
  },
  {
    label: "Półpostumenty",
    href: "/listing",
    image: {
      src: assetUrl("home/inspiration-compact.jpg"),
      alt: "Półpostumenty",
      fit: "cover",
      focalPoint: { x: 50, y: 55 },
    },
  },
];

/** Advisor band copy for the washbasin subcategory page. */
export const subcategoryAdvisorCta = {
  eyebrow: "Doradztwo",
  title:
    "Nie wiesz, która umywalka pasuje do Twojej łazienki?\nZobacz je na żywo.",
  description:
    "Nasi doradcy pokażą różne typy, kolory i wykończenia na ekspozycji - dobierzemy rozwiązanie dopasowane do metrażu i stylu Twojej łazienki.",
  image: ctaContextImages.bathroomGreen,
  bookLabel: "Umów spotkanie",
  findSalonLabel: "Znajdź salon",
  findSalonHref: "/salony",
} as const;

export type { SeoBlock };
export { subcategorySeoBlocks } from "./subcategorySeo";
