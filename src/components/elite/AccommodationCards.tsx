import { SafeImage } from "@/components/common/SafeImage";
import { safeExternalUrl } from "@/lib/deep-links";
import { IconExternal, IconMapPin } from "@/components/common/icons";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Accommodation } from "@/types/invitation";

export interface AccommodationCardsProps {
  hotels: Accommodation[];
  title?: string;
}

/** Comp. 10 · Plan Elite. Tarjetas horizontales con scroll snap y botón de reserva externo. */
export function AccommodationCards({ hotels, title = "Hospedaje" }: AccommodationCardsProps) {
  if (hotels.length === 0) return null;

  return (
    <section id="hospedaje" className="py-16">
      <div className="px-6">
        <SectionHeading eyebrow="Para nuestros invitados" title={title} subtitle="Desliza para ver más opciones" />
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4">
        {hotels.map((hotel) => (
          <li
            key={hotel.name}
            className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-accent/40 bg-surface shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-accent/20">
              <SafeImage src={hotel.imageSrc} alt={hotel.name} fill sizes="(max-width: 767px) 78vw, 450px" className="object-cover" />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-2xl text-foreground">{hotel.name}</h3>
              {hotel.distance && (
                <p className="mt-1 flex items-center gap-1 text-sm text-foreground/65">
                  <IconMapPin className="h-3.5 w-3.5 text-accent" />
                  {hotel.distance}
                </p>
              )}
              {hotel.rate && <p className="mt-2 italic text-foreground/80">{hotel.rate}</p>}
              {hotel.discountCode && (
                <p className="mt-3 w-fit rounded-full bg-accent/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
                  Código: <span className="font-semibold">{hotel.discountCode}</span>
                </p>
              )}

              <a
                href={safeExternalUrl(hotel.bookingUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm uppercase tracking-[0.18em] text-on-primary active:scale-[0.98]"
              >
                Reservar
                <IconExternal className="h-4 w-4" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
