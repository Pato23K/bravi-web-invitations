import Link from "next/link";
import { PLAN_LABELS, PLANS, type PlanId } from "@/config/plans";

interface PlanSwitcherProps {
  currentPlan: PlanId;
  preview: boolean;
}

function buildHref(plan: PlanId, preview: boolean) {
  return preview ? `/?plan=${plan}&preview=1` : `/?plan=${plan}`;
}

/** Barra de pruebas para alternar planes. Solo aparece en modo demo. */
export function PlanSwitcher({ currentPlan, preview }: PlanSwitcherProps) {
  return (
    <nav
      aria-label="Cambiar plan (modo demo)"
      className="fixed inset-x-0 top-0 z-[60] mx-auto flex max-w-md items-center gap-1 overflow-x-auto bg-black/70 px-2 py-1.5 font-sans text-[11px] text-white backdrop-blur no-scrollbar"
    >
      <span className="shrink-0 px-1 opacity-70">Demo</span>
      {PLANS.map((plan) => (
        <Link
          key={plan}
          href={buildHref(plan, preview)}
          scroll={false}
          aria-current={plan === currentPlan ? "page" : undefined}
          className={`shrink-0 rounded-full px-2.5 py-1 ${
            plan === currentPlan ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
          }`}
        >
          {PLAN_LABELS[plan]}
        </Link>
      ))}
      <Link
        href={buildHref(currentPlan, !preview)}
        scroll={false}
        aria-pressed={preview}
        title="Mostrar con candado los apartados fuera del plan"
        className={`ml-auto shrink-0 rounded-full border px-2.5 py-1 ${
          preview ? "border-white bg-white text-black" : "border-white/40"
        }`}
      >
        Bloqueados
      </Link>
    </nav>
  );
}
