import { DemoPage, type DemoParams } from "@/components/DemoPage";
export const metadata = { title: "BRAVI · Estudio de invitaciones", robots: { index: false, follow: false } };
export default async function Page({ searchParams }: { searchParams: Promise<DemoParams> }) {
  return <DemoPage params={await searchParams} action="/demo" />;
}
