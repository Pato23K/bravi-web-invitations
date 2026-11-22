import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { invitations } from "@/config/examples";
import { InvitationTemplate } from "@/components/InvitationTemplate";
interface Props { params: Promise<{ slug: string }> }
export function generateStaticParams() { return Object.keys(invitations).map(slug => ({ slug })); }
function getInvitation(slug: string) {
  if (!Object.hasOwn(invitations, slug)) notFound();
  return invitations[slug]!;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getInvitation(slug);
  const hostsLabel = config.event.hosts.filter(Boolean).join(" & ") || config.event.type;
  const title = `${hostsLabel} · ${config.event.type}`;
  const description = config.event.welcomeMessage ?? `Te invitamos a celebrar con nosotros: ${title}`;
  const image = config.hero.posterSrc ?? config.gallery?.[0]?.src ?? "/images/demo/ramo.webp";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: "BRAVI Invitaciones",
      title,
      description,
      images: [
        {
          url: image,
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
      images: [image],
    },
  };
}
export default async function InvitationPage({ params }: Props) {
  const config = getInvitation((await params).slug);
  return <InvitationTemplate config={config} planContext={{ plan: config.plan, preview: false, hiddenSections: config.hiddenSections ?? [] }} />;
}
