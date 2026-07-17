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
    <label className="inline-flex shrink-0 cursor-pointer select-none items-center gap-2 rounded-xs">
      <span className="text-sm text-neutral-600">Tryb dev</span>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={devMode}
        onChange={(event) => setDevMode(event.target.checked)}
      />
      <span
        className="relative inline-block h-5 w-9 rounded-full bg-neutral-200 transition-colors duration-fast ease-out after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-neutral-0 after:transition-transform after:duration-fast after:ease-out after:content-[''] peer-checked:bg-neutral-800 peer-checked:after:translate-x-4"
        aria-hidden="true"
      />
    </label>
  );
}

function LibrarySiteHeader() {
  return (
    <header className={libHeaderClassName} data-lib-header id="librarySiteHeader">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-heading text-xl text-neutral-900 no-underline"
          aria-label="Elements - strona główna"
        >
          Elements
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-neutral-500 sm:inline">Biblioteka komponentów</span>
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
        <title>Biblioteka komponentów - Elements</title>
        <meta
          name="description"
          content="Katalog modułów UI marki Elements - warianty i stany komponentów."
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
