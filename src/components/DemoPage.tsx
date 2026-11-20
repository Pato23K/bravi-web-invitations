import { InvitationTemplate } from "@/components/InvitationTemplate";
import { PlanSwitcher } from "@/components/common/PlanSwitcher";
import { invitation } from "@/config/invitation";
import { invitations, EXAMPLE_LABELS } from "@/config/examples";
import { isOpeningStyle, type OpeningChoice } from "@/config/openings";
import { isTemplateId } from "@/config/templates";
import { resolveDemoOverrides, isDemoMode } from "@/lib/demo";

export type DemoParams = Record<string, string | string[] | undefined>;
const first = (value: DemoParams[string]) => Array.isArray(value) ? value[0] : value;

export function DemoPage({ params, action = "/" }: { params: DemoParams; action?: string }) {
  const exampleParam = first(params.example);
  const enabled = action === "/demo" || isDemoMode();
  const example = enabled && exampleParam && Object.hasOwn(EXAMPLE_LABELS, exampleParam) && Object.hasOwn(invitations, exampleParam) ? exampleParam : "boda";
  const base = invitations[example] ?? invitation;
  const { plan, preview, demo } = resolveDemoOverrides(params, base.plan, enabled);
  const requestedTemplate = first(params.template);
  const template = demo && isTemplateId(requestedTemplate) ? requestedTemplate : base.template ?? "romantic-classic";
  const requestedOpening = demo ? first(params.opening) : undefined;
  const openingChoice: OpeningChoice = requestedOpening === "none" || isOpeningStyle(requestedOpening)
    ? requestedOpening : "default";
  let opening = template === (base.template ?? "romantic-classic") ? base.opening : undefined;
  if (openingChoice === "none") opening = false;
  else if (openingChoice !== "default") opening = openingChoice;
  const config = { ...base, template, opening };
  const viewport = demo && first(params.viewport) === "mobile" ? "mobile" : "desktop";
  return <>
    {demo && first(params.standalone) !== "1" && <PlanSwitcher key={JSON.stringify(params)} openingChoice={openingChoice} currentPlan={plan} preview={preview} template={template} example={example} viewport={viewport} config={config} action={action} />}
    <div className={viewport === "mobile" ? "preview-mobile" : undefined}>
      <InvitationTemplate key={`${example}-${template}-${plan}-${openingChoice}`} config={config} planContext={{ plan, preview, hiddenSections: config.hiddenSections ?? [] }} />
    </div>
  </>;
}
