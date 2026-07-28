import { Helmet } from "react-helmet-async";
import { PageShell } from "../components/layout/PageShell";
import { HomeAbout } from "../components/home/HomeAbout";
import { HomeAdvisorCta } from "../components/home/HomeAdvisorCta";
import { HomeAppointment } from "../components/home/HomeAppointment";
import { HomeBrands } from "../components/home/HomeBrands";
import { HomeCategories } from "../components/home/HomeCategories";
import { HomeHero } from "../components/home/HomeHero";
import { HomeInspiration } from "../components/home/HomeInspiration";
import { HomeMagazine } from "../components/home/HomeMagazine";
import { HomePartners } from "../components/home/HomePartners";
import { HomeProducts } from "../components/home/HomeProducts";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, className } = useRevealOnScroll();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function HomePage() {
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
        <RevealSection>
          <HomeAdvisorCta />
        </RevealSection>
        <RevealSection>
          <HomeAbout />
        </RevealSection>
      </PageShell>
    </>
  );
}
