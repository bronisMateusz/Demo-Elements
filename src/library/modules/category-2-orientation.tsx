import { Breadcrumbs } from "../../components/orientation/Breadcrumbs";
import type { LibraryModule } from "../types";

export const breadcrumbsModule: LibraryModule = {
  id: "2.1",
  slug: "breadcrumbs",
  title: "Breadcrumbs",
  description: "Okruszki nawigacji z separatorami i obsługą SPA Link.",
  optionalProps: [
    { name: "items", type: "BreadcrumbItem[]", required: true },
    { name: "label", type: "string", defaultValue: "Okruszki nawigacji" },
    { name: "variant", type: '"top" | "section"', defaultValue: "top" },
  ],
  variants: [
    {
      id: "two-levels",
      label: "2 poziomy",
      description: "Krótka ścieżka nawigacji.",
      render: () => (
        <Breadcrumbs
          items={[
            { label: "Strona główna", to: "/" },
            { label: "Montebianco 80 cm", current: true },
          ]}
        />
      ),
    },
    {
      id: "four-levels",
      label: "4 poziomy",
      description: "Pełna ścieżka kategorii produktu.",
      render: () => (
        <Breadcrumbs
          items={[
            { label: "Strona główna", to: "/" },
            { label: "Łazienka", to: "#" },
            { label: "Meble łazienkowe", to: "#" },
            { label: "Montebianco 80 cm", current: true },
          ]}
        />
      ),
    },
    {
      id: "section",
      label: "W sekcji PDP",
      description: "Kompaktowe okruszki nad opisem produktu (jak OKA).",
      render: () => (
        <div className="container py-8">
          <Breadcrumbs
            variant="section"
            items={[
              { label: "Strona główna", to: "/" },
              { label: "Łazienka", to: "#" },
              { label: "Meble łazienkowe", to: "#" },
              { label: "Montebianco 80 cm", current: true },
            ]}
          />
          <p className="t-body-lg max-w-prose text-text-body">
            Kolekcja Montebianco zaprasza do aranżowania stylowej łazienki w dobrym guście…
          </p>
        </div>
      ),
    },
  ],
};

export const category2Modules: LibraryModule[] = [breadcrumbsModule];
