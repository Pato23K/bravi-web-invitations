import Link from "next/link";
import { FEATURE_LABELS, FEATURE_MIN_PLAN, getFeatureAccess, PLAN_LABELS, PLAN_PRICES, PLANS, type FeatureId, type PlanId } from "@/config/plans";
import { TEMPLATES } from "@/config/templates";
import { EXAMPLE_LABELS } from "@/config/examples";
import type { InvitationConfig, TemplateId } from "@/types/invitation";

interface PlanSwitcherProps {
  currentPlan: PlanId; preview: boolean; template: TemplateId; example: string;
  viewport: string; config: InvitationConfig; action?: string;
}

/** Controles de demostración renderizados en servidor; no carga un editor en el navegador. */
export function PlanSwitcher({ currentPlan, preview, template, example, viewport, config, action = "/" }: PlanSwitcherProps) {
  const features = Object.keys(FEATURE_MIN_PLAN) as FeatureId[];
  return <aside className="demo-toolbar">
    <details open>
      <summary>BRAVI / Estudio de invitaciones · Datos y recursos de demostración</summary>
      <form action={action} className="demo-fields">
        <label>Evento<select name="example" defaultValue={example}>{Object.entries(EXAMPLE_LABELS).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
        <label>Plantilla<select name="template" defaultValue={template}>{Object.entries(TEMPLATES).map(([id, value]) => <option key={id} value={id}>{value.name}</option>)}</select></label>
        <label>Plan<select name="plan" defaultValue={currentPlan}>{PLANS.map(id => <option key={id} value={id}>{PLAN_LABELS[id]} · ${PLAN_PRICES[id].toLocaleString("es-MX")} MXN</option>)}</select></label>
        <label>Vista<select name="viewport" defaultValue={viewport}><option value="desktop">Adaptable / escritorio</option><option value="mobile">Móvil · 390 px</option></select></label>
        <label>Fuera del plan<select name="preview" defaultValue={preview ? "1" : "0"}><option value="0">Ocultar</option><option value="1">Mostrar bloqueados</option></select></label>
        <button type="submit">Actualizar vista</button>
        <Link href={`/invitaciones/${example}`} target="_blank">Abrir ejemplo ↗</Link>
      </form>
      <div className="demo-modules" aria-label="Módulos incluidos en el plan">
        {features.filter(feature => getFeatureAccess({ plan: currentPlan, preview: false, hiddenSections: config.hiddenSections ?? [] }, feature) === "enabled").map(feature => <span key={feature}>{FEATURE_LABELS[feature]}</span>)}
      </div>
      <p className="mt-3 opacity-80">Los módulos incluidos solo aparecen cuando tienen datos. Los enlaces y datos de contacto de las demos son ficticios.</p>
    </details>
  </aside>;
}
