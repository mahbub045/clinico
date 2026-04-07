import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Users } from "lucide-react";

const doctorSummaries = [
  {
    label: "Practicing doctors",
    value: "74",
    description: "Doctors currently active in the system.",
  },
  {
    label: "On duty today",
    value: "18",
    description: "Physicians scheduled for today’s shifts.",
  },
  {
    label: "Specialties",
    value: "22",
    description: "Unique medical specialties covered.",
  },
  {
    label: "Approved staff",
    value: "68",
    description: "Doctors cleared for appointments and reviews.",
  },
];

const DoctorsSummary: React.FC = () => {
  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-6 shadow-sm shadow-slate-950/10 sm:p-8 dark:bg-slate-950/95 dark:shadow-black/10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-primary text-sm font-semibold tracking-[0.24em] uppercase">
            Doctor Management
          </p>
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Medical specialists
          </h1>
          <p className="text-muted-foreground text-sm leading-6">
            Track doctor availability, specialties, and approval status for the
            clinic team.
          </p>
        </div>

        <div className="grid w-full max-w-sm gap-4 sm:grid-cols-2">
          <div className="border-border/70 flex items-center gap-4 rounded-3xl border bg-white/90 p-5 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/5">
            <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-3xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">Team size</p>
              <p className="text-muted-foreground text-sm">
                All active doctors
              </p>
            </div>
          </div>

          <div className="border-border/70 flex items-center gap-4 rounded-3xl border bg-white/90 p-5 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/5">
            <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-3xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">Verified</p>
              <p className="text-muted-foreground text-sm">
                Credentials cleared
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {doctorSummaries.map((summary) => (
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
    </section>
  );
};

export default DoctorsSummary;
