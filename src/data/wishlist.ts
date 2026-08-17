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
  countLabel: (n: number) => (n === 1 ? "1 pozycja" : `${n} pozycji`),
  segments: {
    products: "Produkty",
    arrangements: "Aranżacje",
    aria: "Sekcje schowka",
  },
  productsHeading: "Produkty",
  arrangementsHeading: "Aranżacje",
  empty: {
    title: "Twój schowek jest pusty",
    description:
      "Dodawaj produkty i aranżacje przyciskiem „Dodaj do schowka” podczas przeglądania oferty - zbierzesz w jednym miejscu wszystko, co Cię interesuje, i poprosisz salon o jeden wspólny kosztorys.",
    primaryLabel: "Przeglądaj kategorie",
    primaryHref: "/kategoria",
    secondaryLabel: "Zobacz inspiracje",
    secondaryHref: "/#inspiracje",
  },
  summary: {
    title: "Twoja lista",
    lead: 'Poproś salon o kosztorys całej listy, pobierz ją w PDF albo wyślij bliskim. Salon wskażesz w formularzu „Poproś o kosztorys".',
    quoteLabel: "Poproś o kosztorys",
    pdfLabel: "Pobierz PDF",
    shareLabel: "Udostępnij link",
    clearLabel: "Wyczyść schowek",
    shareNote:
      "Link demo do listy schowka - w docelowym systemie generowany per sesja.",
    shareUrl: "elements-show.pl/schowek/8f2c-4d1a",
    pdfHint: "Eksport PDF jest demonstracyjny w tej makiecie.",
  },
} as const;

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
