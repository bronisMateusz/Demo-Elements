import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  subcategoryAdvisorCta,
  subcategoryPage,
  subcategorySeoBlocks,
  subcategoryTypes,
} from "../data/subcategory";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { PageIntro } from "../components/marketing/PageIntro";
import { SubcategoryBento } from "../components/marketing/SubcategoryBento";
import { LocateCta } from "../components/marketing/LocateCta";
import { BlogArticleCarousel } from "../components/marketing/BlogArticleCarousel";
import { SeoExpandable } from "../components/marketing/SeoExpandable";
import { InspirationGallery } from "../components/inspiration/InspirationGallery";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { FloatingAdvisorCta } from "../components/marketing/FloatingAdvisorCta";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { Section } from "../components/structural/Section";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { cn } from "../lib/cn";

/** Subcategory-only advisor band (washbasins). */
const subcategoryAdvisorContent: AdvisorCtaContent = {
  eyebrow: subcategoryAdvisorCta.eyebrow,
  title: subcategoryAdvisorCta.title,
  description: subcategoryAdvisorCta.description,
  image: subcategoryAdvisorCta.image,
  bookLabel: subcategoryAdvisorCta.bookLabel,
  askLabel: subcategoryAdvisorCta.findSalonLabel,
  askHref: subcategoryAdvisorCta.findSalonHref,
};

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

export function SubcategoryPage() {
  const [askOpen, setAskOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{subcategoryPage.title} - Elements</title>
        <meta name="description" content={subcategoryPage.description} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...subcategoryPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack flushTop>
          <PageIntro
            title={subcategoryPage.title}
            description={subcategoryPage.description}
          />

          <RevealSection>
            <SubcategoryBento tiles={[...subcategoryTypes]} />
          </RevealSection>

          <RevealSection>
            <LocateCta
              slogan={subcategoryPage.locate.slogan}
              title={subcategoryPage.locate.title}
              description={subcategoryPage.locate.description}
              ctaLabel={subcategoryPage.locate.ctaLabel}
              image={subcategoryPage.locate.image}
            />
          </RevealSection>

          <RevealSection>
            <Section id="inspiracje" ariaLabelledby="sub-insp-title">
              <InspirationGallery
                arrangements={[...subcategoryPage.inspiration.arrangements]}
                title={subcategoryPage.inspiration.title}
                titleId="sub-insp-title"
              />
            </Section>
          </RevealSection>

          <RevealSection>
            <BlogArticleCarousel
              title={subcategoryPage.blog.title}
              articles={[...subcategoryPage.blog.articles]}
              seeAllLabel={subcategoryPage.blog.seeAllLabel}
              seeAllHref={subcategoryPage.blog.seeAllHref}
            />
          </RevealSection>

          <RevealSection className="relative z-20">
            <AdvisorCta
              titleId="subcategory-advisor-cta-title"
              content={subcategoryAdvisorContent}
              primaryAction="book"
              onBookOpen={requestSalonDrawer}
            />
          </RevealSection>

          <RevealSection className="relative z-0">
            <SeoExpandable blocks={[...subcategorySeoBlocks]} />
          </RevealSection>
        </PageSectionStack>
      </PageShell>

      <FloatingAdvisorCta
        label="Napisz do doradcy"
        onClick={() => setAskOpen(true)}
      />
      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle={subcategoryPage.title}
      />
    </>
  );
}
