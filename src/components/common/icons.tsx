import type { JSX, SVGProps } from "react";
import type { ItineraryIcon } from "@/types/invitation";

/**
 * Íconos SVG de línea fina (estilo ilustrado). Heredan el color con currentColor,
 * así que se tiñen con clases como text-primary o text-accent.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, viewBox = "0 0 24 24", strokeWidth = 1.4, ...props }: IconProps) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.2" />
    </Svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.74Zm4.5-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.04s.88 2.37 1 2.53c.12.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.46-.6 1.66-1.18.2-.57.2-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </Svg>
  );
}

export function IconNavigation(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 4 3.5 10.6l7 2.9 2.9 7Z" />
    </Svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function IconMusic(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 18V5.5l10-2V16" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </Svg>
  );
}

export function IconPause(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 6v12M15 6v12" strokeWidth={2} />
    </Svg>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
    </Svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeWidth={1.8} />
    </Svg>
  );
}

export function IconExternal(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 4.5h5.5V10M19.5 4.5 11 13M17 14v4.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1H10" />
    </Svg>
  );
}

export function IconGift(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18v-.5A1.5 1.5 0 0 0 19.5 7h-15A1.5 1.5 0 0 0 3 8.5Z" />
      <path d="M12 7v13M12 7c-1.5-3.5-5-3.5-5-1.5S10 7 12 7Zm0 0c1.5-3.5 5-3.5 5-1.5S14 7 12 7Z" />
    </Svg>
  );
}

/* ---------- Dress code (ilustración de traje y vestido) ---------- */

export function IconSuit(props: IconProps) {
  return (
    <Svg viewBox="0 0 64 64" strokeWidth={1.3} {...props}>
      <path d="M22 8h20l8 6-4 42H18l-4-42Z" />
      <path d="M22 8 32 26 42 8" />
      <path d="M32 26v30" />
      <path d="m29 14 3 3 3-3-3-4Z" />
      <path d="M32 17v7" />
      <path d="M22 8 18 30l7-2M42 8l4 22-7-2" />
      <circle cx="32" cy="34" r=".8" fill="currentColor" />
      <circle cx="32" cy="42" r=".8" fill="currentColor" />
    </Svg>
  );
}

export function IconDress(props: IconProps) {
  return (
    <Svg viewBox="0 0 64 64" strokeWidth={1.3} {...props}>
      <path d="M26 6v8M38 6v8" />
      <path d="M26 14c2 3 10 3 12 0l-1 12H27Z" />
      <path d="M27 26 14 58h36L37 26" />
      <path d="M27 26c3 2 7 2 10 0" />
      <path d="M22 44c4 3 16 3 20 0M18 52c6 3 22 3 28 0" opacity={0.6} />
    </Svg>
  );
}

/* ---------- Itinerario ---------- */

function IconRings(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="m13.5 6.5 1.5-2.5 1.5 2.5-1.5 1.5Z" />
    </Svg>
  );
}

function IconChurch(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2.5v4M10 4.5h4" />
      <path d="m6 11 6-4.5 6 4.5" />
      <path d="M7 10v10.5h10V10" />
      <path d="M10.5 20.5V16a1.5 1.5 0 0 1 3 0v4.5" />
      <path d="M3.5 20.5h17" />
    </Svg>
  );
}

function IconCocktail(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 4.5h14L12 12Z" />
      <path d="M12 12v8M8.5 20.5h7" />
      <path d="m15.5 3 2-1.5" />
      <circle cx="16.5" cy="7" r="1" />
    </Svg>
  );
}

function IconToast(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 3.5h5l-.5 6a2.5 2.5 0 0 1-4 0Z" />
      <path d="M7.5 11.5v8M5.5 20h4" />
      <path d="M14 3.5h5l.5 6a2.5 2.5 0 0 1-4 0Z" />
      <path d="M16.5 11.5v8M14.5 20h4" />
      <path d="M11 2v2M12.5 3l-.8 1M9.5 3l.8 1" />
    </Svg>
  );
}

function IconDinner(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="13" r="5.5" />
      <circle cx="12" cy="13" r="3" opacity={0.6} />
      <path d="M3 4v5a1.5 1.5 0 0 0 3 0V4M4.5 9.5V21" />
      <path d="M21 4c-1.8 1-2.5 3-2.5 6h2.5V21" />
    </Svg>
  );
}

function IconDance(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 18V7l10-2.5v11" />
      <path d="M8 10l10-2.5" />
      <circle cx="5.5" cy="18" r="2.5" />
      <circle cx="15.5" cy="15.5" r="2.5" />
    </Svg>
  );
}

function IconCake(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20.5h16" />
      <rect x="5.5" y="14" width="13" height="6.5" rx="1" />
      <rect x="7.5" y="9" width="9" height="5" rx="1" />
      <path d="M12 9V6.5" />
      <path d="M12 3.5c.8.9.8 1.8 0 2.5-.8-.7-.8-1.6 0-2.5Z" />
    </Svg>
  );
}

function IconMoon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z" />
      <path d="M17 3.5v3M15.5 5h3" />
    </Svg>
  );
}

const ITINERARY_ICON_MAP: Record<ItineraryIcon, (props: IconProps) => JSX.Element> = {
  ceremonia: IconRings,
  misa: IconChurch,
  coctel: IconCocktail,
  recepcion: IconToast,
  cena: IconDinner,
  baile: IconDance,
  pastel: IconCake,
  cierre: IconMoon,
};

export function ItineraryIconSvg({ icon, ...props }: IconProps & { icon: ItineraryIcon }) {
  const Icon = ITINERARY_ICON_MAP[icon];
  return <Icon {...props} />;
}
