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
  const config = getInvitation((await params).slug);
  return { title: `${config.event.hosts.join(" & ")} · ${config.event.type}`, description: config.event.welcomeMessage };
}
export default async function InvitationPage({ params }: Props) {
  const config = getInvitation((await params).slug);
  return <InvitationTemplate config={config} planContext={{ plan: config.plan, preview: false, hiddenSections: config.hiddenSections ?? [] }} />;
}
