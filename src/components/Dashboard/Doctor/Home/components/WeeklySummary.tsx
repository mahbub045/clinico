const weeklyData = [
  { day: "Mon", count: 12, color: "bg-primary" },
  { day: "Tue", count: 18, color: "bg-secondary" },
  { day: "Wed", count: 15, color: "bg-primary/90" },
  { day: "Thu", count: 20, color: "bg-primary" },
  { day: "Fri", count: 10, color: "bg-secondary/80" },
  { day: "Sat", count: 16, color: "bg-primary/70" },
  { day: "Sun", count: 8, color: "bg-secondary/60" },
];

export default function WeeklySummary() {
  const maxCount = Math.max(...weeklyData.map((item) => item.count));

  return (
    <section className="rounded-[2rem] border border-border/70 bg-card/90 p-4 shadow-sm shadow-slate-950/10 dark:bg-slate-950/90 dark:shadow-black/10 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Weekly Summary
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">
            Weekly appointments
          </h2>
        </div>
        <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
          Bar Chart
        </span>
      </div>

      <div className="space-y-4">
        {weeklyData.map((item) => (
          <div key={item.day} className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{item.day}</span>
              <span>{item.count} patients</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
