import type { SubcategoryTypeTile } from "../../data/subcategory";
import { cn } from "../../lib/cn";
import { ImageBentoTile } from "./ImageBentoTile";
import { Container } from "../ui/Container";

type SubcategoryBentoProps = {
  tiles: SubcategoryTypeTile[];
};

/** Same mosaic / aspect ratios as HomeCategoriesBento. */
export function SubcategoryBento({ tiles }: SubcategoryBentoProps) {
  const featured = tiles.find((tile) => tile.featured) ?? tiles[0];
  const rest = tiles.filter((tile) => tile !== featured);

  if (!featured) return null;

  return (
    <section id="typy" aria-label="Typy produktów">
      <Container size="content">
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
    </section>
  );
}
