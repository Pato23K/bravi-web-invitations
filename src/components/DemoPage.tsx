import { InvitationTemplate } from "@/components/InvitationTemplate";
import { PlanSwitcher } from "@/components/common/PlanSwitcher";
import { invitation } from "@/config/invitation";
import { invitations } from "@/config/examples";
import { isTemplateId } from "@/config/templates";
import { resolveDemoOverrides, isDemoMode } from "@/lib/demo";

export type DemoParams = Record<string, string | string[] | undefined>;
const first = (value: DemoParams[string]) => Array.isArray(value) ? value[0] : value;

export function DemoPage({ params, action = "/" }: { params: DemoParams; action?: string }) {
  const exampleParam = first(params.example);
  const example = isDemoMode() && exampleParam && Object.hasOwn(invitations, exampleParam) ? exampleParam : "boda";
  const base = invitations[example] ?? invitation;
  const { plan, preview, demo } = resolveDemoOverrides(params, base.plan);
  const requestedTemplate = first(params.template);
  const template = demo && isTemplateId(requestedTemplate) ? requestedTemplate : base.template ?? "romantic-classic";
  const config = { ...base, template, ...(demo && isTemplateId(requestedTemplate) ? { opening: undefined } : {}) };
  const viewport = demo && first(params.viewport) === "mobile" ? "mobile" : "desktop";
  return <>
    {demo && <PlanSwitcher key={JSON.stringify(params)} currentPlan={plan} preview={preview} template={template} example={example} viewport={viewport} config={config} action={action} />}
    <div className={viewport === "mobile" ? "preview-mobile" : undefined}>
      <InvitationTemplate key={`${example}-${template}-${plan}`} config={config} planContext={{ plan, preview, hiddenSections: config.hiddenSections ?? [] }} />
    </div>
  </>;
}
