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
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export function ChartBarMixed({ item }: { item: any }) {
  // ✅ Convert object into array for chart
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
    <Card>
      <CardHeader>
        <CardTitle>Inventory by Blood Type</CardTitle>
        <CardDescription>Available blood units</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 10 }}
          >
            <YAxis
              dataKey="blood_type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              }
            />
            <XAxis dataKey="units" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="units" layout="vertical" radius={5} />
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
