import { Helmet } from "react-helmet-async";
import {
  arrangementsGalleryItems,
  arrangementsGalleryPage,
} from "../data/arrangementsGallery";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { PageIntro } from "../components/marketing/PageIntro";
import { AdvisorCta } from "../components/marketing/AdvisorCta";
import { InspirationListingCatalog } from "../components/inspiration/InspirationListingCatalog";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { Container } from "../components/ui/Container";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";
import { cn } from "../lib/cn";
import { pageHeaderClusterClassName } from "../lib/layoutTokens";

function RevealSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, className: revealClassName } = useRevealOnScroll();
  return (
    <div ref={ref} className={cn(revealClassName, className)}>
      {children}
    </div>
  );
}

export function ArrangementsGalleryPage() {
  return (
    <>
      <Helmet>
        <title>{arrangementsGalleryPage.title} | Elements</title>
        <meta
          name="description"
          content={arrangementsGalleryPage.description}
        />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...arrangementsGalleryPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack flushTop>
          <div className={pageHeaderClusterClassName}>
            <PageIntro
              title={arrangementsGalleryPage.title}
              description={arrangementsGalleryPage.description}
            />

            <section aria-label="Galeria aranżacji">
              <Container size="content">
                <InspirationListingCatalog
                  items={arrangementsGalleryItems}
                  filters={arrangementsGalleryPage.filters}
                  pageSize={arrangementsGalleryPage.pageSize}
                  itemLabel="aranżacji"
                  progressAriaLabel="Postęp przeglądania aranżacji"
                  navAriaLabel="Paginacja galerii aranżacji"
                  filterAriaLabel="Filtruj wg producenta"
                  filterMode="producerTag"
                  cardAction="products"
                  showFavorite
                  promo={arrangementsGalleryPage.gridPromo}
                  emptyTitle="Brak aranżacji dla wybranego producenta"
                  emptyDescription="Wybierz innego producenta lub pokaż wszystkie aranżacje."
                />
              </Container>
            </section>
          </div>

          <RevealSection className="relative z-20">
            <AdvisorCta
              titleId="arrangements-gallery-footer-advisor-cta-title"
              content={arrangementsGalleryPage.footerAdvisorCta}
              onBookOpen={requestSalonDrawer}
              primaryAction="book"
            />
          </RevealSection>
        </PageSectionStack>
      </PageShell>
    </>
  );
}
