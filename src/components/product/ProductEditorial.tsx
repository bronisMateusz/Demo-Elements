import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { ProductFeature } from "../../types/product";

type ProductEditorialProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  features: ProductFeature[];
};

export function ProductEditorial({ eyebrow, title, paragraphs, features }: ProductEditorialProps) {
  return (
    <section aria-labelledby="editorial-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <SectionHeader eyebrow={eyebrow} title={title} titleId="editorial-title" className="mb-8" />
            <div className="space-y-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="t-body-lg max-w-prose">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <ul className="flex list-none flex-col gap-8 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            {features.map((feature) => (
              <li key={feature.title}>
                <h3 className="t-h4 mb-2">{feature.title}</h3>
                <p className="t-body">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
