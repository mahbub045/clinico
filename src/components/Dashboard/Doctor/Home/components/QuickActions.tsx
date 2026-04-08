import { ClipboardList, FileText, PlayCircle } from "lucide-react";

const actions = [
  { label: "Start Consultation", icon: PlayCircle },
  { label: "View Patient History", icon: ClipboardList },
  { label: "Add Prescription", icon: FileText },
];

export default function QuickActions() {
  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-4 shadow-sm shadow-slate-950/10 sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="mb-5 sm:mb-6">
        <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase">
          Quick Actions
        </p>
        <h2 className="text-foreground mt-2 text-xl font-semibold sm:mt-3 sm:text-2xl">
          Workflow shortcuts
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              className="border-border/70 text-foreground hover:border-primary/70 hover:bg-primary/5 flex w-full items-center gap-3 rounded-2xl border bg-white/90 px-4 py-3 text-left text-sm font-medium shadow-sm shadow-slate-950/5 transition sm:px-5 sm:py-4 dark:bg-slate-950/95 dark:hover:bg-slate-900"
            >
              <span className="bg-primary/10 text-primary inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 sm:rounded-2xl">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 leading-snug">{action.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
