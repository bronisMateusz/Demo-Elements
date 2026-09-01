import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import {
  buildPdpSubnavItems,
  pdpSectionScrollMarginClassName,
} from "../constants/pdpSubnav";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { AskFab } from "../components/product/AskFab";
import { ProductSubnav } from "../components/product/ProductSubnav";
import { Section } from "../components/structural/Section";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { ProductArchitectCTA } from "../components/product/ProductArchitectCTA";
import { ProductDownloads } from "../components/product/ProductDownloads";
import { ProductEditorial } from "../components/product/ProductEditorial";
import { ProductHero } from "../components/product/ProductHero";
import { LocateCta } from "../components/marketing/LocateCta";
import { ProductInspiration } from "../components/product/ProductInspiration";
import { ProductPairWith } from "../components/product/ProductPairWith";
import { ProductRecommendations } from "../components/product/ProductRecommendations";
import { ProductSpecifications } from "../components/product/ProductSpecifications";
import { ProductVisualizationCTA } from "../components/product/ProductVisualizationCTA";
import { montebianco80 } from "../data/products/montebianco-80";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { recordRecentlyViewedProduct } from "../hooks/useRecentlyViewedProducts";
import { productToRelatedProduct } from "../lib/productToRelatedProduct";
import { cn } from "../lib/cn";
import { mdSectionBandPaddingClassName } from "../lib/layoutTokens";

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
  const [askOpen, setAskOpen] = useState(false);
  const breadcrumbItems = product.breadcrumbs;

  useEffect(() => {
    recordRecentlyViewedProduct(productToRelatedProduct(product));
  }, [product]);

  return (
    <>
      <Helmet>
        <title>{product.title} - Elements</title>
        <meta
          name="description"
          content={`${product.title}. Odkryj kolekcję Montebianco - klasyczna forma i współczesna funkcjonalność.`}
        />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={breadcrumbItems}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <ProductHero product={product} onAskOpen={() => setAskOpen(true)} />

        {product.galleryBanner ? (
          <LocateCta
            sectionMargin
            eyebrow={product.galleryBanner.eyebrow}
            title={product.galleryBanner.title}
            titleId="product-gallery-banner-title"
            description={product.galleryBanner.description}
            ctaHref={product.galleryBanner.href}
            ctaLabel={product.galleryBanner.label}
            image={product.galleryBanner.image}
          />
        ) : null}
        <ProductSubnav items={subnavItems} followsBlock />

        <PageSectionStack flushTop>
          <RevealSection>
            <Section id="pdp-seria" className={pdpSectionScrollMarginClassName}>
              <ProductPairWith
                title={product.seriesTitle}
                products={product.seriesProducts}
              />
            </Section>
          </RevealSection>

          <RevealSection>
            <Section id="pdp-opis" className={pdpSectionScrollMarginClassName}>
              <ProductEditorial
                eyebrow={product.editorial.eyebrow}
                title={product.editorial.title}
                lead={product.editorial.lead}
                paragraphs={product.editorial.paragraphs}
                features={product.editorial.features}
                expandOnSectionId="pdp-opis"
              />
            </Section>
          </RevealSection>

          <RevealSection>
            <Section
              id="pdp-specyfikacja"
              className={cn(
                pdpSectionScrollMarginClassName,
                mdSectionBandPaddingClassName,
                "bg-neutral-0 transition-colors duration-base ease-luxury",
                "data-[expanded=true]:bg-neutral-100",
                "md:bg-neutral-100",
              )}
            >
              <ProductSpecifications
                specs={product.specifications}
                expandOnSectionId="pdp-specyfikacja"
              />
            </Section>
          </RevealSection>

          <RevealSection>
            <Section id="pdp-pliki" className={pdpSectionScrollMarginClassName}>
              <ProductDownloads
                downloads={product.downloads}
                expandOnSectionId="pdp-pliki"
              />
            </Section>
          </RevealSection>

          <RevealSection>
            <ProductArchitectCTA {...product.architectCta} />
          </RevealSection>

          <RevealSection>
            <Section
              id="pdp-aranzacja"
              className={pdpSectionScrollMarginClassName}
            >
              <ProductInspiration arrangements={product.inspirations} />
            </Section>
          </RevealSection>

          <RevealSection>
            <ProductVisualizationCTA {...product.visualizationCta} />
          </RevealSection>

          <RevealSection>
            <Section
              id="pdp-podobne"
              className={pdpSectionScrollMarginClassName}
            >
              <ProductRecommendations
                similarProducts={product.similarProducts}
              />
            </Section>
          </RevealSection>
        </PageSectionStack>
      </PageShell>

      <AskFab
        sku={product.id}
        title={product.title}
        brand={product.brand}
        productSku={product.sku}
        price={product.price.current}
        image={product.images[0]}
        askLabel={product.cta.actionLabel}
        askOpen={askOpen}
        onAskOpenChange={setAskOpen}
      />
    </>
  );
}
