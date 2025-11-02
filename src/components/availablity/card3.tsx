"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// 🩸 Define color + label for each blood group
const chartConfig = {
  units: { label: "Units", color: "var(--chart-foreground)" },
  "A+": { label: "A+", color: "var(--chart-1)" },
  "A-": { label: "A-", color: "var(--chart-2)" },
  "B+": { label: "B+", color: "var(--chart-3)" },
  "B-": { label: "B-", color: "var(--chart-4)" },
  "O+": { label: "O+", color: "var(--chart-5)" },
  "O-": { label: "O-", color: "var(--chart-6)" },
  "AB+": { label: "AB+", color: "var(--chart-7)" },
  "AB-": { label: "AB-", color: "var(--chart-8)" },
} satisfies ChartConfig;

// 🧠 Reusable chart component
export function ChartBarDefault({ item }: { item: Record<string, number> }) {
  // ✅ Convert blood object {A+:10, B+:8} → chart array
  const chartData = item
    ? Object.entries(item).map(([blood_type, units]) => ({
        blood_type,
        units,
        fill:
          chartConfig[blood_type as keyof typeof chartConfig]?.color ||
          "var(--chart-1)",
      }))
    : [];

  return (
    <Card >
      <CardHeader>
        <CardTitle>Inventory by Blood Type</CardTitle>
        <CardDescription>Available blood units</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 10, right: 10, bottom: 20, top: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="blood_type"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis dataKey="units" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="units" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 12.3% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing current available units by blood type
        </div>
      </CardFooter>
    </Card>
  );
}
