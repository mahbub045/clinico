"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBillsPaymentStatusQuery } from "@/redux/reducers/Common/Home/BillsAnalyticsApi";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  formatChoiceFieldValue,
  getCurrencySign,
} from "../../../../../utils/formatters";

type BillsPaymentStatusPoint = {
  payment_status: string;
  total_bills: number;
  total_amount: number;
};

const BillsPaymentStatus: React.FC = () => {
  const { data, isLoading, isError } = useGetBillsPaymentStatusQuery(undefined);
  const chartData: BillsPaymentStatusPoint[] = data ?? [];

  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-4 shadow-sm shadow-slate-950/10 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-primary text-sm font-semibold tracking-[0.24em] uppercase">
            Billing status
          </p>
          <h2 className="text-foreground mt-2 text-2xl font-semibold">
            Payment status breakdown
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6">
            Compare total billed amount by payment status across the clinic.
          </p>
        </div>
      </div>

      <Card className="border-border/70 bg-white/90 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/10">
        <CardHeader className="px-6 pb-0">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Payment status volumes
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
              Unable to load billing payment status data.
            </div>
          ) : chartData.length === 0 ? (
            <div className="border-border/70 bg-muted/80 text-muted-foreground rounded-[1.75rem] border p-6">
              No billing payment status data available.
            </div>
          ) : (
            <div className="border-border/70 bg-muted/80 rounded-[1.75rem] border p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/80">
              <ChartContainer
                className="h-72 w-full"
                config={{
                  total_amount: {
                    label: "Total amount",
                    color: "#16a34a",
                  },
                }}
                initialDimension={{ width: 680, height: 288 }}
              >
                <BarChart
                  data={chartData}
                  margin={{ left: 4, right: 4, top: 8, bottom: 32 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="payment_status"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                    height={72}
                    tickFormatter={(value) =>
                      formatChoiceFieldValue(String(value))
                    }
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
                    dataKey="total_amount"
                    fill="var(--color-total_amount)"
                    radius={[10, 10, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default BillsPaymentStatus;
