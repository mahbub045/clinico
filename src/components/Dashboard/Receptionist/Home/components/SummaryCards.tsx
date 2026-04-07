import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CalendarDays, CreditCard, Users } from "lucide-react";

export type ReceptionistSummaryValues = {
  totalPatientsToday: number;
  appointmentsBooked: number;
  walkIns: number;
  pendingBills: number;
};

const metrics = (
  values: ReceptionistSummaryValues,
): Array<{
  title: string;
  value: string;
  description: string;
  icon: typeof Users;
}> => [
  {
    title: "Total Patients Today",
    value: values.totalPatientsToday.toLocaleString(),
    icon: Users,
    description: "Patients in today's schedule",
  },
  {
    title: "Appointments Booked",
    value: values.appointmentsBooked.toLocaleString(),
    icon: CalendarDays,
    description: "Scheduled for today",
  },
  {
    title: "Walk-ins",
    value: values.walkIns.toLocaleString(),
    icon: Activity,
    description: "Awaiting check-in",
  },
  {
    title: "Pending Bills",
    value: values.pendingBills.toLocaleString(),
    icon: CreditCard,
    description: "Require follow-up",
  },
];

export default function SummaryCards({
  values,
}: {
  values: ReceptionistSummaryValues;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics(values).map((metric) => {
        const Icon = metric.icon;
        return (
          <Card
            key={metric.title}
            className="border-border/70 rounded-[2rem] bg-white/90 p-4 shadow-sm shadow-slate-950/10 sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10"
          >
            <CardHeader className="gap-4 px-0 pb-4">
              <div className="bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-3xl">
                <Icon className="size-5" />
              </div>
              <div>
                <CardTitle className="text-foreground text-base font-semibold">
                  {metric.title}
                </CardTitle>
                <p className="text-muted-foreground mt-1 text-sm">
                  {metric.description}
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <p className="text-foreground text-4xl font-semibold tracking-tight">
                {metric.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
