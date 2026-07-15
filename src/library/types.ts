import type { ReactNode } from "react";

export type PropDoc = {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description?: string;
};

export type DrupalDoc = {
  paragraph?: string;
  block?: string;
  fields?: string[];
  library?: string;
  notes?: string;
};

export type ModuleState = {
  id: string;
  label: string;
  description?: string;
};

export type ModuleVariant = {
  id: string;
  label: string;
  description: string;
  render: () => ReactNode;
  props?: Record<string, unknown>;
};

export type LibraryModule = {
  id: string;
  slug: string;
  title: string;
  description: string;
  optionalProps?: PropDoc[];
  states?: ModuleState[];
  drupal?: DrupalDoc;
  variants: ModuleVariant[];
  docsPath?: string;
};

export type LibraryCategory = {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle?: string;
  modules: LibraryModule[];
};
