import { Helmet } from "react-helmet-async";
import { architectDownloadsPage } from "../data/architectDownloadsPage";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { ArchitectDownloads } from "../components/marketing/ArchitectDownloads";
import { PageIntro } from "../components/marketing/PageIntro";
import { PageSectionStack } from "../components/structural/PageSectionStack";

const page = architectDownloadsPage;

export function ArchitectDownloadsPage() {
  return (
    <>
      <Helmet>
        <title>{page.title} - Elements</title>
        <meta name="description" content={page.metaDescription} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...page.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageSectionStack flushTop>
          <PageIntro
            title={page.downloads.title}
            titleId="architect-downloads-title"
            description={page.downloads.description}
          />
          <ArchitectDownloads
            titleId="architect-downloads-title"
            groups={page.downloads.groups}
          />
        </PageSectionStack>
      </PageShell>
    </>
  );
}
