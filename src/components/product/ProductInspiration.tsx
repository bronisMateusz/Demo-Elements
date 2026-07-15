import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { InspirationArrangement } from "../../types/product";

type ProductInspirationProps = {
  arrangements: InspirationArrangement[];
};

export function ProductInspiration({ arrangements }: ProductInspirationProps) {
  return (
    <section aria-labelledby="inspiration-title">
      <Container>
        <SectionHeader
          eyebrow="Produkt w aranżacji"
          title="Inspiracje producenta"
          titleId="inspiration-title"
        />
        <div className="grid gap-10 md:grid-cols-3">
          {arrangements.map((arrangement) => (
            <article key={arrangement.id} className="flex flex-col">
              <div className="mb-6 aspect-[4/5] overflow-hidden bg-neutral-50">
                <img
                  src={arrangement.image.src}
                  alt={arrangement.image.alt || arrangement.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="t-h4 mb-4">{arrangement.title}</h3>
              <ul className="flex list-none flex-col gap-2">
                {arrangement.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-neutral-600 before:content-['·']">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
