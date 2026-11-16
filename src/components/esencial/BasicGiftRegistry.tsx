import { IconExternal, IconGift } from "@/components/common/icons";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SmartCopyClabe } from "@/components/signature/SmartCopyClabe";
import { formatClabe } from "@/lib/clabe";
import type { GiftRegistryConfig } from "@/types/invitation";

export interface BasicGiftRegistryProps extends GiftRegistryConfig {
  /**
   * Plan Signature+: la CLABE se copia al tocarla (Comp. 8 · SmartCopyClabe).
   * En Esencial se muestra como texto plano.
   */
  smartCopy: boolean;
}

/** Comp. 5 · Plan Esencial. Mensaje de agradecimiento, datos bancarios y tiendas. */
export function BasicGiftRegistry({ message, bankAccount, stores, smartCopy }: BasicGiftRegistryProps) {
  return (
    <section id="regalos" className="px-6 py-16">
      <SectionHeading eyebrow="Con cariño" title="Mesa de regalos" />

      <div className="rounded-3xl border border-accent/50 bg-surface px-6 py-8 text-center shadow-sm">
        <IconGift className="mx-auto h-9 w-9 text-accent" />
        <p className="mx-auto mt-4 max-w-xs text-lg italic text-foreground/80">{message}</p>

        {bankAccount && (
          <dl className="mt-8 space-y-4 border-t border-accent/30 pt-6">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.3em] text-foreground/60">Banco</dt>
              <dd className="text-lg">{bankAccount.bank}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.3em] text-foreground/60">Titular</dt>
              <dd className="text-lg">{bankAccount.holder}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.3em] text-foreground/60">CLABE interbancaria</dt>
              <dd className="mt-1">
                {smartCopy ? (
                  <SmartCopyClabe clabe={bankAccount.clabe} />
                ) : (
                  <span className="whitespace-nowrap text-base tracking-wide tabular-nums select-all">
                    {formatClabe(bankAccount.clabe)}
                  </span>
                )}
              </dd>
            </div>
          </dl>
        )}

        {stores.length > 0 && (
          <div className="mt-8 space-y-3 border-t border-accent/30 pt-6">
            {stores.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between gap-3 rounded-full border border-primary px-5 py-3 text-left text-primary transition-colors active:bg-primary active:text-on-primary"
              >
                <span>
                  <span className="block text-sm uppercase tracking-[0.18em]">{store.name}</span>
                  {store.eventCode && (
                    <span className="block text-xs text-foreground/60">Evento: {store.eventCode}</span>
                  )}
                </span>
                <IconExternal className="h-4 w-4 shrink-0" />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
