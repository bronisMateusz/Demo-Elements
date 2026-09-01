import {
  arrangementsGalleryItems,
  arrangementsGalleryPage,
} from "../../data/arrangementsGallery";
import { inspirationArticlePage } from "../../data/inspirationArticle";
import {
  inspirationsListingItems,
  inspirationsListingPage,
} from "../../data/inspirationsListing";
import { homeInspiration } from "../../data/home";
import {
  InspirationArticleContent,
  InspirationArticleHero,
} from "../../components/inspiration/InspirationArticleContent";
import { InspirationGalleryCard } from "../../components/inspiration/InspirationGalleryCard";
import { InspirationGallery } from "../../components/inspiration/InspirationGallery";
import { InspirationListingCatalog } from "../../components/inspiration/InspirationListingCatalog";
import { InspirationListingGrid } from "../../components/inspiration/InspirationListingGrid";
import { ProductCarousel } from "../../components/product/ProductCarousel";
import { productCarouselBleedWrapperClassName } from "../../components/product/productCarouselClassName";
import { Container } from "../../components/ui/Container";
import {
  libPreviewArticleClassName,
  libPreviewFullBleedWrapperClassName,
} from "../libStyles";
import type { LibraryModule } from "../types";

export const inspirationListingCatalogModule: LibraryModule = {
  id: "5.12",
  slug: "inspiration-listing",
  title: "InspirationListingCatalog",
  description:
    "Siatka aranżacji z filtrami chip + paginacja. Wariant inspiracje-listing: karty link. Wariant galeria-aranzacji: karty products + promo magazynu. Pełne strony: /inspiracje-listing, /galeria-aranzacji.",
  optionalProps: [
    {
      name: "items",
      type: "InspirationListingItem[]",
      required: true,
    },
    {
      name: "filters",
      type: "InspirationListingFilter[]",
      required: true,
    },
    {
      name: "filterMode",
      type: '"styleTags" | "producerTag"',
      required: true,
    },
    {
      name: "cardAction",
      type: '"link" | "products"',
      description: "Domyślnie wnioskowane z pól href / showProducts.",
    },
    {
      name: "advisorCta",
      type: "ListingGridAdvisorCta",
      description:
        "Opcjonalny AdvisorCta w siatce (doradztwo / SplitMediaCta).",
    },
    {
      name: "locateCta",
      type: "ListingGridLocateCta",
      description:
        "Opcjonalny LocateCta w siatce (HomeAppointment / ciemny split).",
    },
    {
      name: "promo",
      type: "ListingGridPromo",
      description: "Opcjonalny ListingPromoTile w siatce (magazyn).",
    },
  ],
  variants: [
    {
      id: "inspiracje-listing",
      label: "Inspiracje (link)",
      description:
        "Filtry stylu + karty linkujące do artykułu + LocateCta w siatce.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <Container size="content" className="py-8">
            <InspirationListingCatalog
              items={inspirationsListingItems.slice(0, 6)}
              filters={inspirationsListingPage.filters}
              pageSize={6}
              itemLabel="inspiracji"
              progressAriaLabel="Postęp przeglądania inspiracji"
              navAriaLabel="Paginacja galerii inspiracji"
              filterAriaLabel="Filtruj wg stylu"
              filterMode="styleTags"
              cardAction="link"
              locateCta={inspirationsListingPage.gridLocateCta}
            />
          </Container>
        </div>
      ),
    },
    {
      id: "galeria-aranzacji",
      label: "Galeria producentów",
      description: "Filtry producenta + drawer produktów + promo magazynu.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <Container size="content" className="py-8">
            <InspirationListingCatalog
              items={arrangementsGalleryItems.slice(0, 9)}
              filters={arrangementsGalleryPage.filters}
              pageSize={9}
              itemLabel="aranżacji"
              progressAriaLabel="Postęp przeglądania aranżacji"
              navAriaLabel="Paginacja galerii aranżacji"
              filterAriaLabel="Filtruj wg producenta"
              filterMode="producerTag"
              cardAction="products"
              showFavorite
              promo={arrangementsGalleryPage.gridPromo}
            />
          </Container>
        </div>
      ),
    },
    {
      id: "grid-only",
      label: "Siatka (grid)",
      description: "Sam InspirationListingGrid bez filtrów i paginacji.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <InspirationListingGrid
            items={inspirationsListingItems.slice(0, 3)}
            cardAction="link"
          />
        </div>
      ),
    },
  ],
};

export const inspirationArticleModule: LibraryModule = {
  id: "5.13",
  slug: "inspiration-article",
  title: "InspirationArticleContent",
  description:
    "Treść artykułu inspiracji - sekcje h2, listy, obrazki z lightboxem, osadzone LocateCta i HomeMagazine. Pełna strona: /inspiracja-artykul.",
  variants: [
    {
      id: "full-article",
      label: "Treść artykułu",
      description: "Hero + sekcje z osadzonymi CTA (skrócony preview).",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <InspirationArticleHero
              title={inspirationArticlePage.title}
              lead={inspirationArticlePage.lead}
              projectCredit={inspirationArticlePage.projectCredit}
              styleTags={[...inspirationArticlePage.styleTags]}
              heroImage={inspirationArticlePage.heroImage}
            />
            <div className="mt-10">
              <InspirationArticleContent
                sections={inspirationArticlePage.sections.slice(0, 2)}
                embeds={inspirationArticlePage.embeds.filter(
                  (embed) => embed.afterSectionId === "cabinetry",
                )}
                appointmentCta={inspirationArticlePage.appointmentCta}
                magazine={inspirationArticlePage.magazine}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "products-rail",
      label: "Produkty aranżacji",
      description: "Karuzelowy pas produktów z artykułu.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className={productCarouselBleedWrapperClassName}>
            <ProductCarousel
              products={[...inspirationArticlePage.products]}
              labelledBy="lib-inspiration-article-products"
              layout="bleed"
              navPlacement="footer"
              header={{
                title: "Produkty z tej aranżacji",
                titleId: "lib-inspiration-article-products",
              }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "related-carousel",
      label: "Podobne aranżacje",
      description: "InspirationGallery z kartami link na końcu artykułu.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <div className="py-8">
            <InspirationGallery
              arrangements={[...inspirationArticlePage.relatedArrangements]}
              title={inspirationArticlePage.relatedTitle}
              titleId="lib-inspiration-related-title"
              navPlacement="footer"
              seeMoreHref="/inspiracje-listing"
              seeMoreLabel="Zobacz wszystkie inspiracje"
            />
          </div>
        </div>
      ),
    },
  ],
};

export const inspirationGalleryCardModule: LibraryModule = {
  id: "5.14",
  slug: "inspiration-gallery-card",
  title: "InspirationGalleryCard",
  description:
    "Pojedynczy kafel aranżacji 16/10 - izolacja trzech akcji: link, products (drawer), lightbox.",
  variants: [
    {
      id: "link",
      label: "Link",
      description: "Cała karta linkuje do artykułu (/inspiracja-artykul).",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <InspirationGalleryCard
            title={inspirationsListingItems[0]?.title ?? "Inspiracja"}
            image={inspirationsListingItems[0]!.image}
            action="link"
            href="/inspiracja-artykul"
          />
        </div>
      ),
    },
    {
      id: "products",
      label: "Pokaż produkty",
      description: "Chip otwiera globalny drawer produktów aranżacji.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <InspirationGalleryCard
            title={arrangementsGalleryItems[0]?.title ?? "Aranżacja"}
            image={arrangementsGalleryItems[0]!.image}
            action="products"
            productCount={3}
            favoriteId={arrangementsGalleryItems[0]?.id}
          />
        </div>
      ),
    },
    {
      id: "lightbox",
      label: "Lightbox",
      description: "Powiększenie zdjęcia w lightboxie (sekcje karuzeli).",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <InspirationGalleryCard
            title={homeInspiration.arrangements[0]?.title ?? "Aranżacja"}
            image={homeInspiration.arrangements[0]!.image}
            action="lightbox"
            onLightboxOpen={() => undefined}
          />
        </div>
      ),
    },
  ],
};

export const category6InspirationModules: LibraryModule[] = [
  inspirationListingCatalogModule,
  inspirationArticleModule,
  inspirationGalleryCardModule,
];
