"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export type ActivityPoint = {
  hour: string;
  appointments: number;
};

export default function TodaysActivityChart({
  data,
  loading,
}: {
  data: ActivityPoint[];
  loading: boolean;
}) {
  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-4 shadow-sm shadow-slate-950/10 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="mb-6">
        <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase">
          Today’s Activity
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-semibold">
          Appointments per hour
        </h2>
      </div>

      <Card className="border-border/70 rounded-[2rem] bg-white/90 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/10">
        <CardHeader className="px-6 pb-0">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Schedule overview
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-4 pb-5 sm:px-6">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : data.length === 0 ? (
            <div className="border-border/70 bg-background/50 text-muted-foreground flex h-44 items-center justify-center rounded-2xl border text-sm">
              No appointments for today.
            </div>
          ) : (
            <ChartContainer
              className="h-44 w-full"
              config={{
                appointments: {
                  label: "Appointments",
                  color: "var(--color-chart-1)",
                },
              }}
              initialDimension={{ width: 520, height: 176 }}
            >
              <BarChart data={data} margin={{ left: 4, right: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey="appointments"
                  fill="var(--color-appointments)"
                  radius={[10, 10, 10, 10]}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
