import type { ReactNode } from "react";
import { FEATURE_LABELS, PLAN_LABELS, requiredPlan, type FeatureId } from "@/config/plans";
import { IconLock } from "./icons";

interface LockedSectionProps {
  feature: FeatureId;
  /** Contenido real del apartado; se muestra difuminado y sin interacción. */
  children?: ReactNode;
}

/** Vista previa de un apartado que no incluye el plan actual (solo en modo demo). */
export function LockedSection({ feature, children }: LockedSectionProps) {
  const planLabel = PLAN_LABELS[requiredPlan(feature)];

  return (
    <div className="relative overflow-hidden border-y border-dashed border-accent/60">
      {children && (
        <div inert aria-hidden="true" className="pointer-events-none max-h-80 select-none opacity-60 blur-[3px]">
          {children}
        </div>
      )}

      <div
        className={`${
          children ? "absolute inset-0" : "relative py-10"
        } flex items-center justify-center bg-gradient-to-b from-background/40 via-background/85 to-background/40 px-6`}
      >
        <div className="flex max-w-xs flex-col items-center rounded-2xl border border-accent/50 bg-surface/95 px-6 py-5 text-center shadow-sm">
          <IconLock className="mb-2 h-6 w-6 text-primary" />
          <p className="text-lg font-medium text-foreground">{FEATURE_LABELS[feature]}</p>
          <p className="mt-1 text-sm uppercase tracking-[0.2em] text-foreground/60">
            Disponible en plan {planLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
