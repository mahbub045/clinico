import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, ShieldCheck, Users } from "lucide-react";

const receptionistSummaries = [
  {
    label: "Receptionists",
    value: "12",
    description: "Active front desk staff currently in the system.",
  },
  {
    label: "Shifts today",
    value: "8",
    description: "Team members scheduled for today’s reception coverage.",
  },
  {
    label: "Pending approvals",
    value: "2",
    description: "Profiles awaiting review and access approval.",
  },
  {
    label: "Guest check-ins",
    value: "24",
    description: "Today's expected visitor appointments handled.",
  },
];

const ReceptionistOverview: React.FC = () => {
  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-6 shadow-sm shadow-slate-950/10 sm:p-8 dark:bg-slate-950/95 dark:shadow-black/10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-primary text-sm font-semibold tracking-[0.24em] uppercase">
            Receptionist management
          </p>
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Front desk operations
          </h1>
          <p className="text-muted-foreground text-sm leading-6">
            Keep reception staffing, shifts, and guest-handling workflows
            aligned with the clinic’s daily operations.
          </p>
        </div>

        <div className="grid w-full max-w-sm gap-4 sm:grid-cols-2">
          <div className="border-border/70 flex items-center gap-4 rounded-3xl border bg-white/90 p-5 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/5">
            <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-3xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">
                Staff roster
              </p>
              <p className="text-muted-foreground text-sm">
                Track front desk coverage.
              </p>
            </div>
          </div>

          <div className="border-border/70 flex items-center gap-4 rounded-3xl border bg-white/90 p-5 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/5">
            <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-3xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">
                Verified access
              </p>
              <p className="text-muted-foreground text-sm">
                Approved receptionists only.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {receptionistSummaries.map((summary) => (
          <Card
            key={summary.label}
            className="border-border rounded-3xl border bg-white/90 p-5 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/5"
          >
            <CardHeader className="px-0 pb-2">
              <CardTitle className="text-muted-foreground text-sm font-semibold tracking-[0.22em] uppercase">
                {summary.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <p className="text-foreground text-3xl font-semibold tracking-tight">
                {summary.value}
              </p>
              <CardDescription className="text-muted-foreground mt-2 text-sm leading-6">
                {summary.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border-border/70 mt-8 rounded-[2rem] border bg-white/90 p-6 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-primary text-sm font-semibold tracking-[0.24em] uppercase">
              Operational health
            </p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              Reception desk readiness
            </h2>
          </div>
          <div className="bg-primary/5 text-primary inline-flex items-center gap-2 rounded-3xl px-4 py-3 text-sm">
            <CalendarDays className="h-5 w-5" />
            92% shift completion rate this week
          </div>
        </div>
        <p className="text-muted-foreground mt-4 text-sm leading-6">
          Use this overview to ensure reception coverage stays strong and every
          guest arrival is supported by the right team.
        </p>
      </div>
    </section>
  );
};

export default ReceptionistOverview;
