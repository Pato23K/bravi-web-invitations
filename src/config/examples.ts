import { invitation } from "./invitation";
import type { InvitationConfig } from "@/types/invitation";

// PERSONALIZAR: registro único de invitaciones. Cada entrada tiene su URL /invitaciones/<clave>.
export const invitations: Record<string, InvitationConfig> = {
  boda: invitation,
  quince: {
    ...invitation, template: "festive", theme: undefined,
    event: { type: "Mis XV años", hosts: ["Valentina"], date: "2027-09-18T18:00:00-06:00", timeZone: "America/Mexico_City", welcomeMessage: "Quince años de sueños, una noche para compartirlos." },
    hero: { posterSrc: "/images/demo/tiara.webp", eyebrow: "Una noche para brillar", phrase: "Mi mejor recuerdo será celebrarlo contigo." },
    rsvp: { phone: "000000000000", message: "DEMO: Me gustaría asistir a los XV de Valentina. Mi nombre es:", deadline: "Confirma antes del 1 de septiembre de 2027" },
    accommodations: [{ name: "Posada del Parque", imageSrc: "/images/demo/patio.webp", distance: "Cerca del salón de fiestas" }],
    locations: [{ label: "Fiesta", venueName: "Salón Magnolia", address: "Calle de Muestra 15, Ciudad de México", lat: 19.42, lng: -99.16, time: "18:00 h" }],
    galleryTitle: "Mis recuerdos favoritos",
    story: { title: "Un nuevo capítulo", text: "De los primeros sueños a una noche llena de ilusión. Gracias por formar parte de mis recuerdos. Historia ficticia de demostración." },
    gallery: [
      { src: "/images/demo/tiara.webp", alt: "Tiara y tul rosa" },
      { src: "/images/demo/pastel.webp", alt: "Pastel de XV años" },
      { src: "/images/demo/pista.webp", alt: "Luces de la pista de baile" },
    ],
    dressCode: { code: "Fiesta", description: "Elige tu look favorito. El rosa está reservado para la festejada." },
    itinerary: [
      { time: "18:00", title: "Bienvenida", icon: "recepcion" },
      { time: "19:00", title: "El vals", description: "Un momento inolvidable en familia", icon: "baile" },
      { time: "20:00", title: "Cena", icon: "cena" },
      { time: "21:00", title: "Pastel y fiesta", icon: "pastel" },
    ],
    giftRegistry: { message: "Gracias por acompañarme en esta nueva etapa.", stores: [] },
  },
  encuentro: {
    ...invitation, template: "modern-minimal", theme: undefined, opening: "minimal",
    event: { type: "Encuentro empresarial", hosts: ["Horizonte 2027"], date: "2027-11-20T09:00:00-06:00", timeZone: "America/Mexico_City", welcomeMessage: "Un encuentro para compartir ideas y construir nuevas posibilidades." },
    hero: { posterSrc: "/images/demo/atrio.webp", eyebrow: "Ideas que nos conectan", phrase: "Encuentro anual · Edición de demostración" },
    rsvp: { phone: "000000000000", message: "DEMO: Quiero confirmar mi lugar en Horizonte 2027. Mi nombre es:", deadline: "Registro hasta el 10 de noviembre de 2027" },
    accommodations: [{ name: "Hotel del Foro", imageSrc: "/images/demo/habitacion.webp", distance: "Cerca del centro de conferencias" }],
    galleryTitle: "Ideas compartidas",
    story: { title: "Miramos hacia adelante", text: "Reunimos a nuestro equipo para compartir aprendizajes y dar forma a nuevos proyectos. Evento ficticio de demostración." },
    gallery: [
      { src: "/images/demo/atrio.webp", alt: "Atrio del encuentro" },
      { src: "/images/demo/patio.webp", alt: "Patio para conversaciones" },
    ],
    locations: [{ label: "Sede", venueName: "Centro Horizonte (ficticio)", address: "Av. Demostración 100, Ciudad de México", lat: 19.4326, lng: -99.1332, time: "09:00 h" }],
    dressCode: { code: "Business casual", description: "Ropa cómoda para una jornada de conversaciones y nuevas ideas." },
    giftRegistry: undefined,
    itinerary: [
      { time: "09:00", title: "Registro y café", icon: "coctel" },
      { time: "10:00", title: "Conferencia inaugural", icon: "recepcion" },
      { time: "12:00", title: "Mesas de conversación", icon: "ceremonia" },
      { time: "14:00", title: "Comida y conexiones", icon: "cena" },
    ],
  },
};
export const EXAMPLE_LABELS: Record<string, string> = { boda: "Boda · Sofía y Andrés", quince: "XV años · Valentina", encuentro: "Empresarial · Horizonte" };
