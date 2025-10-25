"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Blood type color configuration
const chartConfig = {
  "A+": { label: "A+", color: "var(--color-a-plus)" },
  "A-": { label: "A−", color: "var(--color-a-minus)" },
  "B+": { label: "B+", color: "var(--color-b-plus)" },
  "B-": { label: "B−", color: "var(--color-b-minus)" },
  "AB+": { label: "AB+", color: "var(--color-ab-plus)" },
  "AB-": { label: "AB−", color: "var(--color-ab-minus)" },
  "O+": { label: "O+", color: "var(--color-o-plus)" },
  "O-": { label: "O−", color: "var(--color-o-minus)" },
} satisfies ChartConfig

// Helper: group donation data by date and blood type
function transformDonationData(data: any[]) {
  const map = new Map<string, Record<string, number | string>>()
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  for (const record of data) {
    const date = new Date(record.date).toISOString().split("T")[0]
    const bloodType = record.blood_type
    const entry = map.get(date) || Object.fromEntries([["date", date], ...bloodTypes.map(bt => [bt, 0])])
    entry[bloodType] = (entry[bloodType] as number) + 1 // or + record.units if you track actual units
    map.set(date, entry)
  }

  // Return sorted array by date
  return Array.from(map.values()).sort(
    (a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime()
  )
}

export function ChartAreaInteractive({ data }: { data: any[] | undefined }) {
  const [timeRange, setTimeRange] = React.useState("90d")

  // Convert your real data to chart-ready format
  const dailyData = React.useMemo(() => (data ? transformDonationData(data) : []), [data])

  // Filter by time range
  const filteredData = React.useMemo(() => {
    if (!dailyData.length) return []
    const endDate = new Date()
    const startDate = new Date(endDate)
    const days =
      timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90
    startDate.setDate(endDate.getDate() - days)
    return dailyData.filter((item) => new Date(item.date as string) >= startDate)
  }, [dailyData, timeRange])

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Blood Donations Over Time</CardTitle>
          <CardDescription>
            Showing total blood units collected per type in the selected range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              {Object.entries(chartConfig).map(([type, cfg]) => (
                <linearGradient key={type} id={`fill${type.replace("+", "Plus").replace("-", "Minus")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={cfg.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={cfg.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map((bloodType) => (
              <Area
                key={bloodType}
                dataKey={bloodType}
                type="natural"
                fill={`url(#fill${bloodType.replace("+", "Plus").replace("-", "Minus")})`}
                stroke={chartConfig[bloodType].color}
                stackId="a"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
