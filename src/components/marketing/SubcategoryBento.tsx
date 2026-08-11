import type { SubcategoryTypeTile } from "../../data/subcategory";
import { cn } from "../../lib/cn";
import { ImageBentoTile } from "./ImageBentoTile";
import { Container } from "../ui/Container";

type SubcategoryBentoProps = {
  tiles: SubcategoryTypeTile[];
};

export function SubcategoryBento({ tiles }: SubcategoryBentoProps) {
  return (
    <section id="typy" aria-label="Typy produktów">
      <Container size="content">
        <ul
          className={cn(
            "m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {tiles.map((tile) => (
            <li
              key={tile.label}
              className={cn(tile.featured && "sm:col-span-2 lg:row-span-2")}
            >
              <ImageBentoTile
                label={tile.label}
                href={tile.href}
                image={tile.image}
                featured={tile.featured}
                className={cn(
                  "min-h-44 bg-neutral-100",
                  tile.featured && "min-h-72 lg:min-h-full",
                )}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
