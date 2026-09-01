import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { pdpSectionScrollMarginClassName } from "../constants/pdpSubnav";
import { salonPage, salonSubnavItems } from "../data/salon";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { ProductSubnav } from "../components/product/ProductSubnav";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { FloatingAdvisorCta } from "../components/marketing/FloatingAdvisorCta";
import { SalonHero } from "../components/salon/SalonHero";
import { HomeBrands } from "../components/home/HomeBrands";
import { HomeMagazine } from "../components/home/HomeMagazine";
import {
  SalonAbout,
  SalonDesignStrip,
  SalonDownloads,
  SalonExpo,
  SalonInspiration,
  SalonNews,
  SalonStats,
  SalonUsps,
  SalonVisitCta,
} from "../components/salon/SalonSections";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";
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

export function SalonPage() {
  const [askOpen, setAskOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{salonPage.title} - Elements</title>
        <meta name="description" content={salonPage.metaDescription} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...salonPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <SalonHero />
        <ProductSubnav items={salonSubnavItems} />
        <PageSectionStack flushTop>
          <RevealSection>
            <SalonUsps />
          </RevealSection>
          <RevealSection className="relative z-20">
            <HomeMagazine />
          </RevealSection>
          <RevealSection className="relative z-10">
            <SalonAbout />
          </RevealSection>
          <RevealSection>
            <SalonDesignStrip />
          </RevealSection>
          <RevealSection>
            <SalonStats />
          </RevealSection>
          <RevealSection>
            <HomeBrands
              id="marki"
              title={salonPage.brands.title}
              description={salonPage.brands.description}
              showSeeAll={false}
              className={pdpSectionScrollMarginClassName}
            />
          </RevealSection>
          <RevealSection>
            <SalonExpo />
          </RevealSection>
          <RevealSection className={pdpSectionScrollMarginClassName}>
            <SalonNews />
          </RevealSection>
          <RevealSection>
            <SalonInspiration />
          </RevealSection>
          <RevealSection>
            <SalonVisitCta onAskOpen={() => setAskOpen(true)} />
          </RevealSection>
          <RevealSection>
            <SalonDownloads />
          </RevealSection>
        </PageSectionStack>
        <AdvisorAskDrawer
          open={askOpen}
          onClose={() => setAskOpen(false)}
          topicTitle="Salon Elements Bydgoszcz"
        />
      </PageShell>

      <FloatingAdvisorCta
        label="Napisz do doradcy"
        onClick={requestSalonDrawer}
      />
    </>
  );
}
