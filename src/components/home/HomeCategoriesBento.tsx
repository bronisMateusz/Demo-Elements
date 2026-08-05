import { homeCategories } from "../../data/home";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";

function CategoryBentoTile({
  label,
  href,
  image,
  featured = false,
  className,
}: {
  label: string;
  href: string;
  image: ProductImage;
  featured?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group/bento relative flex h-full flex-col justify-end overflow-hidden rounded-xs no-underline",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
        className,
      )}
    >
      <img
        src={image.src}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-slow ease-out group-hover/bento:scale-[1.03]"
        style={{ objectPosition: productImageObjectPosition(image) }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <span
        className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/35 to-neutral-950/10"
        aria-hidden="true"
      />
      <span
        className={cn(
          "relative z-10 flex items-end justify-between gap-3 p-4 sm:p-5",
          featured && "md:p-6",
        )}
      >
        <span
          className={cn(
            "max-w-[90%] font-heading font-medium text-balance text-neutral-0",
            featured
              ? "text-h3 leading-[1.1] tracking-tight"
              : "text-base leading-snug md:text-lg",
          )}
        >
          {label}
        </span>
        <i
          className="ph ph-arrow-right mb-0.5 shrink-0 text-lg leading-none text-gold-400 transition-transform duration-base ease-out group-hover/bento:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

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
            <CategoryBentoTile
              label={featured.label}
              href={featured.href}
              image={featured.image}
              featured
              className="aspect-4/3 md:aspect-auto md:h-full md:min-h-0"
            />
          </li>
          {rest.map((item) => (
            <li key={item.label}>
              <CategoryBentoTile
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
