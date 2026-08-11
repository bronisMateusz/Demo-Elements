import { homeCategories } from "../../data/home";
import { cn } from "../../lib/cn";
import { ImageBentoTile } from "../marketing/ImageBentoTile";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";

/** Bento / mosaic variant of home categories (makieta #kategorie). */
export function HomeCategoriesBento() {
  const [featured, ...rest] = homeCategories.items;

  if (!featured) return null;

  return (
    <Section
      ariaLabelledby="home-categories-bento-title"
      tone="muted"
      id="kategorie-bento"
    >
      <Container size="content">
        <TextRevealLead
          id="home-categories-bento-title"
          revealUnit="word"
          className="mb-8 max-w-2xl md:mb-10"
          typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
          mutedClassName="text-neutral-900/20"
          fillClassName="text-neutral-900"
        >
          {homeCategories.title}
        </TextRevealLead>

        <ul
          className={cn(
            "m-0 grid list-none grid-cols-2 gap-2 p-0 sm:gap-3",
            "md:grid-cols-4 md:grid-rows-[repeat(3,minmax(0,auto))]",
          )}
        >
          <li className="col-span-2 row-span-2">
            <ImageBentoTile
              label={featured.label}
              href={featured.href}
              image={featured.image}
              featured
              className="aspect-4/3 md:aspect-auto md:h-full md:min-h-0"
            />
          </li>
          {rest.map((item) => (
            <li key={item.label}>
              <ImageBentoTile
                label={item.label}
                href={item.href}
                image={item.image}
                className="aspect-4/3"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
