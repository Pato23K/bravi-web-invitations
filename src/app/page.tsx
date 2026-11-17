import { DemoPage, type DemoParams } from "@/components/DemoPage";
export default async function Page({ searchParams }: { searchParams: Promise<DemoParams> }) {
  return <DemoPage params={await searchParams} />;
}
