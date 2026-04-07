"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetAppointmentDetailsQuery } from "@/redux/reducers/Common/Appointments/AppointmentsApi";
import { LoaderPinwheel } from "lucide-react";
import { useParams } from "next/navigation";
import {
  formatChoiceFieldValue,
  formatDateAndTime,
} from "../../../../../../utils/formatters";

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

const AppointmentDetails: React.FC = () => {
  const { alias } = useParams() as { alias?: string };
  const {
    data: appointment,
    isLoading,
    error,
  } = useGetAppointmentDetailsQuery(alias ?? "", { skip: !alias });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-foreground text-2xl font-semibold">
          Appointment details
        </h1>
        <p className="text-muted-foreground mt-2">
          Review the selected appointment, patient, doctor, and tracking
          details.
        </p>
      </div>

      {isLoading ? (
        <Card className="border-border rounded-xl border p-6 text-center">
          <div className="mx-auto flex max-w-xs flex-col items-center justify-center gap-3">
            <LoaderPinwheel className="text-primary animate-spin" />
            <p className="text-foreground">Loading appointment details...</p>
          </div>
        </Card>
      ) : !appointment || error ? (
        <Card className="border-destructive/50 bg-destructive/5 text-destructive rounded-xl border p-6 text-center">
          <p className="text-foreground">Unable to load appointment details.</p>
          <p className="text-muted-foreground mt-2">
            Please refresh the page or try again later.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card className="border-border rounded-xl border p-6 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground text-sm">Appointment</p>
                  <p className="text-foreground text-lg font-semibold">
                    {appointment.slug ||
                      appointment.alias ||
                      "Unnamed appointment"}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground text-sm">Status</p>
                    <Badge variant={statusVariant(appointment.status ?? "")}>
                      {formatChoiceFieldValue(appointment.status) ?? "Unknown"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Date</p>
                    <p className="text-foreground">
                      {appointment.appointment_date || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Time</p>
                    <p className="text-foreground">
                      {appointment.appointment_time || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Created at</p>
                    <p className="text-foreground">
                      {formatDateAndTime(appointment.created_at)}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-muted-foreground text-sm">Notes</p>
                    <p className="text-foreground">
                      {appointment.notes || "-"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-muted-foreground text-sm">Reason</p>
                    <p className="text-foreground">
                      {appointment.reason || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-border rounded-xl border p-6 shadow-sm">
              <h2 className="text-foreground text-lg font-semibold">
                Patient information
              </h2>
              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-sm">Name</p>
                  <p className="text-foreground">
                    {appointment.patient?.full_name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Gender</p>
                  <p className="text-foreground">
                    {formatChoiceFieldValue(appointment.patient?.gender) || "-"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-border rounded-xl border p-6 shadow-sm">
              <h2 className="text-foreground text-lg font-semibold">
                Doctor information
              </h2>
              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-sm">Name</p>
                  <p className="text-foreground">
                    {appointment.doctor?.full_name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Specialization
                  </p>
                  <p className="text-foreground">
                    {appointment.doctor?.specialization || "-"}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border rounded-xl border p-6 shadow-sm">
              <h2 className="text-foreground text-lg font-semibold">
                Created by
              </h2>
              <div className="grid gap-4 pt-4">
                <div>
                  <p className="text-muted-foreground text-sm">Name</p>
                  <p className="text-foreground">
                    {appointment.created_by_details?.full_name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Email</p>
                  <p className="text-foreground">
                    {appointment.created_by_details?.email || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">User type</p>
                  <p className="text-foreground">
                    {appointment.created_by_details?.user_type || "-"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border-border rounded-xl border p-6 shadow-sm">
              <h2 className="text-foreground text-lg font-semibold">
                Tracking
              </h2>
              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-sm">Created at</p>
                  <p className="text-foreground">
                    {formatDateAndTime(appointment.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Updated at</p>
                  <p className="text-foreground">
                    {formatDateAndTime(appointment.updated_at)}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground text-sm">
                    Appointment ID
                  </p>
                  <p className="text-foreground">{appointment.id}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;
