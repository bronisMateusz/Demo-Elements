import { category1Modules } from "./modules/category-1-shell";
import { category2Modules } from "./modules/category-2-orientation";
import { category2MotionModules } from "./modules/category-2-motion";
import { category3Modules } from "./modules/category-3-product";
import type { LibraryCategory } from "./types";

export const libraryCategories: LibraryCategory[] = [
  {
    id: "cat-1",
    number: 1,
    slug: "naglowek-i-stopka",
    title: "Nagłówek i stopka",
    subtitle: "Shell portalu — header i footer marki Elements.",
    modules: category1Modules,
  },
  {
    id: "cat-2",
    number: 2,
    slug: "orientacja-i-nawigacja",
    title: "Orientacja i nawigacja",
    subtitle: "Okruszki, CTA, animacje layout (SharedLayoutBg / Underline).",
    modules: [...category2Modules, ...category2MotionModules],
  },
  {
    id: "cat-3",
    number: 3,
    slug: "produkt",
    title: "Produkt",
    subtitle: "Komponenty strony produktu — galeria, buy box, warianty, karta, specyfikacja.",
    modules: category3Modules,
  },
];

export function getCategoryBySlug(slug: string) {
  return libraryCategories.find((category) => category.slug === slug);
}

export function getDefaultCategorySlug() {
  return libraryCategories[0]?.slug ?? "naglowek-i-stopka";
}
