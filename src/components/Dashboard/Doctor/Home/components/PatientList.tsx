import { CheckCircle2, Clock3, User } from "lucide-react";

const patients = [
  {
    time: "09:00",
    name: "John Smith",
    age: 45,
    condition: "Fever",
    status: "Done",
  },
  {
    time: "09:30",
    name: "Sarah Lee",
    age: 30,
    condition: "Diabetes",
    status: "Waiting",
  },
  {
    time: "10:00",
    name: "Ahmed Khan",
    age: 50,
    condition: "BP",
    status: "Waiting",
  },
];

function StatusPill({ status }: { status: string }) {
  const isDone = status === "Done";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${isDone ? "bg-emerald-500/10 text-emerald-700" : "bg-amber-500/10 text-amber-700"}`}
    >
      {isDone ? (
        <CheckCircle2 className="size-3" />
      ) : (
        <Clock3 className="size-3" />
      )}
      {status}
    </span>
  );
}

export default function PatientList() {
  return (
    <section className="rounded-[2rem] border border-border/70 bg-card/90 p-4 shadow-sm shadow-slate-950/10 dark:bg-slate-950/90 dark:shadow-black/10 sm:p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Today’s Patient List
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground">
          Patient queue
        </h2>
      </div>

      {/* Mobile: stacked cards */}
      <div className="space-y-3 sm:hidden">
        {patients.map((patient) => (
          <div
            key={patient.time}
            className="rounded-3xl border border-border/70 bg-white/90 p-4 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Time
                </div>
                <div className="text-sm font-medium text-foreground">
                  {patient.time}
                </div>
              </div>

              <StatusPill status={patient.status} />
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="size-4 text-primary" />
              {patient.name}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-950/5 px-3 py-2 dark:bg-slate-800/60">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Age
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">
                  {patient.age}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-950/5 px-3 py-2 dark:bg-slate-800/60">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Condition
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">
                  {patient.condition}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* sm+: table */}
      <div className="hidden overflow-x-auto rounded-3xl border border-border/70 bg-white/90 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 sm:block">
        <table className="w-full min-w-170 border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-5 py-4 whitespace-nowrap">Time</th>
              <th className="px-5 py-4 whitespace-nowrap">Patient Name</th>
              <th className="px-5 py-4 whitespace-nowrap">Age</th>
              <th className="px-5 py-4 whitespace-nowrap">Condition</th>
              <th className="px-5 py-4 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.time}
                className="border-t border-border/70 last:border-b-0 odd:bg-slate-50 dark:odd:bg-slate-950/90"
              >
                <td className="px-5 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {patient.time}
                </td>
                <td className="px-5 py-4 text-foreground">
                  <div className="flex min-w-40 items-center gap-2 whitespace-nowrap">
                    <User className="size-4 text-primary" />
                    {patient.name}
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {patient.age}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {patient.condition}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <StatusPill status={patient.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
