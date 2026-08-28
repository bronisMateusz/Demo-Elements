import { useEffect, useRef, useState } from "react";
import { isMotionPaused } from "../lib/a11yPreferences";
import {
  predictHeaderUtilityConcealed,
  readHeaderOffsetForConcealStatePx,
  readHeaderOffsetPx,
  SECTION_MARGIN_BLOCK_PX,
} from "../lib/layoutTokens";
import { useStickyUnderHeader } from "./useStickyUnderHeader";

const NAV_GAP_PX = 16;
/** Keep the target heading inside the spy band (avoids landing on the previous letter). */
const SPY_SLACK_PX = 1;

function readBrandAzScrollOffsetPx(
  nav: HTMLElement | null,
  concealed?: boolean,
) {
  const navH = nav?.offsetHeight ?? 60;
  const headerPx =
    concealed === undefined
      ? readHeaderOffsetPx()
      : readHeaderOffsetForConcealStatePx(concealed);
  return headerPx + navH + NAV_GAP_PX;
}

function readLetterAnchorY(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY;
}

/** Resolve offset after the utility strip reacts to this scroll. */
function readBrandAzDestinationOffsetPx(
  nav: HTMLElement | null,
  element: HTMLElement,
) {
  const fromY = window.scrollY;
  const anchorY = readLetterAnchorY(element);

  let concealed = predictHeaderUtilityConcealed(fromY, fromY);
  let offset = readBrandAzScrollOffsetPx(nav, concealed);
  let toY = anchorY - offset;

  concealed = predictHeaderUtilityConcealed(fromY, toY);
  offset = readBrandAzScrollOffsetPx(nav, concealed);
  toY = anchorY - offset;

  concealed = predictHeaderUtilityConcealed(fromY, toY);
  return readBrandAzScrollOffsetPx(nav, concealed);
}

function isDocumentScrollKey(key: string) {
  return (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "PageUp" ||
    key === "PageDown" ||
    key === "Home" ||
    key === "End" ||
    key === " "
  );
}

/** Sticky A-Z spy: active letter follows the section under the header + nav. */
export function useBrandAzNav(letters: readonly string[]) {
  const { stuck, sentinelRef } = useStickyUnderHeader({
    stickyMarginTopPx: SECTION_MARGIN_BLOCK_PX,
  });
  const [activeLetter, setActiveLetter] = useState(letters[0] ?? "");
  const navRef = useRef<HTMLDivElement>(null);
  const pinnedLetterRef = useRef<string | null>(null);
  const lettersKey = letters.join(",");

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const sync = () => {
      document.documentElement.style.setProperty(
        "--brand-az-nav-height",
        `${nav.offsetHeight}px`,
      );
    };
    sync();
    if (typeof ResizeObserver === "undefined") {
      return () => {
        document.documentElement.style.removeProperty("--brand-az-nav-height");
      };
    }

    const observer = new ResizeObserver(sync);
    observer.observe(nav);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--brand-az-nav-height");
    };
  }, []);

  useEffect(() => {
    const letterIds = lettersKey ? lettersKey.split(",") : [];
    if (letterIds.length === 0) return;

    const updateActive = () => {
      if (pinnedLetterRef.current) return;

      const offset = readBrandAzScrollOffsetPx(navRef.current);
      let current = letterIds[0];
      for (const letter of letterIds) {
        const element = document.getElementById(`letter-${letter}`);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= offset + SPY_SLACK_PX) {
          current = letter;
        }
      }
      setActiveLetter(current ?? "");
    };

    const releasePin = () => {
      if (!pinnedLetterRef.current) return;
      pinnedLetterRef.current = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isDocumentScrollKey(event.key)) releasePin();
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("wheel", releasePin, { passive: true });
    window.addEventListener("touchmove", releasePin, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("wheel", releasePin);
      window.removeEventListener("touchmove", releasePin);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lettersKey]);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (!element) return;

    pinnedLetterRef.current = letter;
    setActiveLetter(letter);

    const top = Math.max(
      0,
      readLetterAnchorY(element) -
        readBrandAzDestinationOffsetPx(navRef.current, element) +
        SPY_SLACK_PX,
    );

    window.scrollTo({
      top,
      behavior: isMotionPaused() ? "auto" : "smooth",
    });

    if (history.replaceState) {
      history.replaceState(null, "", `#letter-${letter}`);
    }
  };

  return { activeLetter, stuck, sentinelRef, navRef, scrollToLetter };
}
