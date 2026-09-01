import { assetUrl } from "../app/assets";
import { ctaContextImages } from "../lib/ctaContextImages";
import type { RelatedProduct } from "../types/product";
import type { InspirationListingItem } from "../types/inspiration";
import { arrangementProducts } from "./arrangementProducts";

const ARRANGEMENTS_GALLERY_MAGAZINE_FLIPBOOK_HREF =
  "https://www.elements-show.pl/flipbook/1";

export const ARRANGEMENTS_GALLERY_PAGE_SIZE = 15;

/** Card copy and images aligned with elements-show.pl/galeria-aranzacji (Sep 2026). */
export const arrangementsGalleryPage = {
  title: "Zainspiruj się w Galerii aranżacji",
  description:
    "Zainspiruj się gotowymi aranżacjami łazienek proponowanymi przez wiodących Producentów. Możesz dodać produkt lub całą aranżację do schowka i zapytać o nią przez formularz kontaktowy!",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Galeria aranżacji", current: true },
  ],
  pageSize: ARRANGEMENTS_GALLERY_PAGE_SIZE,
  filters: [
    { id: "all", label: "Wszystkie" },
    { id: "oristo", label: "Oristo" },
    { id: "laufen", label: "Laufen" },
    { id: "devo", label: "Devo" },
    { id: "elita", label: "Elita" },
    { id: "duravit", label: "Duravit" },
    { id: "geberit", label: "Geberit" },
    { id: "acquabella", label: "Acquabella" },
  ],
  footerAdvisorCta: {
    eyebrow: "Doradztwo",
    title: "Któraś aranżacja pasuje do Twojej łazienki?",
    description:
      "Obejrzyj ją w salonie - doradca Elements pokaże produkty na żywo i pomoże dobrać je do Twojego wnętrza.",
    askLabel: "Znajdź salon",
    askHref: "/salony",
    bookLabel: "Umów spotkanie",
    image: ctaContextImages.advisorConsultation,
  },
  gridPromo: {
    afterIndex: 6,
    eyebrow: "Magazyn · jubileuszowe wydanie",
    title: "Magazyn TOP TRENDY 2026",
    description:
      "Produkty z aranżacji, bestsellery i nowości sezonu - wszystko z cenami Elements, w jednym katalogu.",
    href: ARRANGEMENTS_GALLERY_MAGAZINE_FLIPBOOK_HREF,
    ctaLabel: "Zobacz magazyn online",
    image: {
      src: assetUrl("magazine/top-trendy-2026-cover.jpg"),
      alt: "Okładka magazynu TOP TRENDY 2026",
      fit: "cover" as const,
    },
  },
} as const;

function galleryImage(file: string, alt: string) {
  return {
    src: assetUrl(`arrangements/gallery/${file}`),
    alt,
    fit: "cover" as const,
  };
}

function arrangement(
  id: string,
  title: string,
  description: string,
  producerTag: string,
  imageFile: string,
  imageAlt: string,
  products: readonly RelatedProduct[],
): InspirationListingItem {
  return {
    id,
    title,
    description,
    producerTag,
    showProducts: true,
    image: galleryImage(imageFile, imageAlt),
    items: [],
    products: [...products],
  };
}

export const arrangementsGalleryItems: InspirationListingItem[] = [
  arrangement(
    "arr-gal-1",
    "LAGOM, kolekcja mebli w skandynawskim stylu",
    "Seria LAGOM od ORiSTO powstała z myślą o nowoczesnych wnętrzach. Pozwala skupić się na funkcji i komforcie użytkowania.",
    "oristo",
    "oristo-lagom.png",
    "kolekcja mebli łazienkowych LAGOM od ORiSTO",
    arrangementProducts.oristoPillow,
  ),
  arrangement(
    "arr-gal-2",
    "Meble łazienkowe ORiSTO, nowoczesne podejście do elegancji",
    "Wyjątkowa kolekcja mebli PILLOW od Oristo.",
    "oristo",
    "oristo-pillow.png",
    "meble ORiSTO kolekcja PILLOW",
    arrangementProducts.oristoPillow,
  ),
  arrangement(
    "arr-gal-3",
    "Poznaj produkty marki Laufen",
    "Nowe rozwiązania do przestrzeni łazienkowych od marki Laufen.",
    "laufen",
    "laufen.png",
    "aranżacja łazienki Laufen",
    arrangementProducts.article.slice(3, 5),
  ),
  arrangement(
    "arr-gal-4",
    "W stronę współczesnej elegancji SOFT",
    "Kolekcja SOFT od DEVO, to wyjątkowa seria mebli łazienkowych z zaokrąglonymi krawędziami.",
    "devo",
    "devo-soft.png",
    "kolekcja SOFT od Devo",
    arrangementProducts.compact,
  ),
  arrangement(
    "arr-gal-5",
    "Meble łazienkowe SOHO",
    "Seria mebli łazienkowych SOHO firmy ELITA - kolekcja, która zachwyca.",
    "elita",
    "elita-soho.png",
    "kolekcja mebli łazienkowych SOHO Elita",
    arrangementProducts.deepGreen,
  ),
  arrangement(
    "arr-gal-6",
    "Wyjątkowa seria w łazience od firmy Duravit",
    "Umywalka meblowa z serii D-Neo od Duravit",
    "duravit",
    "duravit-d-neo.png",
    "seria łazienkowa Duravit D-Neo",
    arrangementProducts.compact.slice(0, 2),
  ),
  arrangement(
    "arr-gal-7",
    "Meble łazienkowe Smyle Geberit",
    "Poznaj serię mebli łazienkowych Smyle od Geberit.",
    "geberit",
    "geberit-smyle.png",
    "meble łazienkowe Smyle Geberit",
    arrangementProducts.deepGreen,
  ),
  arrangement(
    "arr-gal-8",
    "Mała umywalka w niewielkiej łazience",
    "Mała łazienka w wielkim stylu - z wykorzystaniem produktów CALUNA od Geberit.",
    "geberit",
    "geberit-mala-umywalka.png",
    "mała łazienka z umywalką CALUNA Geberit",
    arrangementProducts.compact,
  ),
  arrangement(
    "arr-gal-9",
    "Wyjątkowe rozwiązania od GEBERIT!",
    "Seria produktów łazienkowych CALUNA od Geberit.",
    "geberit",
    "geberit-caluna.png",
    "produkty z serii CALUNA od Geberit",
    arrangementProducts.deepGreen,
  ),
  arrangement(
    "arr-gal-10",
    "Zobacz wyjątkowe modele wanien Acquabella",
    "ACQUABELLA - sprawdź ofertę wanien wolnostojących.",
    "acquabella",
    "acquabella.png",
    "wanny wolnostojące Acquabella",
    arrangementProducts.article.slice(5, 6),
  ),
  arrangement(
    "arr-gal-11",
    "Eterna- wyjątkowa",
    "Eterna jest meblową opowieścią o stylu bez użycia słów. Zaprojektowana z myślą o codziennym komforcie stanowi propozycję dla tych, którzy cenią przedmioty trwałe, autentyczne i bliskie współczesnym wnętrzom.",
    "oristo",
    "eterna-1.png",
    "seria mebli Eterna",
    arrangementProducts.oristoPillow,
  ),
  arrangement(
    "arr-gal-12",
    "Eterna – design i estetyka",
    "Kolekcja mebli Eterna to esencja świadomego designu, tworząc rozwiązanie idealne do nowoczesnych i klasycznych wnętrz. Zachowuje świeżość przez lata, wpisując się w estetykę nie poddającą się zmiennym trendom.",
    "oristo",
    "eterna-2.png",
    "kolekcja mebli Eterna",
    arrangementProducts.oristoPillow,
  ),
  arrangement(
    "arr-gal-13",
    "Ponadczasowa elegancja",
    "CALUNA - tworzy wyjątkowe miejsca, gwarantowana ponadczasowa elegancja.",
    "geberit",
    "caluna-elegancja.png",
    "ponadczasowa elegancja serii CALUNA",
    arrangementProducts.deepGreen,
  ),
  arrangement(
    "arr-gal-14",
    "Indywidualne rozwiązania z serią CALUNA",
    "CALUNA indywidualne rozwiązania, optymalnie zorganizowana przestrzeń.",
    "geberit",
    "caluna-indywidualne.png",
    "indywidualne rozwiązania CALUNA",
    arrangementProducts.compact,
  ),
  arrangement(
    "arr-gal-15",
    "Nowoczesna kolekcja mebli łazienkowych",
    "MELLOW to nowoczesna kolekcja mebli łazienkowych na wyłączność, łącząca ponadczasowy design z funkcjonalnością. Wyróżnia się minimalistyczną formą, wysoką jakością wykonania i możliwością personalizacji.",
    "devo",
    "devo-mellow.png",
    "kolekcja mebli MELLOW",
    arrangementProducts.deepGreen,
  ),
];

/** Combined catalog for wishlist resolution. */
export const allArrangementCatalog: InspirationListingItem[] = [
  ...arrangementsGalleryItems,
];
