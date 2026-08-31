import { Fragment } from "react";
import { Link } from "react-router-dom";
import type { CategoryRow } from "../../data/category";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";
import { CategoryPromoBanner } from "./CategoryPromoBanner";
import { CategorySubTile } from "./CategorySubTile";
import { LocateCta } from "./LocateCta";

type LocateConfig = {
  title: string;
  description: string;
  ctaLabel: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  };
  /** @deprecated Unused by LocateCta. */
  slogan?: readonly [string, string];
};

type CategoryRowsProps = {
  rows: CategoryRow[];
  locate?: LocateConfig;
};

function categoryRowBlockClassName(followedByMoreInSection: boolean) {
  return cn(
    "border-b border-neutral-200 pb-12",
    followedByMoreInSection && "mb-12",
  );
}

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
    "group/heading flex w-full items-center justify-between gap-3 text-neutral-900 no-underline",
    "sm:inline-flex sm:w-auto sm:justify-start sm:gap-2",
    "transition-colors duration-fast ease-out hover:text-gold-500",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
  );
  const content = (
    <>
      <span className="font-heading text-h3 leading-[1.15] font-medium tracking-tight">
        {name}
      </span>
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5",
          "transition-transform duration-base ease-out group-hover/heading:translate-x-0.5",
        )}
      >
        <span className="font-body text-xs font-medium uppercase tracking-[0.12em] max-sm:inline hidden">
          Więcej
        </span>
        <i
          className="ph ph-arrow-right text-lg leading-none"
          aria-hidden="true"
        />
      </span>
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

export function CategoryRows({ rows, locate }: CategoryRowsProps) {
  const lastRowIndex = rows.length - 1;

  return (
    <section id="kategorie" aria-label="Kategorie produktów">
      {rows.map((row, rowIndex) => {
        const hasMoreRows = rowIndex < lastRowIndex;

        return (
          <Fragment key={row.name}>
            <Container size="content">
              <div
                className={categoryRowBlockClassName(
                  Boolean(row.banner || row.locateAfter || hasMoreRows),
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
                      <CategorySubTile {...sub} />
                    </li>
                  ))}
                </ul>
              </div>
            </Container>

            {row.banner ? (
              <Container size="content">
                <div
                  className={categoryRowBlockClassName(
                    Boolean(row.locateAfter || hasMoreRows),
                  )}
                >
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
                title={locate.title}
                description={locate.description}
                ctaLabel={locate.ctaLabel}
                image={locate.image}
                className={categoryRowBlockClassName(hasMoreRows)}
              />
            ) : null}
          </Fragment>
        );
      })}
    </section>
  );
}
