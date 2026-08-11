import { categoryPage, categoryRows } from "../../data/category";
import {
  listingCuratedTiles,
  listingPage,
} from "../../data/listing";
import { salonPage } from "../../data/salon";
import { subcategoryPage, subcategoryTypes } from "../../data/subcategory";
import { categorySeoBlocks } from "../../data/categorySeo";
import { BlogArticleCarousel } from "../../components/marketing/BlogArticleCarousel";
import { CategoryPromoBanner } from "../../components/marketing/CategoryPromoBanner";
import { CategoryRows } from "../../components/marketing/CategoryRows";
import { CtaBand } from "../../components/marketing/CtaBand";
import { EditorialCarousel } from "../../components/marketing/EditorialCarousel";
import { NewsCardGrid } from "../../components/marketing/NewsCardGrid";
import { PageIntro } from "../../components/marketing/PageIntro";
import { SeoExpandable } from "../../components/marketing/SeoExpandable";
import { SubcategoryBento } from "../../components/marketing/SubcategoryBento";
import { ListingCatalog } from "../../components/listing/ListingCatalog";
import { ListingCuratedGrid } from "../../components/listing/ListingCuratedGrid";
import { SalonHero } from "../../components/salon/SalonHero";
import {
  SalonAbout,
  SalonExpo,
  SalonStats,
  SalonUsps,
} from "../../components/salon/SalonSections";
import { Breadcrumbs } from "../../components/orientation/Breadcrumbs";
import { Container } from "../../components/ui/Container";
import {
  libPreviewArticleClassName,
  libPreviewFullBleedWrapperClassName,
} from "../libStyles";
import type { LibraryModule } from "../types";

export const pageIntroModule: LibraryModule = {
  id: "5.1",
  slug: "page-intro",
  title: "PageIntro",
  description:
    "Intro stron katalogowych - H1, opcjonalny opis i children (np. USP). Odstęp od breadcrumbs jak na kategorii / salonie.",
  optionalProps: [
    { name: "title", type: "string", required: true },
    { name: "description", type: "string" },
    { name: "titleId", type: "string", defaultValue: '"page-intro-title"' },
    { name: "children", type: "ReactNode" },
  ],
  variants: [
    {
      id: "category",
      label: "Kategoria",
      description: "Tytuł + lead jak na /kategoria.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <Container size="content" className="py-4">
            <Breadcrumbs
              items={[...categoryPage.breadcrumbs]}
              variant="top"
              className="py-3 md:py-4"
            />
          </Container>
          <PageIntro
            title={categoryPage.title}
            description={categoryPage.description}
            className="pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14"
          />
        </div>
      ),
    },
    {
      id: "subcategory",
      label: "Podkategoria",
      description: "Intro podkategorii z dłuższym opisem.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <PageIntro
            title={subcategoryPage.title}
            description={subcategoryPage.description}
            className="pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14"
          />
        </div>
      ),
    },
  ],
};

export const categoryRowsModule: LibraryModule = {
  id: "5.2",
  slug: "category-rows",
  title: "CategoryRows",
  description:
    "Wiersze kategorii: nagłówek ze strzałką, siatka kafelków, opcjonalny promo i wstawka LocateCta (ten sam band co HomeAppointment).",
  optionalProps: [
    { name: "rows", type: "CategoryRow[]", required: true },
    { name: "locate", type: "LocateConfig" },
  ],
  variants: [
    {
      id: "with-banner",
      label: "Z banerem promo",
      description: "Umywalki (+ CategoryPromoBanner) oraz Armatura.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <CategoryRows rows={categoryRows.slice(0, 2)} />
          </div>
        </div>
      ),
    },
    {
      id: "with-locate",
      label: "Z banerem spotkania",
      description:
        "locateAfter po Prysznic - ten sam LocateCta co HomeAppointment (zob. Strona główna).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <CategoryRows
              rows={categoryRows.filter((row) => row.name === "Prysznic")}
              locate={categoryPage.locate}
            />
          </div>
        </div>
      ),
    },
  ],
};

export const categoryPromoBannerModule: LibraryModule = {
  id: "5.3",
  slug: "category-promo-banner",
  title: "CategoryPromoBanner",
  description:
    "Szeroki baner promo 50/50 (media + panel gold) - skala jak SplitMediaCta / HomeAppointment, nie slim PDP strip.",
  variants: [
    {
      id: "default",
      label: "Duravit promo",
      description: "Przykład z danych kategorii Umywalki.",
      render: () => {
        const banner = categoryRows[0]?.banner;
        if (!banner) return null;
        return (
          <div className={libPreviewArticleClassName}>
            <Container size="content">
              <CategoryPromoBanner
                eyebrow={banner.eyebrow}
                title={banner.title}
                description={banner.description}
                href={banner.href}
                label={banner.label}
                image={banner.image}
              />
            </Container>
          </div>
        );
      },
    },
  ],
};

export const subcategoryBentoModule: LibraryModule = {
  id: "5.4",
  slug: "subcategory-bento",
  title: "SubcategoryBento",
  description:
    "Bento typów produktów - ImageBentoTile (jak HomeCategoriesBento) ze zdjęciem, gradientem i strzałką (featured span).",
  variants: [
    {
      id: "default",
      label: "Typy umywalek",
      description: "Siatka z subcategoryTypes.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <SubcategoryBento tiles={[...subcategoryTypes]} />
          </div>
        </div>
      ),
    },
  ],
};

export const editorialCarouselModule: LibraryModule = {
  id: "5.5",
  slug: "editorial-carousel",
  title: "EditorialCarousel",
  description:
    "Bleed karuzela editorial (aktualności / blog). Opcjonalna data i CTA „zobacz wszystkie”. NewsCardGrid i BlogArticleCarousel to cienkie aliasy.",
  variants: [
    {
      id: "news",
      label: "Aktualności salonu",
      description: "Z datą, bez see-all (NewsCardGrid).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <NewsCardGrid
            id={salonPage.news.id}
            title={salonPage.news.title}
            items={[...salonPage.news.items]}
            titleId="lib-salon-news-title"
          />
        </div>
      ),
    },
    {
      id: "blog",
      label: "Blog podkategorii",
      description: "Bez daty + CTA listingu (BlogArticleCarousel).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <BlogArticleCarousel
            title={subcategoryPage.blog.title}
            articles={[...subcategoryPage.blog.articles]}
            seeAllLabel={subcategoryPage.blog.seeAllLabel}
            seeAllHref={subcategoryPage.blog.seeAllHref}
          />
        </div>
      ),
    },
    {
      id: "direct",
      label: "EditorialCarousel",
      description: "Bezpośrednie API z see-all.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <EditorialCarousel
            title={subcategoryPage.blog.title}
            titleId="lib-editorial-title"
            items={[...subcategoryPage.blog.articles]}
            seeAll={{
              label: subcategoryPage.blog.seeAllLabel,
              href: subcategoryPage.blog.seeAllHref,
            }}
            a11yPrevLabel="Poprzednie artykuły"
            a11yNextLabel="Następne artykuły"
          />
        </div>
      ),
    },
  ],
};

export const seoExpandableModule: LibraryModule = {
  id: "5.6",
  slug: "seo-expandable",
  title: "SeoExpandable",
  description:
    "Rozwijany blok SEO (2 kolumny) - używany na kategorii i podkategorii.",
  variants: [
    {
      id: "category",
      label: "SEO kategorii",
      description: "Bloki z categorySeoBlocks.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <SeoExpandable blocks={[...categorySeoBlocks]} />
        </div>
      ),
    },
  ],
};

export const ctaBandModule: LibraryModule = {
  id: "5.7",
  slug: "cta-band",
  title: "CtaBand",
  description:
    "Prosty band CTA (tytuł, opis, primary/secondary) na warm tone - np. dopytanie o doradcę.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Przykładowy band z dwoma akcjami.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <CtaBand
            title="Potrzebujesz pomocy doradcy?"
            description="Umów wizytę w salonie albo wyślij pytanie - odpowiemy w 1 dzień roboczy."
            primary={{ kind: "link", label: "Umów spotkanie", href: "/salony" }}
            secondary={{ kind: "link", label: "Zadaj pytanie", href: "#" }}
          />
        </div>
      ),
    },
  ],
};

export const salonHeroModule: LibraryModule = {
  id: "5.8",
  slug: "salon-hero",
  title: "SalonHero",
  description:
    "Hero strony salonu - tytuł, zdjęcie ekspozycji i ciemna karta kontaktu (adres, godziny, telefony, e-mail, CTA).",
  variants: [
    {
      id: "bydgoszcz",
      label: "Bydgoszcz",
      description: "Dane demo z salonPage.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <SalonHero />
        </div>
      ),
    },
  ],
};

export const salonSectionsModule: LibraryModule = {
  id: "5.9",
  slug: "salon-sections",
  title: "SalonSections",
  description:
    "Sekcje strony salonu (USP = IconTile, about, stats, expo). Aktualności = EditorialCarousel; magazyn = HomeMagazine; wizyta = AdvisorCta.",
  variants: [
    {
      id: "usps",
      label: "USP",
      description: "Kafelki korzyści + CTA tile (IconTile).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <SalonUsps />
        </div>
      ),
    },
    {
      id: "about",
      label: "O salonie",
      description: "Sticky lead + akapity.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <SalonAbout />
        </div>
      ),
    },
    {
      id: "stats",
      label: "Statystyki",
      description: "AnimatedNumber + opisy.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <SalonStats />
        </div>
      ),
    },
    {
      id: "expo",
      label: "Ekspozycja",
      description: "Karuzela zdjęć ekspozycji + lightbox.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <SalonExpo />
        </div>
      ),
    },
  ],
};

export const listingPlpModule: LibraryModule = {
  id: "5.10",
  slug: "listing-plp",
  title: "Listing PLP",
  description:
    "Siatka produktów z facetami, quick filters i sortem (ListingFilters + Toolbar + ProductGrid). Pełna strona: /listing.",
  variants: [
    {
      id: "interactive",
      label: "Filtry + grid",
      description: "Interaktywny katalog demo (~32 SKU).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <Container size="content" className="py-8">
            <ListingCatalog />
          </Container>
        </div>
      ),
    },
    {
      id: "curated",
      label: "Wyselekcjonowane",
      description: "ListingCuratedGrid (ImageBentoTile).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <ListingCuratedGrid
            title={listingPage.curated.title}
            description={listingPage.curated.description}
            tiles={[...listingCuratedTiles]}
          />
        </div>
      ),
    },
  ],
};

export const category5Modules: LibraryModule[] = [
  pageIntroModule,
  categoryRowsModule,
  categoryPromoBannerModule,
  subcategoryBentoModule,
  editorialCarouselModule,
  seoExpandableModule,
  ctaBandModule,
  salonHeroModule,
  salonSectionsModule,
  listingPlpModule,
];
