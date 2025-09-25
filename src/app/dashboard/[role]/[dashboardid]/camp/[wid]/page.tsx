import {  BarChartBloodPlasma, RadarChart } from "@/components/anmetedUI/animated-overlay";
import { DataTableDemo } from "@/components/datatable/data-table";

// src/app/dashboard/[dashboardid]/[wid]/page.tsx
interface PageProps {
  params: { dashboardid: string; wid: string };
}

export default async function WidPage({ params }: PageProps) {
  // If you don't fetch anything, you can still await a dummy Promise
  const routeParams = await Promise.resolve(params);

  return (
    <div >
      <div className="flex gap-2 items-center py-3">
        <h1>Dashboard ID: {routeParams.dashboardid}</h1>
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
