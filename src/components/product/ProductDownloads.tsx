import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import type { ProductDownload } from "../../types/product";

type ProductDownloadsProps = {
  downloads: ProductDownload[];
};

export function ProductDownloads({ downloads }: ProductDownloadsProps) {
  return (
    <section aria-labelledby="downloads-title">
      <Container>
        <SectionHeader title="Pliki do pobrania" titleId="downloads-title" />
        <ul className="flex list-none flex-col divide-y divide-border border-y border-border">
          {downloads.map((file) => (
            <li key={file.title}>
              <a
                href={file.href}
                className="flex items-center justify-between gap-4 py-5 no-underline transition-colors hover:bg-bg-muted"
              >
                <div className="flex items-center gap-4">
                  <span className="font-body text-eyebrow uppercase tracking-wide text-text-muted">
                    {file.format}
                  </span>
                  <div>
                    <p className="text-ui text-text">{file.title}</p>
                    <p className="text-small text-text-muted">{file.size}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-ui text-text-body">
                  Pobierz
                  <i className="ph ph-download-simple" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
