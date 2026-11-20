import { IconWhatsApp } from "@/components/common/icons";
import { SectionHeading } from "@/components/common/SectionHeading";
import { whatsappUrl } from "@/lib/deep-links";

export interface RsvpButtonProps {
  phone: string;
  message: string;
  deadline?: string;
  label?: string;
}

/** Comp. 3 · Plan Express. Botón sólido que abre WhatsApp con un mensaje predeterminado. */
export function RsvpButton({ phone, message, deadline, label = "Confirmar Asistencia" }: RsvpButtonProps) {
  return (
    <section id="confirmar" className="px-6 py-16 text-center">
      <SectionHeading eyebrow="R.S.V.P." title="Confirma tu asistencia" subtitle={deadline} />

      {/^[0]+$/.test(phone.replace(/\D/g, "")) ? (
        <details className="mx-auto max-w-md rounded-xl border border-accent p-4">
          <summary className="cursor-pointer">Ver mensaje de confirmación de muestra</summary>
          <p className="mt-4">{message}</p>
        </details>
      ) : <a
        href={whatsappUrl(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-on-primary shadow-md transition-transform active:scale-[0.98]"
      >
        <IconWhatsApp className="h-5 w-5" />
        {label}
      </a>}
    </section>
  );
}
