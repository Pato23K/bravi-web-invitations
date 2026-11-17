import { IconChevronDown } from "@/components/common/icons";
import { Ornament } from "@/components/common/SectionHeading";
import { HeroMedia } from "./HeroMedia";

export interface HeroVideoProps {
  videoSrc?: string;
  phrase?: string;
  nextId?: string;
  posterSrc?: string;
  eyebrow?: string;
  hosts: string[];
  /** Fecha corta ya formateada. Ej. "12 · 06 · 2027". */
  shortDate: string;
}

/**
 * Comp. 1 · Plan Express.
 * Video 100vh en bucle (autoPlay, muted, loop, playsInline) con overlay oscuro
 * y nombres centrados. Se usa 100svh para que en móvil no lo tape la barra del navegador.
 */
export function HeroVideo({ videoSrc, posterSrc, eyebrow, hosts, shortDate, phrase, nextId }: HeroVideoProps) {
  const [firstHost, ...otherHosts] = hosts;

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden supports-[height:100svh]:h-svh">
      <HeroMedia videoSrc={videoSrc} posterSrc={posterSrc} />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-white">
        {eyebrow && <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/85">{eyebrow}</p>}

        <h1 className="font-script text-6xl leading-[1.15] drop-shadow-md">
          {firstHost}
          {otherHosts.map((host) => (
            <span key={host} className="block">
              <span className="block text-4xl text-white/80">&amp;</span>
              {host}
            </span>
          ))}
        </h1>

        <Ornament className="mx-auto mt-6 text-white/75" />
        <p className="mt-4 text-sm tracking-[0.35em]">{shortDate}</p>
        {phrase && <p className="mt-8 max-w-md text-lg italic">{phrase}</p>}
      </div>

      {nextId && <a
        href={`#${nextId}`}
        aria-label="Ir a la cuenta regresiva"
        className="absolute inset-x-0 bottom-8 z-10 mx-auto w-fit animate-bounce text-white/80 motion-reduce:animate-none"
      >
        <IconChevronDown className="h-7 w-7" />
      </a>}
    </section>
  );
}
