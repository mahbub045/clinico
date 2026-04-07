import { Card, CardContent } from "@/components/ui/card";
import { getCurrencySign } from "../../../../../../utils/formatters";

export type BillingValues = {
  totalRevenue: number;
  paid: number;
  due: number;
};

function formatMoney(value: number) {
  return `${getCurrencySign()}${value.toLocaleString()}`;
}

export default function BillingSummary({ values }: { values: BillingValues }) {
  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-4 shadow-sm shadow-slate-950/10 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="mb-6">
        <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase">
          Billing Summary
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-semibold">Today</h2>
      </div>

      <Card className="border-border/70 rounded-[2rem] bg-white/90 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/10">
        <CardContent className="space-y-4 px-6 py-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Total Revenue</p>
            <p className="text-foreground text-base font-semibold">
              {formatMoney(values.totalRevenue)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Paid</p>
            <p className="text-foreground text-base font-semibold">
              {formatMoney(values.paid)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Due</p>
            <p className="text-foreground text-base font-semibold">
              {formatMoney(values.due)}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
