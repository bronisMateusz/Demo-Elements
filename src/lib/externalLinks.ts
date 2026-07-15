export function isExternalHref(href: string): boolean {
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  try {
    const url = new URL(href, window.location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function shouldOpenInNewTab(anchor: HTMLAnchorElement): boolean {
  if (anchor.classList.contains("skip-link")) return false;

  const href = anchor.getAttribute("href") ?? "";
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (isExternalHref(href)) return true;

  const ariaLabel = anchor.getAttribute("aria-label") ?? "";
  if (/nowej karcie/i.test(ariaLabel)) return true;

  return anchor.querySelector(".ph-arrow-square-out") !== null;
}

function applyRel(anchor: HTMLAnchorElement) {
  const rel = new Set((anchor.getAttribute("rel") ?? "").split(/\s+/).filter(Boolean));
  rel.add("noopener");
  rel.add("noreferrer");
  anchor.setAttribute("rel", [...rel].join(" "));
}

export function applyExternalLinkTargets(root: ParentNode = document) {
  root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
    if (!shouldOpenInNewTab(anchor)) return;
    anchor.target = "_blank";
    applyRel(anchor);
  });
}

let observerStarted = false;
let frameId = 0;

function scheduleApply() {
  if (frameId) return;
  frameId = requestAnimationFrame(() => {
    frameId = 0;
    applyExternalLinkTargets();
  });
}

export function initExternalLinks() {
  applyExternalLinkTargets();

  if (observerStarted || typeof MutationObserver === "undefined") return;
  observerStarted = true;

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.body, { childList: true, subtree: true });
}
