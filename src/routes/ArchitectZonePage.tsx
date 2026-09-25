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
import { ArchitectFaq } from "../components/marketing/ArchitectFaq";
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
import { IconTile } from "../components/ui/IconTile";
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

const showroomContent: AdvisorCtaContent = {
  eyebrow: page.showroom.eyebrow,
  title: page.showroom.title,
  description: page.showroom.description,
  image: page.showroom.image,
  askLabel: page.showroom.ctaLabel,
  bookLabel: page.showroom.ctaLabel,
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

function ArchitectSupportGrid() {
  return (
    <Section
      id={page.support.id}
      ariaLabelledby="architect-support-title"
      className={pdpSectionScrollMarginClassName}
    >
      <Container size="content">
        <div className={cn("max-w-3xl", sectionHeaderTrackGapClassName)}>
          <TextRevealLead
            id="architect-support-title"
            revealUnit="word"
            typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
            mutedClassName="text-neutral-900/20"
            fillClassName="text-neutral-900"
          >
            {page.support.title}
          </TextRevealLead>
        </div>
        <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {page.support.items.map((item) => (
            <li key={item.title} className="min-h-0">
              <IconTile
                iconClass={item.iconClass}
                label={item.title}
                text={item.text}
                href={"href" in item ? item.href : undefined}
                ctaLabel={"ctaLabel" in item ? item.ctaLabel : undefined}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function ArchitectExtraBenefits() {
  return (
    <Section
      id={page.extraBenefits.id}
      ariaLabelledby="architect-extra-benefits-title"
      className={pdpSectionScrollMarginClassName}
    >
      <Container size="content">
        <div className={cn("max-w-3xl", sectionHeaderTrackGapClassName)}>
          <TextRevealLead
            id="architect-extra-benefits-title"
            revealUnit="word"
            typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
            mutedClassName="text-neutral-900/20"
            fillClassName="text-neutral-900"
          >
            {page.extraBenefits.title}
          </TextRevealLead>
        </div>
        <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {page.extraBenefits.items.map((item) => (
            <li key={item.title} className="min-h-0">
              <IconTile
                iconClass={item.iconClass}
                label={item.title}
                text={item.text}
                href={item.href}
                ctaLabel={item.ctaLabel}
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
          onAsk={() => setAskOpen(true)}
          productsLabel={page.hero.productsLabel}
          productsHref={page.hero.productsHref}
          image={page.hero.image}
        />

        <ProductSubnav items={architectZoneSubnavItems} />

        <PageSectionStack flushTop>
          <RevealSection>
            <ArchitectSupportGrid />
          </RevealSection>

          <RevealSection className="relative z-30">
            <ArchitectGuardian />
          </RevealSection>

          <RevealSection>
            <ArchitectExtraBenefits />
          </RevealSection>

          <RevealSection className={pdpSectionScrollMarginClassName}>
            <CatalogDatabaseCta
              sectionId={page.materials.id}
              eyebrow={page.materials.eyebrow}
              title={page.materials.title}
              description={page.materials.description}
              ctaLabel={page.materials.ctaLabel}
              href={page.materials.href}
              note={page.materials.note}
              image={page.materials.image}
              embedded={false}
              titleId="architect-zone-downloads-cta-title"
              className={pdpSectionScrollMarginClassName}
            />
          </RevealSection>

          <RevealSection className="relative z-10">
            <AdvisorCta
              titleId="architect-showroom-cta-title"
              content={showroomContent}
              primaryAction="ask"
              showBook={false}
              onAskOpen={requestSalonDrawer}
              className={pdpSectionScrollMarginClassName}
            />
          </RevealSection>

          <RevealSection className={pdpSectionScrollMarginClassName}>
            <div id={page.blog.id}>
              <EditorialCarousel
                title={page.blog.title}
                lead={page.blog.lead}
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

          <RevealSection>
            <ArchitectFaq />
          </RevealSection>

          <RevealSection className="relative z-20">
            <AdvisorCta
              titleId="architect-advisor-cta-title"
              content={advisorContent}
              primaryAction="ask"
              showBook={false}
              onAskOpen={() => setAskOpen(true)}
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
        variant="architect"
      />
    </>
  );
}
