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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const hostsLabel = invitation.event.hosts.filter(Boolean).join(" & ") || invitation.event.type;
const title = `${hostsLabel} · ${invitation.event.type}`;
const description = invitation.event.welcomeMessage ?? `Invitación digital para ${hostsLabel}`;
const ogImage = invitation.hero.posterSrc ?? "/images/demo/ramo.webp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · BRAVI`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "BRAVI Invitaciones",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
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
