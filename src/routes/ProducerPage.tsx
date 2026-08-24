import { Helmet } from "react-helmet-async";
import { useMemo, useRef, useState } from "react";
import { homeAdvisorCta } from "../data/home";
import { producerPage, producerPageProducts } from "../data/producers";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { BrandHero } from "../components/marketing/BrandHero";
import { BrandAbout } from "../components/marketing/BrandAbout";
import { BrandSeriesGrid } from "../components/marketing/BrandSeriesGrid";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { HomeMagazine } from "../components/home/HomeMagazine";
import { InspirationGallery } from "../components/inspiration/InspirationGallery";
import { ListingPagination } from "../components/listing/ListingPagination";
import { ProductCarouselCard } from "../components/product/ProductCarouselCard";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { Container } from "../components/ui/Container";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";
import { cn } from "../lib/cn";
import { sectionPaddingClassName } from "../lib/layoutTokens";
import { Section } from "../components/structural/Section";

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

const advisorContent: AdvisorCtaContent = {
  eyebrow: producerPage.cta.eyebrow,
  title: producerPage.cta.title,
  description: producerPage.cta.description,
  image: homeAdvisorCta.image,
  askLabel: producerPage.cta.askLabel,
  askHref: producerPage.cta.askHref,
  bookLabel: producerPage.cta.bookLabel,
};

const PRODUCER_PRODUCTS_PAGE_SIZE = 12;

export function ProducerPage() {
  const [askOpen, setAskOpen] = useState(false);
  const [page, setPage] = useState(1);
  const productsRef = useRef<HTMLElement>(null);

  const totalCount = producerPageProducts.length;
  const pageCount = Math.max(
    1,
    Math.ceil(totalCount / PRODUCER_PRODUCTS_PAGE_SIZE),
  );
  const safePage = Math.min(page, pageCount);
  const shownCount = Math.min(
    safePage * PRODUCER_PRODUCTS_PAGE_SIZE,
    totalCount,
  );
  const pageProducts = useMemo(() => {
    const start = (safePage - 1) * PRODUCER_PRODUCTS_PAGE_SIZE;
    return producerPageProducts.slice(
      start,
      start + PRODUCER_PRODUCTS_PAGE_SIZE,
    );
  }, [safePage]);

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), pageCount);
    setPage(clamped);
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Helmet>
        <title>{producerPage.title} - producent - Elements</title>
        <meta name="description" content={producerPage.metaDescription} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...producerPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <BrandHero
          title={producerPage.hero.title}
          lead={producerPage.hero.lead}
          askLabel={producerPage.hero.askLabel}
          onAsk={() => setAskOpen(true)}
          productsLabel={producerPage.hero.productsLabel}
          productsHref={producerPage.hero.productsHref}
          image={producerPage.hero.image}
          logoSrc={producerPage.hero.logoSrc}
        />

        <PageSectionStack>
          <RevealSection>
            <BrandSeriesGrid
              title={producerPage.seriesTitle}
              series={producerPage.series}
            />
          </RevealSection>

          <RevealSection>
            <BrandAbout paragraphs={producerPage.about.paragraphs} />
          </RevealSection>

          <RevealSection>
            <section
              ref={productsRef}
              id="produkty"
              aria-labelledby="producer-products-title"
              className={sectionPaddingClassName}
            >
              <Container size="content">
                <h2
                  id="producer-products-title"
                  className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
                >
                  {producerPage.productsTitle}
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12">
                  {pageProducts.map((product) => (
                    <ProductCarouselCard key={product.id} product={product} />
                  ))}
                </div>
                <ListingPagination
                  shownCount={shownCount}
                  totalCount={totalCount}
                  page={safePage}
                  pageCount={pageCount}
                  onShowMore={() => goToPage(safePage + 1)}
                  onPageChange={goToPage}
                />
              </Container>
            </section>
          </RevealSection>

          <RevealSection>
            <HomeMagazine content={producerPage.magazine} />
          </RevealSection>

          <RevealSection>
            <Section
              ariaLabelledby="producer-insp-title"
              id="inspiracje"
            >
              <InspirationGallery
                arrangements={[...producerPage.arrangements]}
                title={producerPage.arrangementsTitle}
                titleId="producer-insp-title"
                navPlacement="footer"
                seeMoreHref="#inspiracje"
                seeMoreLabel="Zobacz więcej aranżacji"
                endCap={{
                  label: "Kliknij poniżej",
                  title: "Pełna galeria aranżacji",
                  description:
                    "Zobacz więcej inspiracji i dobierz produkty Vigour do swojej łazienki.",
                }}
              />
            </Section>
          </RevealSection>

          <RevealSection>
            <AdvisorCta
              titleId="producer-advisor-title"
              content={advisorContent}
              onBookOpen={requestSalonDrawer}
              primaryAction="book"
            />
          </RevealSection>
        </PageSectionStack>
      </PageShell>

      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle={`Vigour - ${producerPage.hero.askLabel}`}
      />
    </>
  );
}
