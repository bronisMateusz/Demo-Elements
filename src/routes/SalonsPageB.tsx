import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { salonsPageB } from "../data/salons";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { FloatingAdvisorCta } from "../components/marketing/FloatingAdvisorCta";
import { PageIntro } from "../components/marketing/PageIntro";
import { SalonLocationChips } from "../components/marketing/SalonLocationChips";
import {
  SalonsTabsDirectory,
  type SalonsGroupBy,
} from "../components/marketing/SalonsTabsDirectory";
import { ProductArchitectCTA } from "../components/product/ProductArchitectCTA";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
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

/** Alternate salon listing - tabs by voivodeship / city (makieta salony-b). */
export function SalonsPageB() {
  const [askOpen, setAskOpen] = useState(false);
  const [groupBy, setGroupBy] = useState<SalonsGroupBy>("voivodeship");
  const { location, architectCta } = salonsPageB;

  return (
    <>
      <Helmet>
        <title>{salonsPageB.title} (B) - Elements</title>
        <meta name="description" content={salonsPageB.description} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...salonsPageB.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack>
          <PageIntro
            title={salonsPageB.title}
            className="pt-6 md:pt-8 lg:pt-10"
            actions={
              <SalonLocationChips
                className="shrink-0"
                mobileAs="chips"
                stretchOnMobile
                size="lg"
                ariaLabel={location.groupByAria}
                chips={[
                  { id: "voivodeship", label: location.groupByVoiv },
                  { id: "city", label: location.groupByCity },
                ]}
                activeId={groupBy}
                onSelect={(id) => setGroupBy(id as SalonsGroupBy)}
              />
            }
          />

          {/* No translate here: transform on an ancestor breaks position:sticky. */}
          <div>
            <SalonsTabsDirectory groupBy={groupBy} />
          </div>

          <RevealSection>
            <ProductArchitectCTA
              title={architectCta.title}
              description={architectCta.description}
              href={architectCta.href}
              label={architectCta.label}
              eyebrow={architectCta.eyebrow}
              image={architectCta.image}
              video={architectCta.video}
            />
          </RevealSection>
        </PageSectionStack>
      </PageShell>

      <FloatingAdvisorCta
        label={salonsPageB.advisor.askLabel}
        onClick={() => setAskOpen(true)}
      />

      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle="Salony Elements"
      />
    </>
  );
}
