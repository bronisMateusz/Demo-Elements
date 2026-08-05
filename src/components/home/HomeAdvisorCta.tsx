import { homeAdvisorCta } from "../../data/home";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { SplitMediaCta } from "../structural/SplitMediaCta";
import { Button } from "../ui/Button";

export function HomeAdvisorCta() {
  const { title, description, eyebrow, image, primaryCta, secondaryCta } =
    homeAdvisorCta;

  return (
    <SplitMediaCta
      titleId="home-advisor-cta-title"
      eyebrow={eyebrow}
      title={title}
      description={description}
      image={image}
      className="relative z-10 isolate py-[clamp(2rem,5vw,3rem)] md:py-[clamp(2.5rem,6vw,4rem)]"
      actions={
        <>
          <Button
            href={primaryCta.href}
            variant="primary"
            size="lg"
            className="w-full max-w-full px-5 whitespace-normal sm:w-auto sm:px-10 sm:whitespace-nowrap"
          >
            {primaryCta.label}
            <i className="ph ph-arrow-right" aria-hidden="true" />
          </Button>
          <Button
            as="button"
            type="button"
            variant="secondary"
            size="lg"
            className="w-full max-w-full px-5 whitespace-normal sm:w-auto sm:px-10 sm:whitespace-nowrap"
            onClick={requestSalonDrawer}
          >
            {secondaryCta.label}
          </Button>
        </>
      }
    />
  );
}
