import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Appointment } from "@/types/Common/Appointments/AppointmentsType";

function formatTime(raw?: string | null) {
  if (!raw) return "—";
  const [hh, mm] = raw.split(":");
  if (!hh || !mm) return raw;
  return `${hh.padStart(2, "0")}:${mm.padStart(2, "0")}`;
}

function statusBadgeVariant(status?: string | null) {
  const normalized = (status ?? "").toUpperCase();
  switch (normalized) {
    case "CONFIRMED":
      return "success" as const;
    case "COMPLETED":
      return "secondary" as const;
    case "CANCELLED":
      return "danger" as const;
    case "PENDING":
    default:
      return "warning" as const;
  }
}

function formatStatus(status?: string | null) {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export default function TodayAppointmentsTable({
  appointments,
  loading,
}: {
  appointments: Appointment[];
  loading: boolean;
}) {
  return (
    <section className="border-border/70 bg-card/90 rounded-[2rem] border p-4 shadow-sm shadow-slate-950/10 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90 dark:shadow-black/10">
      <div className="mb-6">
        <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase">
          Appointment List
        </p>
        <h2 className="text-foreground mt-3 text-2xl font-semibold">Today</h2>
      </div>

      <Card className="border-border/70 rounded-[2rem] bg-white/90 shadow-sm shadow-slate-950/5 dark:bg-slate-950/95 dark:shadow-black/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead className="pr-4 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="pl-4">
                      <Skeleton className="h-4 w-14" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <Skeleton className="ml-auto h-5 w-20 rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="px-4 py-10 text-center">
                    <p className="text-muted-foreground text-sm">
                      No appointments scheduled for today.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                appointments.slice(0, 6).map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="text-foreground pl-4 font-medium">
                      {formatTime(appointment.appointment_time)}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {appointment.patient?.full_name ?? "—"}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {appointment.doctor?.full_name ?? "—"}
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <Badge variant={statusBadgeVariant(appointment.status)}>
                        {formatStatus(appointment.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
