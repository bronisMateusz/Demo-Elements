import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { libPreviewFullBleedWrapperClassName } from "../libStyles";
import type { LibraryModule } from "../types";

export const headerModule: LibraryModule = {
  id: "1.1",
  slug: "header",
  title: "Header",
  description: "Główny nagłówek marki Elements — logo, menu, selektor salonu, schowek i menu mobilne.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Sticky header: logo, linki, Wybierz salon, szukaj i schowek z badge.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName} data-lib-full-bleed>
          <Header />
          <div className="grid min-h-32 place-items-center border-b border-dashed border-neutral-200 bg-neutral-50 text-sm text-neutral-500">
            Treść strony
          </div>
        </div>
      ),
    },
  ],
};

export const footerModule: LibraryModule = {
  id: "1.2",
  slug: "footer",
  title: "Footer",
  description: "Stopka z newsletterem, kolumnami linków i sekcją legal.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Pełna stopka marki Elements.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName} data-lib-full-bleed>
          <Footer />
        </div>
      ),
    },
  ],
};

export const category1Modules: LibraryModule[] = [headerModule, footerModule];
