import type { InspirationArrangement } from "../types/product";
import { homeInspiration } from "./home";

export const wishlistPage = {
  title: "Schowek",
  metaDescription:
    "Zbieraj produkty i aranżacje w jednym miejscu, a potem poproś salon o wspólny kosztorys.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Schowek", current: true },
  ],
  segments: {
    products: "Produkty",
    arrangements: "Aranżacje",
    aria: "Widoki schowka",
  },
  empty: {
    title: "Twój schowek jest pusty",
    description:
      "Dodawaj produkty i aranżacje przyciskiem „Dodaj do schowka” podczas przeglądania oferty - zbierzesz w jednym miejscu wszystko, co Cię interesuje, i poprosisz salon o jeden wspólny kosztorys.",
    primaryLabel: "Przeglądaj kategorie",
    primaryHref: "/kategoria",
    secondaryLabel: "Zobacz inspiracje",
    secondaryHref: "/#inspiracje",
  },
  emptyProducts: {
    title: "Brak produktów w schowku",
    description:
      "Dodawaj produkty przyciskiem „Dodaj do schowka” podczas przeglądania oferty.",
    actionLabel: "Przeglądaj kategorie",
    actionHref: "/kategoria",
  },
  emptyArrangements: {
    title: "Brak aranżacji w schowku",
    description:
      "Zapisuj aranżacje z inspiracji, żeby zestawić je z produktami w jednym kosztorysie.",
    actionLabel: "Zobacz inspiracje",
    actionHref: "/#inspiracje",
  },
  summary: {
    title: "Twoja lista",
    lead: 'Poproś salon o kosztorys całej listy, pobierz ją w PDF albo wyślij bliskim. Salon wskażesz w formularzu „Poproś o kosztorys".',
    quoteLabel: "Poproś o kosztorys",
    pdfLabel: "Pobierz PDF",
    shareLabel: "Udostępnij link",
    clearLabel: "Wyczyść schowek",
    share: {
      title: "Udostępnij link",
      lead: "Wyślij listę bliskim albo pokaż ją doradcy w salonie.",
      url: "elements-show.pl/schowek/8f2c-4d1a",
      copyLabel: "Kopiuj",
      copiedLabel: "Skopiowano",
      note: "Link zawiera tylko listę pozycji - nie zawiera Twoich danych kontaktowych.",
      closeLabel: "Zamknij",
    },
    pdfHint: "Eksport PDF jest demonstracyjny w tej makiecie.",
  },
} as const;

/** Seeded into an empty browser store so /schowek has a demo bathroom set. */
export const defaultWishlistProductIds = [
  "promocje-montebianco-80",
  "arr-pillow-basin",
  "outlet-omnires-ottawa",
  "promocje-trinnity-m16",
  "arr-pillow-vanity",
  "arr-pillow-tall",
] as const;

export const defaultWishlistArrangementIds = ["insp-2", "insp-4"] as const;

/** Demo arrangements catalog for wishlist resolution (by id). */
export const wishlistArrangementCatalog: InspirationArrangement[] =
  homeInspiration.arrangements.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    items: [...item.items],
    href: item.href,
    showProducts: item.showProducts,
    products: item.products ? [...item.products] : undefined,
  }));
