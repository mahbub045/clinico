"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAppointmentsQuery } from "@/redux/reducers/Common/Appointments/AppointmentsApi";
import { Appointment } from "@/types/Common/Appointments/AppointmentsType";
import { Edit, LoaderPinwheel, Plus, SearchIcon, Trash2 } from "lucide-react";
import { useMemo } from "react";

const statusVariant = (status: string) => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return "default";
    case "PENDING":
      return "secondary";
    case "COMPLETED":
      return "success";
    case "CANCELLED":
      return "destructive";
    default:
      return "default";
  }
};

const AppointmentList: React.FC = () => {
  const {
    data: appointmentsData,
    isLoading,
    error,
  } = useGetAppointmentsQuery(undefined);

  const appointments = useMemo<Appointment[]>(() => {
    if (!appointmentsData) return [];
    if (Array.isArray(appointmentsData))
      return appointmentsData as Appointment[];
    if (appointmentsData.results && Array.isArray(appointmentsData.results)) {
      return appointmentsData.results as Appointment[];
    }
    return [];
  }, [appointmentsData]);

  return (
    <div className="space-y-8">
      <Card className="rounded-md p-6 shadow-sm">
        <section className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-foreground text-sm font-semibold">
                Upcoming Appointments
              </p>
              <p className="text-muted-foreground text-sm">
                A quick view of today’s schedule and patient status.
              </p>
            </div>
            <div className="relative w-full max-w-sm">
              <SearchIcon className="text-primary pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="appointment-search"
                placeholder="Search appointments"
                className="w-full pl-10"
              />
            </div>
            <Button variant="secondary" className="justify-self-end">
              <Plus className="size-4" />
              New appointment
            </Button>
          </div>

          <Table className="border-border bg-card w-full border text-sm shadow-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary">Patient</TableHead>
                <TableHead className="text-primary">Doctor</TableHead>
                <TableHead className="text-primary">Date / Time</TableHead>
                <TableHead className="text-primary">Status</TableHead>
                <TableHead className="text-primary">Created by</TableHead>
                <TableHead className="text-primary truncate">Notes</TableHead>
                <TableHead className="text-primary text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-muted-foreground py-10 text-center text-sm"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <LoaderPinwheel className="text-primary animate-spin" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : appointments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-muted-foreground py-10 text-center text-sm"
                  >
                    No appointments available.
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="text-foreground font-medium">
                      {appointment.patient?.full_name ?? "Unknown patient"}
                    </TableCell>
                    <TableCell>
                      {appointment.doctor?.full_name ?? "Unknown doctor"}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-foreground font-medium">
                          {appointment.appointment_time ?? "-"}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {appointment.appointment_date ?? "-"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(appointment.status ?? "")}>
                        {appointment.status ? appointment.status : "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {appointment.created_by_details?.full_name ?? "System"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {appointment.notes || appointment.reason || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          aria-label={`Edit appointment for ${appointment.patient?.full_name ?? "patient"}`}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          aria-label={`Delete appointment for ${appointment.patient?.full_name ?? "patient"}`}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </section>
      </Card>
    </div>
  );
};

export default AppointmentList;
