import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  listingCuratedTiles,
  listingPage,
  listingSeoBlocks,
} from "../data/listing";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { PageIntro } from "../components/marketing/PageIntro";
import { LocateCta } from "../components/marketing/LocateCta";
import { SeoExpandable } from "../components/marketing/SeoExpandable";
import { InspirationGallery } from "../components/inspiration/InspirationGallery";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { HomeAdvisorCta } from "../components/home/HomeAdvisorCta";
import { ListingCatalog } from "../components/listing/ListingCatalog";
import { ListingCuratedGrid } from "../components/listing/ListingCuratedGrid";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { Section } from "../components/structural/Section";
import { Container } from "../components/ui/Container";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
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

export function ListingPage() {
  const [askOpen, setAskOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{listingPage.title} - listing produktów | Elements</title>
        <meta name="description" content={listingPage.description} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...listingPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack flushTop>
          <PageIntro
            title={listingPage.title}
            description={listingPage.description}
          />

          <section aria-label="Lista produktów">
            <Container size="content">
              <ListingCatalog />
            </Container>
          </section>

          <RevealSection>
            <LocateCta
              slogan={listingPage.locate.slogan}
              title={listingPage.locate.title}
              description={listingPage.locate.description}
              ctaLabel={listingPage.locate.ctaLabel}
              image={listingPage.locate.image}
            />
          </RevealSection>

          <RevealSection>
            <Section id="inspiracje" ariaLabelledby="listing-insp-title">
              <InspirationGallery
                arrangements={[...listingPage.inspiration.arrangements]}
                title={listingPage.inspiration.title}
                titleId="listing-insp-title"
              />
            </Section>
          </RevealSection>

          <RevealSection>
            <ListingCuratedGrid
              title={listingPage.curated.title}
              description={listingPage.curated.description}
              tiles={[...listingCuratedTiles]}
            />
          </RevealSection>

          <RevealSection className="relative z-20">
            <HomeAdvisorCta
              titleId="listing-advisor-cta-title"
              onPrimaryClick={() => setAskOpen(true)}
            />
          </RevealSection>

          <RevealSection className="relative z-0">
            <SeoExpandable blocks={[...listingSeoBlocks]} />
          </RevealSection>
        </PageSectionStack>

        <AdvisorAskDrawer
          open={askOpen}
          onClose={() => setAskOpen(false)}
          topicTitle={listingPage.title}
        />
      </PageShell>
    </>
  );
}
