import { SpeedInsights } from "@vercel/speed-insights/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./app/App";
import { initA11yPreferences } from "./lib/a11yPreferences";
import { initExternalLinks } from "./lib/externalLinks";
import "./styles/app.css";

initA11yPreferences();
initExternalLinks();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      {import.meta.env.VERCEL_DEPLOY ? <SpeedInsights /> : null}
    </HelmetProvider>
  </React.StrictMode>,
);
