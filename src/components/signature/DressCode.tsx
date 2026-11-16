import { IconDress, IconSuit } from "@/components/common/icons";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { DressCodeConfig } from "@/types/invitation";

export type DressCodeProps = DressCodeConfig;

/** Comp. 7b · Plan Signature. Ilustración SVG de traje y vestido + código de vestimenta. */
export function DressCode({ code, description }: DressCodeProps) {
  return (
    <section id="vestimenta" className="px-6 py-16 text-center">
      <SectionHeading eyebrow="Código de vestimenta" title="Dress Code" />

      <div className="flex items-end justify-center gap-6 text-primary">
        <IconSuit className="h-28 w-28" />
        <IconDress className="h-28 w-28" />
      </div>

      <p className="mt-6 text-3xl uppercase tracking-[0.3em] text-foreground">{code}</p>
      {description && <p className="mx-auto mt-3 max-w-xs text-lg italic text-foreground/75">{description}</p>}
    </section>
  );
}
