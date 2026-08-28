import { Helmet } from "react-helmet-async";
import { salonsPage } from "../data/salons";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { PageIntro } from "../components/marketing/PageIntro";
import { SalonsDirectory } from "../components/marketing/SalonsDirectory";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { cn } from "../lib/cn";

export function SalonsPage() {
  return (
    <>
      <Helmet>
        <title>{salonsPage.title} - Elements</title>
        <meta name="description" content={salonsPage.description} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...salonsPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack flushTop>
          {/* One stack child: intro + directory share rhythm (no section margin between). */}
          <div>
            <PageIntro
              title={salonsPage.title}
              description={salonsPage.description}
            >
              <ul
                className="mt-6 m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-3"
                aria-label="Dlaczego warto przyjść do salonu"
              >
                {salonsPage.usps.map((usp) => (
                  <li
                    key={usp.label}
                    className="flex h-full flex-col items-start gap-3 rounded-xs bg-gold-50 px-4 py-5 sm:px-5 sm:py-6"
                  >
                    <i
                      className={cn(
                        usp.iconClass,
                        "text-3xl leading-none text-neutral-900",
                      )}
                      aria-hidden="true"
                    />
                    <span className="font-body text-sm font-medium text-neutral-900 md:text-ui">
                      {usp.label}
                    </span>
                    <span className="font-body text-sm leading-snug text-neutral-600">
                      {usp.text}
                    </span>
                  </li>
                ))}
              </ul>
            </PageIntro>

            {/* No translate here: transform on an ancestor breaks position:sticky. */}
            <SalonsDirectory />
          </div>
        </PageSectionStack>
      </PageShell>
    </>
  );
}
