import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { pdpSectionScrollMarginClassName } from "../constants/pdpSubnav";
import {
  architectZonePage,
  architectZoneSubnavItems,
} from "../data/architectZone";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { ArchitectGuardian } from "../components/marketing/ArchitectGuardian";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { BrandHero } from "../components/marketing/BrandHero";
import { CatalogDatabaseCta } from "../components/marketing/CatalogDatabaseCta";
import { EditorialCarousel } from "../components/marketing/EditorialCarousel";
import { FloatingAdvisorCta } from "../components/marketing/FloatingAdvisorCta";
import { ProductSubnav } from "../components/product/ProductSubnav";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { Section } from "../components/structural/Section";
import { TextRevealLead } from "../components/motion/TextRevealLead";
import { SiteNewsletter } from "../components/layout/SiteNewsletter";
import { Container } from "../components/ui/Container";
import { IconBentoGrid } from "../components/marketing/IconBentoGrid";
import { ProcessSteps } from "../components/marketing/ProcessSteps";
import { IconTile } from "../components/ui/IconTile";
import { Eyebrow } from "../components/ui/Eyebrow";
import { architectDownloadsPage } from "../data/architectDownloadsPage";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { cn } from "../lib/cn";
import { sectionHeaderTrackGapClassName } from "../lib/layoutTokens";

const page = architectZonePage;

const advisorContent: AdvisorCtaContent = {
  id: page.advisor.id,
  eyebrow: page.advisor.eyebrow,
  title: page.advisor.title,
  description: page.advisor.description,
  image: page.advisor.image,
  askLabel: page.advisor.askLabel,
  bookLabel: page.advisor.bookLabel,
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

function ArchitectIconGrid({
  id,
  titleId,
  eyebrow,
  title,
  items,
  columnsClassName,
}: {
  id?: string;
  titleId: string;
  eyebrow?: string;
  title: string;
  items: readonly {
    iconClass: string;
    title: string;
    text: string;
  }[];
  columnsClassName: string;
}) {
  return (
    <Section
      id={id}
      ariaLabelledby={titleId}
      className={pdpSectionScrollMarginClassName}
    >
      <Container size="content">
        <div
          className={cn(
            "flex max-w-3xl flex-col gap-3",
            sectionHeaderTrackGapClassName,
          )}
        >
          {eyebrow ? (
            <Eyebrow variant="muted" className="mb-0">
              {eyebrow}
            </Eyebrow>
          ) : null}
          <TextRevealLead
            id={titleId}
            revealUnit="word"
            typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
            mutedClassName="text-neutral-900/20"
            fillClassName="text-neutral-900"
          >
            {title}
          </TextRevealLead>
        </div>
        <ul className={cn("m-0 grid list-none gap-2 p-0", columnsClassName)}>
          {items.map((item) => (
            <li key={item.title} className="min-h-0">
              <IconTile
                iconClass={item.iconClass}
                label={item.title}
                text={item.text}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function ArchitectZonePage() {
  const [askOpen, setAskOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{page.title} - Elements</title>
        <meta name="description" content={page.metaDescription} />
      </Helmet>

      <PageShell
        showNewsletter={false}
        breadcrumbs={
          <Breadcrumbs
            items={[...page.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <BrandHero
          title={page.hero.title}
          eyebrow={page.hero.eyebrow}
          lead={page.hero.lead}
          askLabel={page.hero.askLabel}
          askHref={page.hero.askHref}
          productsLabel={page.hero.productsLabel}
          productsHref={page.hero.productsHref}
          gallery={page.hero.gallery}
        />

        <ProductSubnav items={architectZoneSubnavItems} />

        <PageSectionStack flushTop>
          <RevealSection>
            <IconBentoGrid
              id={page.benefits.id}
              titleId="architect-benefits-title"
              title={page.benefits.title}
              items={page.benefits.items}
            />
          </RevealSection>

          <RevealSection>
            <ArchitectIconGrid
              titleId="architect-extra-benefits-title"
              eyebrow={page.extraBenefits.eyebrow}
              title={page.extraBenefits.title}
              items={page.extraBenefits.items}
              columnsClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            />
          </RevealSection>

          <RevealSection>
            <ProcessSteps
              id={page.process.id}
              titleId="architect-process-title"
              eyebrow={page.process.eyebrow}
              title={page.process.title}
              items={page.process.items}
            />
          </RevealSection>

          <RevealSection>
            <ArchitectGuardian />
          </RevealSection>

          <RevealSection>
            <CatalogDatabaseCta
              {...architectDownloadsPage.downloads.catalogCta}
              embedded={false}
              titleId="architect-zone-downloads-cta-title"
              href="/pliki-do-pobrania"
            />
          </RevealSection>

          <RevealSection className={pdpSectionScrollMarginClassName}>
            <div id={page.blog.id}>
              <EditorialCarousel
                title={page.blog.title}
                items={[...page.blog.articles]}
                seeAll={{
                  label: page.blog.seeAllLabel,
                  href: page.blog.seeAllHref,
                }}
                a11yPrevLabel="Poprzednie artykuły"
                a11yNextLabel="Następne artykuły"
              />
            </div>
          </RevealSection>

          <RevealSection className={pdpSectionScrollMarginClassName}>
            <SiteNewsletter
              embedded
              eyebrow={page.newsletter.eyebrow}
              title={page.newsletter.title}
              description={page.newsletter.description}
              imageSrc={page.newsletter.image.src}
              imageAlt={page.newsletter.image.alt}
            />
          </RevealSection>

          <RevealSection className="relative z-20">
            <AdvisorCta
              titleId="architect-advisor-cta-title"
              content={advisorContent}
              primaryAction="ask"
              onAskOpen={() => setAskOpen(true)}
              onBookOpen={requestSalonDrawer}
              className={pdpSectionScrollMarginClassName}
            />
          </RevealSection>
        </PageSectionStack>
      </PageShell>

      <FloatingAdvisorCta
        label="Rozpocznij współpracę"
        onClick={() => setAskOpen(true)}
      />
      <AdvisorAskDrawer
        open={askOpen}
        onClose={() => setAskOpen(false)}
        topicTitle={page.title}
        title={page.advisor.askDrawerTitle}
        description={page.advisor.askDrawerDescription}
      />
    </>
  );
}
