import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

const metrics = [
  {
    title: "Total Patients Seen",
    value: "1,245",
    icon: Stethoscope,
    description: "Monthly total",
  },
  {
    title: "Today’s Appointments",
    value: "18",
    icon: CalendarDays,
    description: "Scheduled for today",
  },
  {
    title: "Completed Today",
    value: "12",
    icon: CheckCircle2,
    description: "Consultations finished",
  },
  {
    title: "Pending",
    value: "6",
    icon: Activity,
    description: "Awaiting follow-up",
  },
];

export default function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card
            key={metric.title}
            className="rounded-[2rem] border-border/70 bg-white/90 p-6 shadow-sm shadow-slate-950/10 dark:bg-slate-950/90 dark:shadow-black/10"
          >
            <CardHeader className="gap-4 px-0 pb-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-foreground">
                  {metric.title}
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                {metric.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
