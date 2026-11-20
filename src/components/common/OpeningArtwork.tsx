import type { CSSProperties } from "react";
import type { OpeningStyle } from "@/config/openings";
import styles from "./OpeningArtwork.module.css";

function SilkBow() {
  return <svg viewBox="0 0 320 200" aria-hidden="true">
    <defs>
      <linearGradient id="satin" x2=".3" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="var(--primary)" /><stop offset=".34" stopColor="var(--accent)" />
        <stop offset=".5" stopColor="var(--surface)" /><stop offset=".68" stopColor="var(--accent)" />
        <stop offset="1" stopColor="var(--primary)" />
      </linearGradient>
    </defs>
    <g fill="url(#satin)" stroke="var(--accent)" strokeWidth=".7">
      <g className={styles.ribbonLeft}>
        <path d="M0 88 Q87 82 161 95 L161 109 Q68 102 0 113Z" />
        <path d="M160 99 C132 105 124 145 91 159 L105 161 106 173 Q151 153 161 104Z" />
        <path d="M161 101 C138 59 90 37 85 65 S121 111 161 101Z" />
        <path d="M154 98 Q111 62 93 65" fill="none" />
      </g>
      <g className={styles.ribbonRight}>
        <path d="M320 88 Q230 83 159 95 L160 109 Q249 101 320 113Z" />
        <path d="M159 99 Q184 113 214 152 L202 149 198 163 Q169 144 158 106Z" />
        <path d="M159 102 C185 60 228 40 234 63 S200 112 159 102Z" />
        <path d="M167 98 Q210 62 225 65" fill="none" />
      </g>
      <rect className={styles.knot} x="153" y="90" width="16" height="21" rx="5" />
    </g>
  </svg>;
}

function Burst({ x, y, radius }: { x: number; y: number; radius: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <g className={styles.burst}>
      {Array.from({ length: 18 }, (_, i) => {
        const length = i % 2 === 0 ? radius : radius * .72;
        return <g key={i} transform={`rotate(${i * 20})`}>
          <path d={`M0 -6 Q1 -12 2 -${length}`} fill="none" stroke="currentColor" strokeWidth="1.15" />
          <circle cx="2" cy={-length - 4} r="1.1" fill="currentColor" />
        </g>;
      })}
    </g>
  </g>;
}

function Fireworks() {
  return <svg viewBox="0 0 320 200" aria-hidden="true">
    <path className={styles.rocket} d="M135 196 Q155 145 142 69" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <Burst x={142} y={68} radius={48} />
    <Burst x={233} y={102} radius={30} />
    <Burst x={68} y={124} radius={23} />
  </svg>;
}

function Butterfly() {
  return <svg viewBox="0 0 320 200" aria-hidden="true">
    <defs>
      <linearGradient id="wingWash" x2=".85" y2="1">
        <stop stopColor="var(--accent)" /><stop offset=".6" stopColor="var(--surface)" />
        <stop offset="1" stopColor="var(--primary)" />
      </linearGradient>
    </defs>
    <g className={styles.flight}>
      {[false, true].map(mirror => <g key={String(mirror)} transform={mirror ? "translate(320) scale(-1 1)" : undefined}>
        <g className={styles.wing} stroke="var(--primary)" strokeWidth="1.15" fill="url(#wingWash)">
          <path d="M159 104 C143 77 116 48 85 44 Q80 80 101 98 Q115 113 153 109 C124 101 105 111 111 131 Q118 153 130 146 Q152 139 159 104Z" />
          <path d="M156 105 Q123 83 88 49 M153 106 Q122 98 99 86 M155 110 Q134 116 119 139 M133 91 Q116 71 110 57" fill="none" />
        </g>
      </g>)}
      <path d="M160 96 Q150 77 148 82 M160 96 Q171 76 173 82" fill="none" stroke="var(--primary)" />
      <ellipse cx="160" cy="106" rx="2.5" ry="13" fill="var(--primary)" />
    </g>
  </svg>;
}

function Flowers() {
  return <span className={styles.flowerScene} aria-hidden="true">
    {Array.from({ length: 24 }, (_, index) => {
      const angle = index * Math.PI * 2 / 24;
      const radius = 90 + (index % 3) * 24;
      const variables = {
        "--petal-x": `${Math.cos(angle) * radius}px`,
        "--petal-y": `${Math.sin(angle) * radius}px`,
        "--petal-angle": `${index * 15}deg`,
      } as CSSProperties;
      return <span key={index} className={styles.petal} style={variables} />;
    })}
    <span className={styles.flowerCore} />
  </span>;
}

/** El botón cubre toda la pieza de papelería y comparte el flujo de apertura del sobre. */
export function OpeningArtwork({ variant, initials, onOpen, opened }: {
  variant: Exclude<OpeningStyle, "envelope">;
  initials: string;
  onOpen: () => void;
  opened: boolean;
}) {
  return <button type="button" className={styles.art} data-variant={variant}
    data-open={opened} onClick={onOpen} tabIndex={opened ? -1 : 0} aria-label="Abrir invitación">
    {variant === "flowers" && <Flowers />}
    {variant === "ribbon" && <SilkBow />}
    {variant === "fireworks" && <Fireworks />}
    {variant === "butterfly" && <Butterfly />}
    {variant === "minimal" && <span className={styles.monogram} aria-hidden="true">{initials}</span>}
  </button>;
}
