import { homeAppointment } from "../../data/home";
import { LocateCta } from "../marketing/LocateCta";

/** Home appointment band - LocateCta with homeAppointment data. */
export function HomeAppointment() {
  return (
    <LocateCta
      title={homeAppointment.title}
      titleId="home-appointment-title"
      description={homeAppointment.description}
      ctaLabel={homeAppointment.ctaLabel}
      image={homeAppointment.image}
    />
  );
}
