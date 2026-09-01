import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { Container } from "../components/ui/Container";
import {
  ctaContextImageUsage,
  ctaShowcaseEntries,
  ctaShowcaseFamilies,
  type CtaShowcaseEntry,
  type CtaShowcaseFamily,
} from "../data/ctaShowcase";
import { ctaContextImages } from "../lib/ctaContextImages";
import { cn } from "../lib/cn";
import { libPreviewFullBleedWrapperClassName } from "../library/libStyles";

const familyAnchor = (family: CtaShowcaseFamily) =>
  `rodzina-${family.toLowerCase()}`;

function ShowcaseMeta({ entry }: { entry: CtaShowcaseEntry }) {
  return (
    <dl className="m-0 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
      <div className="grid gap-1">
        <dt className="font-medium text-neutral-800">Komponent</dt>
        <dd className="m-0">{entry.family}</dd>
      </div>
      <div className="grid gap-1">
        <dt className="font-medium text-neutral-800">Źródło danych</dt>
        <dd className="m-0 font-mono text-xs">{entry.dataSource}</dd>
      </div>
      <div className="grid gap-1 sm:col-span-2">
        <dt className="font-medium text-neutral-800">Obraz</dt>
        <dd className="m-0 font-mono text-xs break-all">{entry.imagePath}</dd>
      </div>
      <div className="grid gap-1 sm:col-span-2">
        <dt className="font-medium text-neutral-800">Strony</dt>
        <dd className="m-0 flex flex-wrap gap-x-3 gap-y-1">
          {entry.pages.map((page) => (
            <Link
              key={`${entry.id}-${page.href}`}
              to={page.href}
              className="text-neutral-800 underline-offset-2 hover:underline"
            >
              {page.label}
            </Link>
          ))}
        </dd>
      </div>
      {entry.notes ? (
        <div className="grid gap-1 sm:col-span-2">
          <dt className="font-medium text-neutral-800">Uwagi</dt>
          <dd className="m-0">{entry.notes}</dd>
        </div>
      ) : null}
    </dl>
  );
}

function ShowcaseEntryBlock({ entry }: { entry: CtaShowcaseEntry }) {
  return (
    <article
      id={entry.id}
      className="scroll-mt-24 border-b border-neutral-200 py-10 last:border-b-0"
    >
      <header className="mb-6 grid gap-4">
        <h3 className="m-0 font-heading text-h4 font-medium text-neutral-900">
          {entry.title}
        </h3>
        <ShowcaseMeta entry={entry} />
      </header>
      <div className={libPreviewFullBleedWrapperClassName}>
        {entry.render()}
      </div>
    </article>
  );
}

export function CtaShowcasePage() {
  const count = ctaShowcaseEntries.length;

  return (
    <>
      <Helmet>
        <title>Katalog banerów CTA - Elements</title>
        <meta
          name="description"
          content={`Podgląd ${count} wariantów banerów CTA używanych w demo Elements.`}
        />
      </Helmet>

      <PageShell>
        <Container className="py-10 md:py-14">
          <header className="mb-10 max-w-prose">
            <p className="m-0 mb-2 text-sm font-medium tracking-[0.12em] uppercase text-neutral-500">
              Narzędzia demo
            </p>
            <h1 className="m-0 mb-4 font-heading text-h2 font-medium text-neutral-900">
              Katalog banerów CTA
            </h1>
            <p className="m-0 text-lg leading-relaxed text-neutral-600">
              {count} produkcyjnych wariantów banerów pełnej szerokości z live
              podglądem, mapą stron i źródeł danych. Uzupełnia{" "}
              <Link
                to="/biblioteka/hero-i-cta"
                className="text-neutral-800 underline-offset-2 hover:underline"
              >
                /biblioteka/hero-i-cta
              </Link>
              , gdzie komponenty są pokazane w izolacji.
            </p>
          </header>

          <nav
            aria-label="Spis treści banerów CTA"
            className="mb-12 rounded-xs border border-neutral-200 bg-neutral-0 p-5 md:p-6"
          >
            <h2 className="m-0 mb-4 font-heading text-lg font-medium text-neutral-900">
              Spis treści
            </h2>
            <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {ctaShowcaseFamilies.map(({ family, label }) => {
                const entries = ctaShowcaseEntries.filter(
                  (entry) => entry.family === family,
                );
                return (
                  <li key={family}>
                    <a
                      href={`#${familyAnchor(family)}`}
                      className="font-medium text-neutral-900 no-underline hover:underline"
                    >
                      {label}
                    </a>
                    <span className="ms-1 text-sm text-neutral-500">
                      ({entries.length})
                    </span>
                    <ul className="mt-2 grid list-none gap-1 p-0 ps-0 text-sm">
                      {entries.map((entry) => (
                        <li key={entry.id}>
                          <a
                            href={`#${entry.id}`}
                            className="text-neutral-600 no-underline hover:text-neutral-900 hover:underline"
                          >
                            {entry.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>

          {ctaShowcaseFamilies.map(({ family, label }) => {
            const entries = ctaShowcaseEntries.filter(
              (entry) => entry.family === family,
            );
            return (
              <section
                key={family}
                id={familyAnchor(family)}
                className="scroll-mt-24 mb-4"
              >
                <h2 className="m-0 mb-6 border-b border-neutral-300 pb-3 font-heading text-xl font-medium text-neutral-900">
                  {label}
                </h2>
                {entries.map((entry) => (
                  <ShowcaseEntryBlock key={entry.id} entry={entry} />
                ))}
              </section>
            );
          })}

          <section
            id="cta-context-images"
            className="scroll-mt-24 mt-12 rounded-xs border border-neutral-200 bg-neutral-0 p-5 md:p-6"
          >
            <h2 className="m-0 mb-2 font-heading text-xl font-medium text-neutral-900">
              Klucze ctaContextImages
            </h2>
            <p className="m-0 mb-6 max-w-prose text-sm text-neutral-600">
              Wspólne presety zdjęć lifestyle w{" "}
              <code className="rounded-xs bg-neutral-100 px-1 py-0.5 font-mono text-xs">
                src/lib/ctaContextImages.ts
              </code>{" "}
              i przypisane warianty banerów.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-120 border-collapse text-start text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-800">
                    <th className="py-2 pe-4 font-medium">Klucz</th>
                    <th className="py-2 pe-4 font-medium">Asset</th>
                    <th className="py-2 font-medium">Warianty</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    Object.keys(ctaContextImages) as Array<
                      keyof typeof ctaContextImages
                    >
                  ).map((key) => (
                    <tr
                      key={key}
                      className={cn(
                        "border-b border-neutral-100 align-top last:border-b-0",
                      )}
                    >
                      <td className="py-3 pe-4 font-mono text-xs text-neutral-800">
                        {key}
                      </td>
                      <td className="py-3 pe-4 font-mono text-xs text-neutral-600">
                        assets/
                        {ctaContextImages[key].src.match(
                          /assets\/(.+)$/,
                        )?.[1] ?? "?"}
                      </td>
                      <td className="py-3 text-neutral-600">
                        {ctaContextImageUsage[key].length > 0 ? (
                          <ul className="m-0 grid list-disc gap-1 ps-4">
                            {ctaContextImageUsage[key].map((title) => (
                              <li key={title}>{title}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-neutral-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Container>
      </PageShell>
    </>
  );
}
