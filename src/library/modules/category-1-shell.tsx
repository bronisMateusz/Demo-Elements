import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { SiteNewsletter } from "../../components/layout/SiteNewsletter";
import {
  AskDrawerDemo,
  BookAppointmentDrawerDemo,
  InspirationProductsDrawerDemo,
  MobileDrawerDemo,
  SalonDrawerDemo,
} from "../demos/DrawerSystemDemo";
import { libPreviewFullBleedWrapperClassName } from "../libStyles";
import type { LibraryModule } from "../types";

export const headerModule: LibraryModule = {
  id: "1.1",
  slug: "header",
  title: "Header",
  description:
    "Shell nagłówka: utility bar (desktop), logo, menu z mega-menu Produktów, selektor salonu w barze od sm (HeaderSalonStrip tylko na telefonie), szukaj, schowek (mobile) i hamburger. Sticky z conceal/reveal utility przy scrollu. Hostuje też InspirationProductsDrawer.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description:
        "Pełny chrome - utility, nav, salon, szukaj, schowek (mobile) i menu. Strip salonu pod barem tylko poniżej sm.",
      render: () => (
        <div
          className={libPreviewFullBleedWrapperClassName}
          data-lib-full-bleed
        >
          <Header />
          <div className="grid min-h-32 place-items-center border-b border-dashed border-neutral-300 bg-neutral-50 text-sm text-neutral-500">
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
    "Stopka: obecność salonów (statystyki + miasta), kolumny linków, wordmark ELEMENTS ze spotlightem i sekcja legal. Newsletter = SiteNewsletter.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description:
        "Pełna stopka marki Elements - salony, kolumny, wordmark, social.",
      render: () => (
        <div
          className={libPreviewFullBleedWrapperClassName}
          data-lib-full-bleed
        >
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
    "Wspólny DrawerShell (backdrop, slide-in, Escape, scroll-lock): salon, pytanie, umówienie, produkty aranżacji i menu mobilne.",
  variants: [
    {
      id: "salon",
      label: "SalonDrawer",
      description:
        "Lista salonów z wyszukiwaniem i lokalizacją (search w footerze na mobile).",
      render: () => <SalonDrawerDemo />,
    },
    {
      id: "ask",
      label: "AskDrawer",
      description: "Formularz pytania z kontekstem produktu Montebianco.",
      render: () => <AskDrawerDemo />,
    },
    {
      id: "book",
      label: "BookAppointmentDrawer",
      description: "Formularz umówienia wizyty (flow /salony).",
      render: () => <BookAppointmentDrawerDemo />,
    },
    {
      id: "inspiration-products",
      label: "InspirationProductsDrawer",
      description: "Produkty z aranżacji - otwierany z InspirationGallery.",
      render: () => <InspirationProductsDrawerDemo />,
    },
    {
      id: "mobile",
      label: "MobileDrawer",
      description: "Menu mobilne z nawigacją i skrótami.",
      render: () => <MobileDrawerDemo />,
    },
  ],
};

export const siteNewsletterModule: LibraryModule = {
  id: "1.4",
  slug: "site-newsletter",
  title: "SiteNewsletter",
  description:
    "Pas newslettera w PageShell (nad stopką) oraz na /strefa-architekta.",
  variants: [
    {
      id: "default",
      label: "Domyślny",
      description: "Formularz zapisu - jak w shellu.",
      render: () => (
        <div className={libPreviewFullBleedWrapperClassName}>
          <SiteNewsletter />
        </div>
      ),
    },
  ],
};

export const category1Modules: LibraryModule[] = [
  headerModule,
  footerModule,
  drawersModule,
  siteNewsletterModule,
];
