import { Navigate, useParams } from "react-router-dom";
import { ModuleSection } from "../library/components/ModuleSection";
import {
  libCategoryIntroClassName,
  libCategoryIntroLedeClassName,
  libCategoryIntroTitleClassName,
} from "../library/libStyles";
import {
  getCategoryBySlug,
  getDefaultCategorySlug,
  resolveCategorySlug,
} from "../library/registry";

export function LibraryIndexPage() {
  return <Navigate to={`/biblioteka/${getDefaultCategorySlug()}`} replace />;
}

export function LibraryCategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const canonicalSlug = categorySlug
    ? resolveCategorySlug(categorySlug)
    : undefined;

  if (categorySlug && canonicalSlug && categorySlug !== canonicalSlug) {
    return <Navigate to={`/biblioteka/${canonicalSlug}`} replace />;
  }

  const category = canonicalSlug ? getCategoryBySlug(canonicalSlug) : undefined;

  if (!category) {
    return <Navigate to={`/biblioteka/${getDefaultCategorySlug()}`} replace />;
  }

  return (
    <>
      <header className={libCategoryIntroClassName}>
        <div className="container">
          <h1 className={`t-h1 ${libCategoryIntroTitleClassName}`}>
            {category.title}
          </h1>
          {category.subtitle ? (
            <p className={libCategoryIntroLedeClassName}>{category.subtitle}</p>
          ) : null}
        </div>
      </header>

      {category.modules.map((module) => (
        <ModuleSection key={module.id} module={module} />
      ))}
    </>
  );
}
