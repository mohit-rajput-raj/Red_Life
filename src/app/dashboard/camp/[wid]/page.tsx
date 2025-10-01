import {  BarChartBloodPlasma, RadarChart } from "@/components/anmetedUI/animated-overlay";
import { DataTableDemo } from "@/components/datatable/data-table";

interface PageProps {
  params: { role: string; wid: string };
}

export default async function WidPage({ params }: PageProps) {
  const routeParams = await Promise.resolve(params);

  return (
    <div >
      <div className="flex gap-2 items-center py-3 w-full">
      <h2>WID: {routeParams.wid}</h2>
      <RadarChart/>
      <BarChartBloodPlasma/>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <DataTableDemo/>
      </div>
    </div>
  );
}
