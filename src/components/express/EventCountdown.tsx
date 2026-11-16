"use client";

import { useEffect, useState } from "react";
import { Ornament } from "@/components/common/SectionHeading";

export interface EventCountdownProps {
  /** Fecha del evento en ISO 8601 con zona horaria. */
  targetDate: string;
  /** Fecha completa ya formateada. Ej. "sábado, 12 de junio de 2027". */
  fullDate: string;
  /** Hora ya formateada. Ej. "17:00 h". */
  time: string;
  message?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    isPast: diff === 0,
  };
}

/**
 * Hook de cuenta regresiva. Devuelve null hasta montar en el navegador para
 * que el HTML del servidor y el del cliente coincidan (sin errores de hidratación).
 */
export function useCountdown(targetDate: string): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => setTimeLeft(getTimeLeft(target));
    tick();
    const interval = window.setInterval(tick, 1_000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

const UNITS = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
] as const;

/** Comp. 2 · Plan Express. Fecha completa + cuenta regresiva en 4 bloques. */
export function EventCountdown({ targetDate, fullDate, time, message }: EventCountdownProps) {
  const timeLeft = useCountdown(targetDate);

  return (
    <section id="cuenta-regresiva" className="px-6 py-16 text-center">
      <p className="text-[11px] uppercase tracking-[0.35em] text-foreground/60">Te esperamos el</p>
      <p className="mt-3 text-2xl text-foreground first-letter:uppercase">{fullDate}</p>
      <p className="mt-1 text-lg italic text-foreground/70">a las {time}</p>

      <Ornament className="mx-auto my-8 text-accent" />

      <h2 className="font-script text-5xl text-primary">Cuenta regresiva</h2>

      {timeLeft?.isPast ? (
        <p className="mt-8 text-2xl italic text-primary">¡Llegó el gran día!</p>
      ) : (
        <div className="mt-8 grid grid-cols-4 gap-2" role="timer" aria-live="off">
          {UNITS.map(({ key, label }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-xl border border-accent/40 bg-surface/70 px-1 py-4"
            >
              <span className="text-4xl font-light tabular-nums text-foreground">
                {timeLeft ? String(timeLeft[key]).padStart(2, "0") : "--"}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-foreground/60">{label}</span>
            </div>
          ))}
        </div>
      )}

      {message && <p className="mx-auto mt-8 max-w-xs text-lg italic text-foreground/75">{message}</p>}
    </section>
  );
}
