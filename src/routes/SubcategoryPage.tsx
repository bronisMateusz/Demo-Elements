import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
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
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { HomeAdvisorCta } from "../components/home/HomeAdvisorCta";
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
        <PageIntro
          title={subcategoryPage.title}
          description={subcategoryPage.description}
          className="pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14"
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

        <RevealSection className="pb-8 md:pb-10">
          <div id="inspiracje">
            <InspirationGallery
              arrangements={[...subcategoryPage.inspiration.arrangements]}
              title={subcategoryPage.inspiration.title}
              titleId="sub-insp-title"
            />
          </div>
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
          <HomeAdvisorCta
            titleId="subcategory-advisor-cta-title"
            onPrimaryClick={() => setAskOpen(true)}
          />
        </RevealSection>

        <RevealSection className="relative z-0">
          <SeoExpandable blocks={[...subcategorySeoBlocks]} />
        </RevealSection>

        <AdvisorAskDrawer
          open={askOpen}
          onClose={() => setAskOpen(false)}
          topicTitle="Umywalki"
        />
      </PageShell>
    </>
  );
}
