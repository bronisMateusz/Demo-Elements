import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { AskDrawerDemo, SalonDrawerDemo } from "../demos/DrawerSystemDemo";
import { libPreviewFullBleedWrapperClassName } from "../libStyles";
import type { LibraryModule } from "../types";

export const headerModule: LibraryModule = {
  id: "1.1",
  slug: "header",
  title: "Header",
  description:
    "Shell nagłówka: utility bar (desktop), logo, menu z mega-menu Produktów, selektor salonu (SalonDrawer), schowek i menu mobilne. Sticky z conceal/reveal przy scrollu.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description:
        "Pełny chrome - utility, nav, Wybierz salon / Zmień salon, szukaj i schowek z badge.",
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
  description:
    "Stopka: obecność salonów (statystyki + miasta), kolumny linków, wordmark ELEMENTS ze spotlightem i sekcja legal. Newsletter jest osobnym SiteNewsletter w PageShell.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Pełna stopka marki Elements - salony, kolumny, wordmark, social.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName} data-lib-full-bleed>
          <Footer />
        </div>
      ),
    },
  ],
};

export const drawersModule: LibraryModule = {
  id: "1.3",
  slug: "drawers",
  title: "Drawers",
  description:
    "Wspólny DrawerShell (backdrop, slide-in, Escape, scroll-lock) oraz drawer salonu i pytania o produkt.",
  variants: [
    {
      id: "salon",
      label: "SalonDrawer",
      description: "Lista salonów z wyszukiwaniem i lokalizacją.",
      render: () => <SalonDrawerDemo />,
    },
    {
      id: "ask",
      label: "AskDrawer",
      description: "Formularz pytania z kontekstem produktu Montebianco.",
      render: () => <AskDrawerDemo />,
    },
  ],
};

export const category1Modules: LibraryModule[] = [
  headerModule,
  footerModule,
  drawersModule,
];
