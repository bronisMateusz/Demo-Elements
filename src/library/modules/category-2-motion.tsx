import { TextCascadeDemo, TextRevealLeadDemo } from "../demos/PrimitivesDemo";
import { CenterMorphModalDemo } from "../demos/CenterMorphModalDemo";
import {
  VariantChipGroupDemo,
  VariantThumbnailGroupDemo,
} from "../demos/VariantSelectorDemo";
import { libPreviewArticleClassName } from "../libStyles";
import type { LibraryModule } from "../types";

export const sharedLayoutBgModule: LibraryModule = {
  id: "2.3",
  slug: "shared-layout-bg",
  title: "SharedLayoutBg",
  description:
    "Przesuwane tło hover (layoutId) między chipami - ten sam wzorzec co VariantChipGroup na PDP: ciemny wybór, jasna pigułka hover, obrys after:border. Rodzic może dodać nad rzędem etykietę osi i aktualny wybór (np. „Szerokość: 80 cm”).",
  optionalProps: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Elementy z kluczem React (key).",
    },
    { name: "className", type: "string", description: "Klasa kontenera flex." },
    {
      name: "pillClassName",
      type: "string",
      description: "Wygląd przesuwanej pigułki.",
    },
    {
      name: "inset",
      type: "number",
      defaultValue: "0",
      description: "Inset poziomy pigułki (px).",
    },
  ],
  variants: [
    {
      id: "chip-row",
      label: "Wiersz chipów",
      description:
        "Jak na produkcie: wybrany chip jest ciemny, hover przesuwa pigułkę bg-neutral-300, nieaktywne mają obrys. Nad rzędem opcjonalna etykieta wyboru.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <VariantChipGroupDemo />
        </div>
      ),
    },
  ],
};

export const sharedLayoutUnderlineModule: LibraryModule = {
  id: "2.4",
  slug: "shared-layout-underline",
  title: "SharedLayoutUnderline",
  description:
    "Przesuwane podkreślenie hover (layoutId) między elementami. Aktywny stan ma własną linię; hover używa jaśniejszego odcienia. Rodzic może dodać nad rzędem etykietę osi i aktualny wybór (np. „Wykończenie: Biały mat”).",
  optionalProps: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Elementy z kluczem React (key).",
    },
    { name: "className", type: "string", description: "Klasa kontenera flex." },
    {
      name: "lineClassName",
      type: "string",
      defaultValue: "bg-neutral-900",
      description: "Klasa animowanej linii.",
    },
    {
      name: "insetX",
      type: "number",
      defaultValue: "0",
      description: "Inset poziomy linii (px).",
    },
    {
      name: "bottom",
      type: "number",
      defaultValue: "0",
      description: "Odległość od dołu (px).",
    },
  ],
  variants: [
    {
      id: "thumbnail-row",
      label: "Miniaturki wariantu",
      description:
        "Jak VariantThumbnailGroup na PDP: hover = linia bg-neutral-900/40; wybrany = pełne podkreślenie. Nad rzędem opcjonalna etykieta wyboru.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <VariantThumbnailGroupDemo />
        </div>
      ),
    },
  ],
};

export const textCascadeModule: LibraryModule = {
  id: "2.8",
  slug: "text-cascade",
  title: "TextCascade",
  description:
    "Letter-by-letter slot roll przy zmianie tekstu (np. HomeProducts „zobacz wszystkie”).",
  variants: [
    {
      id: "interactive",
      label: "Interaktywny",
      description: "Kliknij „Zmień tekst”, by zobaczyć kaskadę liter.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <TextCascadeDemo />
        </div>
      ),
    },
  ],
};

export const textRevealLeadModule: LibraryModule = {
  id: "2.9",
  slug: "text-reveal-lead",
  title: "TextRevealLead",
  description:
    "Reveal tytułu przy scrollu (słowo / linia) - CTA, hero, sekcje home.",
  variants: [
    {
      id: "word",
      label: "Reveal · word",
      description: "Reveal tytułu słowo po słowie przy scrollu.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <TextRevealLeadDemo />
        </div>
      ),
    },
  ],
};

export const centerMorphModalModule: LibraryModule = {
  id: "2.12",
  slug: "center-morph-modal",
  title: "CenterMorphModal",
  description:
    "Modal rozkładany od środka (clip-path), jak beui center-morph-modal. Używany do udostępniania linku schowka. Pełna strona: /schowek.",
  optionalProps: [
    { name: "open", type: "boolean", required: true },
    { name: "onClose", type: "() => void", required: true },
    { name: "title", type: "string", required: true },
    { name: "description", type: "string" },
    { name: "closeLabel", type: "string", defaultValue: '"Zamknij"' },
    { name: "children", type: "ReactNode" },
  ],
  variants: [
    {
      id: "share",
      label: "Udostępnij link",
      description:
        "Kliknij przycisk, by otworzyć modal schowka. Escape i tło zamykają.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <CenterMorphModalDemo />
        </div>
      ),
    },
  ],
};

export const category2MotionModules: LibraryModule[] = [
  sharedLayoutBgModule,
  sharedLayoutUnderlineModule,
  textCascadeModule,
  textRevealLeadModule,
  centerMorphModalModule,
];
