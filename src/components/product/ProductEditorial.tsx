import { Container } from "../ui/Container";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Breadcrumbs, type BreadcrumbItem } from "../orientation/Breadcrumbs";
import { SectionHeader } from "../structural/SectionHeader";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductFeature } from "../../types/product";

type ProductEditorialProps = {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  features: ProductFeature[];
  breadcrumbs?: BreadcrumbItem[];
};

function ProductFeatureItem({ feature }: { feature: ProductFeature }) {
  return (
    <li className="flex flex-col gap-4">
      {feature.image ? (
        <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
          <img
            src={feature.image.src}
            alt={feature.image.alt}
            className="size-full object-cover"
            style={{ objectPosition: productImageObjectPosition(feature.image) }}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <div>
        <h3 className="t-h4 mb-2">{feature.title}</h3>
        <p className="t-body">{feature.description}</p>
      </div>
    </li>
  );
}

export function ProductEditorial({
  eyebrow,
  title,
  lead,
  paragraphs,
  features,
  breadcrumbs,
}: ProductEditorialProps) {
  return (
    <section aria-labelledby="editorial-title">
      <Container>
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} variant="section" /> : null}

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--spacing-header-offset)+58px+1rem)] lg:self-start">
            <SectionHeader eyebrow={eyebrow} title={title} titleId="editorial-title" className="mb-8" />
            <div className="space-y-6">
              <TextRevealLead>{lead}</TextRevealLead>
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="t-body-lg max-w-prose">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <ul className="flex list-none flex-col gap-10 border-t border-neutral-200 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            {features.map((feature) => (
              <ProductFeatureItem key={feature.title} feature={feature} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
