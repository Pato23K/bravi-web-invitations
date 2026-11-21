"use client";

import { useEffect, useState } from "react";
import { INVITATION_OPEN_EVENT } from "@/lib/events";
import { Ornament } from "./SectionHeading";
import { OPENINGS, type OpeningStyle } from "@/config/openings";
import { OpeningArtwork } from "./OpeningArtwork";
import styles from "./Envelope.module.css";

interface CoverIntroProps {
  variant: OpeningStyle;
  hosts: string[];
  eventType: string;
  shortDate: string;
}

export function CoverIntro({ variant, hosts, eventType, shortDate }: CoverIntroProps) {
  const [opened, setOpened] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (complete) {
      const content = document.getElementById("invitation-content");
      content?.focus({ preventScroll: true });
      content?.scrollIntoView({ behavior: "instant" });
    }
  }, [complete]);
  const initials = hosts.map(host => host[0]).join("·");
  function open() {
    if (opened) return;
    window.dispatchEvent(new Event(INVITATION_OPEN_EVENT));
    setOpened(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setComplete(true);
  }

  return (
    <div className={`invitation-cover ${styles.cover}`} data-open={opened} data-complete={complete} data-opening={variant} aria-hidden={opened || undefined}
      onAnimationEnd={event => {
        if (opened && event.currentTarget === event.target) {
          setComplete(true);
        }
      }}>
      <div className={styles.stationery}>
        <p className={styles.caption}>{eventType}</p>
        {variant === "envelope" ? <div className={styles.envelope}>
          <div className={styles.letter} aria-hidden="true">
            <Ornament className="mx-auto text-accent" />
            <span>{hosts.join(" & ")}</span>
          </div>
          <div className={styles.pocket} aria-hidden="true" />
          <div className={styles.flap} aria-hidden="true" />
          <button type="button" onClick={open} tabIndex={opened ? -1 : 0}
            className={styles.seal} aria-label="Abrir invitación">
            <span aria-hidden="true">{initials}</span>
          </button>
        </div> : <OpeningArtwork variant={variant} initials={initials} onOpen={open} opened={opened} />}
        <div className={styles.inscription}>
          <p className={styles.names}>{hosts.join(" & ")}</p>
          <p className={styles.date}>{shortDate}</p>
          <p className={styles.hint}>{OPENINGS[variant].hint}</p>
        </div>
      </div>
    </div>
  );
}
