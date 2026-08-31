import { categoryPage, categoryRows } from "../../data/category";
import { listingCuratedTiles, listingPage } from "../../data/listing";
import { salonOptions } from "../../data/nav";
import {
  featuredProducerBrands,
  producerPage,
  producerPageProducts,
} from "../../data/producers";
import { salonPage } from "../../data/salon";
import { salonsPageB } from "../../data/salons";
import { subcategoryPage, subcategoryTypes } from "../../data/subcategory";
import { categorySeoBlocks } from "../../data/categorySeo";
import { wishlistPage } from "../../data/wishlist";
import { architectDownloadGroups } from "../../data/architectDownloads";
import { montebianco80 } from "../../data/products/montebianco-80";
import { ArchitectDownloads } from "../../components/marketing/ArchitectDownloads";
import { ArchitectGuardian } from "../../components/marketing/ArchitectGuardian";
import { BrandAbout } from "../../components/marketing/BrandAbout";
import { BrandHero } from "../../components/marketing/BrandHero";
import { BrandSeriesGrid } from "../../components/marketing/BrandSeriesGrid";
import { CategoryPromoBanner } from "../../components/marketing/CategoryPromoBanner";
import { CategoryRows } from "../../components/marketing/CategoryRows";
import { EditorialCarousel } from "../../components/marketing/EditorialCarousel";
import { FloatingAdvisorCta } from "../../components/marketing/FloatingAdvisorCta";
import { LocateCta } from "../../components/marketing/LocateCta";
import { PageIntro } from "../../components/marketing/PageIntro";
import { ProducersDirectory } from "../../components/marketing/ProducersDirectory";
import { SalonLocationChips } from "../../components/marketing/SalonLocationChips";
import { SalonTabCard } from "../../components/marketing/SalonTabCard";
import { SalonsDirectory } from "../../components/marketing/SalonsDirectory";
import { SalonsTabsDirectory } from "../../components/marketing/SalonsTabsDirectory";
import { SeoExpandable } from "../../components/marketing/SeoExpandable";
import { SubcategoryBento } from "../../components/marketing/SubcategoryBento";
import { WishlistDirectory } from "../../components/marketing/WishlistDirectory";
import { ListingCatalog } from "../../components/listing/ListingCatalog";
import { ListingCuratedGrid } from "../../components/listing/ListingCuratedGrid";
import { ListingPromoTile } from "../../components/listing/ListingPromoTile";
import { ProductCarouselCard } from "../../components/product/ProductCarouselCard";
import { SalonContactPanel } from "../../components/salon/SalonContactPanel";
import { SalonHero } from "../../components/salon/SalonHero";
import {
  SalonAbout,
  SalonExpo,
  SalonStats,
} from "../../components/salon/SalonSections";
import { Breadcrumbs } from "../../components/orientation/Breadcrumbs";
import { Button } from "../../components/ui/Button";
import { Container } from "../../components/ui/Container";
import { IconTile } from "../../components/ui/IconTile";
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
    "Intro stron katalogowych - H1 przez pageIntroTitleClassName, pt-12 (pageIntroHeroTopPaddingClassName), opcjonalny opis, breadcrumbs, actions i children.",
  optionalProps: [
    { name: "title", type: "string", required: true },
    { name: "description", type: "string" },
    { name: "titleId", type: "string", defaultValue: '"page-intro-title"' },
    { name: "breadcrumbs", type: "ReactNode" },
    {
      name: "actions",
      type: "ReactNode",
      description: "Kontrolka w rzędzie tytułu (np. SalonLocationChips).",
    },
    { name: "children", type: "ReactNode" },
    { name: "className", type: "string" },
  ],
  variants: [
    {
      id: "plain",
      label: "Z breadcrumbs",
      description: "Jak /kategoria - breadcrumbs w PageShell, intro z leadem.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <Breadcrumbs
            items={[...categoryPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
          <PageIntro
            title={categoryPage.title}
            description={categoryPage.description}
          />
        </div>
      ),
    },
    {
      id: "with-actions",
      label: "Z actions",
      description: "Jak /salony - przełącznik grupowania obok H1.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <PageIntro
            title={salonsPageB.title}
            actions={
              <SalonLocationChips
                className="shrink-0"
                mobileAs="chips"
                stretchOnMobile
                size="lg"
                ariaLabel={salonsPageB.location.groupByAria}
                chips={[
                  {
                    id: "voivodeship",
                    label: salonsPageB.location.groupByVoiv,
                  },
                  { id: "city", label: salonsPageB.location.groupByCity },
                ]}
                activeId="voivodeship"
                onSelect={() => undefined}
              />
            }
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

export const iconTileModule: LibraryModule = {
  id: "5.14",
  slug: "icon-tile",
  title: "IconTile",
  description:
    "Kafelek z ikoną i etykietą. Opcjonalnie link (strzałka) i ctaLabel w rogu. Home kategorie i USP salonu.",
  optionalProps: [
    { name: "iconClass", type: "string", required: true },
    { name: "label", type: "string", required: true },
    { name: "text", type: "string" },
    { name: "href", type: "string" },
    {
      name: "ctaLabel",
      type: "string",
      description: "CTA w rogu, gdy jest href.",
    },
  ],
  variants: [
    {
      id: "salon-usps",
      label: "Siatka USP",
      description:
        "Jak na /salon: trzy kafle statyczne i jeden z CTA „Więcej”.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 lg:grid-cols-4">
            {salonPage.usps.items.map((item) => {
              const cta = "cta" in item ? item.cta : undefined;
              return (
                <li key={item.title} className="min-h-0">
                  <IconTile
                    iconClass={item.iconClass}
                    label={item.title}
                    href={cta?.href}
                    ctaLabel={cta?.label}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ),
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
    "Bleed karuzela editorial - aktualności (z datą) lub blog (see-all CTA).",
  variants: [
    {
      id: "news",
      label: "Aktualności salonu",
      description: "Z datą, bez see-all.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <EditorialCarousel
            id={salonPage.news.id}
            title={salonPage.news.title}
            items={[...salonPage.news.items]}
            titleId="lib-salon-news-title"
            a11yPrevLabel="Poprzednie aktualności"
            a11yNextLabel="Następne aktualności"
          />
        </div>
      ),
    },
    {
      id: "blog",
      label: "Blog podkategorii",
      description: "Bez daty + CTA listingu.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <EditorialCarousel
            title={subcategoryPage.blog.title}
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

export const floatingAdvisorCtaModule: LibraryModule = {
  id: "5.7",
  slug: "floating-advisor-cta",
  title: "FloatingAdvisorCta",
  description:
    "Kompaktowy sticky CTA na stronach marketingowych (home, kategoria, salon, /salony). Ikona + label - bez strzałki. Inny niż PDP AskFab.",
  optionalProps: [
    { name: "label", type: "string", required: true },
    { name: "onClick", type: "() => void", required: true },
    { name: "iconClass", type: "string", defaultValue: '"ph ph-chat-circle"' },
    {
      name: "showAfterScroll",
      type: "number",
      defaultValue: "320",
      description:
        "-1 w preview = zawsze widoczny po mount (wymaga footera contentinfo).",
    },
  ],
  variants: [
    {
      id: "preview",
      label: "Podgląd w miejscu",
      description: "Wymuszone widoczne; na stronie fixed bottom / inset-e.",
      render: () => (
        <div className="relative flex flex-col gap-4 p-[clamp(0.75rem,2.222vw,2.5rem)] md:p-8">
          <p className="m-0 max-w-xl text-sm text-neutral-600">
            Marketing sticky - pojawia się po scrollu i chowa przed stopką. Tu
            podgląd w flow preview (nie fixed nad chrome biblioteki).
          </p>
          <div className="relative overflow-hidden rounded-xs border border-neutral-200 bg-neutral-50 p-4">
            <FloatingAdvisorCta
              label="Napisz do doradcy"
              onClick={() => undefined}
              showAfterScroll={-1}
              className="static inset-auto translate-y-0 pointer-events-auto sm:inset-auto sm:bottom-auto sm:inset-e-auto"
            />
          </div>
          <footer role="contentinfo" className="sr-only" aria-hidden="true" />
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
    "Hero /salon: H1 (pageIntroTitleClassName), zdjęcie aspect-4/3, jasny SalonContactPanel w lewej kolumnie (adres, godziny, telefony, e-mail, CTA).",
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

export const salonContactPanelModule: LibraryModule = {
  id: "5.15",
  slug: "salon-contact-panel",
  title: "SalonContactPanel",
  description:
    "Jasny blok kontaktu (hero + karty na /salony). @container: 2 kolumny od ~36rem; godziny = SalonHoursList; linki: salonContactLinkClassName.",
  optionalProps: [
    { name: "address", type: "string", required: true },
    { name: "hours", type: "SalonHoursRow[]", required: true },
    { name: "phoneGroups", type: "SalonContactPhoneGroup[]", required: true },
    { name: "email", type: "string", required: true },
    { name: "emailHref", type: "string", required: true },
    { name: "actions", type: "ReactNode" },
  ],
  variants: [
    {
      id: "bydgoszcz",
      label: "Bydgoszcz",
      description: "Dane z salonPage.hero + przykładowe CTA.",
      render: () => {
        const { hero } = salonPage;
        return (
          <div className={libPreviewArticleClassName}>
            <Container size="content" className="py-8">
              <SalonContactPanel
                address={hero.address}
                hours={hero.hours}
                phoneGroups={hero.phoneGroups}
                email={hero.email}
                emailHref={hero.emailHref}
                actions={
                  <>
                    <Button
                      as="button"
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={() => undefined}
                    >
                      {hero.bookLabel}
                    </Button>
                    <Button href="/salony" variant="secondary" size="md">
                      Przejdź do strony salonu
                      <i className="ph ph-arrow-right" aria-hidden="true" />
                    </Button>
                  </>
                }
              />
            </Container>
          </div>
        );
      },
    },
  ],
};

export const salonTabCardModule: LibraryModule = {
  id: "5.16",
  slug: "salon-tab-card",
  title: "SalonTabCard",
  description:
    "Karta salonu na /salony (wariant B): nazwa, SalonContactPanel, zdjęcie aspect-4/3, CTA umówienia i strony salonu.",
  variants: [
    {
      id: "single",
      label: "Jedna karta",
      description: "Pierwszy salon z salonOptions.",
      render: () => {
        const salon = salonOptions[0];
        if (!salon) return null;
        return (
          <div className={libPreviewFullBleedWrapperClassName}>
            <Container size="content" className="py-8">
              <div className="rounded-xs border border-neutral-200 bg-neutral-0 p-4 sm:p-6 md:p-8">
                <SalonTabCard salon={salon} onBook={() => undefined} />
              </div>
            </Container>
          </div>
        );
      },
    },
  ],
};

export const salonSectionsModule: LibraryModule = {
  id: "5.9",
  slug: "salon-sections",
  title: "SalonSections",
  description:
    "Sekcje /salon (about, stats, expo). USP = IconTile; aktualności = EditorialCarousel; magazyn = HomeMagazine; marki = HomeBrands; sticky CTA = FloatingAdvisorCta; wizyta = AdvisorCta.",
  variants: [
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
    "Siatka produktów z facetami, quick filters i sortem (ListingFilters + Toolbar + ListingProductGrid). Opcjonalny ListingPromoTile wstawiany w gridzie. Pełna strona: /listing.",
  variants: [
    {
      id: "interactive",
      label: "Filtry + grid",
      description: "Interaktywny katalog demo (~32 SKU) z promo w siatce.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <Container size="content" className="py-8">
            <ListingCatalog />
          </Container>
        </div>
      ),
    },
    {
      id: "promo-tile",
      label: "ListingPromoTile",
      description:
        "Sam kafelek promo (rytm jak HomeMagazine poniżej lg). W Catalogu wstawiany na granicy wierszy.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <Container size="content" className="py-8">
            <ListingPromoTile promo={listingPage.gridPromo} />
          </Container>
        </div>
      ),
    },
    {
      id: "curated",
      label: "Wyselekcjonowane",
      description: "ListingCuratedGrid - bento jak SubcategoryBento / home.",
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

export const producersDirectoryModule: LibraryModule = {
  id: "5.11",
  slug: "producers-directory",
  title: "ProducersDirectory",
  description:
    "Katalog /producenci: hero (pageIntro tokens) → HomeBrands static bez CTA → sticky A-Z + wyszukiwarka → grupy literowe i promo po D.",
  optionalProps: [
    {
      name: "brands",
      type: "ProducerBrand[]",
      description: "Pełna lista A-Z; domyślnie producerBrands.",
    },
    {
      name: "featured",
      type: "ProducerBrand[]",
      description: "Logo w pasie HomeBrands; domyślnie featuredProducerBrands.",
    },
  ],
  variants: [
    {
      id: "full",
      label: "Pełny katalog",
      description:
        "Intro + polecane + A-Z. Preview: 6 polecanych (produkcja używa pełnej listy).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <ProducersDirectory featured={featuredProducerBrands.slice(0, 6)} />
        </div>
      ),
    },
  ],
};

export const brandPageModule: LibraryModule = {
  id: "5.12",
  slug: "brand-page",
  title: "Strona producenta",
  description:
    "BrandHero + serie + produkty marki (demo Vigour). Pełna strona: /producent.",
  variants: [
    {
      id: "hero",
      label: "BrandHero",
      description:
        "Logo, lead, CTA i media. Bez logo H1 używa pageIntroTitleClassName (+ pageIntroHeroTopPaddingClassName).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <BrandHero
            title={producerPage.hero.title}
            lead={producerPage.hero.lead}
            askLabel={producerPage.hero.askLabel}
            onAsk={() => undefined}
            productsLabel={producerPage.hero.productsLabel}
            productsHref={producerPage.hero.productsHref}
            image={producerPage.hero.image}
            logoSrc={producerPage.hero.logoSrc}
          />
        </div>
      ),
    },
    {
      id: "series-products",
      label: "Serie + produkty",
      description:
        "BrandSeriesGrid, BrandAbout (dekory) i siatka ProductCarouselCard.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <BrandSeriesGrid
            title={producerPage.seriesTitle}
            series={producerPage.series}
          />
          <BrandAbout paragraphs={producerPage.about.paragraphs} />
          <Container size="content" className="pb-10">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {producerPageProducts.slice(0, 4).map((product) => (
                <ProductCarouselCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </div>
      ),
    },
  ],
};

export const wishlistModule: LibraryModule = {
  id: "5.13",
  slug: "wishlist",
  title: "Schowek",
  description:
    "Lead-gen wishlist: produkty i aranżacje w jednej liście, sticky menu sekcji, empty state i panel kosztorysu. Pełna strona: /schowek.",
  variants: [
    {
      id: "live",
      label: "Live (localStorage)",
      description:
        "Stan z ulubionych w przeglądarce. Pusty store dostaje zestaw demo (produkty + aranżacje).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <PageIntro title={wishlistPage.title} />
            <WishlistDirectory className="mt-4" />
          </div>
        </div>
      ),
    },
  ],
};

export const salonsDirectoryModule: LibraryModule = {
  id: "5.17",
  slug: "salons-directory",
  title: "Katalog salonów",
  description:
    "Listy salonów: SalonsTabsDirectory (/salony) i SalonsDirectory (/salony-a). Karty = SalonTabCard.",
  variants: [
    {
      id: "tabs",
      label: "Tabs (B)",
      description:
        "Kanoniczny /salony - taby województwo/miasto + SalonTabCard.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <SalonsTabsDirectory
              groupBy="voivodeship"
              onBookSalon={() => undefined}
            />
          </div>
        </div>
      ),
    },
    {
      id: "map-list",
      label: "Mapa + lista (A)",
      description: "Wariant /salony-a - search, mapa, gęsta lista.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <SalonsDirectory />
          </div>
        </div>
      ),
    },
  ],
};

export const locateCtaModule: LibraryModule = {
  id: "5.18",
  slug: "locate-cta",
  title: "LocateCta",
  description:
    "Ciemny split CTA - umówienie (home/kategoria), katalog CAD i baner kolekcji PDP (opcjonalne image / eyebrow / sectionMargin).",
  variants: [
    {
      id: "appointment",
      label: "Umów spotkanie",
      description: "Z medią - jak HomeAppointment.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <LocateCta
            title={listingPage.locate.title}
            description={listingPage.locate.description}
            ctaLabel={listingPage.locate.ctaLabel}
            image={listingPage.locate.image}
          />
        </div>
      ),
    },
    {
      id: "pdp-banner",
      label: "PDP collection",
      description:
        "Jak dawny ProductGalleryBanner - sectionMargin + opcjonalne media.",
      render: () => {
        const banner = montebianco80.galleryBanner;
        if (!banner) return null;
        return (
          <div className={libPreviewFullBleedWrapperClassName}>
            <LocateCta
              sectionMargin
              eyebrow={banner.eyebrow}
              title={banner.title}
              description={banner.description}
              ctaHref={banner.href}
              ctaLabel={banner.label}
              image={banner.image}
            />
          </div>
        );
      },
    },
  ],
};

export const architectGuardianModule: LibraryModule = {
  id: "5.19",
  slug: "architect-guardian",
  title: "ArchitectGuardian",
  description:
    "Wybór salonu-opiekuna + kontakt (strefa architekta). Używa salonContactLinkClassName.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Select + panel kontaktu po wyborze.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <ArchitectGuardian />
        </div>
      ),
    },
  ],
};

export const architectDownloadsModule: LibraryModule = {
  id: "5.20",
  slug: "architect-downloads",
  title: "ArchitectDownloads",
  description:
    "Akordeon plików CAD + opcjonalny LocateCta (CatalogDatabaseCta) pod listą.",
  variants: [
    {
      id: "default",
      label: "Grupy plików",
      description: "Pierwsze grupy z architectDownloadGroups.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <ArchitectDownloads
            title="Pliki CAD / 3D"
            groups={architectDownloadGroups.slice(0, 4)}
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
  iconTileModule,
  subcategoryBentoModule,
  editorialCarouselModule,
  seoExpandableModule,
  floatingAdvisorCtaModule,
  salonHeroModule,
  salonContactPanelModule,
  salonTabCardModule,
  salonSectionsModule,
  listingPlpModule,
  producersDirectoryModule,
  brandPageModule,
  wishlistModule,
  salonsDirectoryModule,
  locateCtaModule,
  architectGuardianModule,
  architectDownloadsModule,
];
