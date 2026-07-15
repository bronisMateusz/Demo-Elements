import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { isMotionPaused, subscribeMotionPreference } from "../../lib/a11yPreferences";

type LoopingWordProps = {
  words: readonly string[];
  intervalMs?: number;
  /** Align active word toward the trailing edge — keeps the next inline token close. */
  align?: "start" | "end";
  className?: string;
};

export function LoopingWord({
  words,
  intervalMs = 3200,
  align = "start",
  className,
}: LoopingWordProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(() => isMotionPaused());
  const longestWord = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0] ?? ""),
    [words],
  );

  useEffect(() => subscribeMotionPreference(setPaused), []);

  useEffect(() => {
    if (paused || words.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [paused, words.length, intervalMs]);

  if (words.length <= 1) {
    return <span className={className}>{words[0]}</span>;
  }

  const isEnd = align === "end";
  const offset = (index * 100) / words.length;

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden align-baseline leading-none",
        isEnd ? "text-right" : "text-left",
        className,
      )}
      style={{
        width: `${longestWord.length}ch`,
        height: "1em",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className="block transition-transform duration-slow ease-luxury"
        style={{ transform: `translateY(-${offset}%)` }}
      >
        {words.map((word) => (
          <span key={word} className="block h-[1em] leading-none whitespace-nowrap">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
