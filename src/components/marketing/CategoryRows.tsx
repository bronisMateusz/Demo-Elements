import { Fragment } from "react";
import { Link } from "react-router-dom";
import type { CategoryRow } from "../../data/category";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Container } from "../ui/Container";
import { CategoryPromoBanner } from "./CategoryPromoBanner";
import { LocateCta } from "./LocateCta";

type LocateConfig = {
  slogan: readonly [string, string];
  title: string;
  description: string;
  ctaLabel: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  };
};

type CategoryRowsProps = {
  rows: CategoryRow[];
  locate?: LocateConfig;
};

function CategoryHeading({
  name,
  href,
  seeAllLabel,
}: {
  name: string;
  href: string;
  seeAllLabel: string;
}) {
  const linkClassName = cn(
    "group/heading inline-flex items-center gap-2 text-neutral-900 no-underline",
    "transition-colors duration-fast ease-out hover:text-gold-700",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
  );
  const content = (
    <>
      <span className="font-heading text-h3 leading-[1.15] font-medium tracking-tight">
        {name}
      </span>
      <i
        className={cn(
          "ph ph-arrow-right text-lg leading-none",
          "transition-transform duration-base ease-out group-hover/heading:translate-x-0.5",
        )}
        aria-hidden="true"
      />
    </>
  );

  return (
    <h2 className="m-0">
      {href.startsWith("/") && href !== "#" ? (
        <Link
          to={href}
          className={linkClassName}
          aria-label={`${name} - ${seeAllLabel}`}
        >
          {content}
        </Link>
      ) : (
        <a
          href={href}
          className={linkClassName}
          aria-label={`${name} - ${seeAllLabel}`}
        >
          {content}
        </a>
      )}
    </h2>
  );
}

function SubcatTile({ label, href, image }: CategoryRow["subs"][number]) {
  const fit = image.fit ?? "cover";
  const className = cn(
    "group/tile flex h-full flex-col gap-3 no-underline text-neutral-900",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
  );

  const body = (
    <>
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-xs border border-neutral-200 bg-neutral-50",
          "transition-[border-color,background-color] duration-base ease-out",
          "group-hover/tile:border-gold-500 group-hover/tile:bg-gold-50",
        )}
      >
        <img
          src={image.src}
          alt=""
          aria-hidden="true"
          className={cn(
            "size-full transition-transform duration-slow ease-luxury group-hover/tile:scale-105",
            fit === "contain" ? "object-contain p-4 md:p-5" : "object-cover",
          )}
          style={{ objectPosition: productImageObjectPosition(image) }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <span className="flex items-start justify-between gap-2 px-0.5">
        <span className="min-w-0 font-heading text-sm font-medium leading-snug text-balance md:text-ui">
          {label}
        </span>
        <i
          className={cn(
            "ph ph-arrow-right mt-0.5 shrink-0 text-sm leading-none text-gold-600",
            "transition-transform duration-fast ease-out group-hover/tile:translate-x-0.5",
          )}
          aria-hidden="true"
        />
      </span>
    </>
  );

  if (href.startsWith("/") && href !== "#") {
    return (
      <Link to={href} className={className} aria-label={label}>
        {body}
      </Link>
    );
  }
  return (
    <a href={href} className={className} aria-label={label}>
      {body}
    </a>
  );
}

export function CategoryRows({ rows, locate }: CategoryRowsProps) {
  return (
    <section id="kategorie" aria-label="Kategorie produktów">
      {rows.map((row, index) => (
        <Fragment key={row.name}>
          <Container size="content">
            <div
              className={cn(
                "border-b border-neutral-200 py-10 md:py-12",
                index === 0 && "pt-0 md:pt-0",
              )}
            >
              <CategoryHeading
                name={row.name}
                href={row.href}
                seeAllLabel={row.seeAllLabel}
              />

              <ul
                className={cn(
                  "mt-8 mb-0 list-none grid gap-4 p-0 sm:mt-10 sm:gap-5",
                  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
                )}
              >
                {row.subs.map((sub) => (
                  <li key={sub.label} className="min-w-0">
                    <SubcatTile {...sub} />
                  </li>
                ))}
              </ul>
            </div>
          </Container>

          {row.banner ? (
            <Container size="content">
              <div className="border-b border-neutral-200 py-[clamp(2rem,5vw,3rem)] md:py-[clamp(2.5rem,6vw,4rem)]">
                <CategoryPromoBanner
                  eyebrow={row.banner.eyebrow}
                  title={row.banner.title}
                  description={row.banner.description}
                  href={row.banner.href}
                  label={row.banner.label}
                  image={row.banner.image}
                />
              </div>
            </Container>
          ) : null}

          {row.locateAfter && locate ? (
            <LocateCta
              slogan={locate.slogan}
              title={locate.title}
              description={locate.description}
              ctaLabel={locate.ctaLabel}
              image={locate.image}
              className="border-b border-neutral-200"
            />
          ) : null}
        </Fragment>
      ))}
    </section>
  );
}
