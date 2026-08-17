import { Helmet } from "react-helmet-async";
import { statusPages, type StatusPageId } from "../../data/statusPages";
import { PageShell } from "../layout/PageShell";
import { Container } from "../ui/Container";
import { EmptyState } from "../ui/EmptyState";

type StatusPageProps = {
  status: StatusPageId;
};

export function StatusPage({ status }: StatusPageProps) {
  const content = statusPages[status];
  const href = "actionHref" in content ? content.actionHref : undefined;

  return (
    <>
      <Helmet>
        <title>{content.code} - Elements</title>
      </Helmet>
      <PageShell>
        <Container size="content">
          <EmptyState
            layout="page"
            eyebrow={content.code}
            title={content.title}
            description={content.description}
            actions={[
              href
                ? { label: content.actionLabel, href }
                : {
                    label: content.actionLabel,
                    onClick: () => window.location.reload(),
                  },
            ]}
          />
        </Container>
      </PageShell>
    </>
  );
}
