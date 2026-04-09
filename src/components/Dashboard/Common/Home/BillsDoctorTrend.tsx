"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBillsDoctorTrendQuery } from "@/redux/reducers/Common/Home/BillsAnalyticsApi";
import { BillsDoctorTrendPoint } from "@/types/Common/Home/BillsAnalyticsTypes";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { getCurrencySign } from "../../../../../utils/formatters";

const formatDoctorLabel = (point: BillsDoctorTrendPoint) =>
  `${point.appointment__doctor__user__first_name} ${point.appointment__doctor__user__last_name}`;

const BillsDoctorTrend: React.FC = () => {
  const { data, isLoading, isError } = useGetBillsDoctorTrendQuery(undefined);

  const chartData: BillsDoctorTrendPoint[] = Array.isArray(data) ? data : [];
  const totalAmount = chartData.reduce(
    (sum, point) => sum + point.sum_total_amount,
    0,
  );
  const avgBill =
    chartData.length > 0
      ? chartData.reduce((sum, point) => sum + point.average_amount, 0) /
        chartData.length
      : 0;
  const topDoctor = chartData.reduce(
    (best, current) =>
      current.sum_total_amount > best.sum_total_amount ? current : best,
    chartData[0] ?? {
      appointment__doctor__id: 0,
      appointment__doctor__alias: "",
      appointment__doctor__user__first_name: "",
      appointment__doctor__user__last_name: "",
      appointment__doctor__specialization: "",
      total_bills: 0,
      sum_total_amount: 0,
      average_amount: 0,
    },
  );

  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-4 shadow-sm shadow-slate-950/10 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-primary text-sm font-semibold tracking-[0.24em] uppercase">
            Doctor billing trend
          </p>
          <h2 className="text-foreground mt-2 text-2xl font-semibold">
            Bills per doctor
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6">
            Track revenue by doctor to identify high-performing providers.
          </p>
        </div>
      </div>

      <Card className="border-border/70 bg-white/90 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/10">
        <CardHeader className="px-6 pb-0">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Doctor revenue chart
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-4 pb-6 sm:px-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-72 w-full" />
            </div>
          ) : isError ? (
            <div className="border-destructive/10 bg-destructive/5 text-destructive rounded-[1.75rem] border p-6 text-sm">
              Unable to load doctor billing trend data.
            </div>
          ) : chartData.length === 0 ? (
            <div className="border-border/70 bg-muted/80 text-muted-foreground rounded-[1.75rem] border p-6">
              No billing trend data available.
            </div>
          ) : (
            <div className="border-border/70 bg-muted/80 rounded-[1.75rem] border p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/80">
              <ChartContainer
                className="h-72 w-full"
                config={{
                  sum_total_amount: {
                    label: "Total billed amount",
                    color: "#2563eb",
                  },
                }}
                initialDimension={{ width: 680, height: 288 }}
              >
                <BarChart
                  data={chartData}
                  margin={{ left: 4, right: 4, top: 8, bottom: 52 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="appointment__doctor__alias"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-35}
                    textAnchor="end"
                    height={80}
                    tickFormatter={(alias) => {
                      const point = chartData.find(
                        (item) => item.appointment__doctor__alias === alias,
                      );
                      return point ? formatDoctorLabel(point) : String(alias);
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                        formatter={(value) =>
                          typeof value === "number"
                            ? `${getCurrencySign()}${value.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}`
                            : value
                        }
                      />
                    }
                  />
                  <Bar
                    dataKey="sum_total_amount"
                    fill="var(--color-sum_total_amount)"
                    radius={[10, 10, 0, 0]}
                    barSize={28}
                  />
                </BarChart>
              </ChartContainer>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="border-border/70 bg-white/90 p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/10">
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
                    Top doctor
                  </p>
                  <p className="text-foreground mt-3 text-lg font-semibold">
                    {formatDoctorLabel(topDoctor)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {topDoctor.appointment__doctor__specialization}
                  </p>
                </Card>
                <Card className="border-border/70 bg-white/90 p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/10">
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
                    Total billed
                  </p>
                  <p className="text-foreground mt-3 text-2xl font-semibold">
                    {getCurrencySign()}
                    {totalAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </Card>
                <Card className="border-border/70 bg-white/90 p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/10">
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
                    Average per doctor
                  </p>
                  <p className="text-foreground mt-3 text-2xl font-semibold">
                    {getCurrencySign()}
                    {avgBill.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default BillsDoctorTrend;
