import { IconClock, IconMapPin, IconNavigation } from "@/components/common/icons";
import { SectionHeading } from "@/components/common/SectionHeading";
import { googleMapsUrl, wazeUrl } from "@/lib/deep-links";
import type { Venue } from "@/types/invitation";

export interface LocationMapsProps {
  venues: Venue[];
}

const buttonClass =
  "flex w-full items-center justify-center gap-2 rounded-full border border-primary px-5 py-3.5 text-sm uppercase tracking-[0.18em] text-primary transition-colors active:bg-primary active:text-on-primary";

/** Comp. 4 · Plan Esencial. Dirección + botones anchos a Google Maps y Waze. */
export function LocationMaps({ venues }: LocationMapsProps) {
  return (
    <section id="ubicacion" className="px-6 py-16">
      <SectionHeading eyebrow="Acompáñanos" title="Ubicación" />

      <div className="space-y-6">
        {venues.map((venue) => (
          <article
            key={`${venue.label}-${venue.venueName}`}
            className="rounded-3xl border border-accent/50 bg-surface px-6 py-8 text-center shadow-sm"
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-foreground/60">{venue.label}</p>
            <h3 className="mt-2 font-script text-4xl text-primary">{venue.venueName}</h3>

            {venue.time && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-foreground/80">
                <IconClock className="h-4 w-4 text-accent" />
                {venue.time}
              </p>
            )}
            <p className="mt-2 flex items-start justify-center gap-1.5 text-foreground/80">
              <IconMapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span>{venue.address}</span>
            </p>

            <div className="mt-6 space-y-3">
              <a href={googleMapsUrl(venue)} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                <IconMapPin className="h-4 w-4" />
                Abrir en Google Maps
              </a>
              <a href={wazeUrl(venue)} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                <IconNavigation className="h-4 w-4" />
                Abrir en Waze
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
