"use client";

import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateAppointmentMutation } from "@/redux/reducers/Common/Appointments/AppointmentsApi";
import { useGetDoctorsQuery } from "@/redux/reducers/Common/Doctors/DoctorsApi";
import { useGetPatientsQuery } from "@/redux/reducers/Common/Patients/PatientsApi";
import {
  AddAppointmentPayload,
  OptionRecord,
} from "@/types/Common/Appointments/AppointmentsType";

interface EditAppointmentDialogProps {
  alias: string;
  initialValues: Partial<AddAppointmentPayload> & {
    patient_label?: string;
    doctor_label?: string;
  };
  children?: React.ReactNode;
}

const buildFormState = (
  values: Partial<AddAppointmentPayload>,
): AddAppointmentPayload => ({
  patient_id: values.patient_id ?? "",
  doctor_id: values.doctor_id ?? "",
  appointment_date: values.appointment_date ?? "",
  appointment_time: values.appointment_time ?? "",
  status: values.status ?? "PENDING",
  reason: values.reason ?? "",
  notes: values.notes ?? "",
});

const EditAppointmentDialog: React.FC<EditAppointmentDialogProps> = ({
  alias,
  initialValues,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<AddAppointmentPayload>(
    buildFormState(initialValues),
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const { data: doctors, isLoading: doctorsLoading } =
    useGetDoctorsQuery(undefined);
  const { data: patients, isLoading: patientsLoading } =
    useGetPatientsQuery(undefined);
  const [editAppointment, { isLoading: editingAppointment }] =
    useUpdateAppointmentMutation();

  const patientsList: OptionRecord[] = Array.isArray(patients)
    ? patients
    : patients && typeof patients === "object" && "results" in patients
      ? ((patients as { results?: OptionRecord[] }).results ?? [])
      : [];

  const doctorsList: OptionRecord[] = Array.isArray(doctors)
    ? doctors
    : doctors && typeof doctors === "object" && "results" in doctors
      ? ((doctors as { results?: OptionRecord[] }).results ?? [])
      : [];

  useEffect(() => {
    setFormData(buildFormState(initialValues));
  }, [initialValues]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setFormData(buildFormState(initialValues));
      setFieldErrors({});
    }
    setOpen(nextOpen);
  };

  const clearFieldError = (key: keyof AddAppointmentPayload) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const handleInputChange =
    (key: keyof AddAppointmentPayload) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      clearFieldError(key);
      setFormData((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleSelectChange = (
    key: keyof AddAppointmentPayload,
    value: string,
  ) => {
    clearFieldError(key);
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderFieldError = (field: keyof AddAppointmentPayload) =>
    fieldErrors[field]?.map((error, idx) => (
      <p key={idx} className="text-destructive text-xs">
        {error}
      </p>
    ));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});

    const body: Record<string, unknown> = {};
    if (formData.patient_id !== "") {
      body.patient_id = Number(formData.patient_id);
    }
    if (formData.doctor_id !== "") {
      body.doctor_id = Number(formData.doctor_id);
    }
    body.appointment_date = formData.appointment_date;
    body.appointment_time = formData.appointment_time;
    body.status = formData.status;
    body.reason = formData.reason;
    body.notes = formData.notes;

    try {
      await editAppointment({ alias, ...body }).unwrap();
      toast.success("Appointment updated successfully.");
      setOpen(false);
    } catch (error) {
      console.error("Failed to update appointment", error);

      const apiErrors =
        error && typeof error === "object" && "data" in error
          ? (error as { data?: unknown }).data
          : null;

      if (apiErrors && typeof apiErrors === "object") {
        const parsedErrors = Object.entries(apiErrors).reduce(
          (acc, [key, value]) => {
            if (Array.isArray(value)) {
              acc[key] = value.map((item) => String(item));
            } else if (value != null) {
              acc[key] = [String(value)];
            }
            return acc;
          },
          {} as Record<string, string[]>,
        );

        if (Object.keys(parsedErrors).length > 0) {
          setFieldErrors(parsedErrors);
          toast.error("Please fix the highlighted fields.");
          return;
        }
      }

      toast.error("Failed to update appointment. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="secondary" size="sm">
            <Edit />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-xl! overflow-y-auto shadow-md sm:max-w-2xl! md:max-w-3xl!">
        <DialogHeader>
          <DialogTitle>Edit appointment</DialogTitle>
          <DialogDescription>
            Update appointment details and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="patient_id"
              >
                Patient
              </label>
              <Select
                value={formData.patient_id}
                onValueChange={(value) =>
                  handleSelectChange("patient_id", value)
                }
              >
                <SelectTrigger id="patient_id" className="w-full">
                  <SelectValue
                    placeholder={
                      patientsLoading
                        ? "Loading patients..."
                        : (initialValues.patient_label ?? "Select patient")
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {patientsList.map((patient) => (
                    <SelectItem key={patient.id} value={String(patient.id)}>
                      {patient.full_name ||
                        `${patient.first_name ?? ""} ${patient.last_name ?? ""}`.trim() ||
                        `Patient #${patient.id}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {renderFieldError("patient_id")}
            </div>

            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="doctor_id"
              >
                Doctor
              </label>
              <Select
                value={formData.doctor_id}
                onValueChange={(value) =>
                  handleSelectChange("doctor_id", value)
                }
              >
                <SelectTrigger id="doctor_id" className="w-full">
                  <SelectValue
                    placeholder={
                      doctorsLoading
                        ? "Loading doctors..."
                        : (initialValues.doctor_label ?? "Select doctor")
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {doctorsList.map((doctor) => (
                    <SelectItem key={doctor.id} value={String(doctor.id)}>
                      {doctor.full_name ||
                        `${doctor.first_name ?? ""} ${doctor.last_name ?? ""}`.trim() ||
                        `Doctor #${doctor.id}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {renderFieldError("doctor_id")}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="appointment_date"
              >
                Appointment date
              </label>
              <Input
                id="appointment_date"
                type="date"
                value={formData.appointment_date}
                onChange={handleInputChange("appointment_date")}
              />
              {renderFieldError("appointment_date")}
            </div>

            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="appointment_time"
              >
                Appointment time
              </label>
              <Input
                id="appointment_time"
                type="time"
                value={formData.appointment_time}
                onChange={handleInputChange("appointment_time")}
              />
              {renderFieldError("appointment_time")}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="status"
              >
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              {renderFieldError("status")}
            </div>

            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="reason"
              >
                Reason
              </label>
              <Input
                id="reason"
                value={formData.reason}
                onChange={handleInputChange("reason")}
                placeholder="Routine health checkup"
              />
              {renderFieldError("reason")}
            </div>
          </div>

          <div className="grid gap-2">
            <label
              className="text-foreground text-sm font-medium"
              htmlFor="notes"
            >
              Notes
            </label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={handleInputChange("notes")}
              placeholder="Patient requested blood test and general consultation."
              rows={4}
            />
            {renderFieldError("notes")}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={editingAppointment}>
              {editingAppointment ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentDialog;
