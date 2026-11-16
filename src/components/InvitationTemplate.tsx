import { CoverIntro } from "@/components/common/CoverIntro";
import { PlanGate } from "@/components/common/PlanGate";
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
import { formatEventDate } from "@/lib/date";
import { DEFAULT_THEME, themeToCssVars } from "@/lib/theme";
import type { InvitationConfig } from "@/types/invitation";

export interface InvitationTemplateProps {
  config: InvitationConfig;
  planContext: PlanContext;
}

/**
 * Plantilla Maestra BRAVI: contiene todos los apartados (plan Elite) y cada uno
 * se activa o bloquea con <PlanGate> según el plan. El orden de las secciones
 * se cambia aquí.
 */
export function InvitationTemplate({ config, planContext }: InvitationTemplateProps) {
  const { event } = config;
  const dates = formatEventDate(event.date, event.timeZone);

  // La paleta personalizada es del plan Esencial en adelante.
  const theme = getFeatureAccess(planContext, "customTheme") === "enabled" ? config.theme : DEFAULT_THEME;
  const smartCopy = getFeatureAccess(planContext, "smartCopyClabe") === "enabled";

  return (
    <div style={themeToCssVars(theme)} className="bg-background text-foreground">
      <main className="relative mx-auto min-h-screen w-full max-w-md overflow-x-clip bg-background shadow-[0_0_60px_-20px_rgba(0,0,0,0.25)]">
        <CoverIntro hosts={event.hosts} eventType={event.type} shortDate={dates.shortDate} />

        {/* ---------- Fase 1 · Express ---------- */}
        <PlanGate feature="hero" planContext={planContext}>
          <HeroVideo
            videoSrc={config.hero.videoSrc}
            posterSrc={config.hero.posterSrc}
            eyebrow={config.hero.eyebrow}
            hosts={event.hosts}
            shortDate={dates.shortDate}
          />
        </PlanGate>

        <PlanGate feature="countdown" planContext={planContext}>
          <EventCountdown
            targetDate={event.date}
            fullDate={dates.fullDate}
            time={dates.time}
            message={event.welcomeMessage}
          />
        </PlanGate>

        {/* ---------- Fase 3 · Signature ---------- */}
        <PlanGate feature="gallery" planContext={planContext}>
          <PhotoGallery photos={config.gallery} />
        </PlanGate>

        {/* ---------- Fase 2 · Esencial ---------- */}
        <PlanGate feature="location" planContext={planContext}>
          <LocationMaps venues={config.locations} />
        </PlanGate>

        {/* ---------- Fase 4 · Elite ---------- */}
        <PlanGate feature="itinerary" planContext={planContext}>
          <EventItineraryTimeline items={config.itinerary} />
        </PlanGate>

        {/* ---------- Fase 3 · Signature ---------- */}
        <PlanGate feature="dressCode" planContext={planContext}>
          <DressCode {...config.dressCode} />
        </PlanGate>

        {/* ---------- Fase 2 · Esencial (+ copiado inteligente en Signature) ---------- */}
        <PlanGate feature="giftRegistry" planContext={planContext}>
          <BasicGiftRegistry {...config.giftRegistry} smartCopy={smartCopy} />
        </PlanGate>

        {/* ---------- Fase 4 · Elite ---------- */}
        <PlanGate feature="accommodations" planContext={planContext}>
          <AccommodationCards hotels={config.accommodations} />
        </PlanGate>

        {/* ---------- Fase 1 · Express ---------- */}
        <PlanGate feature="rsvp" planContext={planContext}>
          <RsvpButton {...config.rsvp} />
        </PlanGate>

        <footer className="px-6 pb-24 pt-8 text-center text-xs uppercase tracking-[0.35em] text-foreground/45">
          Hecho con BRAVI
        </footer>

        {/* ---------- Fase 3 · Signature (botón flotante) ---------- */}
        <PlanGate feature="audio" planContext={planContext} previewContent={false}>
          <GlobalAudioPlayer src={config.audio.src} title={config.audio.title} />
        </PlanGate>
      </main>
    </div>
  );
}
