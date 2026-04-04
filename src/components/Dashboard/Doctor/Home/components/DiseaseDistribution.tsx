const diseaseData = [
  { label: "Fever", value: 30, color: "bg-primary" },
  { label: "Diabetes", value: 20, color: "bg-secondary" },
  { label: "Hypertension", value: 15, color: "bg-emerald-500" },
  { label: "Cold & Flu", value: 25, color: "bg-sky-500" },
  { label: "Others", value: 10, color: "bg-slate-400" },
];

export default function DiseaseDistribution() {
  return (
    <section className="rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-sm shadow-slate-950/10 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Disease Distribution (%)
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">
            Clinical breakdown
          </h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[160px_1fr]">
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-slate-950/5 dark:bg-slate-800">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/20 via-secondary/20 to-slate-200/30"></div>
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white text-center text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/5 dark:bg-slate-950 dark:text-white">
            Top risk
            <span className="mt-1 block text-3xl">30%</span>
          </div>
        </div>

        <div className="space-y-3">
          {diseaseData.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-3xl border border-border/70 bg-white/90 px-4 py-3 text-sm shadow-sm shadow-slate-950/5 dark:bg-slate-950/90 dark:shadow-black/5"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full ${item.color}`}
                />
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
