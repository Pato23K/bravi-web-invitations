import type { CSSProperties } from "react";
import type { ThemePalette } from "@/types/invitation";

/** Paleta base de BRAVI (marfil y champaña). Debe coincidir con :root en globals.css. */
export const DEFAULT_THEME: ThemePalette = {
  primary: "#8c7355",
  accent: "#c8b28a",
  background: "#faf7f1",
  foreground: "#3f372d",
  surface: "#ffffff",
  onPrimary: "#ffffff",
};

type CSSVariables = CSSProperties & Record<`--${string}`, string>;

/** Convierte una paleta en variables CSS para aplicarlas con `style`. */
export function themeToCssVars(theme: ThemePalette): CSSVariables {
  return {
    "--primary": theme.primary,
    "--accent": theme.accent,
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--surface": theme.surface,
    "--on-primary": theme.onPrimary,
  };
}
