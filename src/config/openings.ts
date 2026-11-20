export const OPENINGS = {
  envelope: { label: "Sobre con sello", hint: "Toca el sello para abrir" },
  ribbon: { label: "Moño de seda", hint: "Toca el moño para desatarlo" },
  fireworks: { label: "Fuegos artificiales", hint: "Toca el cielo para celebrar" },
  butterfly: { label: "Vuelo de mariposa", hint: "Toca la mariposa para abrir" },
  flowers: { label: "Explosión de flores", hint: "Toca la flor para abrir" },
  minimal: { label: "Monograma minimalista", hint: "Toca el monograma para entrar" },
} as const;

export type OpeningStyle = keyof typeof OPENINGS;
export type OpeningChoice = OpeningStyle | "none" | "default";

export function isOpeningStyle(value: unknown): value is OpeningStyle {
  return typeof value === "string" && Object.hasOwn(OPENINGS, value);
}
