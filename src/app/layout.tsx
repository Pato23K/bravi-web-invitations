import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import type { ReactNode } from "react";
import { invitation } from "@/config/invitation";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

const hostsLabel = invitation.event.hosts.join(" & ");

export const metadata: Metadata = {
  title: `${hostsLabel} · ${invitation.event.type}`,
  description: invitation.event.welcomeMessage ?? `Invitación de ${hostsLabel}`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: invitation.theme?.background ?? "#faf7f0",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" className={`${cormorant.variable} ${pinyon.variable}`}>
      <body>{children}</body>
    </html>
  );
}
