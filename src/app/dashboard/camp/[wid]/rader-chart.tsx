"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with dots"
const bloodData = [
  { blood_type: "A+", units: Math.floor(Math.random() * 300) + 100 },
  { blood_type: "A-", units: Math.floor(Math.random() * 300) + 100 },
  { blood_type: "B+", units: Math.floor(Math.random() * 300) + 100 },
  { blood_type: "B-", units: Math.floor(Math.random() * 300) + 100 },
  { blood_type: "AB+", units: Math.floor(Math.random() * 300) + 100 },
  { blood_type: "AB-", units: Math.floor(Math.random() * 300) + 100 },
  { blood_type: "O+", units: Math.floor(Math.random() * 300) + 100 },
  { blood_type: "O-", units: Math.floor(Math.random() * 300) + 100 },
];

console.log(bloodData);


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartRadarDots() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Radar Chart - Dots</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={bloodData }>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="blood_type" />
            <PolarGrid />
            <Radar
              dataKey="units"
              fill="var(--color-desktop)"
              fillOpacity={0.3}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
