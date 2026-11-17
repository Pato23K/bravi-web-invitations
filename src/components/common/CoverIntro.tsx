"use client";
import { useRef, useState } from "react";
import { INVITATION_OPEN_EVENT } from "@/lib/events";
import { Ornament } from "./SectionHeading";
interface CoverIntroProps { hosts: string[]; eventType: string; shortDate: string }
/** Portada en el flujo: nunca bloquea el scroll ni captura el foco. */
export function CoverIntro({ hosts, eventType, shortDate }: CoverIntroProps) {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const open = () => {
    window.dispatchEvent(new Event(INVITATION_OPEN_EVENT));
    setOpened(true);
    document.getElementById("invitation-content")?.focus({ preventScroll: true });
  };
  return (
    <div ref={ref} className={`invitation-cover ${opened ? "is-open" : ""}`} aria-hidden={opened || undefined}
      onAnimationEnd={(event) => {
        if (event.target === ref.current && opened) document.getElementById("invitation-content")?.scrollIntoView({ behavior: "instant" });
      }}>
      <div className="cover-door cover-door-left" aria-hidden="true" />
      <div className="cover-door cover-door-right" aria-hidden="true" />
      <div className="cover-card">
        <span className="cover-kicker">Una fecha. Una historia. Tú.</span>
        <p className="mt-8 text-xs uppercase tracking-[0.3em]">{eventType}</p>
        <Ornament className="mx-auto my-6 text-accent" />
        <p className="cover-names">{hosts.join(" & ")}</p>
        <p className="mt-6 text-sm tracking-[0.2em]">{shortDate}</p>
        <button type="button" tabIndex={opened ? -1 : 0} onClick={open} className="cover-seal" aria-label="Abrir invitación">
          <span aria-hidden="true">{hosts.map(name => name[0]).join(" · ")}</span>
          <span className="seal-label">Abrir invitación</span>
        </button>
        <p className="mt-5 text-xs tracking-widest">Un momento especial comienza aquí</p>
      </div>
    </div>
  );
}
