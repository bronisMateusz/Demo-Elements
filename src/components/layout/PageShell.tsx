import { PropsWithChildren, useEffect } from "react";
import { skipLinkClassName } from "../../lib/skipLinkClassName";
import { Footer } from "./Footer";
import { Header } from "./Header";

type PageShellProps = PropsWithChildren<{
  breadcrumbs?: React.ReactNode;
}>;

export function PageShell({ children, breadcrumbs }: PageShellProps) {
  useEffect(() => {
    const key = "agentation";
    const params = new URLSearchParams(window.location.search);
    const forceEnabled = params.get("agentation") === "1" || params.has("review");
    const shouldLoad = !import.meta.env.DEV || forceEnabled;
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-runtime-module="${key}"]`,
    );

    if (!shouldLoad) {
      existingScript?.remove();
      document.getElementById("agentation-root")?.remove();
      return;
    }

    if (existingScript) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = `${import.meta.env.BASE_URL}assets/agentation-bundle.js`;
    script.defer = true;
    script.dataset.runtimeModule = key;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <a className={skipLinkClassName} href="#main">
        Przejdź do treści
      </a>
      <Header />
      <main id="main">
        {breadcrumbs}
        {children}
      </main>
      <Footer />
    </>
  );
}
