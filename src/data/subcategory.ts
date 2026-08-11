import { assetUrl } from "../app/assets";
import { homeInspiration } from "./home";
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
    image: {
      src: assetUrl("home/about-salon.jpg"),
      alt: "Salon Elements - ekspozycja łazienki",
      fit: "cover" as const,
    },
  },
  inspiration: {
    title: "Poznaj nasze aranżacje i zainspiruj się",
    arrangements: homeInspiration.arrangements.map((item, index) => {
      const titles = [
        "Umywalka nablatowa na drewnianym blacie",
        "Podwójna umywalka w łazience rodzinnej",
        "Beton i czarna armatura",
        "Sprytny metraż do 4 m²",
        "Elegancja w ciepłej palecie",
        "Głębokie kolory i matowe wykończenia",
      ];
      return {
        ...item,
        id: `sub-insp-${index + 1}`,
        title: titles[index] ?? item.title,
        image: {
          ...item.image,
          alt: titles[index] ?? item.image.alt,
        },
      };
    }),
  },
  blog: {
    title: "Porady i inspiracje na naszym blogu",
    seeAllLabel: "Więcej artykułów",
    seeAllHref: "#",
    articles: [
      {
        id: "blog-1",
        title: "Wymiary umywalki - jak dobrać idealny rozmiar?",
        excerpt:
          "Umywalka to jeden z najczęściej używanych elementów łazienki, dlatego jej wymiary mają duży wpływ na codzienny komfort. W tym poradniku podpowiadamy, jak dobrać jej szerokość, głębokość i wysokość montażu.",
        href: "#",
        image: {
          src: assetUrl("home/categories/umywalki.png"),
          alt: "Umywalka w aranżacji łazienki - dobór wymiarów",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-2",
        title: "Umywalka nablatowa czy wpuszczana? Porównanie",
        excerpt:
          "Wybór między umywalką nablatową a wpuszczaną w blat wpływa na wygląd, wygodę użytkowania i sposób montażu. Sprawdź, czym różnią się oba rozwiązania i które lepiej sprawdzi się w Twojej łazience.",
        href: "#",
        image: {
          src: assetUrl("home/inspiration-concrete-black.jpg"),
          alt: "Umywalka nablatowa w nowoczesnej łazience",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-3",
        title: "Jak dobrać baterię do umywalki?",
        excerpt:
          "Wysokość wylewki, rozstaw otworów i typ montażu decydują o tym, czy bateria będzie wygodna w codziennym użyciu. Podpowiadamy, na co zwrócić uwagę przy zestawianiu baterii z konkretnym modelem umywalki.",
        href: "#",
        image: {
          src: assetUrl("home/inspiration-warm-palette.jpg"),
          alt: "Bateria umywalkowa w ciepłej aranżacji",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-4",
        title: "Umywalka z szafką - jak wybrać zestaw?",
        excerpt:
          "Zestaw umywalki z szafką porządkuje łazienkę i ukrywa instalację. Sprawdź, jak dobrać głębokość szafki, rodzaj frontów i układ szuflad do metrażu swojej łazienki.",
        href: "#",
        image: {
          src: assetUrl("products/montebianco/01-front.png"),
          alt: "Umywalka z szafką podumywalkową",
          fit: "cover" as const,
        },
      },
      {
        id: "blog-5",
        title: "Jak urządzić małą toaletę? Pomysły i inspiracje",
        excerpt:
          "Małe WC może być funkcjonalne, wygodne i estetyczne mimo ograniczonego metrażu. Sprawdź, jak wykorzystać dostępną przestrzeń, dobrać wyposażenie i stworzyć komfortową aranżację.",
        href: "#",
        image: {
          src: assetUrl("home/inspiration-compact.jpg"),
          alt: "Mała łazienka - kompaktowa aranżacja",
          fit: "cover" as const,
          focalPoint: { x: 50, y: 55 },
        },
      },
      {
        id: "blog-6",
        title: "Czarno-biała łazienka - jak ją urządzić?",
        excerpt:
          "Czarno-biała łazienka to ponadczasowe rozwiązanie do nowoczesnych i klasycznych wnętrz. Sprawdź, jak połączyć biel i czerń, dobrać wyposażenie oraz stworzyć spójną i funkcjonalną aranżację.",
        href: "#",
        image: {
          src: assetUrl("home/inspiration-deep-green.jpg"),
          alt: "Kontrastowa aranżacja łazienki",
          fit: "cover" as const,
          focalPoint: { x: 50, y: 75 },
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

export type { SeoBlock };
export { subcategorySeoBlocks } from "./subcategorySeo";
