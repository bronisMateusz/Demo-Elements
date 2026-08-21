import { useEffect, useState } from "react";
import { PDP_SUBNAV_NAVIGATE_EVENT } from "../constants/pdpSubnav";

function readHashId() {
  return window.location.hash.replace(/^#/, "");
}

/**
 * Mobile accordion open state for PDP sections.
 * Closed by default; opens when subnav navigates to `expandOnSectionId` (or hash matches).
 * Syncs `data-expanded` on the section element for background transitions.
 */
export function usePdpSectionAccordion(expandOnSectionId?: string) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!expandOnSectionId) return;

    const openIfMatch = (id: string) => {
      if (id === expandOnSectionId) setOpen(true);
    };

    openIfMatch(readHashId());

    const onNavigate = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      if (id) openIfMatch(id);
    };

    const onHashChange = () => openIfMatch(readHashId());

    window.addEventListener(PDP_SUBNAV_NAVIGATE_EVENT, onNavigate);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener(PDP_SUBNAV_NAVIGATE_EVENT, onNavigate);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [expandOnSectionId]);

  useEffect(() => {
    if (!expandOnSectionId) return;
    const section = document.getElementById(expandOnSectionId);
    if (!section) return;
    section.dataset.expanded = open ? "true" : "false";
    return () => {
      delete section.dataset.expanded;
    };
  }, [expandOnSectionId, open]);

  return { open, setOpen, accordionEnabled: Boolean(expandOnSectionId) };
}
