import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { homeAdvisorCta } from "../data/home";
import { producerPage, producerPageProducts } from "../data/producers";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { BrandHero } from "../components/marketing/BrandHero";
import { BrandSeriesGrid } from "../components/marketing/BrandSeriesGrid";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { HomeMagazine } from "../components/home/HomeMagazine";
import { InspirationGallery } from "../components/inspiration/InspirationGallery";
import { ProductCarouselCard } from "../components/product/ProductCarouselCard";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";
import { cn } from "../lib/cn";

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
  bookLabel: producerPage.cta.bookLabel,
};

export function ProducerPage() {
  const [askOpen, setAskOpen] = useState(false);

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

        <RevealSection>
          <Container
            size="content"
            className="border-t border-neutral-200 py-[clamp(2.5rem,6vw,4rem)]"
          >
            <div className="max-w-190">
              {producerPage.about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-0 mb-5 font-body text-ui leading-relaxed text-neutral-600 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </RevealSection>

        <RevealSection>
          <BrandSeriesGrid
            title={producerPage.about.title}
            series={producerPage.series}
          />
        </RevealSection>

        <RevealSection>
          <section
            id="produkty"
            aria-labelledby="producer-products-title"
            className="border-t border-neutral-200 py-[clamp(2.5rem,6vw,4rem)]"
          >
            <Container size="content">
              <h2
                id="producer-products-title"
                className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
              >
                {producerPage.productsTitle}
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12">
                {producerPageProducts.map((product) => (
                  <ProductCarouselCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <Button
                  href={producerPage.productsMoreHref}
                  variant="secondary"
                  size="lg"
                >
                  {producerPage.productsMoreLabel}
                  <i className="ph ph-arrow-right" aria-hidden="true" />
                </Button>
              </div>
            </Container>
          </section>
        </RevealSection>

        <RevealSection>
          <HomeMagazine content={producerPage.magazine} />
        </RevealSection>

        <RevealSection className="border-t border-neutral-200 pb-[clamp(2rem,5vw,3rem)] md:pb-[clamp(2.5rem,6vw,4rem)]">
          <InspirationGallery
            arrangements={[...producerPage.arrangements]}
            title={producerPage.arrangementsTitle}
            navPlacement="header"
          />
        </RevealSection>

        <RevealSection>
          <AdvisorCta
            titleId="producer-advisor-title"
            content={advisorContent}
            onAskOpen={() => setAskOpen(true)}
            onBookOpen={requestSalonDrawer}
            primaryAction="ask"
          />
        </RevealSection>
      </PageShell>

      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle={`Vigour - ${producerPage.hero.askLabel}`}
      />
    </>
  );
}
