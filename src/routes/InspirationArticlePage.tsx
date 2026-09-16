import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { inspirationArticlePage } from "../data/inspirationArticle";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { RealizationSubmitDrawer } from "../components/marketing/RealizationSubmitDrawer";
import {
  InspirationArticleContent,
  InspirationArticleHero,
} from "../components/inspiration/InspirationArticleContent";
import { InspirationArticleProductsBar } from "../components/inspiration/InspirationArticleProductsBar";
import { InspirationGallery } from "../components/inspiration/InspirationGallery";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { Section } from "../components/structural/Section";
import type { InspirationArrangement } from "../types/product";

export function InspirationArticlePage() {
  const page = inspirationArticlePage;
  const [askOpen, setAskOpen] = useState(false);
  const [realizationOpen, setRealizationOpen] = useState(false);

  const finalAdvisorContent: AdvisorCtaContent = {
    eyebrow: page.finalCta.eyebrow,
    title: page.finalCta.title,
    description: page.finalCta.description,
    askLabel: page.finalCta.askLabel,
    bookLabel: page.finalCta.bookLabel,
    secondary: page.finalCta.secondary
      ? {
          eyebrow: page.finalCta.secondary.eyebrow,
          title: page.finalCta.secondary.title,
          description: page.finalCta.secondary.description,
          ctaLabel: page.finalCta.secondary.ctaLabel,
          onCtaClick: () => setRealizationOpen(true),
        }
      : undefined,
  };

  const productsArrangement = useMemo<InspirationArrangement>(
    () => ({
      id: "inspiration-article-products",
      title: "Produkty z tej aranżacji",
      image: page.heroImage,
      items: [],
      products: [...page.products],
      showProducts: true,
    }),
    [page.heroImage, page.products],
  );

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
          <InspirationArticleContent
            sections={[...page.sections]}
            products={page.products}
          />

          <AdvisorCta
            titleId="inspiration-article-final-cta-title"
            content={finalAdvisorContent}
            onAskOpen={() => setAskOpen(true)}
            showBook={false}
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

      <InspirationArticleProductsBar
        arrangement={productsArrangement}
        products={page.products}
      />

      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle={page.title}
      />

      <RealizationSubmitDrawer
        open={realizationOpen}
        onClose={() => setRealizationOpen(false)}
      />
    </>
  );
}
