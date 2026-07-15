import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applyExternalLinkTargets } from "../../lib/externalLinks";

export function ExternalLinksSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyExternalLinkTargets();
  }, [pathname]);

  return null;
}
