import { isPlanId, type PlanId } from "@/config/plans";

/**
 * Modo demo: permite alternar el plan con ?plan= y ver los apartados
 * bloqueados con ?preview=1. Siempre activo en desarrollo; en producción
 * solo si BRAVI_DEMO_MODE=true (para que un invitado no pueda "desbloquear"
 * apartados cambiando la URL).
 */
export function isDemoMode(): boolean {
  return process.env.NODE_ENV === "development" || process.env.BRAVI_DEMO_MODE === "true";
}

type SearchParamValue = string | string[] | undefined;

function firstValue(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function resolveDemoOverrides(
  params: Record<string, SearchParamValue>,
  contractedPlan: PlanId,
  enabled = isDemoMode(),
): { plan: PlanId; preview: boolean; demo: boolean } {
  if (!enabled) {
    return { plan: contractedPlan, preview: false, demo: false };
  }

  const requested = firstValue(params.plan);
  return {
    plan: isPlanId(requested) ? requested : contractedPlan,
    preview: firstValue(params.preview) === "1",
    demo: true,
  };
}
