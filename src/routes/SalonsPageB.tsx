import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { homeAdvisorCta } from "../data/home";
import { salonsPageB } from "../data/salons";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { FloatingAdvisorCta } from "../components/marketing/FloatingAdvisorCta";
import { PageIntro } from "../components/marketing/PageIntro";
import { SalonsTabsDirectory } from "../components/marketing/SalonsTabsDirectory";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";
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

const advisorContent: AdvisorCtaContent = {
  eyebrow: salonsPageB.advisor.eyebrow,
  title: salonsPageB.advisor.title,
  description: salonsPageB.advisor.description,
  image: homeAdvisorCta.image,
  askLabel: salonsPageB.advisor.askLabel,
  bookLabel: salonsPageB.advisor.bookLabel,
};

/** Alternate salon listing - tabs by voivodeship / city (makieta salony-b). */
export function SalonsPageB() {
  const [askOpen, setAskOpen] = useState(false);

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
        <PageIntro
          title={salonsPageB.title}
          description={salonsPageB.description}
          className="pt-6 md:pt-8 lg:pt-10"
        >
          <ul
            className="mt-6 m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-3"
            aria-label="Dlaczego warto przyjść do salonu"
          >
            {salonsPageB.usps.map((usp) => (
              <li
                key={usp.label}
                className="flex h-full flex-col items-start gap-3 rounded-xs bg-gold-50 px-4 py-5 sm:px-5 sm:py-6"
              >
                <i
                  className={cn(
                    usp.iconClass,
                    "text-3xl leading-none text-neutral-900",
                  )}
                  aria-hidden="true"
                />
                <span className="font-body text-sm font-medium text-neutral-900 md:text-ui">
                  {usp.label}
                </span>
                <span className="font-body text-sm leading-snug text-neutral-600">
                  {usp.text}
                </span>
              </li>
            ))}
          </ul>
        </PageIntro>

        <RevealSection className="pb-[clamp(2.5rem,6vw,4rem)]">
          <SalonsTabsDirectory />
        </RevealSection>

        <RevealSection className="pb-[clamp(2.5rem,6vw,4rem)]">
          <AdvisorCta
            titleId="salons-b-advisor-title"
            content={advisorContent}
            onAskOpen={() => setAskOpen(true)}
            onBookOpen={requestSalonDrawer}
            primaryAction="ask"
          />
        </RevealSection>
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
