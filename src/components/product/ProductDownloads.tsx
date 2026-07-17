import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";
import type { ProductDownload } from "../../types/product";

type ProductDownloadsProps = {
  downloads: ProductDownload[];
};

export function ProductDownloads({ downloads }: ProductDownloadsProps) {
  return (
    <section aria-labelledby="downloads-title">
      <Container size="content">
        <SectionHeader title="Pliki do pobrania" titleId="downloads-title" align="center" />
        <div className="border-t border-neutral-200">
          <SharedLayoutBg
            className="grid w-full lg:grid-cols-2"
            pillClassName="rounded-xs bg-neutral-100"
          >
            {downloads.map((file) => (
              <a
                key={file.title}
                href={file.href}
                className="relative flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-5 no-underline lg:odd:border-r"
              >
                <div className="relative z-10 flex min-w-0 items-center gap-4">
                  <span className="font-body text-xs uppercase tracking-wide text-neutral-500">
                    {file.format}
                  </span>
                  <div className="min-w-0">
                    <p className="text-ui text-neutral-900">{file.title}</p>
                    <p className="text-sm text-neutral-500">{file.size}</p>
                  </div>
                </div>
                <span className="relative z-10 inline-flex shrink-0 items-center gap-2 text-ui text-neutral-600">
                  Pobierz
                  <i className="ph ph-download-simple" aria-hidden="true" />
                </span>
              </a>
            ))}
          </SharedLayoutBg>
        </div>
      </Container>
    </section>
  );
}
