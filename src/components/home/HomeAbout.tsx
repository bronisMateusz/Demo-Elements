import { homeAbout } from "../../data/home";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { BrandMotif } from "../brand/BrandMotif";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";

export function HomeAbout() {
  const { title, lead, subtitle, body, image } = homeAbout;

  return (
    <Section
      ariaLabelledby="home-about-title"
      className="relative overflow-hidden bg-gold-100"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <BrandMotif
          name="dots-grid"
          className="absolute top-6 inset-e-4 h-32 w-8 opacity-30 max-md:hidden md:top-8 md:inset-e-6 md:h-40 md:w-9"
        />
        <BrandMotif
          name="arc-dark"
          className="absolute -inset-e-14 -bottom-20 size-52 opacity-25 max-md:hidden"
        />
      </div>

      <Container size="content" className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="relative min-w-0">
            <TextRevealLead
              id="home-about-title"
              revealUnit="word"
              className="max-w-xl"
              typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
              mutedClassName="text-neutral-900/20"
              fillClassName="text-neutral-900"
            >
              {title}
            </TextRevealLead>
            <p className="mt-5 mb-0 text-sm leading-relaxed text-neutral-700 md:text-ui">
              {lead}
            </p>
            <h3 className="mt-8 mb-0 font-heading text-h4 leading-snug font-medium text-neutral-900">
              {subtitle}
            </h3>
            <p className="mt-3 mb-0 text-sm leading-relaxed text-neutral-600 md:text-ui">
              {body.map((part, index) =>
                typeof part === "string" ? (
                  <span key={index}>{part}</span>
                ) : (
                  <strong key={index} className="font-semibold text-neutral-800">
                    {part.bold}
                  </strong>
                ),
              )}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xs bg-neutral-200">
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-4/5 w-full object-cover"
              style={{ objectPosition: productImageObjectPosition(image) }}
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
