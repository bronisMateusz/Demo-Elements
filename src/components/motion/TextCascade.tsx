// beui.dev/components/motion/text-animation (Text Cascade)

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { cn } from "../../lib/cn";
import { EASE_OUT, EASE_OUT_CSS, SPRING_SWAP } from "../../lib/motionEase";

const CASCADE_STAGGER = 0.025;
const ROLL_BLUR = "blur(3px)";

const CASCADE_LETTER_VARIANTS: Variants = {
  initial: { opacity: 0, y: "105%", filter: ROLL_BLUR },
  animate: (delay: number = 0) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { ...SPRING_SWAP, delay },
  }),
  exit: (delay: number = 0) => ({
    opacity: 0,
    y: "-105%",
    filter: ROLL_BLUR,
    transition: { duration: 0.16, ease: EASE_OUT, delay: delay * 0.5 },
  }),
};

type TextCascadeProps = {
  /** Current text. Changing it cascades the letters to the new value. */
  text: string;
  className?: string;
};

/**
 * Letter-by-letter slot roll — old letters drop away as new ones land, left to right.
 */
export function TextCascade({ text, className }: TextCascadeProps) {
  const reduce = useMotionReduced();
  const measureRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutEffect(() => {
    const nextWidth = measureRef.current?.offsetWidth;
    if (!nextWidth) return;
    setWidth((currentWidth) =>
      currentWidth === nextWidth ? currentWidth : nextWidth,
    );
  }, [text]);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden whitespace-nowrap align-bottom",
        className,
      )}
      style={{
        width,
        transition: `width 220ms ${EASE_OUT_CSS}`,
      }}
    >
      <span
        ref={measureRef}
        aria-hidden
        className="invisible inline-block whitespace-nowrap"
      >
        {text}
      </span>
      <span className="sr-only">{text}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={text}
          aria-hidden
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 inset-s-0 inline-block whitespace-pre"
        >
          {text.split("").map((char, index) => (
            <motion.span
              // Position is the slot identity — the letter at a position is what rolls.
              key={index}
              custom={index * CASCADE_STAGGER}
              variants={CASCADE_LETTER_VARIANTS}
              className="inline-block whitespace-pre will-change-[opacity,filter,transform]"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
