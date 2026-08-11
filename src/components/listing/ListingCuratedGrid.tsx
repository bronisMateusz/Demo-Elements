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
            "m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5",
          )}
        >
          {tiles.map((tile) => (
            <li key={tile.label}>
              <ImageBentoTile
                label={tile.label}
                href={tile.href}
                image={tile.image}
                className="aspect-4/3 min-h-36"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
