import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageShell } from "../components/layout/PageShell";
import { HomeAbout } from "../components/home/HomeAbout";
import { HomeAdvisorCta } from "../components/home/HomeAdvisorCta";
import { HomeAppointment } from "../components/home/HomeAppointment";
import { HomeBrands } from "../components/home/HomeBrands";
import { HomeCategories } from "../components/home/HomeCategories";
import { HomeCategoriesBento } from "../components/home/HomeCategoriesBento";
import { HomeHero } from "../components/home/HomeHero";
import { HomeInspiration } from "../components/home/HomeInspiration";
import { HomeMagazine } from "../components/home/HomeMagazine";
import { HomePartners } from "../components/home/HomePartners";
import { HomeProducts } from "../components/home/HomeProducts";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { FloatingAdvisorCta } from "../components/marketing/FloatingAdvisorCta";
import { cn } from "../lib/cn";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

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

export function HomePage() {
  const [askOpen, setAskOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Elements — showroom łazienek i doradztwo</title>
        <meta
          name="description"
          content="Twoja wymarzona łazienka zaczyna się tutaj. Obejrzyj na żywo, dobierz z doradcą i zaplanuj wszystko w jednym miejscu."
        />
      </Helmet>

      <PageShell>
        <HomeHero />
        <RevealSection>
          <HomeCategories />
        </RevealSection>
        <RevealSection>
          <HomeCategoriesBento />
        </RevealSection>
        <RevealSection>
          <HomeProducts />
        </RevealSection>
        <RevealSection>
          <HomeBrands />
        </RevealSection>
        <RevealSection>
          <HomeAppointment />
        </RevealSection>
        <RevealSection>
          <HomeInspiration />
        </RevealSection>
        <RevealSection>
          <HomeMagazine />
        </RevealSection>
        <RevealSection>
          <HomePartners />
        </RevealSection>
        <RevealSection className="relative z-20">
          <HomeAdvisorCta onPrimaryClick={() => setAskOpen(true)} />
        </RevealSection>
        <RevealSection className="relative z-0">
          <HomeAbout />
        </RevealSection>
      </PageShell>

      <FloatingAdvisorCta
        label="Napisz do doradcy"
        onClick={() => setAskOpen(true)}
      />
      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle="Doradztwo Elements"
      />
    </>
  );
}
