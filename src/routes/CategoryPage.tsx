import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  categoryPage,
  categoryRows,
  categorySeoBlocks,
} from "../data/category";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { PageIntro } from "../components/marketing/PageIntro";
import { CategoryRows } from "../components/marketing/CategoryRows";
import { SeoExpandable } from "../components/marketing/SeoExpandable";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { FloatingAdvisorCta } from "../components/marketing/FloatingAdvisorCta";
import { HomeAdvisorCta } from "../components/home/HomeAdvisorCta";
import { PageSectionStack } from "../components/structural/PageSectionStack";
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

export function CategoryPage() {
  const [askOpen, setAskOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{categoryPage.title} - Elements</title>
        <meta name="description" content={categoryPage.description} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...categoryPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack flushTop>
          <PageIntro
            title={categoryPage.title}
            description={categoryPage.description}
          />

          <RevealSection>
            <CategoryRows
              rows={categoryRows}
              locate={{
                slogan: categoryPage.locate.slogan,
                title: categoryPage.locate.title,
                description: categoryPage.locate.description,
                ctaLabel: categoryPage.locate.ctaLabel,
                image: categoryPage.locate.image,
              }}
            />
          </RevealSection>

          <RevealSection className="relative z-20">
            <HomeAdvisorCta
              titleId="category-advisor-cta-title"
              onPrimaryClick={() => setAskOpen(true)}
            />
          </RevealSection>

          <RevealSection className="relative z-0">
            <SeoExpandable blocks={[...categorySeoBlocks]} />
          </RevealSection>
        </PageSectionStack>

        <AdvisorAskDrawer
          open={askOpen}
          onClose={() => setAskOpen(false)}
          topicTitle="Wyposażenie łazienki"
        />
      </PageShell>

      <FloatingAdvisorCta
        label="Napisz do doradcy"
        onClick={() => setAskOpen(true)}
      />
    </>
  );
}
