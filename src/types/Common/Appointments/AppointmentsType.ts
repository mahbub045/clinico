export type Appointment = {
  id: number;
  alias: string;
  patient?: { full_name?: string } | null;
  doctor?: { full_name?: string; specialization?: string } | null;
  created_by_details?: { full_name?: string } | null;
  appointment_date?: string | null;
  appointment_time?: string | null;
  status?: string | null;
  notes?: string | null;
  reason?: string | null;
};
