import type { FeatureId, PlanId } from "@/config/plans";

export type TemplateId = "romantic-classic" | "modern-minimal" | "festive";
export type SectionId = Exclude<FeatureId, "customTheme" | "smartCopyClabe" | "audio">;

/** PERSONALIZAR: tokens compartidos por todas las secciones, sin editar componentes. */
export interface DesignTokens {
  headingFont?: string;
  bodyFont?: string;
  titleSize?: string;
  sectionSpace?: string;
  radius?: string;
  buttonRadius?: string;
  borderWidth?: string;
  shadow?: string;
  animationDuration?: string;
  openingDuration?: string;
  heroOverlay?: number;
  contentWidth?: string;
}

/** Colores del evento. Se convierten en variables CSS (--primary, --accent, ...). */
export interface ThemePalette {
  /** Botones y textos destacados. */
  primary: string;
  /** Detalles secundarios; por defecto usa accent. */
  secondary?: string;
  /** Líneas, bordes y detalles decorativos. */
  accent: string;
  /** Fondo general de la invitación. */
  background: string;
  /** Color del texto principal. */
  foreground: string;
  /** Fondo de tarjetas. */
  surface: string;
  /** Texto sobre botones con color primary. */
  onPrimary: string;
}

export interface EventInfo {
  /** Ej. "Nuestra boda", "Mis XV años". */
  type: string;
  /** Uno o más festejados. Se muestran unidos con "&". */
  hosts: string[];
  /** Fecha y hora en ISO 8601 con zona horaria. Ej. "2027-06-12T17:00:00-06:00". */
  date: string;
  /** Zona horaria IANA del evento. Ej. "America/Mexico_City". */
  timeZone: string;
  /** Frase corta bajo la cuenta regresiva. */
  welcomeMessage?: string;
}

export interface HeroConfig {
  /** Ruta del MP4 (en /public o URL externa). */
  videoSrc?: string;
  /** Imagen que se ve mientras carga el video. */
  posterSrc?: string;
  /** Texto pequeño sobre los nombres. Ej. "Nos casamos". */
  eyebrow?: string;
  phrase?: string;
}

export interface RsvpConfig {
  /** Número con lada de país, solo dígitos o con espacios. Ej. "52 1 55 1234 5678". */
  phone: string;
  /** Mensaje predeterminado que se abre en WhatsApp. */
  message: string;
  /** Texto libre con la fecha límite. Ej. "Antes del 1 de mayo". */
  deadline?: string;
}

export interface Venue {
  /** Ej. "Ceremonia", "Recepción". */
  label: string;
  venueName: string;
  address: string;
  lat: number;
  lng: number;
  /** Ej. "17:00 h". */
  time?: string;
}

export interface BankAccount {
  bank: string;
  holder: string;
  /** CLABE interbancaria de 18 dígitos. */
  clabe: string;
}

export interface GiftStore {
  name: string;
  url: string;
  /** Número de evento en la tienda departamental. */
  eventCode?: string;
}

export interface GiftRegistryConfig {
  message: string;
  bankAccount?: BankAccount;
  stores: GiftStore[];
}

export interface AudioConfig {
  src: string;
  /** Nombre de la canción (se usa como etiqueta accesible). */
  title?: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface DressCodeConfig {
  /** Ej. "Formal", "Etiqueta rigurosa". */
  code: string;
  description?: string;
}

export const ITINERARY_ICONS = [
  "ceremonia",
  "misa",
  "coctel",
  "recepcion",
  "cena",
  "baile",
  "pastel",
  "cierre",
] as const;

export type ItineraryIcon = (typeof ITINERARY_ICONS)[number];

export interface ItineraryItem {
  /** Ej. "17:00". */
  time: string;
  title: string;
  description?: string;
  icon: ItineraryIcon;
}

export interface Accommodation {
  name: string;
  imageSrc: string;
  /** Ej. "Desde $1,850 MXN / noche". */
  rate?: string;
  discountCode?: string;
  /** Ej. "A 10 min del salón". */
  distance?: string;
  bookingUrl: string;
}

/**
 * Configuración completa de una invitación (Plantilla Maestra = plan Elite).
 * Todos los apartados viven aquí; el plan decide cuáles se muestran.
 */
export interface InvitationConfig {
  plan: PlanId;
  template?: TemplateId;
  opening?: boolean;
  decorations?: "botanical" | "geometric" | "stars" | "none";
  design?: DesignTokens;
  sectionOrder?: SectionId[];
  galleryTitle?: string;
  story?: { title: string; text: string };
  /** Apartados que el cliente no quiere aunque su plan los incluya. */
  hiddenSections?: FeatureId[];
  theme?: Partial<ThemePalette>;
  event: EventInfo;
  hero: HeroConfig;
  rsvp: RsvpConfig;
  locations?: Venue[];
  giftRegistry?: GiftRegistryConfig;
  audio?: AudioConfig;
  gallery?: GalleryPhoto[];
  dressCode?: DressCodeConfig;
  itinerary?: ItineraryItem[];
  accommodations?: Accommodation[];
}
