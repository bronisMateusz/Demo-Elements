import { Breadcrumbs } from "../../components/orientation/Breadcrumbs";
import {
  ButtonAskRowDemo,
  ButtonFullWidthDemo,
  ButtonGhostStatesDemo,
  ButtonGoldStatesDemo,
  ButtonHierarchyDemo,
  ButtonIconsDemo,
  ButtonLiveHoverDemo,
  ButtonOnDarkDemo,
  ButtonPrimaryStatesDemo,
  ButtonSecondaryStatesDemo,
  ButtonSizesDemo,
  ButtonTertiaryStatesDemo,
} from "../demos/ButtonSystemDemo";
import {
  BadgeSystemDemo,
  CheckboxDemo,
  IconButtonLiveDemo,
} from "../demos/PrimitivesDemo";
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
            { label: "Łazienka", to: "#" },
          ]}
        />
      ),
    },
    {
      id: "three-levels",
      label: "3 poziomy",
      description: "Ścieżka kategorii bez powielania nazwy produktu.",
      render: () => (
        <Breadcrumbs
          items={[
            { label: "Strona główna", to: "/" },
            { label: "Łazienka", to: "#" },
            { label: "Meble łazienkowe", to: "#" },
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
            ]}
          />
          <p className="t-body-lg max-w-prose text-neutral-600">
            Kolekcja Montebianco zaprasza do aranżowania stylowej łazienki w
            dobrym guście…
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
    "System przycisków Elements - warianty Primary, Secondary, Gold, Ghost i Tertiary; tone default/onDark; rozmiary; stany; IconButton; ProductAskRow (PDP).",
  optionalProps: [
    { name: "variant", type: "ButtonVariant", defaultValue: "primary" },
    { name: "size", type: '"sm" | "md" | "lg"', defaultValue: "md" },
    { name: "tone", type: '"default" | "onDark"', defaultValue: "default" },
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
        "Primary = solid gold, Secondary = białe tło + border w kolorze tekstu, Gold = outline akcent, Ghost = transparent, Tertiary = link. Hover: czarny fill (jasne) / biały fill (tone=onDark, poza Secondary).",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonHierarchyDemo />
        </div>
      ),
    },
    {
      id: "sizes",
      label: "Rozmiary",
      description:
        "Large (3.25rem), Default (3rem), Small (2.5rem) - na przykładzie Primary.",
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
        "Hover z animacją czarnego wypełnienia od dołu (before:scale-y-100 w preview). Focus - ring WCAG.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonPrimaryStatesDemo />
        </div>
      ),
    },
    {
      id: "secondary-states",
      label: "Stany · Secondary",
      description:
        "Białe tło + border = kolor tekstu (neutral-800); czarne wypełnienie na hover.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonSecondaryStatesDemo />
        </div>
      ),
    },
    {
      id: "gold-states",
      label: "Stany · Gold",
      description:
        "Złota obwódka - czarne wypełnienie na hover (nie solid primary).",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonGoldStatesDemo />
        </div>
      ),
    },
    {
      id: "ghost-states",
      label: "Stany · Ghost",
      description:
        "Przezroczyste tło - hover z delikatnym wypełnieniem bg-muted.",
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
      description:
        "Ikony w przyciskach tekstowych oraz IconButton (default, bordered, elevated, on-dark).",
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
      description:
        "Najedź kursorem - wypełnienie wjeżdża od dołu: czarne na jasnym, białe przy onDark.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonLiveHoverDemo />
        </div>
      ),
    },
    {
      id: "on-dark",
      label: "Tone · onDark",
      description:
        "Primary (solid gold) i Secondary (solid white) na ciemnej powierzchni; hover = biały fill (primary) / czarny fill (secondary).",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonOnDarkDemo />
        </div>
      ),
    },
    {
      id: "ask-row",
      label: "Ask row (PDP)",
      description:
        "Lead + CTA (secondary · lg) pod ceną - otwiera AskDrawer przez onAskOpen.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <ButtonAskRowDemo />
        </div>
      ),
    },
  ],
};

export const badgeModule: LibraryModule = {
  id: "2.5",
  slug: "badge",
  title: "Badge",
  description:
    "Etykiety produktu / promo - warianty default, gold, brand, outline, promo, neutral; rozmiary sm/md.",
  optionalProps: [
    { name: "variant", type: "BadgeVariant", defaultValue: "default" },
    { name: "size", type: '"sm" | "md"', defaultValue: "md" },
  ],
  variants: [
    {
      id: "system",
      label: "Warianty i rozmiary",
      description:
        "Wszystkie warianty Badge (default, gold, brand, outline, promo, neutral) i rozmiary sm/md.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <BadgeSystemDemo />
        </div>
      ),
    },
  ],
};

export const iconButtonModule: LibraryModule = {
  id: "2.6",
  slug: "icon-button",
  title: "IconButton",
  description:
    "Przyciski ikoniczne (Header, FAB, drawery) - default, bordered, elevated, on-dark; IconLink.",
  variants: [
    {
      id: "live",
      label: "Live komponenty",
      description:
        "Prawdziwy IconButton / IconLink (nie class-helper preview).",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <IconButtonLiveDemo />
        </div>
      ),
    },
  ],
};

export const checkboxModule: LibraryModule = {
  id: "2.7",
  slug: "checkbox",
  title: "Checkbox",
  description:
    "Animowany checkbox (AskDrawer, newsletter) - checked, indeterminate, disabled.",
  variants: [
    {
      id: "states",
      label: "Stany",
      description: "Checked, indeterminate i disabled.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <CheckboxDemo />
        </div>
      ),
    },
  ],
};

export const category2Modules: LibraryModule[] = [
  breadcrumbsModule,
  buttonModule,
  badgeModule,
  iconButtonModule,
  checkboxModule,
];
