import { Eyebrow } from "../../components/ui/Eyebrow";
import type { LibraryModule } from "../types";
import { useLibraryDevMode } from "../hooks/useLibraryDevMode";
import {
  libModuleClassName,
  libModuleDescClassName,
  libModuleEyebrowClassName,
  libModuleHeaderClassName,
  libModuleTitleClassName,
  libModuleVariantsClassName,
} from "../libStyles";
import { VariantCard } from "./VariantCard";

type ModuleSectionProps = {
  module: LibraryModule;
};

export function ModuleSection({ module }: ModuleSectionProps) {
  const devMode = useLibraryDevMode();

  return (
    <section
      className={libModuleClassName}
      data-lib-module
      id={module.slug}
      aria-labelledby={`${module.slug}-title`}
    >
      <header className={libModuleHeaderClassName}>
        <Eyebrow className={libModuleEyebrowClassName} variant="muted">
          Moduł {module.id}
        </Eyebrow>
        <h2 className={`t-h2 ${libModuleTitleClassName}`} id={`${module.slug}-title`}>
          {module.title}
        </h2>
        <p className={`t-body ${libModuleDescClassName}`}>{module.description}</p>
      </header>

      <div className={libModuleVariantsClassName}>
        {module.variants.map((variant) => (
          <VariantCard
            key={variant.id}
            label={variant.label}
            description={variant.description}
            devMode={devMode}
            optionalProps={module.optionalProps}
            states={module.states}
            drupal={module.drupal}
            variantProps={variant.props}
          >
            {variant.render()}
          </VariantCard>
        ))}
      </div>
    </section>
  );
}
