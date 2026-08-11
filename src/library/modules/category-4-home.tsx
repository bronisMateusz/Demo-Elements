import {
  homeAdvisorCta,
  homeAppointment,
  homeInspiration,
} from "../../data/home";
import { HomeAbout } from "../../components/home/HomeAbout";
import { HomeAdvisorCta } from "../../components/home/HomeAdvisorCta";
import { AdvisorCta } from "../../components/marketing/AdvisorCta";
import { HomeAppointment } from "../../components/home/HomeAppointment";
import { HomeBrands } from "../../components/home/HomeBrands";
import { HomeCategories } from "../../components/home/HomeCategories";
import { HomeCategoriesBento } from "../../components/home/HomeCategoriesBento";
import { HomeHero } from "../../components/home/HomeHero";
import { HomeInspiration } from "../../components/home/HomeInspiration";
import { HomeMagazine } from "../../components/home/HomeMagazine";
import { HomePartners } from "../../components/home/HomePartners";
import { HomeProducts } from "../../components/home/HomeProducts";
import { InspirationGallery } from "../../components/inspiration/InspirationGallery";
import { libPreviewFullBleedWrapperClassName } from "../libStyles";
import type { LibraryModule } from "../types";

export const inspirationGalleryModule: LibraryModule = {
  id: "4.1",
  slug: "inspiration-gallery",
  title: "InspirationGallery",
  description:
    "Wielokrotnego użytku galeria aranżacji - kafle 16/10, bleed ~2.1 karty. Akcje: link, „Pokaż produkty” (drawer) albo lightbox. Opcjonalnie endCap + seeMore CTA.",
  optionalProps: [
    {
      name: "arrangements",
      type: "InspirationArrangement[]",
      required: true,
      description:
        "href → karta-link; showProducts → chip „Pokaż produkty”; inaczej lightbox.",
    },
    { name: "eyebrow", type: "string", defaultValue: '"Inspiracje"' },
    { name: "title", type: "string" },
    {
      name: "navPlacement",
      type: '"header" | "footer" | "none"',
      defaultValue: '"footer"',
    },
    {
      name: "endCap",
      type: "{ label; title?; description? }",
      description:
        "Zaślepka na końcu toru (bez linku) - wskazuje dolne CTA sekcji.",
    },
    {
      name: "seeMoreHref",
      type: "string",
      description: "CTA pod torem (gdy navPlacement=footer).",
    },
    {
      name: "seeMoreLabel",
      type: "string",
      defaultValue: '"Zobacz więcej aranżacji"',
    },
    {
      name: "onControlsChange",
      type: "(controls: InspirationGalleryControls) => void",
      description: "API strzałek dla rodzica (navPlacement=none).",
    },
  ],
  variants: [
    {
      id: "footer-see-more",
      label: "Footer nav + seeMore",
      description:
        "Jak PDP: strzałki + indeks + CTA „Zobacz więcej aranżacji”; endCap na końcu toru.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <InspirationGallery
              arrangements={homeInspiration.arrangements}
              eyebrow={homeInspiration.eyebrow}
              title={homeInspiration.title}
              navPlacement="footer"
              seeMoreHref={homeInspiration.seeMoreHref}
              seeMoreLabel={homeInspiration.seeMoreLabel}
              endCap={{
                label: "Kliknij poniżej",
                title: "Pełna galeria aranżacji",
                description:
                  "Zobacz wszystkie inspiracje i dobierz produkty do swojej łazienki.",
              }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "none-external",
      label: "Nav u rodzica (home)",
      description:
        "navPlacement=none - HomeInspiration dokłada strzałki + CTA poza galerią.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeInspiration />
        </div>
      ),
    },
    {
      id: "header-nav",
      label: "Nav w nagłówku",
      description: "Strzałki i indeks obok tytułu sekcji.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <InspirationGallery
              arrangements={homeInspiration.arrangements.slice(0, 4)}
              eyebrow={homeInspiration.eyebrow}
              title={homeInspiration.title}
              navPlacement="header"
            />
          </div>
        </div>
      ),
    },
  ],
};

export const homeHeroModule: LibraryModule = {
  id: "4.2",
  slug: "home-hero",
  title: "HomeHero",
  description:
    "Hero carousel - pełny bleed, swipe/wheel, autoplay z progress. Mobile: aktywny hint + licznik; desktop: 4 taby z SharedLayoutUnderline.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "4 banery z homeHeroSlides.",
      render: () => (
        <div
          className={libPreviewFullBleedWrapperClassName}
          data-lib-full-bleed
        >
          <HomeHero />
        </div>
      ),
    },
  ],
};

export const homeCategoriesModule: LibraryModule = {
  id: "4.3",
  slug: "home-categories",
  title: "HomeCategories",
  description:
    "Siatka kategorii (IconTile) oraz wariant bento (ImageBentoTile).",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Siatka kategorii z homeCategories.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeCategories />
        </div>
      ),
    },
    {
      id: "bento",
      label: "Bento",
      description: "Wariant mozaiki (duży kafelek Płytki + siatka).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeCategoriesBento />
        </div>
      ),
    },
  ],
};

export const homeProductsModule: LibraryModule = {
  id: "4.4",
  slug: "home-products",
  title: "HomeProducts",
  description:
    "Taby produktów + ProductCarousel + TextCascade „zobacz wszystkie”.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Taby + karuzela produktów z danymi home.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeProducts />
        </div>
      ),
    },
  ],
};

export const homeBrandsModule: LibraryModule = {
  id: "4.5",
  slug: "home-brands",
  title: "HomeBrands",
  description: "Marquee / cykl logo marek.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Marquee logo marek z home.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeBrands />
        </div>
      ),
    },
  ],
};

export const homeAppointmentModule: LibraryModule = {
  id: "4.6",
  slug: "home-appointment",
  title: "HomeAppointment",
  description:
    "Baner „Umów spotkanie” (LocateCta) - zdjęcie ze sloganem | ciemny panel z CTA otwierającym SalonDrawer. Współdzielony z kategorią / podkategorią.",
  optionalProps: [
    {
      name: "data",
      type: "homeAppointment",
      description: "Copy i obraz z src/data/home.ts (wrapper nad LocateCta).",
    },
  ],
  variants: [
    {
      id: "default",
      label: "Baner 50/50",
      description: `„${homeAppointment.title}” - ciemna karta z radialnym złotem.`,
      render: () => <HomeAppointment />,
    },
  ],
};

export const homeMagazineModule: LibraryModule = {
  id: "4.7",
  slug: "home-magazine",
  title: "HomeMagazine",
  description:
    "Magazyn online - copy + CTA (pełna szerokość na mobile) + mockup.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Magazyn online - copy, CTA i mockup okładki.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeMagazine />
        </div>
      ),
    },
  ],
};

export const homePartnersModule: LibraryModule = {
  id: "4.8",
  slug: "home-partners",
  title: "HomePartners",
  description: "Strefy partnerów (architekt / instalator).",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Karty stref partnerów z homePartners.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomePartners />
        </div>
      ),
    },
  ],
};

export const homeAdvisorCtaModule: LibraryModule = {
  id: "4.9",
  slug: "home-advisor-cta",
  title: "AdvisorCta / HomeAdvisorCta",
  description:
    "Wspólny band doradcy (SplitMediaCta) - home, kategoria, podkategoria (ask primary) oraz salon (book primary via SalonVisitCta).",
  variants: [
    {
      id: "ask-primary",
      label: "Ask primary (home)",
      description: "Napisz do doradcy + Umów spotkanie.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeAdvisorCta />
        </div>
      ),
    },
    {
      id: "book-primary",
      label: "Book primary (salon)",
      description: "Umów spotkanie + Napisz do doradcy - jak SalonVisitCta.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <AdvisorCta
            titleId="lib-advisor-book-title"
            primaryAction="book"
            onAskOpen={() => undefined}
            content={{
              eyebrow: "Wizyta w salonie",
              title: "Zaplanuj wizytę w salonie",
              description:
                "Zostaw kontakt - doradca potwierdzi dogodny termin.",
              note: "Bezpłatna konsultacja · Bez zobowiązań",
              image: homeAdvisorCta.image,
              askLabel: "Napisz do doradcy",
              bookLabel: "Umów spotkanie",
            }}
          />
        </div>
      ),
    },
  ],
};

export const homeAboutModule: LibraryModule = {
  id: "4.10",
  slug: "home-about",
  title: "HomeAbout",
  description: "Sekcja o Elements + newsletter / story.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "O Elements - copy, zdjęcie salonu i newsletter.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeAbout />
        </div>
      ),
    },
  ],
};

export const category4Modules: LibraryModule[] = [
  homeHeroModule,
  homeCategoriesModule,
  homeProductsModule,
  homeBrandsModule,
  homeAppointmentModule,
  inspirationGalleryModule,
  homeMagazineModule,
  homePartnersModule,
  homeAdvisorCtaModule,
  homeAboutModule,
];
