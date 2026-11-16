import type { ReactNode } from "react";
import { getFeatureAccess, type FeatureId, type PlanContext } from "@/config/plans";
import { LockedSection } from "./LockedSection";

interface PlanGateProps {
  feature: FeatureId;
  planContext: PlanContext;
  children: ReactNode;
  /**
   * Si es false, en vista previa se muestra solo la tarjeta del candado sin
   * renderizar el contenido detrás (útil para elementos flotantes como el audio).
   */
  previewContent?: boolean;
}

/**
 * Envuelve un apartado y decide si se muestra según el plan:
 * - incluido en el plan → se muestra normal
 * - fuera del plan + vista previa → se muestra con candado
 * - fuera del plan (producción) u oculto por el cliente → no se renderiza
 */
export function PlanGate({ feature, planContext, children, previewContent = true }: PlanGateProps) {
  const access = getFeatureAccess(planContext, feature);

  if (access === "enabled") return <>{children}</>;
  if (access === "hidden") return null;

  return <LockedSection feature={feature}>{previewContent ? children : null}</LockedSection>;
}
