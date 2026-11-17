import type { ReactNode } from "react";
import { CoverIntro } from "@/components/common/CoverIntro";
import { PlanGate } from "@/components/common/PlanGate";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AccommodationCards } from "@/components/elite/AccommodationCards";
import { EventItineraryTimeline } from "@/components/elite/EventItineraryTimeline";
import { BasicGiftRegistry } from "@/components/esencial/BasicGiftRegistry";
import { LocationMaps } from "@/components/esencial/LocationMaps";
import { EventCountdown } from "@/components/express/EventCountdown";
import { HeroVideo } from "@/components/express/HeroVideo";
import { RsvpButton } from "@/components/express/RsvpButton";
import { DressCode } from "@/components/signature/DressCode";
import { GlobalAudioPlayer } from "@/components/signature/GlobalAudioPlayer";
import { PhotoGallery } from "@/components/signature/PhotoGallery";
import { getFeatureAccess, type PlanContext } from "@/config/plans";
import { TEMPLATES } from "@/config/templates";
import { formatEventDate } from "@/lib/date";
import { themeToCssVars } from "@/lib/theme";
import type { InvitationConfig, SectionId } from "@/types/invitation";

export interface InvitationTemplateProps { config: InvitationConfig; planContext: PlanContext }

// PERSONALIZAR: sectionOrder reordena estos módulos; los omitidos se agregan al final.
export const DEFAULT_SECTION_ORDER: SectionId[] = ["hero", "countdown", "story", "gallery", "location", "itinerary", "dressCode", "giftRegistry", "accommodations", "rsvp"];

export function InvitationTemplate({ config, planContext }: InvitationTemplateProps) {
  const { event } = config;
  const dates = formatEventDate(event.date, event.timeZone);
  const templateId = config.template ?? "romantic-classic";
  const template = TEMPLATES[templateId];
  const theme = { ...template.palette, ...(getFeatureAccess(planContext, "customTheme") === "enabled" ? config.theme : {}) };
  const smartCopy = getFeatureAccess(planContext, "smartCopyClabe") === "enabled";
  const sections: Record<SectionId, ReactNode> = {
    story: config.story ? <section id="historia" className="px-6 py-16 text-center"><SectionHeading eyebrow="Nuestra historia" title={config.story.title} /><p className="mx-auto max-w-xl text-lg leading-relaxed">{config.story.text}</p></section> : null,
    hero: <HeroVideo {...config.hero} hosts={event.hosts} shortDate={dates.shortDate} nextId={getFeatureAccess(planContext, "countdown") === "enabled" ? "cuenta-regresiva" : undefined} />,
    countdown: <EventCountdown targetDate={event.date} fullDate={dates.fullDate} time={dates.time} message={event.welcomeMessage} />,
    gallery: config.gallery?.length ? <PhotoGallery photos={config.gallery} title={config.galleryTitle ?? "Momentos para recordar"} /> : null,
    location: config.locations?.length ? <LocationMaps venues={config.locations} /> : null,
    itinerary: config.itinerary?.length ? <EventItineraryTimeline items={config.itinerary} /> : null,
    dressCode: config.dressCode ? <DressCode {...config.dressCode} /> : null,
    giftRegistry: config.giftRegistry ? <BasicGiftRegistry {...config.giftRegistry} smartCopy={smartCopy} /> : null,
    accommodations: config.accommodations?.length ? <AccommodationCards hotels={config.accommodations} /> : null,
    rsvp: <RsvpButton {...config.rsvp} />,
  };
  const order = [...new Set([...(config.sectionOrder ?? []), ...DEFAULT_SECTION_ORDER])];
  return (
    <div className="invitation" data-template={templateId} data-plan={planContext.plan}
      data-decoration={config.decorations ?? template.decoration}
      style={themeToCssVars(theme, { ...template.design, ...config.design })}>
      <a href="#invitation-content" className="skip-link">Saltar al contenido</a>
      {(config.opening ?? template.opening) && <CoverIntro hosts={event.hosts} eventType={event.type} shortDate={dates.shortDate} />}
      <main id="invitation-content" tabIndex={-1} className="invitation-content">
        {order.map((id) => sections[id] ? (
          <PlanGate key={id} feature={id} planContext={planContext}>
            {id === "hero" ? sections[id] : <ScrollReveal>{sections[id]}</ScrollReveal>}
          </PlanGate>
        ) : null)}
        <footer className="px-6 pb-24 pt-8 text-center text-xs uppercase tracking-[0.35em] text-foreground/70">Hecho con BRAVI</footer>
        {config.audio?.src && <PlanGate feature="audio" planContext={planContext} previewContent={false}><GlobalAudioPlayer {...config.audio} /></PlanGate>}
      </main>
    </div>
  );
}
