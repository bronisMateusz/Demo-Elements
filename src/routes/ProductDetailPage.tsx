import { Helmet } from "react-helmet-async";
import { buildPdpSubnavItems, pdpSectionScrollMarginClassName } from "../constants/pdpSubnav";
import { PageShell } from "../components/layout/PageShell";
import { AskFab } from "../components/product/AskFab";
import { ProductSubnav } from "../components/product/ProductSubnav";
import { Section } from "../components/structural/Section";
import { ProductArchitectCTA } from "../components/product/ProductArchitectCTA";
import { ProductDownloads } from "../components/product/ProductDownloads";
import { ProductEditorial } from "../components/product/ProductEditorial";
import { ProductHero } from "../components/product/ProductHero";
import { ProductInspiration } from "../components/product/ProductInspiration";
import { ProductRecommendations } from "../components/product/ProductRecommendations";
import { ProductSpecifications } from "../components/product/ProductSpecifications";
import { ProductVisualizationCTA } from "../components/product/ProductVisualizationCTA";
import { montebianco80 } from "../data/products/montebianco-80";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, className } = useRevealOnScroll();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function ProductDetailPage() {
  const product = montebianco80;
  const subnavItems = buildPdpSubnavItems();

  return (
    <>
      <Helmet>
        <title>{product.title} — Elements</title>
        <meta
          name="description"
          content={`${product.title}. Odkryj kolekcję Montebianco — klasyczna forma i współczesna funkcjonalność.`}
        />
      </Helmet>

      <PageShell>
        <ProductHero product={product} />

        <ProductSubnav items={subnavItems} />

        <RevealSection>
          <Section id="pdp-opis" className={pdpSectionScrollMarginClassName}>
            <ProductEditorial
              breadcrumbs={product.breadcrumbs.map((item, index, arr) => ({
                ...item,
                current: index === arr.length - 1,
              }))}
              eyebrow={product.editorial.eyebrow}
              title={product.editorial.title}
              lead={product.editorial.lead}
              paragraphs={product.editorial.paragraphs}
              features={product.editorial.features}
            />
          </Section>
        </RevealSection>

        <RevealSection>
          <Section id="pdp-specyfikacja" tone="warm" className={pdpSectionScrollMarginClassName}>
            <ProductSpecifications specs={product.specifications} />
          </Section>
        </RevealSection>

        <RevealSection>
          <Section id="pdp-pliki" className={pdpSectionScrollMarginClassName}>
            <ProductDownloads downloads={product.downloads} />
          </Section>
        </RevealSection>

        <RevealSection>
          <Section tone="muted">
            <ProductArchitectCTA {...product.architectCta} />
          </Section>
        </RevealSection>

        <RevealSection>
          <Section id="pdp-aranzacja" className={pdpSectionScrollMarginClassName}>
            <ProductInspiration arrangements={product.inspirations} />
          </Section>
        </RevealSection>

        <RevealSection>
          <Section tone="warm">
            <ProductVisualizationCTA {...product.visualizationCta} />
          </Section>
        </RevealSection>

        <RevealSection>
          <Section id="pdp-podobne" className={pdpSectionScrollMarginClassName}>
            <ProductRecommendations products={product.similarProducts} />
          </Section>
        </RevealSection>
      </PageShell>

      <AskFab href={product.cta.href} label={product.cta.actionLabel} />
    </>
  );
}
