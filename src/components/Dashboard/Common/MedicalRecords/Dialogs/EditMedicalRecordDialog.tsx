"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAppointmentsQuery } from "@/redux/reducers/Common/Appointments/AppointmentsApi";
import { useEditMedicalRecordMutation } from "@/redux/reducers/Common/MedicalRecords/MedicalRecordsApi";
import { useGetPatientsQuery } from "@/redux/reducers/Common/Patients/PatientsApi";
import {
  CreateMedicalRecordPayload,
  MedicalRecordItem,
} from "@/types/Common/MedicalRecords/MedicalRecordsType";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditMedicalRecordDialogProps {
  record: MedicalRecordItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getInitialFormState = (
  record: MedicalRecordItem,
): CreateMedicalRecordPayload => ({
  patient: record.patient,
  appointment: record.appointment,
  patient_record_id: record.patient_record_id,
  age: record.age,
  gender: record.gender,
  condition: record.condition,
  procedure: record.procedure,
  cost: record.cost,
  length_of_stay: record.length_of_stay,
  readmission: record.readmission,
  outcome: record.outcome,
  satisfaction: record.satisfaction,
});

const EditMedicalRecordDialog: React.FC<EditMedicalRecordDialogProps> = ({
  record,
  open,
  onOpenChange,
}) => {
  const initialFormState = getInitialFormState(record);
  const [formData, setFormData] =
    useState<CreateMedicalRecordPayload>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [editMedicalRecord, { isLoading }] = useEditMedicalRecordMutation();

  const { data: patientsData } = useGetPatientsQuery(undefined, {
    skip: !open,
  });
  const { data: appointmentsData } = useGetAppointmentsQuery(undefined, {
    skip: !open,
  });

  const patientsList = Array.isArray(patientsData)
    ? patientsData
    : patientsData &&
        typeof patientsData === "object" &&
        "results" in patientsData
      ? (patientsData.results as Array<Record<string, unknown>>)
      : [];

  const appointmentsList = Array.isArray(appointmentsData)
    ? appointmentsData
    : appointmentsData &&
        typeof appointmentsData === "object" &&
        "results" in appointmentsData
      ? (appointmentsData.results as Array<Record<string, unknown>>)
      : [];

  const getPatientLabel = (patient: Record<string, unknown>) => {
    const firstName = patient.first_name as string | undefined;
    const lastName = patient.last_name as string | undefined;
    return (
      [firstName, lastName].filter(Boolean).join(" ") ||
      `Patient #${patient.id}`
    );
  };

  const getAppointmentLabel = (appointment: Record<string, unknown>) => {
    const date = appointment.appointment_date as string | undefined;
    const time = appointment.appointment_time as string | undefined;
    return date
      ? `#${appointment.id} ${date}${time ? ` • ${time}` : ""}`
      : `Appointment #${appointment.id}`;
  };

  const clearFieldError = (key: keyof CreateMedicalRecordPayload) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const handleTextChange = (
    key: keyof CreateMedicalRecordPayload,
    value: string,
  ) => {
    clearFieldError(key);
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNumberChange = (
    key: keyof CreateMedicalRecordPayload,
    value: string,
  ) => {
    clearFieldError(key);
    setFormData((prev) => ({
      ...prev,
      [key]: value === "" ? null : Number(value),
    }));
  };

  const renderFieldError = (field: keyof CreateMedicalRecordPayload) =>
    fieldErrors[field]?.map((error, idx) => (
      <p key={idx} className="text-destructive text-xs">
        {error}
      </p>
    ));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});

    try {
      await editMedicalRecord({ alias: record.alias, ...formData }).unwrap();
      toast.success("Medical record updated successfully.");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update medical record", error);

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

      toast.error("Failed to update medical record. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-xl! overflow-y-auto shadow-md sm:max-w-3xl! md:max-w-4xl!">
        <DialogHeader>
          <DialogTitle>Edit medical record</DialogTitle>
          <DialogDescription>
            Update the selected medical record details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="age"
                className="text-foreground text-sm font-medium"
              >
                Age<span className="text-destructive">*</span>
              </label>
              <Input
                id="age"
                type="number"
                min={0}
                value={formData.age ?? ""}
                onChange={(event) =>
                  handleNumberChange("age", event.target.value)
                }
                placeholder="Age"
                required
              />
              {renderFieldError("age")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="patient"
                className="text-foreground text-sm font-medium"
              >
                Patient<span className="text-destructive">*</span>
              </label>
              <Select
                value={formData.patient ? String(formData.patient) : ""}
                onValueChange={(value) => handleNumberChange("patient", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patientsList.length === 0 ? (
                    <div className="text-muted-foreground p-3 text-sm">
                      No patients available
                    </div>
                  ) : (
                    patientsList.map((patient) => (
                      <SelectItem
                        key={patient.id as number}
                        value={String(patient.id as number)}
                      >
                        {getPatientLabel(patient)}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {renderFieldError("patient")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="appointment"
                className="text-foreground text-sm font-medium"
              >
                Appointment<span className="text-destructive">*</span>
              </label>
              <Select
                value={formData.appointment ? String(formData.appointment) : ""}
                onValueChange={(value) =>
                  handleNumberChange("appointment", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select appointment" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentsList.length === 0 ? (
                    <div className="text-muted-foreground p-3 text-sm">
                      No appointments available
                    </div>
                  ) : (
                    appointmentsList.map((appointment) => (
                      <SelectItem
                        key={appointment.id as number}
                        value={String(appointment.id as number)}
                      >
                        {getAppointmentLabel(appointment)}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {renderFieldError("appointment")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="gender"
                className="text-foreground text-sm font-medium"
              >
                Gender<span className="text-destructive">*</span>
              </label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleTextChange("gender", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              {renderFieldError("gender")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="condition"
                className="text-foreground text-sm font-medium"
              >
                Condition<span className="text-destructive">*</span>
              </label>
              <Input
                id="condition"
                value={formData.condition}
                onChange={(event) =>
                  handleTextChange("condition", event.target.value)
                }
                placeholder="Condition"
                required
              />
              {renderFieldError("condition")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="procedure"
                className="text-foreground text-sm font-medium"
              >
                Procedure<span className="text-destructive">*</span>
              </label>
              <Input
                id="procedure"
                value={formData.procedure}
                onChange={(event) =>
                  handleTextChange("procedure", event.target.value)
                }
                placeholder="Procedure"
                required
              />
              {renderFieldError("procedure")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="cost"
                className="text-foreground text-sm font-medium"
              >
                Cost<span className="text-destructive">*</span>
              </label>
              <Input
                id="cost"
                type="number"
                min={0}
                value={formData.cost ?? ""}
                onChange={(event) =>
                  handleNumberChange("cost", event.target.value)
                }
                placeholder="Cost"
                required
              />
              {renderFieldError("cost")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="length_of_stay"
                className="text-foreground text-sm font-medium"
              >
                Length of stay<span className="text-destructive">*</span>
              </label>
              <Input
                id="length_of_stay"
                type="number"
                min={0}
                value={formData.length_of_stay ?? ""}
                onChange={(event) =>
                  handleNumberChange("length_of_stay", event.target.value)
                }
                placeholder="Length of stay"
                required
              />
              {renderFieldError("length_of_stay")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="readmission"
                className="text-foreground text-sm font-medium"
              >
                Readmission<span className="text-destructive">*</span>
              </label>
              <Select
                value={formData.readmission}
                onValueChange={(value) =>
                  handleTextChange("readmission", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">Yes</SelectItem>
                  <SelectItem value="NO">No</SelectItem>
                </SelectContent>
              </Select>
              {renderFieldError("readmission")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="outcome"
                className="text-foreground text-sm font-medium"
              >
                Outcome<span className="text-destructive">*</span>
              </label>
              <Input
                id="outcome"
                value={formData.outcome}
                onChange={(event) =>
                  handleTextChange("outcome", event.target.value)
                }
                placeholder="Outcome"
                required
              />
              {renderFieldError("outcome")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="satisfaction"
                className="text-foreground text-sm font-medium"
              >
                Satisfaction<span className="text-destructive">*</span>
              </label>
              <Input
                id="satisfaction"
                type="number"
                min={1}
                max={5}
                value={formData.satisfaction ?? ""}
                onChange={(event) =>
                  handleNumberChange("satisfaction", event.target.value)
                }
                placeholder="Satisfaction"
                required
              />
              {renderFieldError("satisfaction")}
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="patient_record_id"
                className="text-foreground text-sm font-medium"
              >
                Patient record ID
              </label>
              <Input
                id="patient_record_id"
                type="number"
                min={0}
                value={formData.patient_record_id ?? ""}
                onChange={(event) =>
                  handleNumberChange("patient_record_id", event.target.value)
                }
                placeholder="Patient record ID"
              />
              {renderFieldError("patient_record_id")}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMedicalRecordDialog;
