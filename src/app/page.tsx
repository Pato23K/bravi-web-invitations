import { InvitationTemplate } from "@/components/InvitationTemplate";
import { PlanSwitcher } from "@/components/common/PlanSwitcher";
import { invitation } from "@/config/invitation";
import { resolveDemoOverrides } from "@/lib/demo";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Vista principal. El plan sale de src/config/invitation.ts.
 * En modo demo (npm run dev) se puede alternar con:
 *   /?plan=express   /?plan=esencial   /?plan=signature   /?plan=elite
 * y agregar &preview=1 para ver con candado los apartados fuera del plan.
 */
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const { plan, preview, demo } = resolveDemoOverrides(params, invitation.plan);

  return (
    <>
      {demo && <PlanSwitcher currentPlan={plan} preview={preview} />}
      <InvitationTemplate
        config={invitation}
        planContext={{ plan, preview, hiddenSections: invitation.hiddenSections ?? [] }}
      />
    </>
  );
}
