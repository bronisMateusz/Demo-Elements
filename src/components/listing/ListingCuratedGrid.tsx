import { cn } from "../../lib/cn";
import type { ListingCuratedTile } from "../../types/listing";
import { CategorySubTile } from "../marketing/CategorySubTile";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";

type ListingCuratedGridProps = {
  title: string;
  titleId?: string;
  description?: string;
  tiles: ListingCuratedTile[];
};

export function ListingCuratedGrid({
  title,
  titleId = "listing-curated-title",
  description,
  tiles,
}: ListingCuratedGridProps) {
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
            "m-0 grid list-none gap-4 p-0 sm:gap-5",
            "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
          )}
        >
          {tiles.map((tile) => (
            <li key={tile.label} className="min-w-0">
              <CategorySubTile
                label={tile.label}
                href={tile.href}
                image={tile.image}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
