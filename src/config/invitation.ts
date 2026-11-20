import type { InvitationConfig } from "@/types/invitation";

/**
 * Invitación de ejemplo con TODOS los apartados llenos (Plantilla Maestra Elite).
 * Todos los datos son ficticios: reemplázalos por los del cliente.
 *
 * - `plan` define qué apartados se muestran (express | esencial | signature | elite).
 * - `hiddenSections` quita apartados puntuales aunque el plan los incluya.
 */
export const invitation: InvitationConfig = {
  plan: "elite",
  // PERSONALIZAR: cambia la identidad visual sin modificar los módulos funcionales.
  template: "romantic-classic",
  design: { heroOverlay: 0.5, openingDuration: "2600ms" },
  hiddenSections: [],
  story: { title: "Todo comenzó con un sí", text: "Una conversación, muchos viajes y pequeños momentos nos trajeron hasta aquí. Hoy elegimos seguir construyendo nuestra historia, rodeados de las personas que queremos. Historia ficticia de demostración." },

  // PERSONALIZAR: paleta del cliente desde Esencial; Express usa los colores de su plantilla.
  theme: {
    primary: "#4a5a72",
    accent: "#c2ab7f",
    background: "#f9f7f3",
    foreground: "#35383f",
    surface: "#ffffff",
    onPrimary: "#ffffff",
  },

  event: {
    type: "Nuestra boda",
    hosts: ["Sofía", "Andrés"],
    // PERSONALIZAR: fecha real con desplazamiento UTC explícito y zona IANA coherente.
    date: "2027-06-12T17:00:00-06:00",
    timeZone: "America/Mexico_City",
    welcomeMessage: "Queremos celebrar contigo el comienzo de nuestra historia.",
  },

  hero: {
    videoSrc: "/media/boda.mp4",
    posterSrc: "/images/demo/ramo.webp",
    eyebrow: "Nos casamos",
  },

  rsvp: {
    // PERSONALIZAR: sustituye los ceros por el WhatsApp del cliente con lada de país.
    phone: "000000000000",
    message: "¡Hola! Confirmo mi asistencia a la boda de Sofía y Andrés. Mi nombre es:",
    deadline: "Por favor confirma antes del 1 de mayo de 2027",
  },

  locations: [
    {
      label: "Ceremonia",
      venueName: "Parroquia de Santa María",
      address: "Av. Ejemplo 123, Col. Centro, Ciudad de México",
      lat: 19.4326,
      lng: -99.1332,
      time: "17:00 h",
    },
    {
      label: "Recepción",
      venueName: "Jardín Los Olivos",
      address: "Calle Muestra 456, Col. Roma Norte, Ciudad de México",
      lat: 19.4194,
      lng: -99.1622,
      time: "19:00 h",
    },
  ],

  giftRegistry: {
    message:
      "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, te dejamos estas opciones.",
    bankAccount: {
      bank: "Cuenta de demostración · sin transferencias",
      holder: "Sofía Ejemplo Pérez",
      clabe: "000000000000000000",
    },
    stores: [],
  },

  audio: {
    src: "/media/musica.mp3",
    title: "Música de la invitación",
  },

  gallery: [
    { src: "/images/demo/ramo.webp", alt: "Ramo de flores marfil con listón azul" },
    { src: "/images/demo/anillos.webp", alt: "Argollas sobre terciopelo" },
    { src: "/images/demo/mesa.webp", alt: "Mesa de recepción a la luz de las velas" },
  ],

  dressCode: {
    code: "Formal",
    description: "Traje oscuro y vestido largo. Reservamos el color blanco para la novia.",
  },

  itinerary: [
    { time: "17:00", title: "Ceremonia religiosa", description: "Parroquia de Santa María", icon: "misa" },
    { time: "18:30", title: "Cóctel de bienvenida", description: "Jardín Los Olivos", icon: "coctel" },
    { time: "19:30", title: "Recepción", icon: "recepcion" },
    { time: "20:30", title: "Cena", icon: "cena" },
    { time: "22:00", title: "¡A bailar!", icon: "baile" },
    { time: "02:00", title: "Despedida", icon: "cierre" },
  ],

  accommodations: [
    {
      name: "Hotel Alameda",
      imageSrc: "/images/demo/patio.webp",
      rate: "Desde $1,850 MXN / noche",
      discountCode: "BODASA27",
      distance: "A 8 min del jardín",
    },
    {
      name: "Casa Roma Boutique",
      imageSrc: "/images/demo/habitacion.webp",
      rate: "Desde $2,400 MXN / noche",
      discountCode: "SOFIAANDRES",
      distance: "A 5 min del jardín",
    },
    {
      name: "Suites Reforma",
      imageSrc: "/images/demo/atrio.webp",
      rate: "Desde $1,500 MXN / noche",
      distance: "A 15 min de la parroquia",
    },
  ],
};
