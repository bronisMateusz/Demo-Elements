import { listingPage } from "../../data/listing";
import { salonsPage } from "../../data/salons";
import { statusPages } from "../../data/statusPages";
import { wishlistPage } from "../../data/wishlist";
import { EmptyState } from "../../components/ui/EmptyState";
import { Container } from "../../components/ui/Container";
import { libPreviewArticleClassName } from "../libStyles";
import type { LibraryModule, PropDoc } from "../types";

const emptyStateProps: PropDoc[] = [
  {
    name: "layout",
    type: '"page" | "section" | "panel"',
    defaultValue: '"section"',
    description:
      "page = status HTTP; section = pusta siatka; panel = karta z obrysem.",
  },
  { name: "eyebrow", type: "string", description: "Kod statusu, np. 404." },
  { name: "iconClass", type: "string", description: "Ikona Phosphor." },
  { name: "title", type: "string", required: true },
  { name: "description", type: "string" },
  { name: "actions", type: "EmptyStateAction[]" },
];

export const emptyStateModule: LibraryModule = {
  id: "2.10",
  slug: "empty-state",
  title: "EmptyState - widoki",
  description:
    "Puste stany z listingów i katalogów: PLP, schowek i salony. Komponent: EmptyState.",
  optionalProps: emptyStateProps,
  variants: [
    {
      id: "listing",
      label: "Listing - brak wyników",
      description: "Pusta siatka PLP po filtrach. Pełna strona: /listing.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <EmptyState
            layout="section"
            title={listingPage.empty.title}
            description={listingPage.empty.description}
            actions={[{ label: listingPage.empty.actionLabel }]}
          />
        </div>
      ),
    },
    {
      id: "wishlist",
      label: "Schowek - pusty",
      description: "Stan początkowy /schowek, gdy nie ma pozycji.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <EmptyState
            layout="panel"
            iconClass="ph ph-bookmark-simple"
            title={wishlistPage.empty.title}
            description={wishlistPage.empty.description}
            actions={[
              {
                label: wishlistPage.empty.primaryLabel,
                href: wishlistPage.empty.primaryHref,
              },
              {
                label: wishlistPage.empty.secondaryLabel,
                href: wishlistPage.empty.secondaryHref,
                variant: "secondary",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: "wishlist-products",
      label: "Schowek - brak produktów",
      description:
        "Widok Produkty na /schowek, gdy lista produktów jest pusta.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <EmptyState
            layout="panel"
            iconClass="ph ph-bookmark-simple"
            title={wishlistPage.emptyProducts.title}
            description={wishlistPage.emptyProducts.description}
            actions={[
              {
                label: wishlistPage.emptyProducts.actionLabel,
                href: wishlistPage.emptyProducts.actionHref,
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: "wishlist-arrangements",
      label: "Schowek - brak aranżacji",
      description:
        "Widok Aranżacje na /schowek, gdy lista aranżacji jest pusta.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <EmptyState
            layout="panel"
            iconClass="ph ph-images"
            title={wishlistPage.emptyArrangements.title}
            description={wishlistPage.emptyArrangements.description}
            actions={[
              {
                label: wishlistPage.emptyArrangements.actionLabel,
                href: wishlistPage.emptyArrangements.actionHref,
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: "salons",
      label: "Salony - brak wyników",
      description: "Puste wyszukiwanie w katalogu /salony.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <EmptyState
            layout="panel"
            iconClass="ph ph-map-pin"
            title={salonsPage.directory.emptyTitle}
            description={salonsPage.directory.emptyDescription}
            className="min-h-80"
            actions={[{ label: salonsPage.directory.clearSearchLabel }]}
          />
        </div>
      ),
    },
  ],
};

export const statusPagesModule: LibraryModule = {
  id: "2.11",
  slug: "status-pages",
  title: "Strony statusu",
  description:
    "404, 403 i przerwa techniczna - EmptyState layout page. Pełne strony: /404, /403, /przerwa.",
  optionalProps: emptyStateProps,
  variants: [
    {
      id: "not-found",
      label: "404",
      description: "Strona nie istnieje. Pełna strona: /404.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <Container size="content">
            <EmptyState
              layout="page"
              eyebrow={statusPages.notFound.code}
              title={statusPages.notFound.title}
              description={statusPages.notFound.description}
              actions={[
                {
                  label: statusPages.notFound.actionLabel,
                  href: statusPages.notFound.actionHref,
                },
              ]}
            />
          </Container>
        </div>
      ),
    },
    {
      id: "forbidden",
      label: "403",
      description: "Brak uprawnień. Pełna strona: /403.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <Container size="content">
            <EmptyState
              layout="page"
              eyebrow={statusPages.forbidden.code}
              title={statusPages.forbidden.title}
              description={statusPages.forbidden.description}
              actions={[
                {
                  label: statusPages.forbidden.actionLabel,
                  href: statusPages.forbidden.actionHref,
                },
              ]}
            />
          </Container>
        </div>
      ),
    },
    {
      id: "maintenance",
      label: "Przerwa techniczna",
      description: "Tryb maintenance. Pełna strona: /przerwa.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <Container size="content">
            <EmptyState
              layout="page"
              eyebrow={statusPages.maintenance.code}
              title={statusPages.maintenance.title}
              description={statusPages.maintenance.description}
              actions={[
                {
                  label: statusPages.maintenance.actionLabel,
                  href: "/",
                },
              ]}
            />
          </Container>
        </div>
      ),
    },
  ],
};
