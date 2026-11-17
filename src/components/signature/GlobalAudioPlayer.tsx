"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconMusic, IconPause } from "@/components/common/icons";
import { INVITATION_OPEN_EVENT } from "@/lib/events";

export interface GlobalAudioPlayerProps {
  src: string;
  title?: string;
}

/**
 * Comp. 6 · Plan Signature. Música de fondo con botón flotante.
 *
 * Los navegadores móviles bloquean el autoplay con sonido, así que la música
 * arranca solo tras un gesto del usuario:
 *  - al tocar "Abrir invitación" en la portada (evento INVITATION_OPEN_EVENT), o
 *  - al tocar el botón flotante.
 * Se pausa sola si el invitado cambia de app o de pestaña.
 */
export function GlobalAudioPlayer({ src, title = "Música de fondo" }: GlobalAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playbackTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // La interfaz confirma reproducción solo al recibir el evento playing.
    setError(false);
    clearTimeout(playbackTimeout.current);
    // Safari puede dejar play() pendiente si la conexión se corta antes de recibir datos.
    playbackTimeout.current = setTimeout(() => {
      audio.pause();
      setIsPlaying(false);
      setError(true);
    }, 8000);
    audio.play().then(() => clearTimeout(playbackTimeout.current)).catch(() => {
      clearTimeout(playbackTimeout.current);
      setIsPlaying(false);
      setError(true);
    });
  }, []);

  useEffect(() => () => clearTimeout(playbackTimeout.current), []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else { clearTimeout(playbackTimeout.current); audio.pause(); }
  };

  useEffect(() => {
    window.addEventListener(INVITATION_OPEN_EVENT, play);
    return () => window.removeEventListener(INVITATION_OPEN_EVENT, play);
  }, [play]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) { clearTimeout(playbackTimeout.current); audioRef.current?.pause(); }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlaying={() => { clearTimeout(playbackTimeout.current); setIsPlaying(true); setError(false); }}
        onPause={() => setIsPlaying(false)}
        onError={() => { clearTimeout(playbackTimeout.current); setIsPlaying(false); setError(true); }}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? `Pausar ${title}` : `Reproducir ${title}`}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-accent/60 bg-surface/90 text-primary shadow-lg backdrop-blur transition-transform active:scale-90"
      >
        {isPlaying ? <IconPause className="h-5 w-5" /> : <IconMusic className="h-5 w-5" />}
        {isPlaying && (
          <span className="absolute inset-0 animate-ping rounded-full border border-accent/50 motion-reduce:animate-none" />
        )}
      </button>
      {error && <p role="status" className="fixed bottom-20 right-5 z-40 max-w-64 rounded-xl bg-surface p-3 text-sm text-foreground shadow-lg">No se pudo reproducir la música. Puedes volver a intentarlo con el botón.</p>}
    </>
  );
}
