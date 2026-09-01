import { assetUrl } from "../app/assets";
import { ctaContextImages } from "../lib/ctaContextImages";
import type { InspirationListingItem } from "../types/inspiration";
import type { ProductImage } from "../types/product";

export const INSPIRATIONS_LISTING_PAGE_SIZE = 10;
export const INSPIRATION_CAROUSEL_COUNT = 6;

const listingImage = (
  file: string,
  alt: string,
  focalPoint?: ProductImage["focalPoint"],
): ProductImage => ({
  src: assetUrl(`inspirations/listing/${file}`),
  alt,
  fit: "cover",
  ...(focalPoint ? { focalPoint } : {}),
});

export const inspirationsListingPage = {
  title: "Galeria inspiracji",
  description:
    "Zainspiruj się, przeglądając metamorfozy łazienek lub projekty stworzone przez współpracujących z nami Architektów. Podpowiemy Ci, jakie produkty sprawdzą się najlepiej w danej aranżacji!",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Galeria inspiracji", current: true },
  ],
  pageSize: INSPIRATIONS_LISTING_PAGE_SIZE,
  filters: [
    { id: "all", label: "Wszystkie inspiracje" },
    { id: "nowoczesna", label: "Nowoczesna" },
    { id: "minimalistyczna", label: "Minimalistyczna" },
    { id: "industrialna", label: "Industrialna" },
    { id: "klasyczna", label: "Klasyczna" },
    { id: "rustykalna", label: "Rustykalna" },
    { id: "domowe-spa", label: "Domowe SPA" },
    { id: "mala-lazienka", label: "Mała łazienka" },
    { id: "ciemna-lazienka", label: "Ciemna łazienka" },
  ],
  footerAdvisorCta: {
    eyebrow: "Doradztwo",
    title: "Chcesz podobną łazienkę u siebie?",
    description:
      "Porozmawiaj z doradcą Elements - pokażemy produkty na żywo i pomożemy dobrać wyposażenie do Twojego wnętrza.",
    askLabel: "Znajdź salon",
    askHref: "/salony",
    bookLabel: "Umów spotkanie",
    image: ctaContextImages.bathroomGreen,
  },
  gridLocateCta: {
    afterIndex: 4,
    title: "Skonsultuj swoją wymarzoną łazienkę",
    description:
      "Umów się z doradcą Elements i dobierz produkty do wybranej aranżacji.",
    ctaLabel: "Umów spotkanie",
    image: ctaContextImages.locateCta,
  },
} as const;

/** Card order and copy aligned with elements-show.pl/inspiracje (Sep 2026). */
export const inspirationsListingItems: InspirationListingItem[] = [
  {
    id: "insp-list-1",
    title: "Przytulna łazienka z wanną i drewnianymi akcentami",
    href: "/inspiracja-artykul",
    styleTags: ["rustykalna", "domowe-spa"],
    image: listingImage(
      "01-przytulna.png",
      "Przytulna łazienka z wanną i drewnianymi akcentami",
    ),
    items: ["Drewno", "Wanna", "Przytulność"],
  },
  {
    id: "insp-list-2",
    title: "Ciemna łazienka z wanną wolnostojącą i strefą pralni",
    href: "/inspiracja-artykul",
    styleTags: ["ciemna-lazienka", "nowoczesna"],
    image: listingImage(
      "02-ciemna.png",
      "Ciemna łazienka z wanną wolnostojącą i strefą pralni",
    ),
    items: ["Ciemna baza", "Wanna wolnostojąca", "Strefa pralni"],
  },
  {
    id: "insp-list-3",
    title: "Miękkie światło i kamienna głębia - łazienka na poddaszu",
    href: "/inspiracja-artykul",
    styleTags: ["nowoczesna", "domowe-spa"],
    image: listingImage(
      "03-poddasze.png",
      "Miękkie światło i kamienna głębia - łazienka na poddaszu",
    ),
    items: ["Kamień", "Naturalne światło", "Poddasze"],
  },
  {
    id: "insp-list-4",
    title: "Jasna łazienka z wanną w odcieniach piasku i różowego złota",
    href: "/inspiracja-artykul",
    styleTags: ["minimalistyczna", "domowe-spa"],
    image: listingImage(
      "04-jasna-piasek.png",
      "Jasna łazienka z wanną w odcieniach piasku i różowego złota",
    ),
    items: ["Wanna wolnostojąca", "Piaskowe tony", "Różowe złoto"],
  },
  {
    id: "insp-list-5",
    title: "Turkusowy akcent w minimalistycznej łazience",
    href: "/inspiracja-artykul",
    styleTags: ["minimalistyczna", "nowoczesna"],
    image: listingImage(
      "05-turkus.png",
      "Turkusowy akcent w minimalistycznej łazience",
    ),
    items: ["Turkus", "Biała baza", "Akcent kolorystyczny"],
  },
  {
    id: "insp-list-6",
    title:
      "Nowoczesna łazienka z zielonym kamieniem i drewnem - elegancka strefa relaksu",
    href: "/inspiracja-artykul",
    styleTags: ["nowoczesna", "domowe-spa"],
    image: listingImage(
      "06-zielony-kamien.png",
      "Nowoczesna łazienka z zielonym kamieniem i drewnem",
    ),
    items: ["Zieleń", "Drewno", "Kamień"],
  },
  {
    id: "insp-list-7",
    title:
      "Nowoczesna łazienka z kolorowym akcentem - elegancja w subtelnym wydaniu",
    href: "/inspiracja-artykul",
    styleTags: ["nowoczesna"],
    image: listingImage(
      "07-kolorowy-akcent.png",
      "Nowoczesna łazienka z kolorowym akcentem",
    ),
    items: ["Akcent kolorystyczny", "Jasna baza", "Detal"],
  },
  {
    id: "insp-list-8",
    title:
      "Nowoczesna łazienka w naturalnych tonach - minimalistyczna i funkcjonalna przestrzeń relaksu",
    href: "/inspiracja-artykul",
    styleTags: ["minimalistyczna", "nowoczesna"],
    image: listingImage(
      "08-naturalne-tony.png",
      "Nowoczesna łazienka w naturalnych tonach",
    ),
    items: ["Naturalne tony", "Minimalizm", "Funkcjonalność"],
  },
  {
    id: "insp-list-9",
    title: "Nowoczesna łazienka w ciepłych tonach - wygoda i styl na co dzień",
    href: "/inspiracja-artykul",
    styleTags: ["nowoczesna", "rustykalna"],
    image: listingImage(
      "09-cieple-tony.png",
      "Nowoczesna łazienka w ciepłych tonach",
    ),
    items: ["Ciepłe tony", "Wygoda", "Codzienny komfort"],
  },
  {
    id: "insp-list-10",
    title:
      "Nowoczesna łazienka z wanną wolnostojącą i płytkami wielkoformatowymi",
    href: "/inspiracja-artykul",
    styleTags: ["nowoczesna", "domowe-spa"],
    image: listingImage(
      "10-wanna-wielkoformat.png",
      "Nowoczesna łazienka z wanną wolnostojącą i płytkami wielkoformatowymi",
    ),
    items: ["Wanna wolnostojąca", "Płytki XL", "Przestrzeń"],
  },
  {
    id: "insp-list-11",
    title:
      "Łazienka pod skosem - nowoczesna aranżacja z zielonymi płytkami i podwójną umywalką",
    href: "/inspiracja-artykul",
    styleTags: ["nowoczesna", "mala-lazienka"],
    image: listingImage(
      "11-skos-zielone.png",
      "Łazienka pod skosem z podwójną umywalką",
    ),
    items: ["Poddasze", "Podwójna umywalka", "Zieleń"],
  },
  {
    id: "insp-list-12",
    title:
      "Miękka geometria i światło - wyjątkowy projekt łazienki w jasnych odcieniach",
    href: "/inspiracja-artykul",
    styleTags: ["minimalistyczna"],
    image: listingImage(
      "12-geometria.png",
      "Miękka geometria i światło w łazience",
    ),
    items: ["Geometria", "Jasne tony", "Światło"],
  },
];
