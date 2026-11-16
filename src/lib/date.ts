/**
 * Formatea la fecha del evento en el servidor y pasa el texto ya listo a los
 * componentes, para que servidor y navegador muestren exactamente lo mismo.
 */
export function formatEventDate(isoDate: string, timeZone: string, locale = "es-MX") {
  const date = new Date(isoDate);

  const fullDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date);

  const shortDate = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone,
  })
    .format(date)
    .replaceAll("/", " · ");

  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  }).format(date);

  return {
    /** "sábado, 12 de junio de 2027" */
    fullDate,
    /** "12 · 06 · 2027" */
    shortDate,
    /** "17:00 h" */
    time: `${time} h`,
  };
}
