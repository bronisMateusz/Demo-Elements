import { Helmet } from "react-helmet-async";
import { homeAdvisorCta } from "../data/home";
import { producersPage } from "../data/producers";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { ProducersDirectory } from "../components/marketing/ProducersDirectory";
import { PageSectionStack } from "../components/structural/PageSectionStack";
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
  eyebrow: producersPage.cta.eyebrow,
  title: producersPage.cta.title,
  description: producersPage.cta.description,
  image: homeAdvisorCta.image,
  askLabel: producersPage.cta.askLabel,
  bookLabel: producersPage.cta.bookLabel,
  askHref: "/salony",
};

export function ProducersPage() {
  return (
    <>
      <Helmet>
        <title>{producersPage.title} - Elements</title>
        <meta
          name="description"
          content={producersPage.description.join(" ")}
        />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...producersPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack>
          {/* No translate here: transform on an ancestor breaks position:sticky. */}
          <div>
            <ProducersDirectory />
          </div>

          <RevealSection>
            <AdvisorCta
              titleId="producers-advisor-title"
              content={advisorContent}
              onBookOpen={requestSalonDrawer}
              primaryAction="book"
            />
          </RevealSection>
        </PageSectionStack>
      </PageShell>
    </>
  );
}
