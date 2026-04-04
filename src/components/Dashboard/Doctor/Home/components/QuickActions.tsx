import { ClipboardList, FileText, PlayCircle } from "lucide-react";

const actions = [
  { label: "Start Consultation", icon: PlayCircle },
  { label: "View Patient History", icon: ClipboardList },
  { label: "Add Prescription", icon: FileText },
];

export default function QuickActions() {
  return (
    <section className="rounded-[2rem] border border-border/70 bg-card/90 p-4 shadow-sm shadow-slate-950/10 dark:bg-slate-950/90 dark:shadow-black/10 sm:p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Quick Actions
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground">
          Workflow shortcuts
        </h2>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-3xl border border-border/70 bg-white/90 px-5 py-4 text-left text-sm font-medium text-foreground shadow-sm shadow-slate-950/5 transition hover:border-primary/70 hover:bg-primary/5 dark:bg-slate-950/95 dark:hover:bg-slate-900"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              {action.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
