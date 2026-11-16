interface SectionHeadingProps {
  /** Texto pequeño en mayúsculas sobre el título. */
  eyebrow?: string;
  /** Título en tipografía caligráfica. */
  title: string;
  subtitle?: string;
  /** Usa colores claros (para fondos oscuros). */
  inverted?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, inverted = false }: SectionHeadingProps) {
  return (
    <header className="mb-10 text-center">
      {eyebrow && (
        <p
          className={`mb-2 text-[11px] uppercase tracking-[0.35em] ${
            inverted ? "text-white/80" : "text-foreground/60"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={`font-script text-5xl leading-tight ${inverted ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg italic ${inverted ? "text-white/85" : "text-foreground/70"}`}>
          {subtitle}
        </p>
      )}
      <Ornament className={`mx-auto mt-5 ${inverted ? "text-white/70" : "text-accent"}`} />
    </header>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={`h-3 w-28 ${className}`} aria-hidden="true" focusable="false">
      <path d="M0 6h48M72 6h48" stroke="currentColor" strokeWidth="0.8" />
      <path d="m60 1 5 5-5 5-5-5Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="60" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}
