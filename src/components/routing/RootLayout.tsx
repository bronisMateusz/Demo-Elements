import { Outlet } from "react-router-dom";
import { PrototypeFabs } from "../demo/PrototypeFabs";
import { ExternalLinksSync } from "./ExternalLinksSync";
import { ScrollToTop } from "./ScrollToTop";

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <ExternalLinksSync />
      <Outlet />
      <PrototypeFabs />
    </>
  );
}
