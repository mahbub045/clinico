import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CalendarPlus, FileText, Search, Shuffle } from "lucide-react";

const actions = [
  {
    label: "Book Appointment",
    href: "/dashboard/receptionist/appointments",
    icon: CalendarPlus,
  },
  {
    label: "Generate Bill",
    href: "/dashboard/receptionist",
    icon: FileText,
  },
  {
    label: "Assign/Change Doctor",
    href: "/dashboard/receptionist/appointments",
    icon: Shuffle,
  },
  {
    label: "Search Patient",
    href: "/dashboard/receptionist/patients",
    icon: Search,
  },
];

export default function QuickActions() {
  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-4 shadow-sm shadow-slate-950/10 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="mb-6">
        <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase">
          Quick Actions
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-semibold">
          Workflow shortcuts
        </h2>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outline"
              className="border-border/70 text-foreground hover:border-primary/70 hover:bg-primary/5 h-auto w-full justify-start gap-3 rounded-3xl bg-white/90 px-5 py-4 text-left text-sm font-medium shadow-sm shadow-slate-950/5 transition dark:bg-slate-950/95 dark:hover:bg-slate-900"
              asChild
            >
              <Link href={action.href}>
                <span className="bg-primary/10 text-primary inline-flex h-11 w-11 items-center justify-center rounded-2xl">
                  <Icon className="size-5" />
                </span>
                {action.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </section>
  );
}
