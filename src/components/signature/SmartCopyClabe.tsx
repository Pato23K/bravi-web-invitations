"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy } from "@/components/common/icons";
import { Toast } from "@/components/common/Toast";
import { clabeDigits, formatClabe } from "@/lib/clabe";

export interface SmartCopyClabeProps {
  clabe: string;
  toastMessage?: string;
}

const TOAST_DURATION_MS = 2500;

/** Respaldo para navegadores sin Clipboard API o fuera de HTTPS. */
function legacyCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try { return document.execCommand("copy"); }
  catch { return false; }
  finally { textarea.remove(); }
}

/** Comp. 8 · Plan Signature. Copia la CLABE con navigator.clipboard.writeText y muestra un Toast. */
export function SmartCopyClabe({ clabe, toastMessage = "CLABE copiada al portapapeles" }: SmartCopyClabeProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);
  const digits = clabeDigits(clabe);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleCopy = async () => {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(digits);
        ok = true;
      } else {
        ok = legacyCopy(digits);
      }
    } catch {
      ok = legacyCopy(digits);
    }
    setError(!ok);
    if (!ok) return;

    setCopied(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), TOAST_DURATION_MS);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-dashed border-accent px-4 py-2 text-base tracking-wide tabular-nums text-foreground transition-colors active:bg-accent/15"
        aria-label={`Copiar CLABE ${formatClabe(digits)}`}
      >
        {formatClabe(digits)}
        {copied ? (
          <IconCheck className="h-5 w-5 text-primary" />
        ) : (
          <IconCopy className="h-5 w-5 text-primary" />
        )}
      </button>
      <span className="mt-2 block text-xs text-foreground/55">Toca el número para copiarlo</span>
      {error && <p role="status" className="mt-2 text-sm">No se pudo copiar. Selecciona este número manualmente: <span className="select-all">{digits}</span></p>}
      <Toast message={toastMessage} visible={copied} />
    </>
  );
}
