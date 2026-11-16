"use client";

import { useEffect, useState } from "react";
import { INVITATION_OPEN_EVENT } from "@/lib/events";
import { Ornament } from "./SectionHeading";

interface CoverIntroProps {
  hosts: string[];
  eventType: string;
  shortDate: string;
}

type CoverState = "closed" | "opening" | "gone";

const OPEN_DURATION_MS = 1200;

/**
 * Portada "Abrir invitación". Al tocarla:
 * 1. Dispara INVITATION_OPEN_EVENT dentro del mismo gesto del usuario, así el
 *    reproductor de audio (plan Signature+) puede iniciar la música sin bloqueo.
 * 2. Abre dos paneles tipo cortina y desaparece.
 */
export function CoverIntro({ hosts, eventType, shortDate }: CoverIntroProps) {
  const [state, setState] = useState<CoverState>("closed");
  const initials = hosts.map((name) => name.charAt(0).toUpperCase());

  // Bloquea el scroll mientras la portada está visible.
  useEffect(() => {
    if (state === "gone") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [state]);

  useEffect(() => {
    if (state !== "opening") return;
    const timer = window.setTimeout(() => setState("gone"), OPEN_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  if (state === "gone") return null;

  const handleOpen = () => {
    if (state !== "closed") return;
    window.dispatchEvent(new Event(INVITATION_OPEN_EVENT));
    setState("opening");
  };

  const isOpening = state === "opening";
  const panelBase =
    "absolute inset-y-0 w-1/2 bg-background transition-transform duration-[1200ms] ease-[cubic-bezier(.7,0,.3,1)] motion-reduce:transition-none";

  return (
    <div className="fixed inset-0 z-50" aria-hidden={isOpening}>
      {/* Paneles tipo cortina */}
      <div className={`${panelBase} left-0 ${isOpening ? "-translate-x-full shadow-2xl" : ""}`} />
      <div className={`${panelBase} right-0 ${isOpening ? "translate-x-full shadow-2xl" : ""}`} />

      <div
        className={`relative flex h-full flex-col items-center justify-center px-8 text-center transition-opacity duration-500 ${
          isOpening ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-[11px] uppercase tracking-[0.35em] text-foreground/60">{eventType}</p>

        <button
          type="button"
          onClick={handleOpen}
          className="group my-8 flex h-36 w-36 items-center justify-center rounded-full border border-accent bg-surface shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] transition-transform active:scale-95"
          aria-label="Abrir invitación"
        >
          <span className="flex h-28 w-28 items-center justify-center rounded-full border border-accent/50 font-script text-4xl text-primary">
            {initials.join("&")}
          </span>
        </button>

        <h1 className="font-script text-5xl leading-tight text-primary">{hosts.join(" & ")}</h1>
        <Ornament className="mx-auto my-4 text-accent" />
        <p className="text-sm tracking-[0.3em] text-foreground/70">{shortDate}</p>

        <p className="mt-10 animate-pulse text-xs uppercase tracking-[0.3em] text-foreground/60">
          Toca para abrir
        </p>
      </div>
    </div>
  );
}
