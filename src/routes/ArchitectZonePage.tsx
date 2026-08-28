import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { pdpSectionScrollMarginClassName } from "../constants/pdpSubnav";
import {
  architectZonePage,
  architectZoneSubnavItems,
} from "../data/architectZone";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { ArchitectDownloads } from "../components/marketing/ArchitectDownloads";
import { ArchitectGuardian } from "../components/marketing/ArchitectGuardian";
import {
  AdvisorCta,
  type AdvisorCtaContent,
} from "../components/marketing/AdvisorCta";
import { AdvisorAskDrawer } from "../components/marketing/AdvisorAskDrawer";
import { BrandHero } from "../components/marketing/BrandHero";
import { BlogArticleCarousel } from "../components/marketing/BlogArticleCarousel";
import { FloatingAdvisorCta } from "../components/marketing/FloatingAdvisorCta";
import { InspirationGallery } from "../components/inspiration/InspirationGallery";
import { ProductSubnav } from "../components/product/ProductSubnav";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { PromoSplitCta } from "../components/structural/PromoSplitCta";
import { Section } from "../components/structural/Section";
import { TextRevealLead } from "../components/motion/TextRevealLead";
import { SiteNewsletter } from "../components/layout/SiteNewsletter";
import { Container } from "../components/ui/Container";
import { IconTile } from "../components/ui/IconTile";
import { architectDownloadGroups } from "../data/architectDownloads";
import { requestSalonDrawer } from "../hooks/useSelectedSalon";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { cn } from "../lib/cn";

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
  title,
  items,
  columnsClassName,
}: {
  id: string;
  titleId: string;
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
        <TextRevealLead
          id={titleId}
          revealUnit="word"
          className="mb-8 max-w-3xl md:mb-10"
          typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
          mutedClassName="text-neutral-900/20"
          fillClassName="text-neutral-900"
        >
          {title}
        </TextRevealLead>
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
          lead={page.hero.lead}
          askLabel={page.hero.askLabel}
          onAsk={() => setAskOpen(true)}
          productsLabel={page.hero.productsLabel}
          productsHref={page.hero.productsHref}
          image={page.hero.image}
        />

        <ProductSubnav items={architectZoneSubnavItems} />

        <PageSectionStack>
          <RevealSection>
            <ArchitectGuardian />
          </RevealSection>

          <RevealSection>
            <ArchitectIconGrid
              id={page.benefits.id}
              titleId="architect-benefits-title"
              title={page.benefits.title}
              items={page.benefits.items}
              columnsClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            />
          </RevealSection>

          <RevealSection>
            <PromoSplitCta
              titleId="architect-invite-title"
              variant="card"
              eyebrow={page.inviteSalon.eyebrow}
              title={page.inviteSalon.title}
              description={page.inviteSalon.description}
              items={page.inviteSalon.items}
              image={page.inviteSalon.image}
              video={page.inviteSalon.video}
            />
          </RevealSection>

          <RevealSection>
            <PromoSplitCta
              titleId="architect-loyalty-title"
              variant="card"
              mediaPosition="end"
              eyebrow={page.loyalty.eyebrow}
              title={page.loyalty.title}
              description={page.loyalty.description}
              image={page.loyalty.image}
              primary={{
                href: page.loyalty.ctaHref,
                label: page.loyalty.ctaLabel,
              }}
            />
          </RevealSection>

          <RevealSection className={pdpSectionScrollMarginClassName}>
            <Section
              id={page.inspiration.id}
              ariaLabelledby="architect-insp-title"
            >
              <InspirationGallery
                arrangements={[...page.inspiration.arrangements]}
                title={page.inspiration.title}
                description={page.inspiration.description}
                promo={page.inspiration.promo}
                titleId="architect-insp-title"
              />
            </Section>
          </RevealSection>

          <RevealSection>
            <ArchitectIconGrid
              id={page.process.id}
              titleId="architect-process-title"
              title={page.process.title}
              items={page.process.items}
              columnsClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            />
          </RevealSection>

          <RevealSection className={pdpSectionScrollMarginClassName}>
            <div id={page.downloads.id}>
              <ArchitectDownloads
                title={page.downloads.title}
                titleId="architect-downloads-title"
                description={page.downloads.description}
                catalogCta={page.downloads.catalogCta}
                groups={architectDownloadGroups}
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

          <RevealSection className={pdpSectionScrollMarginClassName}>
            <div id={page.blog.id}>
              <BlogArticleCarousel
                title={page.blog.title}
                articles={[...page.blog.articles]}
                seeAllLabel={page.blog.seeAllLabel}
                seeAllHref={page.blog.seeAllHref}
              />
            </div>
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
      />
    </>
  );
}
