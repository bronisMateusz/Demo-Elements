import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "../../lib/cn";
import { pdpSectionScrollMarginClassName } from "../../constants/pdpSubnav";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import {
  sectionBandPaddingClassName,
  sectionHeaderTrackGapClassName,
} from "../../lib/layoutTokens";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Section } from "../structural/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

export type ProcessStepItem = {
  title: string;
  text: string;
};

type ProcessStepsProps = {
  id?: string;
  titleId: string;
  eyebrow?: string;
  title: string;
  items: readonly ProcessStepItem[];
  className?: string;
};

/**
 * Kelvin process-1 style: dark band, numbered steps on a dotted rail.
 * The rail fill advances with page scroll through the section.
 */
export function ProcessSteps({
  id,
  titleId,
  eyebrow,
  title,
  items,
  className,
}: ProcessStepsProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMotionReduced();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id={id}
      ariaLabelledby={titleId}
      className={cn(
        pdpSectionScrollMarginClassName,
        "bg-neutral-900",
        sectionBandPaddingClassName,
        className,
      )}
    >
      <Container size="content">
        <div
          className={cn(
            "flex max-w-3xl flex-col gap-4",
            sectionHeaderTrackGapClassName,
          )}
        >
          {eyebrow ? (
            <Eyebrow variant="gold" className="mb-0 text-neutral-0/70">
              {eyebrow}
            </Eyebrow>
          ) : null}
          <TextRevealLead
            id={titleId}
            revealUnit="word"
            typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
            mutedClassName="text-neutral-0/25"
            fillClassName="text-neutral-0"
          >
            {title}
          </TextRevealLead>
        </div>

        <div ref={railRef} className="relative">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-neutral-0/20 md:block"
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-neutral-0 md:block"
            style={{
              scaleX: reducedMotion ? 1 : lineScaleX,
              // Motion applies scale via transform; pin origin so fill grows LTR.
              transformOrigin: "0% 50%",
            }}
            aria-hidden="true"
          />

          <ol
            className={cn(
              "m-0 grid list-none grid-cols-1 gap-10 p-0",
              "sm:grid-cols-2 sm:gap-8",
              "md:grid-cols-4 md:gap-12 md:pt-10",
            )}
          >
            {items.map((item, index) => {
              const step = String(index + 1).padStart(2, "0");

              return (
                <li key={item.title} className="relative flex flex-col gap-4">
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-s-0 -top-10 hidden size-3 -translate-y-1/2 rounded-full",
                      "border-2 border-neutral-900 bg-neutral-0 md:block",
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-body text-5xl leading-none font-medium tracking-tight text-neutral-0/40 tabular-nums md:text-6xl">
                    {step}
                  </span>
                  <h3 className="m-0 font-heading text-h4 leading-[1.25] font-medium tracking-tight text-balance text-neutral-0">
                    {item.title}
                  </h3>
                  <p className="m-0 font-body text-sm leading-relaxed text-neutral-0/65 md:text-ui">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
