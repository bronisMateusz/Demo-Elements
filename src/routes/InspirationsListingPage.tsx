import { Helmet } from "react-helmet-async";
import {
  inspirationsListingItems,
  inspirationsListingPage,
} from "../data/inspirationsListing";
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

export function InspirationsListingPage() {
  return (
    <>
      <Helmet>
        <title>{inspirationsListingPage.title} | Elements</title>
        <meta
          name="description"
          content={inspirationsListingPage.description}
        />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...inspirationsListingPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack flushTop>
          <div className={pageHeaderClusterClassName}>
            <PageIntro
              title={inspirationsListingPage.title}
              description={inspirationsListingPage.description}
            />

            <section aria-label="Galeria inspiracji">
              <Container size="content">
                <InspirationListingCatalog
                  items={inspirationsListingItems}
                  filters={inspirationsListingPage.filters}
                  pageSize={inspirationsListingPage.pageSize}
                  itemLabel="inspiracji"
                  progressAriaLabel="Postęp przeglądania inspiracji"
                  navAriaLabel="Paginacja galerii inspiracji"
                  filterAriaLabel="Filtruj wg stylu"
                  filterMode="styleTags"
                  cardAction="link"
                  locateCta={inspirationsListingPage.gridLocateCta}
                  onLocateCtaClick={requestSalonDrawer}
                  emptyTitle="Brak inspiracji dla wybranego stylu"
                  emptyDescription="Wybierz inny styl lub pokaż wszystkie inspiracje."
                />
              </Container>
            </section>
          </div>

          <RevealSection className="relative z-20">
            <AdvisorCta
              titleId="inspirations-listing-footer-advisor-cta-title"
              content={inspirationsListingPage.footerAdvisorCta}
              onBookOpen={requestSalonDrawer}
              primaryAction="book"
            />
          </RevealSection>
        </PageSectionStack>
      </PageShell>
    </>
  );
}
