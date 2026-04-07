"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
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
import { useCreateAppointmentMutation } from "@/redux/reducers/Common/Appointments/AppointmentsApi";
import { useGetDoctorsQuery } from "@/redux/reducers/Common/Doctors/DoctorsApi";
import { useGetPatientsQuery } from "@/redux/reducers/Common/Patients/PatientsApi";
import {
  AddAppointmentPayload,
  OptionRecord,
} from "@/types/Common/Appointments/AppointmentsType";

const initialFormState: AddAppointmentPayload = {
  patient_id: "",
  doctor_id: "",
  appointment_date: "",
  appointment_time: "",
  status: "PENDING",
  reason: "",
  notes: "",
};

const AddAppointmentDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] =
    useState<AddAppointmentPayload>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [comboboxPortalContainer, setComboboxPortalContainer] =
    useState<HTMLDivElement | null>(null);

  const [patientQuery, setPatientQuery] = useState("");
  const [doctorQuery, setDoctorQuery] = useState("");
  const [debouncedPatientQuery, setDebouncedPatientQuery] = useState("");
  const [debouncedDoctorQuery, setDebouncedDoctorQuery] = useState("");

  const [selectedPatient, setSelectedPatient] = useState<OptionRecord | null>(
    null,
  );
  const [selectedDoctor, setSelectedDoctor] = useState<OptionRecord | null>(
    null,
  );

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedPatientQuery(patientQuery.trim());
    }, 300);
    return () => window.clearTimeout(handle);
  }, [patientQuery]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedDoctorQuery(doctorQuery.trim());
    }, 300);
    return () => window.clearTimeout(handle);
  }, [doctorQuery]);

  const patientSearchParams = debouncedPatientQuery.length
    ? { search: debouncedPatientQuery }
    : undefined;
  const doctorSearchParams = debouncedDoctorQuery.length
    ? { search: debouncedDoctorQuery }
    : undefined;

  const {
    data: doctors,
    isLoading: doctorsLoading,
    isFetching: doctorsFetching,
  } = useGetDoctorsQuery(doctorSearchParams, { skip: !open });
  const {
    data: patients,
    isLoading: patientsLoading,
    isFetching: patientsFetching,
  } = useGetPatientsQuery(patientSearchParams, { skip: !open });
  const [createAppointment, { isLoading: creatingAppointment }] =
    useCreateAppointmentMutation();

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

  const patientsItems: OptionRecord[] = selectedPatient
    ? patientsList.some((p) => p.id === selectedPatient.id)
      ? patientsList
      : [selectedPatient, ...patientsList]
    : patientsList;

  const doctorsItems: OptionRecord[] = selectedDoctor
    ? doctorsList.some((d) => d.id === selectedDoctor.id)
      ? doctorsList
      : [selectedDoctor, ...doctorsList]
    : doctorsList;

  const getOptionLabel = (option: OptionRecord, fallbackPrefix: string) =>
    option.full_name ||
    `${option.first_name ?? ""} ${option.last_name ?? ""}`.trim() ||
    `${fallbackPrefix} #${option.id}`;

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

    if (!formData.patient_id || !formData.doctor_id) {
      const nextErrors: Record<string, string[]> = {};
      if (!formData.patient_id)
        nextErrors.patient_id = ["This field is required."];
      if (!formData.doctor_id)
        nextErrors.doctor_id = ["This field is required."];
      setFieldErrors(nextErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    try {
      await createAppointment({
        patient_id: Number(formData.patient_id),
        doctor_id: Number(formData.doctor_id),
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        status: formData.status,
        reason: formData.reason,
        notes: formData.notes,
      }).unwrap();

      toast.success("Appointment added successfully.");
      setFormData(initialFormState);
      setSelectedPatient(null);
      setSelectedDoctor(null);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create appointment", error);

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

      toast.error("Failed to add appointment. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus /> Add appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-xl! overflow-y-auto shadow-md sm:max-w-2xl! md:max-w-3xl!">
        <DialogHeader>
          <DialogTitle>Add appointment</DialogTitle>
          <DialogDescription>
            Create a new appointment by selecting the patient, doctor, date, and
            time.
          </DialogDescription>
        </DialogHeader>

        <div ref={setComboboxPortalContainer} />

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="patient_id"
              >
                Patient<span className="text-danger">*</span>
              </label>
              <Combobox
                items={patientsItems}
                value={selectedPatient}
                onValueChange={(patient) => {
                  setSelectedPatient(patient);
                  setPatientQuery(
                    patient ? getOptionLabel(patient, "Patient") : "",
                  );
                  handleSelectChange(
                    "patient_id",
                    patient ? String(patient.id) : "",
                  );
                }}
                inputValue={patientQuery}
                onInputValueChange={(next) => {
                  setPatientQuery(next);
                  if (selectedPatient) {
                    const selectedLabel = getOptionLabel(
                      selectedPatient,
                      "Patient",
                    );
                    if (next !== selectedLabel) {
                      setSelectedPatient(null);
                      handleSelectChange("patient_id", "");
                    }
                  }
                }}
                isItemEqualToValue={(item, value) => item.id === value.id}
                itemToStringLabel={(item) => getOptionLabel(item, "Patient")}
                itemToStringValue={(item) => String(item.id)}
                disabled={patientsLoading}
              >
                <ComboboxInput
                  className="w-full"
                  id="patient_id"
                  placeholder={
                    patientsLoading
                      ? "Loading patients..."
                      : "Search by name, email or phone..."
                  }
                  showClear
                />
                <ComboboxContent portalContainer={comboboxPortalContainer}>
                  <ComboboxEmpty>
                    {patientsLoading || patientsFetching
                      ? "Searching..."
                      : "No patients found."}
                  </ComboboxEmpty>
                  <ComboboxList>
                    {(patient: OptionRecord) => (
                      <ComboboxItem key={patient.id} value={patient}>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate">
                            {getOptionLabel(patient, "Patient")}
                          </span>
                          {(
                            patient as unknown as {
                              email?: string | null;
                              phone?: string | null;
                            }
                          ).email ||
                          (
                            patient as unknown as {
                              email?: string | null;
                              phone?: string | null;
                            }
                          ).phone ? (
                            <span className="text-muted-foreground truncate text-xs">
                              {(
                                patient as unknown as {
                                  email?: string | null;
                                  phone?: string | null;
                                }
                              ).email ??
                                (
                                  patient as unknown as {
                                    email?: string | null;
                                    phone?: string | null;
                                  }
                                ).phone}
                            </span>
                          ) : null}
                        </span>
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {renderFieldError("patient_id")}
            </div>

            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="doctor_id"
              >
                Doctor<span className="text-danger">*</span>
              </label>
              <Combobox
                items={doctorsItems}
                value={selectedDoctor}
                onValueChange={(doctor) => {
                  setSelectedDoctor(doctor);
                  setDoctorQuery(
                    doctor ? getOptionLabel(doctor, "Doctor") : "",
                  );
                  handleSelectChange(
                    "doctor_id",
                    doctor ? String(doctor.id) : "",
                  );
                }}
                inputValue={doctorQuery}
                onInputValueChange={(next) => {
                  setDoctorQuery(next);
                  if (selectedDoctor) {
                    const selectedLabel = getOptionLabel(
                      selectedDoctor,
                      "Doctor",
                    );
                    if (next !== selectedLabel) {
                      setSelectedDoctor(null);
                      handleSelectChange("doctor_id", "");
                    }
                  }
                }}
                isItemEqualToValue={(item, value) => item.id === value.id}
                itemToStringLabel={(item) => getOptionLabel(item, "Doctor")}
                itemToStringValue={(item) => String(item.id)}
                disabled={doctorsLoading}
              >
                <ComboboxInput
                  className="w-full"
                  id="doctor_id"
                  placeholder={
                    doctorsLoading ? "Loading doctors..." : "Search doctor..."
                  }
                  showClear
                />
                <ComboboxContent portalContainer={comboboxPortalContainer}>
                  <ComboboxEmpty>
                    {doctorsLoading || doctorsFetching
                      ? "Searching..."
                      : "No doctors found."}
                  </ComboboxEmpty>
                  <ComboboxList>
                    {(doctor: OptionRecord) => (
                      <ComboboxItem key={doctor.id} value={doctor}>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate">
                            {getOptionLabel(doctor, "Doctor")}
                          </span>
                          {(
                            doctor as unknown as {
                              specialization?: string | null;
                            }
                          ).specialization ? (
                            <span className="text-muted-foreground truncate text-xs">
                              {
                                (
                                  doctor as unknown as {
                                    specialization?: string | null;
                                  }
                                ).specialization
                              }
                            </span>
                          ) : null}
                        </span>
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {renderFieldError("doctor_id")}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="appointment_date"
              >
                Appointment date<span className="text-danger">*</span>
              </label>
              <Input
                id="appointment_date"
                type="date"
                value={formData.appointment_date}
                onChange={handleInputChange("appointment_date")}
                required
              />
              {renderFieldError("appointment_date")}
            </div>

            <div className="grid gap-2">
              <label
                className="text-foreground text-sm font-medium"
                htmlFor="appointment_time"
              >
                Appointment time<span className="text-danger">*</span>
              </label>
              <Input
                id="appointment_time"
                type="time"
                value={formData.appointment_time}
                onChange={handleInputChange("appointment_time")}
                required
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
                Status<span className="text-danger">*</span>
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
                required
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
                placeholder="Routine checkup"
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
            <Button type="submit" disabled={creatingAppointment}>
              {creatingAppointment ? "Saving..." : "Save appointment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointmentDialog;
