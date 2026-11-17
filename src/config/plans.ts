/**
 * Sistema de planes de la Plantilla Maestra BRAVI.
 *
 * La plantilla contiene TODO el código (plan Elite). Cada apartado declara el
 * plan mínimo que lo incluye; si el plan contratado es menor, el apartado se
 * bloquea (se oculta, o se muestra con candado en modo vista previa).
 *
 * Para mover un apartado de plan basta con cambiar su valor en FEATURE_MIN_PLAN.
 */

export const PLANS = ["express", "esencial", "signature", "elite"] as const;

export type PlanId = (typeof PLANS)[number];

export const PLAN_PRICES: Record<PlanId, number> = { express: 390, esencial: 690, signature: 1190, elite: 1890 };

export const PLAN_LABELS: Record<PlanId, string> = {
  express: "Express",
  esencial: "Esencial",
  signature: "Signature",
  elite: "Elite",
};

/** Plan mínimo que incluye cada apartado (herencia progresiva Express → Elite). */
export const FEATURE_MIN_PLAN = {
  // Fase 1 · Express
  hero: "express",
  countdown: "express",
  rsvp: "express",
  // Fase 2 · Esencial
  customTheme: "esencial",
  location: "esencial",
  giftRegistry: "esencial",
  story: "esencial",
  // Fase 3 · Signature
  audio: "signature",
  gallery: "signature",
  dressCode: "signature",
  smartCopyClabe: "signature",
  // Fase 4 · Elite
  itinerary: "elite",
  accommodations: "elite",
} as const satisfies Record<string, PlanId>;

export type FeatureId = keyof typeof FEATURE_MIN_PLAN;

/** Nombre visible de cada apartado (se usa en los avisos de "bloqueado"). */
export const FEATURE_LABELS: Record<FeatureId, string> = {
  hero: "Portada con video",
  countdown: "Cuenta regresiva",
  rsvp: "Confirmación por WhatsApp",
  customTheme: "Paleta de colores personalizada",
  location: "Ubicaciones y mapas",
  giftRegistry: "Mesa de regalos",
  story: "Historia del evento",
  audio: "Música de fondo",
  gallery: "Galería de fotos",
  dressCode: "Código de vestimenta",
  smartCopyClabe: "Copiado inteligente de CLABE",
  itinerary: "Itinerario del evento",
  accommodations: "Sugerencias de hospedaje",
};

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && (PLANS as readonly string[]).includes(value);
}

/** ¿El plan contratado incluye este apartado? */
export function hasFeature(plan: PlanId, feature: FeatureId): boolean {
  return PLANS.indexOf(plan) >= PLANS.indexOf(FEATURE_MIN_PLAN[feature]);
}

export function requiredPlan(feature: FeatureId): PlanId {
  return FEATURE_MIN_PLAN[feature];
}

/**
 * Contexto con el que se decide qué se muestra en una invitación.
 * - plan: plan contratado (o el forzado por ?plan= en modo demo).
 * - preview: si es true, los apartados fuera del plan se ven con candado.
 * - hiddenSections: apartados que el cliente pidió quitar aunque su plan los incluya.
 */
export interface PlanContext {
  plan: PlanId;
  preview: boolean;
  hiddenSections: readonly FeatureId[];
}

export type FeatureAccess = "enabled" | "locked" | "hidden";

export function getFeatureAccess(ctx: PlanContext, feature: FeatureId): FeatureAccess {
  if (ctx.hiddenSections.includes(feature)) return "hidden";
  if (hasFeature(ctx.plan, feature)) return "enabled";
  return ctx.preview ? "locked" : "hidden";
}
