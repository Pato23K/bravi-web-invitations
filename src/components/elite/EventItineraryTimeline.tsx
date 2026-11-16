import { ItineraryIconSvg } from "@/components/common/icons";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { ItineraryItem } from "@/types/invitation";

export interface EventItineraryTimelineProps {
  items: ItineraryItem[];
  title?: string;
}

/** Comp. 9 · Plan Elite. Línea de tiempo vertical: ícono SVG, hora exacta y actividad. */
export function EventItineraryTimeline({ items, title = "Itinerario" }: EventItineraryTimelineProps) {
  if (items.length === 0) return null;

  return (
    <section id="itinerario" className="px-6 py-16">
      <SectionHeading eyebrow="El gran día" title={title} />

      <ol className="relative mx-auto max-w-sm">
        {/* Línea vertical */}
        <span aria-hidden="true" className="absolute bottom-6 left-7 top-6 w-px bg-accent/60" />

        {items.map((item) => (
          <li key={`${item.time}-${item.title}`} className="relative flex items-center gap-5 py-4">
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent bg-background text-primary">
              <ItineraryIconSvg icon={item.icon} className="h-7 w-7" />
            </span>
            <div>
              <time className="text-sm uppercase tracking-[0.3em] text-foreground/60">{item.time}</time>
              <h3 className="font-script text-3xl leading-tight text-primary">{item.title}</h3>
              {item.description && <p className="italic text-foreground/70">{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
