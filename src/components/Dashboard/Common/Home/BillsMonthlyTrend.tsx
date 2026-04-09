"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBillsMonthlyTrendQuery } from "@/redux/reducers/Common/Home/BillsAnalyticsApi";
import { BillsMonthlyTrendPoint } from "@/types/Common/Home/BillsAnalyticsTypes";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getCurrencySign } from "../../../../../utils/formatters";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatMonthLabel = (year: number, month: number) =>
  `${monthNames[month - 1] ?? ""} ${year}`;

const BillsMonthlyTrend: React.FC = () => {
  const { data, isLoading, isError } = useGetBillsMonthlyTrendQuery(undefined);
  const chartData: BillsMonthlyTrendPoint[] = Array.isArray(data) ? data : [];
  const preparedData = chartData.map((item) => ({
    ...item,
    month_label: formatMonthLabel(item.year, item.month),
  }));

  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-4 shadow-sm shadow-slate-950/10 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-primary text-sm font-semibold tracking-[0.24em] uppercase">
            Billing trend
          </p>
          <h2 className="text-foreground mt-2 text-2xl font-semibold">
            Monthly billing performance
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6">
            Monitor monthly billing totals, discounts, and tax amounts over
            time.
          </p>
        </div>
      </div>

      <Card className="border-border/70 bg-white/90 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/10">
        <CardHeader className="px-6 pb-0">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Monthly billing trend
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
              Unable to load monthly billing trend data.
            </div>
          ) : preparedData.length === 0 ? (
            <div className="border-border/70 bg-muted/80 text-muted-foreground rounded-[1.75rem] border p-6">
              No monthly billing trend data available.
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
                  sum_discount: {
                    label: "Total discount",
                    color: "#f59e0b",
                  },
                  sum_tax: {
                    label: "Total tax",
                    color: "#10b981",
                  },
                }}
                initialDimension={{ width: 680, height: 288 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={preparedData}
                    margin={{ left: 4, right: 4, top: 8, bottom: 32 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="month_label"
                      tickLine={false}
                      axisLine={false}
                      interval={0}
                      angle={-30}
                      textAnchor="end"
                      height={72}
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
                    <ChartLegend
                      verticalAlign="top"
                      content={<ChartLegendContent />}
                    />
                    <Line
                      type="monotone"
                      dataKey="sum_total_amount"
                      stroke="var(--color-sum_total_amount)"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sum_discount"
                      stroke="var(--color-sum_discount)"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sum_tax"
                      stroke="var(--color-sum_tax)"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default BillsMonthlyTrend;
