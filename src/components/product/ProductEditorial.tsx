import { BrandMotif } from "../brand/BrandMotif";
import { Container } from "../ui/Container";
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
    <li className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
      {feature.image ? (
        <div className="aspect-16/10 w-full shrink-0 overflow-hidden bg-neutral-100 sm:aspect-4/3 sm:w-36 md:w-40">
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
      <div className="min-w-0">
        <h3 className="mb-1 font-body text-base leading-snug font-medium text-neutral-900">
          {feature.title}
        </h3>
        <p className="t-small m-0 text-neutral-600">{feature.description}</p>
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
    <section
      aria-labelledby="editorial-title"
      className="relative overflow-visible"
    >
      <BrandMotif
        name="circle-beige"
        className="absolute -top-24 -inset-e-20 size-[min(70vw,28rem)] opacity-40 max-md:hidden"
      />
      <BrandMotif
        name="arc-light"
        className="absolute -bottom-8 -inset-s-16 size-[min(50vw,18rem)] opacity-50 max-md:hidden"
      />

      <Container size="content" className="relative z-10">
        {breadcrumbs ? (
          <div className="hidden lg:block">
            <Breadcrumbs items={breadcrumbs} variant="section" />
          </div>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-47.5 header-concealed:lg:top-36.5 lg:self-start">
            <SectionHeader eyebrow={eyebrow} title={title} titleId="editorial-title" className="mb-8" />
            <div className="space-y-6">
              <p className="mb-3 max-w-prose font-body text-lg leading-relaxed font-medium text-neutral-900 md:text-xl">
                {lead}
              </p>
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="t-body-lg max-w-prose">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <ul className="flex list-none flex-col gap-6 border-t border-neutral-200 pt-8 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-12">
            {features.map((feature) => (
              <ProductFeatureItem key={feature.title} feature={feature} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
