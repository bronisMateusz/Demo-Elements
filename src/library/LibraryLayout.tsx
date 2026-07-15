import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import { skipLinkClassName } from "../lib/skipLinkClassName";
import { LibraryDevModeProvider } from "./LibraryDevModeContext";
import { useLibraryDevModeActions } from "./hooks/useLibraryDevMode";
import {
  libCatNavClassName,
  libCatNavInnerClassName,
  libCatNavLabelClassName,
  libCatNavLinkClassName,
  libCatNavListClassName,
  libHeaderClassName,
  libMainClassName,
  libPageClassName,
} from "./libStyles";
import { libraryCategories } from "./registry";

function LibraryDevToggle() {
  const { devMode, setDevMode } = useLibraryDevModeActions();

  return (
    <label className="a11y-toggle shrink-0 rounded-sm">
      <span className="a11y-toggle__label">Tryb dev</span>
      <input
        type="checkbox"
        className="a11y-toggle__input"
        checked={devMode}
        onChange={(event) => setDevMode(event.target.checked)}
      />
      <span className="a11y-toggle__switch" aria-hidden="true" />
    </label>
  );
}

function LibrarySiteHeader() {
  return (
    <header className={libHeaderClassName} data-lib-header id="librarySiteHeader">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-heading text-xl text-text no-underline"
          aria-label="Elements — strona główna"
        >
          Elements
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-small text-text-muted sm:inline">Biblioteka komponentów</span>
          <LibraryDevToggle />
        </div>
      </div>

      <nav className={libCatNavClassName} aria-label="Kategorie modułów">
        <div className={libCatNavInnerClassName}>
          <p className={libCatNavLabelClassName}>Kategorie</p>
          <ul className={libCatNavListClassName} role="list">
            {libraryCategories.map((category) => (
              <li key={category.id}>
                <NavLink
                  to={`/biblioteka/${category.slug}`}
                  className={({ isActive }) => libCatNavLinkClassName({ active: isActive })}
                >
                  {category.number}. {category.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export function LibraryLayout() {
  return (
    <LibraryDevModeProvider>
      <Helmet>
        <title>Biblioteka komponentów — Elements</title>
        <meta
          name="description"
          content="Katalog modułów UI marki Elements — warianty i stany komponentów."
        />
      </Helmet>

      <a className={skipLinkClassName} href="#lib-main">
        Przejdź do treści
      </a>

      <LibrarySiteHeader />

      <div className={libPageClassName} data-lib-page>
        <main className={libMainClassName} id="lib-main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </LibraryDevModeProvider>
  );
}
