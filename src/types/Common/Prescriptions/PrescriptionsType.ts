export type PrescriptionItem = {
  id: number;
  alias: string;
  slug?: string;
  prescription_number?: string;
  appointment_details?: {
    patient_first_name?: string;
    patient_last_name?: string;
    doctor_first_name?: string;
    doctor_last_name?: string;
    status?: string;
  };
  diagnosis?: string;
  medicines?: string;
  advice?: string;
  notes?: string;
  created_at?: string;
};
export type CreatePrescriptionPayload = {
  appointment: string;
  diagnosis: string;
  medicines: string;
  advice: string;
  notes: string;
};

export interface EditPrescriptionDialogProps {
  alias: string;
  initialValues: {
    prescription_number?: string;
    diagnosis?: string;
    medicines?: string;
    advice?: string;
    notes?: string;
  };
  children?: React.ReactNode;
}

export interface DeletePrescriptionDialogProps {
  alias?: string | null;
  prescriptionLabel?: string | null;
  children?: React.ReactNode;
}
