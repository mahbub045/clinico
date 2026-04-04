import { Plus, SearchIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const appointmentSummaries = [
  {
    label: "Today's Appointments",
    value: "12",
    description: "Patients scheduled for today",
  },
  {
    label: "New Patients",
    value: "4",
    description: "First-time consultations",
  },
  {
    label: "Completed",
    value: "18",
    description: "Visits finalized this week",
  },
  {
    label: "Cancelled",
    value: "2",
    description: "Appointments that were cancelled",
  },
];

const appointments = [
  {
    id: "APT-001",
    patient: "Maya Patel",
    time: "09:30 AM",
    date: "Apr 4, 2026",
    department: "Cardiology",
    status: "Confirmed",
    room: "B12",
    note: "Routine heart check",
  },
  {
    id: "APT-002",
    patient: "Noah Thompson",
    time: "10:15 AM",
    date: "Apr 4, 2026",
    department: "Dermatology",
    status: "Pending",
    room: "A09",
    note: "Follow-up on rash",
  },
  {
    id: "APT-003",
    patient: "Sara Lee",
    time: "11:00 AM",
    date: "Apr 4, 2026",
    department: "Neurology",
    status: "Confirmed",
    room: "C03",
    note: "Migraine consultation",
  },
  {
    id: "APT-004",
    patient: "Ethan Brooks",
    time: "12:30 PM",
    date: "Apr 4, 2026",
    department: "General",
    status: "Completed",
    room: "B07",
    note: "Annual physical exam",
  },
  {
    id: "APT-005",
    patient: "Lina Gomez",
    time: "02:00 PM",
    date: "Apr 4, 2026",
    department: "Pediatrics",
    status: "Confirmed",
    room: "D01",
    note: "Vaccination review",
  },
  {
    id: "APT-006",
    patient: "Oscar Wu",
    time: "03:45 PM",
    date: "Apr 4, 2026",
    department: "Orthopedics",
    status: "Cancelled",
    room: "A11",
    note: "Rescheduled for next week",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "default";
    case "Pending":
      return "secondary";
    case "Completed":
      return "success";
    case "Cancelled":
      return "destructive";
    default:
      return "default";
  }
};

const AppointmentList: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Doctor dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Appointments
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Review today’s bookings, monitor patient status, and keep your
              schedule on track.
            </p>
          </div>

          <div className="grid gap-3 sm:w-full sm:max-w-md">
            <label className="sr-only" htmlFor="appointment-search">
              Search appointments
            </label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="appointment-search"
                placeholder="Search patients, departments, or status"
                className="pl-9"
              />
            </div>
            <Button variant="secondary" className="w-full">
              <Plus />
              New appointment
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {appointmentSummaries.map((summary) => (
            <Card
              key={summary.label}
              className="rounded-3xl border border-border p-4"
            >
              <CardHeader className="px-0 pb-2">
                <CardTitle className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {summary.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-2">
                <p className="text-3xl font-semibold tracking-tight text-foreground">
                  {summary.value}
                </p>
                <CardDescription className="mt-2 text-sm leading-6 text-muted-foreground">
                  {summary.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Upcoming Appointments
            </p>
            <p className="text-sm text-muted-foreground">
              A quick view of today’s schedule and patient status.
            </p>
          </div>
          <Badge variant="secondary">6 appointments</Badge>
        </div>

        <Table className="w-full border border-border bg-card text-sm shadow-sm">
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date / Time</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Room</TableHead>
              <TableHead className="text-right">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium text-foreground">
                  {appointment.patient}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      {appointment.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.date}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{appointment.department}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>{appointment.room}</TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {appointment.note}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            All dummy appointments are shown for design preview.
          </TableCaption>
        </Table>
      </section>
    </div>
  );
};

export default AppointmentList;
