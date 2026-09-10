import { assetUrl } from "../app/assets";
import { architectDownloadGroups } from "./architectDownloads";

export const architectDownloadsPage = {
  title: "Pliki do pobrania",
  metaDescription:
    "Modele CAD, pliki 3D, tekstury i materiały projektowe Elements - baza do pobrania dla architektów.",
  breadcrumbs: [
    { label: "Strona główna", to: "/" },
    { label: "Pliki do pobrania", current: true },
  ],
  downloads: {
    title: "Chmura architekta ELEMENTS",
    description:
      "Dla wybranych produktów dostępnych tylko w Salonach Elements udostępniamy bazę modeli CAD. Dołącz do grona architektów korzystających z zasobów 3D i przyspiesz swoją pracę dzięki naszym plikom.",
    catalogCta: {
      slogan: ["Katalogi i materiały", "do Twojego projektu"] as const,
      title: "Materiały i modele do Twojego projektu",
      description:
        "Modele 3D, pliki CAD/DWG, tekstury, karty techniczne, deklaracje i certyfikaty w jednym miejscu. Pobierz to, czego potrzebujesz do pracy z klientem.",
      ctaLabel: "Przejdź do bazy",
      href: "https://www.elements-show.pl/do-pobrania",
      image: {
        src: assetUrl("home/architect-catalog-cta.jpg"),
        alt: "Architekt omawia plan domu z klientem nad rzutami",
        fit: "cover" as const,
        focalPoint: { x: 50, y: 55 },
      },
    },
    groups: architectDownloadGroups,
  },
} as const;
