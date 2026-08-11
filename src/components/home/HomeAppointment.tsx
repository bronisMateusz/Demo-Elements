import { homeAppointment } from "../../data/home";
import { LocateCta } from "../marketing/LocateCta";

/** Home wrapper around shared LocateCta (same band as category / subcategory). */
export function HomeAppointment() {
  return (
    <LocateCta
      slogan={homeAppointment.slogan}
      title={homeAppointment.title}
      titleId="home-appointment-title"
      description={homeAppointment.description}
      ctaLabel={homeAppointment.ctaLabel}
      image={homeAppointment.image}
    />
  );
}
