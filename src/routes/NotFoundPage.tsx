import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { buttonClassName } from "../components/ui/buttonClassName";
import { Container } from "../components/ui/Container";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Elements</title>
      </Helmet>
      <PageShell>
        <Container className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
          <p className="mb-4 font-body text-xs uppercase tracking-wide text-neutral-500">404</p>
          <h1 className="t-h1 mb-4">Strona nie została znaleziona</h1>
          <p className="t-body mb-8 max-w-md">
            Szukana strona nie istnieje lub została przeniesiona.
          </p>
          <Link to="/" className={buttonClassName({ variant: "primary" })}>
            Wróć do produktu
          </Link>
        </Container>
      </PageShell>
    </>
  );
}
