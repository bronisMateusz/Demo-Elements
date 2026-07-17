import { Breadcrumbs } from "../../components/orientation/Breadcrumbs";
import {
  ButtonAskRowDemo,
  ButtonAskFabDemo,
  ButtonFullWidthDemo,
  ButtonGhostStatesDemo,
  ButtonGoldStatesDemo,
  ButtonHierarchyDemo,
  ButtonIconsDemo,
  ButtonLiveHoverDemo,
  ButtonPrimaryStatesDemo,
  ButtonQuickAddDemo,
  ButtonSecondaryStatesDemo,
  ButtonSizesDemo,
  ButtonTertiaryStatesDemo,
} from "../demos/ButtonSystemDemo";
import { libPreviewArticleClassName } from "../libStyles";
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
          <p className="t-body-lg max-w-prose text-neutral-600">
            Kolekcja Montebianco zaprasza do aranżowania stylowej łazienki w dobrym guście…
          </p>
        </div>
      ),
    },
  ],
};

const buttonStates = [
  { id: "default", label: "Default" },
  { id: "hover", label: "Hover" },
  { id: "focus", label: "Focus" },
  { id: "active", label: "Active" },
  { id: "disabled", label: "Disabled" },
];

export const buttonModule: LibraryModule = {
  id: "2.2",
  slug: "button",
  title: "Przycisk / CTA",
  description:
    "System przycisków Elements - warianty Primary, Secondary, Gold, Ghost i Tertiary; rozmiary; stany; IconButton (default, bordered, elevated, on-dark); ask-row i quick-add.",
  optionalProps: [
    { name: "variant", type: "ButtonVariant", defaultValue: "primary" },
    { name: "size", type: '"sm" | "md" | "lg"', defaultValue: "md" },
    { name: "full", type: "boolean", defaultValue: "false" },
    { name: "href", type: "string", description: "Gdy link zamiast <button>." },
    { name: "disabled", type: "boolean" },
  ],
  states: buttonStates,
  variants: [
    {
      id: "hierarchy",
      label: "Hierarchia wariantów",
      description:
        "Primary = główna akcja, Secondary = alternatywa, Gold = akcent marki, Ghost = akcja drugorzędna, Tertiary = link w treści.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonHierarchyDemo />
        </div>
      ),
    },
    {
      id: "sizes",
      label: "Rozmiary",
      description: "Large (52px), Default (48px), Small (40px) - na przykładzie Primary.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonSizesDemo />
        </div>
      ),
    },
    {
      id: "primary-states",
      label: "Stany · Primary",
      description:
        "Hover z animacją złotego wypełnienia od dołu (before:scale-y-100 w preview). Focus - ring WCAG.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonPrimaryStatesDemo />
        </div>
      ),
    },
    {
      id: "secondary-states",
      label: "Stany · Secondary",
      description: "Obramowany przycisk z tym samym wypełnieniem złotem na hover.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonSecondaryStatesDemo />
        </div>
      ),
    },
    {
      id: "gold-states",
      label: "Stany · Gold",
      description: "Złota obwódka - wypełnienie złotem na hover.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonGoldStatesDemo />
        </div>
      ),
    },
    {
      id: "ghost-states",
      label: "Stany · Ghost",
      description: "Przezroczyste tło - hover z delikatnym wypełnieniem bg-muted.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonGhostStatesDemo />
        </div>
      ),
    },
    {
      id: "tertiary-states",
      label: "Stany · Tertiary",
      description: "Link-style - hover ze złotym podkreśleniem.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonTertiaryStatesDemo />
        </div>
      ),
    },
    {
      id: "icons",
      label: "Z ikonami",
      description: "Ikony w przyciskach tekstowych oraz IconButton (default, bordered, elevated, on-dark).",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonIconsDemo />
        </div>
      ),
    },
    {
      id: "full-width",
      label: "Pełna szerokość",
      description: "Prop full - typowe w buy boxie i formularzach.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonFullWidthDemo />
        </div>
      ),
    },
    {
      id: "live-hover",
      label: "Animacja hover (interaktywna)",
      description: "Najedź kursorem - złote wypełnienie wjeżdża od dołu jak na OKA.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonLiveHoverDemo />
        </div>
      ),
    },
    {
      id: "ask-row",
      label: "Ask row (PDP)",
      description: "Lead jako tekst + osobny przycisk CTA (secondary · lg) pod ceną.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonAskRowDemo />
        </div>
      ),
    },
    {
      id: "ask-fab",
      label: "Fixed bar (PDP)",
      description:
        "Sticky pasek jak OKA - miniatura/tytuł/cena na desktopie, CTA: Dodaj do schowka + Zadaj pytanie. Po scrollu, znika przed stopką.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonAskFabDemo />
        </div>
      ),
    },
    {
      id: "quick-add",
      label: "Quick add (karuzela)",
      description: "Przycisk szybkiego dodania na karcie produktu w karuzeli.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonQuickAddDemo />
        </div>
      ),
    },
  ],
};

export const category2Modules: LibraryModule[] = [breadcrumbsModule, buttonModule];
