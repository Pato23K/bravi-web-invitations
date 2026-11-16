/**
 * Enlaces que abren las apps nativas en el teléfono del invitado.
 *
 * Se usan los "universal links" oficiales (wa.me, google.com/maps, waze.com/ul)
 * en lugar de esquemas como whatsapp:// porque iOS y Android los abren directo
 * en la app instalada y, si no está instalada, caen a la versión web en vez de
 * mostrar un error.
 */

interface Coordinates {
  lat: number;
  lng: number;
}

export function whatsappUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function googleMapsUrl({ lat, lng }: Coordinates): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function wazeUrl({ lat, lng }: Coordinates): string {
  return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
}
