import {
  homeAdvisorCta,
  homeAppointment,
  homeInspiration,
} from "../../data/home";
import { featuredProducerBrands } from "../../data/producers";
import { salonPage } from "../../data/salon";
import { HomeAbout } from "../../components/home/HomeAbout";
import { HomeAdvisorCta } from "../../components/home/HomeAdvisorCta";
import { AdvisorCta } from "../../components/marketing/AdvisorCta";
import { HomeAppointment } from "../../components/home/HomeAppointment";
import { HomeBrands } from "../../components/home/HomeBrands";
import { HomeCategories } from "../../components/home/HomeCategories";
import { HomeCategoriesBento } from "../../components/home/HomeCategoriesBento";
import { HomeHero } from "../../components/home/HomeHero";
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
    "Galeria aranżacji - kafle 16/10, bleed ~2.1 karty. Akcje: link, „Pokaż produkty” (drawer) albo lightbox. Sekcja karuzeli (PDP, home) vs siatka listingu - moduł inspiration-listing.",
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
      type: "{ label?; title?; description? }",
      defaultValue: '{ title: "Pełna galeria…", description: "…" }',
      description:
        "Zaślepka na końcu toru - domyślnie włączona. Przy navPlacement=footer dopina „Kliknij poniżej” do CTA.",
    },
    {
      name: "seeMoreHref",
      type: "string",
      defaultValue: '"/inspiracje-listing"',
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
      label: "Stopka + CTA",
      description:
        "Domyślny chrome (PDP / ProductInspiration): strzałki, indeks i „Zobacz więcej” pod torem; endCap na końcu.",
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
    {
      id: "link-cards",
      label: "Karty link",
      description:
        "Tor z href do artykułu - wzorzec z /inspiracje-listing (bez endCap).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <InspirationGallery
              arrangements={homeInspiration.arrangements
                .slice(0, 4)
                .map((item) => ({
                  ...item,
                  href: "/inspiracja-artykul",
                  showProducts: undefined,
                }))}
              eyebrow={homeInspiration.eyebrow}
              title="Inspiracje linkujące do artykułu"
              navPlacement="footer"
              seeMoreHref="/inspiracje-listing"
              seeMoreLabel={homeInspiration.seeMoreLabel}
              endCap={false}
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
  description:
    "Siatka logo marek z SharedLayoutBg. Home: rotacja slotów + CTA „zobacz wszystkie”. Salon / producenci: static (`cycle={false}`) bez CTA.",
  optionalProps: [
    { name: "title", type: "string", defaultValue: "homeBrands.title" },
    { name: "description", type: "string" },
    {
      name: "items",
      type: "HomeBrandItem[]",
      description: "Pool logo; domyślnie homeBrands.items.",
    },
    {
      name: "cycle",
      type: "boolean",
      defaultValue: "true",
      description: "false = każde logo raz, bez rotacji.",
    },
    {
      name: "showSeeAll",
      type: "boolean",
      defaultValue: "true",
    },
  ],
  variants: [
    {
      id: "default",
      label: "Home (cykl + CTA)",
      description: "Domyślny pas ze strony głównej.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeBrands />
        </div>
      ),
    },
    {
      id: "salon",
      label: "Salon",
      description: "Tytuł + lead jak na /salon, bez CTA see-all.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeBrands
            title={salonPage.brands.title}
            description={salonPage.brands.description}
            showSeeAll={false}
          />
        </div>
      ),
    },
    {
      id: "static",
      label: "Static (producenci)",
      description:
        "Jak polecane na /producenci: cycle=false, showSeeAll=false, items z featuredProducerBrands.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <HomeBrands
            title="Polecani producenci"
            items={featuredProducerBrands.flatMap((brand) =>
              brand.logoSrc
                ? [
                    {
                      label: brand.name,
                      href: brand.href,
                      logoSrc: brand.logoSrc,
                    },
                  ]
                : [],
            )}
            cycle={false}
            showSeeAll={false}
          />
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
    "Baner „Umów spotkanie” (LocateCta) - zdjęcie | ciemny panel z CTA otwierającym SalonDrawer. Współdzielony z kategorią / podkategorią / PDP.",
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
      description: `„${homeAppointment.title}” - ciemny split LocateCta.`,
      render: () => <HomeAppointment />,
    },
  ],
};

export const homeMagazineModule: LibraryModule = {
  id: "4.7",
  slug: "home-magazine",
  title: "HomeMagazine",
  description:
    "Magazyn online - copy + CTA + mockup. Poniżej lg rytm zbliżony do ListingPromoTile; od lg oryginalna skala desktop.",
  optionalProps: [
    {
      name: "content",
      type: "HomeMagazineContent",
      description: "Override copy / obrazu (domyślnie homeMagazine).",
    },
  ],
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
