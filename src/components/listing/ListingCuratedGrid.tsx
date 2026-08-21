import { cn } from "../../lib/cn";
import type { ListingCuratedTile } from "../../types/listing";
import { ImageBentoTile } from "../marketing/ImageBentoTile";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";

type ListingCuratedGridProps = {
  title: string;
  titleId?: string;
  description?: string;
  tiles: ListingCuratedTile[];
};

/** Same mosaic / aspect ratios as SubcategoryBento and HomeCategoriesBento. */
export function ListingCuratedGrid({
  title,
  titleId = "listing-curated-title",
  description,
  tiles,
}: ListingCuratedGridProps) {
  const featured = tiles.find((tile) => tile.featured) ?? tiles[0];
  const rest = tiles.filter((tile) => tile !== featured);

  if (!featured) return null;

  return (
    <Section ariaLabelledby={titleId}>
      <Container size="content">
        <TextRevealLead
          id={titleId}
          revealUnit="word"
          className="mb-3 max-w-2xl md:mb-4"
          typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
          mutedClassName="text-neutral-900/20"
          fillClassName="text-neutral-900"
        >
          {title}
        </TextRevealLead>
        {description ? (
          <p className="mt-0 mb-8 max-w-2xl font-body text-ui leading-relaxed text-neutral-600 md:mb-10">
            {description}
          </p>
        ) : (
          <div className="mb-8 md:mb-10" />
        )}

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
          {rest.map((tile) => (
            <li key={tile.label}>
              <ImageBentoTile
                label={tile.label}
                href={tile.href}
                image={tile.image}
                className="aspect-4/3"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
