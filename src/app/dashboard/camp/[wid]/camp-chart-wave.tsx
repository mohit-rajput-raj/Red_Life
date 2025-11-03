"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DonationRecord = {
  date: string | Date | null;
  blood_type?: string | null;
};

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
type BloodType = (typeof bloodTypes)[number];

const chartConfig = {
  "A+": { label: "A+", color: "var(--color-a-plus)" },
  "A-": { label: "A−", color: "var(--color-a-minus)" },
  "B+": { label: "B+", color: "var(--color-b-plus)" },
  "B-": { label: "B−", color: "var(--color-b-minus)" },
  "AB+": { label: "AB+", color: "var(--color-ab-plus)" },
  "AB-": { label: "AB−", color: "var(--color-ab-minus)" },
  "O+": { label: "O+", color: "var(--color-o-plus)" },
  "O-": { label: "O−", color: "var(--color-o-minus)" },
} satisfies ChartConfig;

type TransformedRow = {
  date: string; 
} & { [K in BloodType]: number };

function safeDateToKey(d: unknown): string | null {
  try {
    const dt = d ? new Date(d as any) : null;
    if (!dt || Number.isNaN(dt.getTime())) return null;
    return dt.toISOString().split("T")[0];
  } catch {
    return null;
  }
}

function sanitizeId(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}

function transformDonationData(data: DonationRecord[] = []): TransformedRow[] {
  const map = new Map<string, TransformedRow>();

  for (const record of data) {
    const dateKey = safeDateToKey(record.date);
    if (!dateKey) continue; 

    const rawType = (record.blood_type ?? "").toString();
    if (!bloodTypes.includes(rawType as BloodType)) {
      continue;
    }
    const bt = rawType as BloodType;

    if (!map.has(dateKey)) {
      const base: TransformedRow = {
        date: dateKey,
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "AB+": 0,
        "AB-": 0,
        "O+": 0,
        "O-": 0,
      };
      map.set(dateKey, base);
    }

    const entry = map.get(dateKey)!;
    entry[bt] = (entry[bt] ?? 0) + 1;
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function ChartAreaInteractive({ data }: { data: DonationRecord[] | undefined }) {
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">("90d");

  const dailyData = React.useMemo(() => (data ? transformDonationData(data) : []), [data]);

  const filteredData = React.useMemo(() => {
    if (!dailyData.length) return [];
    const endDate = new Date();
    const startDate = new Date(endDate);
    const days = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
    startDate.setDate(endDate.getDate() - days);
    return dailyData.filter((item) => new Date(item.date) >= startDate);
  }, [dailyData, timeRange]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Blood Donations Over Time</CardTitle>
          <CardDescription>
            Showing total blood units collected per type in the selected range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
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
              {Object.entries(chartConfig).map(([type, cfg]) => {
                const safeId = `fill${sanitizeId(type)}`;
                return (
                  <linearGradient
                    key={type}
                    id={safeId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={cfg.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={cfg.color} stopOpacity={0.1} />
                  </linearGradient>
                );
              })}
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value as string).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value as string).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            {(Object.keys(chartConfig) as Array<BloodType>).map((bloodType) => {
              const safeId = `fill${sanitizeId(bloodType)}`;
              return (
                <Area
                  key={bloodType}
                  dataKey={bloodType}
                  type="natural"
                  fill={`url(#${safeId})`}
                  stroke={chartConfig[bloodType].color}
                  stackId="a"
                  isAnimationActive={false}
                />
              );
            })}

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
