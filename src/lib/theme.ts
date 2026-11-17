import type { CSSProperties } from "react";
import type { ThemePalette, DesignTokens } from "@/types/invitation";

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
export function themeToCssVars(theme: ThemePalette, design: DesignTokens = {}): CSSVariables {
  return {
    "--primary": theme.primary,
    "--secondary": theme.secondary ?? theme.accent,
    "--accent": theme.accent,
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--surface": theme.surface,
    "--on-primary": theme.onPrimary,
    "--inv-heading": design.headingFont ?? 'var(--font-pinyon), Georgia, serif',
    "--inv-body": design.bodyFont ?? 'var(--font-cormorant), Georgia, serif',
    "--inv-title-size": design.titleSize ?? "clamp(2.6rem, 5vw, 3.8rem)",
    "--inv-space": design.sectionSpace ?? "4.5rem",
    "--inv-radius": design.radius ?? "1.5rem",
    "--inv-button-radius": design.buttonRadius ?? "999px",
    "--inv-border": design.borderWidth ?? "1px",
    "--inv-shadow": design.shadow ?? "0 12px 40px -24px #40392f55",
    "--inv-motion": design.animationDuration ?? "650ms",
    "--inv-opening": design.openingDuration ?? "1200ms",
    "--inv-overlay": String(Math.min(0.9, Math.max(0.2, design.heroOverlay ?? 0.5))),
    "--inv-width": design.contentWidth ?? "1080px",
  };
}
