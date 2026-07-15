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
        <ul className="flex list-none flex-col divide-y divide-neutral-200 border-y border-neutral-200">
          {downloads.map((file) => (
            <li key={file.title}>
              <a
                href={file.href}
                className="flex items-center justify-between gap-4 py-5 no-underline transition-colors hover:bg-neutral-50"
              >
                <div className="flex items-center gap-4">
                  <span className="font-body text-xs uppercase tracking-wide text-neutral-500">
                    {file.format}
                  </span>
                  <div>
                    <p className="text-ui text-neutral-900">{file.title}</p>
                    <p className="text-sm text-neutral-500">{file.size}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-ui text-neutral-600">
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
