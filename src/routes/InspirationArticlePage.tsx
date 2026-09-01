import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { inspirationArticlePage } from "../data/inspirationArticle";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import {
  InspirationArticleContent,
  InspirationArticleHero,
} from "../components/inspiration/InspirationArticleContent";
import { InspirationGallery } from "../components/inspiration/InspirationGallery";
import { ProductBleedCarouselSection } from "../components/product/ProductBleedCarouselSection";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { Section } from "../components/structural/Section";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";

export function InspirationArticlePage() {
  const page = inspirationArticlePage;
  const [askOpen, setAskOpen] = useState(false);

  const finalAdvisorContent: AdvisorCtaContent = {
    eyebrow: page.finalCta.eyebrow,
    title: page.finalCta.title,
    description: page.finalCta.description,
    image: page.finalCta.image,
    askLabel: page.finalCta.askLabel,
    bookLabel: page.finalCta.bookLabel,
  };

  return (
    <>
      <Helmet>
        <title>{page.title} | Elements</title>
        <meta name="description" content={page.metaDescription} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...page.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <InspirationArticleHero
          title={page.title}
          lead={page.lead}
          projectCredit={page.projectCredit}
          styleTags={[...page.styleTags]}
          heroImage={page.heroImage}
        />

        <PageSectionStack>
          <ProductBleedCarouselSection
            title="Produkty z tej aranżacji"
            titleId="inspiration-article-products-title"
            products={[...page.products]}
          />

          <InspirationArticleContent
            sections={[...page.sections]}
            embeds={[...page.embeds]}
            appointmentCta={page.appointmentCta}
            magazine={page.magazine}
            onAppointmentClick={requestSalonDrawer}
          />

          <AdvisorCta
            titleId="inspiration-article-final-cta-title"
            content={finalAdvisorContent}
            onAskOpen={() => setAskOpen(true)}
            onBookOpen={requestSalonDrawer}
          />

          <Section ariaLabelledby="inspiration-article-related-title">
            <InspirationGallery
              arrangements={[...page.relatedArrangements]}
              title={page.relatedTitle}
              titleId="inspiration-article-related-title"
              navPlacement="footer"
              seeMoreHref="/inspiracje-listing"
              seeMoreLabel="Zobacz wszystkie inspiracje"
              endCap={{
                title: "Pełna galeria inspiracji",
                description:
                  "Przeglądaj metamorfozy łazienek i projekty architektów współpracujących z Elements.",
                label: "Kliknij poniżej",
              }}
            />
          </Section>
        </PageSectionStack>
      </PageShell>

      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle={page.title}
      />
    </>
  );
}
