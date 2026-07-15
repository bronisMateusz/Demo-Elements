import {
  SharedLayoutBgDemo,
  SharedLayoutBgSegmentDemo,
  SharedLayoutUnderlineDemo,
} from "../demos/MotionLayoutDemo";
import { libPreviewArticleClassName } from "../libStyles";
import type { LibraryModule } from "../types";

export const sharedLayoutBgModule: LibraryModule = {
  id: "2.3",
  slug: "shared-layout-bg",
  title: "SharedLayoutBg",
  description:
    "Przesuwane tło hover (layoutId) między elementami listy — port z beUI. Używane w chipach wariantów i segment control.",
  optionalProps: [
    { name: "children", type: "ReactNode", required: true, description: "Elementy z kluczem React (key)." },
    { name: "className", type: "string", description: "Klasa kontenera flex." },
    { name: "pillClassName", type: "string", description: "Wygląd przesuwanej pigułki." },
    { name: "inset", type: "number", defaultValue: "0", description: "Inset poziomy pigułki (px)." },
  ],
  variants: [
    {
      id: "chip-row",
      label: "Wiersz chipów",
      description: "Hover przesuwa jasne tło między opcjami — wzorzec VariantChipGroup.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <SharedLayoutBgDemo />
        </div>
      ),
    },
    {
      id: "segment",
      label: "Segment control",
      description: "Pigułka w ramce — np. przełącznik widoku listy / siatki.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <SharedLayoutBgSegmentDemo />
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
    "Przesuwane podkreślenie hover (layoutId) między elementami. Aktywny stan ma własną linię; hover używa jaśniejszego odcienia.",
  optionalProps: [
    { name: "children", type: "ReactNode", required: true, description: "Elementy z kluczem React (key)." },
    { name: "className", type: "string", description: "Klasa kontenera flex." },
    { name: "lineClassName", type: "string", defaultValue: "bg-neutral-900", description: "Klasa animowanej linii." },
    { name: "insetX", type: "number", defaultValue: "0", description: "Inset poziomy linii (px)." },
    { name: "bottom", type: "number", defaultValue: "0", description: "Odległość od dołu (px)." },
  ],
  variants: [
    {
      id: "thumbnail-row",
      label: "Miniaturki wariantu",
      description: "Hover: bg-neutral-900/40. Aktywny element trzyma pełne bg-neutral-900 wewnątrz przycisku.",
      render: () => (
        <div className={libPreviewArticleClassName}>
          <SharedLayoutUnderlineDemo />
        </div>
      ),
    },
  ],
};

export const category2MotionModules: LibraryModule[] = [
  sharedLayoutBgModule,
  sharedLayoutUnderlineModule,
];
