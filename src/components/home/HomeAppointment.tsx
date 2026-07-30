import { cn } from "../../lib/cn";
import { homeAppointment } from "../../data/home";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Container } from "../ui/Container";

export function HomeAppointment() {
  const { slogan, title, description, ctaLabel, image } = homeAppointment;
  const [sloganLead, sloganTail] = slogan;

  return (
    <section
      aria-labelledby="home-appointment-title"
      className="py-[clamp(2rem,5vw,3rem)] md:py-[clamp(2.5rem,6vw,4rem)]"
    >
      <Container size="content">
        <div
          className={cn(
            "group/appointment grid overflow-hidden rounded-xs border border-neutral-800/10 bg-neutral-900",
            "lg:grid-cols-[0.82fr_1.18fr]",
          )}
        >
          <div className="relative flex min-h-44 items-center px-6 py-8 md:min-h-52 md:px-10 md:py-10">
            <img
              src={image.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: productImageObjectPosition(image) }}
              loading="lazy"
              draggable={false}
            />
            <div
              className="absolute inset-0 bg-neutral-950/55"
              aria-hidden="true"
            />
            <p className="relative z-10 m-0 max-w-[18ch] font-body text-sm font-semibold tracking-[0.06em] text-neutral-0 uppercase md:text-base">
              {sloganLead}
              <br />
              {sloganTail}
            </p>
          </div>

          <div className="relative flex flex-col items-start justify-center gap-3 overflow-hidden border-t border-neutral-0/10 px-6 py-8 md:gap-4 md:border-t-0 md:border-s md:px-10 md:py-10">
            <div
              className="pointer-events-none absolute inset-0 bg-radial-[at_0%_0%] from-gold-500/22 to-transparent to-58%"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 inset-e-0 w-1/3 bg-radial-[at_100%_50%] from-gold-50/7 to-transparent to-70%"
              aria-hidden="true"
            />

            <h2
              id="home-appointment-title"
              className="relative m-0 font-heading text-[clamp(1.125rem,1.75vw,1.375rem)] leading-[1.1] tracking-tight text-neutral-0"
            >
              {title}
            </h2>
            <p className="relative m-0 max-w-prose font-body text-sm leading-relaxed text-neutral-400">
              {description}
            </p>
            <button
              type="button"
              className={cn(
                "relative mt-1 inline-flex items-center gap-2 font-body text-sm font-medium text-gold-400",
                "transition-[color,gap] duration-fast ease-out hover:gap-3 hover:text-gold-100",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
              )}
              onClick={requestSalonDrawer}
            >
              {ctaLabel}
              <i className="ph ph-arrow-right text-sm" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
