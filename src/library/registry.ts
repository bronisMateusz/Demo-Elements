import {
  drawersModule,
  footerModule,
  headerModule,
  siteNewsletterModule,
} from "./modules/category-1-shell";
import {
  badgeModule,
  breadcrumbsModule,
  buttonModule,
  checkboxModule,
  iconButtonModule,
} from "./modules/category-2-orientation";
import { emptyStateModule, statusPagesModule } from "./modules/empty-state";
import {
  centerMorphModalModule,
  sharedLayoutBgModule,
  sharedLayoutUnderlineModule,
  textCascadeModule,
  textRevealLeadModule,
} from "./modules/category-2-motion";
import {
  askFabModule,
  productArchitectCtaModule,
  productBuyBoxModule,
  productCardModule,
  productCarouselModule,
  productDownloadsModule,
  productEditorialModule,
  productGalleryModule,
  productPairWithModule,
  productSalonCardModule,
  productSpecsModule,
  productSubnavModule,
  productVisualizationCtaModule,
} from "./modules/category-3-product";
import {
  homeAboutModule,
  homeAdvisorCtaModule,
  homeAppointmentModule,
  homeBrandsModule,
  homeCategoriesModule,
  homeHeroModule,
  homeMagazineModule,
  homePartnersModule,
  homeProductsModule,
  inspirationGalleryModule,
} from "./modules/category-4-home";
import {
  architectDownloadsModule,
  architectGuardianModule,
  brandPageModule,
  categoryPromoBannerModule,
  categoryRowsModule,
  editorialCarouselModule,
  floatingAdvisorCtaModule,
  iconTileModule,
  listingPlpModule,
  locateCtaModule,
  pageIntroModule,
  producersDirectoryModule,
  salonContactPanelModule,
  salonHeroModule,
  salonSectionsModule,
  salonTabCardModule,
  salonsDirectoryModule,
  seoExpandableModule,
  subcategoryBentoModule,
  wishlistModule,
} from "./modules/category-5-marketing";
import type { LibraryCategory } from "./types";

export const libraryCategories: LibraryCategory[] = [
  {
    id: "cat-1",
    number: 1,
    slug: "prymitywy",
    title: "Prymitywy",
    subtitle:
      "Atomy UI - przyciski, badge, checkbox oraz motion (SharedLayout, TextCascade, modal).",
    modules: [
      buttonModule,
      badgeModule,
      iconButtonModule,
      checkboxModule,
      sharedLayoutBgModule,
      sharedLayoutUnderlineModule,
      textCascadeModule,
      textRevealLeadModule,
      centerMorphModalModule,
    ],
  },
  {
    id: "cat-empty",
    number: 2,
    slug: "puste-stany",
    title: "Puste stany",
    subtitle:
      "Empty z widoków (listing, schowek, salony) oraz strony 404, 403 i przerwa techniczna.",
    modules: [emptyStateModule, statusPagesModule],
  },
  {
    id: "cat-2",
    number: 3,
    slug: "nawigacja",
    title: "Nawigacja",
    subtitle: "Shell i orientacja - header, footer, newsletter, breadcrumbs.",
    modules: [
      headerModule,
      footerModule,
      siteNewsletterModule,
      breadcrumbsModule,
    ],
  },
  {
    id: "cat-3",
    number: 4,
    slug: "drawery",
    title: "Drawery",
    subtitle:
      "Wysuwane panele - salon, pytanie, umówienie, produkty aranżacji i menu mobilne.",
    modules: [drawersModule],
  },
  {
    id: "cat-4",
    number: 5,
    slug: "karty",
    title: "Karty",
    subtitle:
      "Kafelki produktu, ikon, karuzeli, salonu i marek - bento i baner promo.",
    modules: [
      productCardModule,
      productCarouselModule,
      productSalonCardModule,
      productPairWithModule,
      iconTileModule,
      subcategoryBentoModule,
      categoryPromoBannerModule,
    ],
  },
  {
    id: "cat-5",
    number: 6,
    slug: "hero-i-cta",
    title: "Hero i CTA",
    subtitle: "Hero, intro strony oraz pasy i przyciski wezwania do działania.",
    modules: [
      homeHeroModule,
      salonHeroModule,
      salonContactPanelModule,
      pageIntroModule,
      locateCtaModule,
      homeAdvisorCtaModule,
      homeAppointmentModule,
      floatingAdvisorCtaModule,
      askFabModule,
      productArchitectCtaModule,
      productVisualizationCtaModule,
    ],
  },
  {
    id: "cat-6",
    number: 7,
    slug: "galerie",
    title: "Galerie",
    subtitle:
      "Galerie produktu i inspiracji, magazyn, karuzele editorial i siatki produktów.",
    modules: [
      productGalleryModule,
      inspirationGalleryModule,
      homeMagazineModule,
      editorialCarouselModule,
      homeProductsModule,
    ],
  },
  {
    id: "cat-7",
    number: 8,
    slug: "listingi",
    title: "Listingi",
    subtitle:
      "Katalogi i siatki - PLP, kategorie, marki, producenci, salony i schowek.",
    modules: [
      listingPlpModule,
      categoryRowsModule,
      homeCategoriesModule,
      homeBrandsModule,
      producersDirectoryModule,
      salonsDirectoryModule,
      salonTabCardModule,
      wishlistModule,
    ],
  },
  {
    id: "cat-8",
    number: 9,
    slug: "tresc",
    title: "Treść",
    subtitle:
      "Bloki treści - PDP, SEO, about, salon, architekt i strona marki.",
    modules: [
      productBuyBoxModule,
      productSubnavModule,
      productEditorialModule,
      productDownloadsModule,
      productSpecsModule,
      seoExpandableModule,
      homeAboutModule,
      salonSectionsModule,
      architectGuardianModule,
      architectDownloadsModule,
      homePartnersModule,
      brandPageModule,
    ],
  },
];

/** Old page-based slugs - keep bookmarks working. */
export const libraryCategoryAliases: Record<string, string> = {
  "naglowek-i-stopka": "nawigacja",
  "orientacja-i-nawigacja": "prymitywy",
  produkt: "karty",
  "strona-glowna": "hero-i-cta",
  marketing: "listingi",
};

export function resolveCategorySlug(slug: string) {
  return libraryCategoryAliases[slug] ?? slug;
}

export function getCategoryBySlug(slug: string) {
  return libraryCategories.find(
    (category) => category.slug === resolveCategorySlug(slug),
  );
}

export function getDefaultCategorySlug() {
  return libraryCategories[0]?.slug ?? "prymitywy";
}
