export type RawPatient = {
  patient_alias?: string;
  patient_slug?: string;
  user_email?: string;
  user_first_name?: string;
  user_last_name?: string;
  user_title?: string;
  date_of_birth?: string | null;
  gender?: string;
  last_visit?: string;
  user_phone?: string;
  id?: string;
} & Record<string, unknown>;

export type PatientRow = {
  patient_alias?: string;
  name: string;
  age: string;
  gender: string;
  lastVisit: string;
  email: string;
  phone: string;
};
