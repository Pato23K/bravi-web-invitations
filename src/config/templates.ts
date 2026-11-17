import type { DesignTokens, TemplateId, ThemePalette } from "@/types/invitation";

interface VisualTemplate {
  name: string;
  palette: ThemePalette;
  design: DesignTokens;
  opening: boolean;
  decoration: "botanical" | "geometric" | "stars";
}

// PERSONALIZAR: estilos iniciales de cada plantilla. Los datos y planes son independientes.
export const TEMPLATES: Record<TemplateId, VisualTemplate> = {
  "romantic-classic": {
    name: "Romantic Classic", opening: true, decoration: "botanical",
    palette: { primary: "#755c3e", accent: "#ac9164", background: "#faf7f0", foreground: "#40392f", surface: "#fffdf8", onPrimary: "#ffffff" },
    design: { headingFont: 'var(--font-pinyon), Georgia, serif', bodyFont: 'var(--font-cormorant), Georgia, serif', radius: "1.5rem", buttonRadius: "999px" },
  },
  "modern-minimal": {
    name: "Modern Minimal", opening: false, decoration: "geometric",
    palette: { primary: "#243e3c", accent: "#819a91", background: "#f2f4ef", foreground: "#233330", surface: "#ffffff", onPrimary: "#ffffff" },
    design: { headingFont: 'Georgia, serif', bodyFont: 'Arial, sans-serif', radius: "0.2rem", buttonRadius: "0.2rem", titleSize: "clamp(2rem, 4vw, 3.5rem)", sectionSpace: "6rem", shadow: "none" },
  },
  festive: {
    name: "Festive", opening: true, decoration: "stars",
    palette: { primary: "#78264b", accent: "#bb7953", background: "#fff2ee", foreground: "#4a263e", surface: "#fffaf7", onPrimary: "#ffffff" },
    design: { headingFont: 'var(--font-cormorant), Georgia, serif', bodyFont: 'Arial, sans-serif', radius: "2.5rem", buttonRadius: "999px", titleSize: "clamp(2.8rem, 5vw, 4rem)", animationDuration: "850ms" },
  },
};

export function isTemplateId(value: unknown): value is TemplateId {
  return typeof value === "string" && Object.hasOwn(TEMPLATES, value);
}
