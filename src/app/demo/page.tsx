import { notFound } from "next/navigation";
import { DemoPage, type DemoParams } from "@/components/DemoPage";
import { isDemoMode } from "@/lib/demo";
export const metadata = { title: "BRAVI · Estudio de invitaciones", robots: { index: false, follow: false } };
export default async function Page({ searchParams }: { searchParams: Promise<DemoParams> }) {
  if (!isDemoMode()) notFound();
  return <DemoPage params={await searchParams} action="/demo" />;
}
