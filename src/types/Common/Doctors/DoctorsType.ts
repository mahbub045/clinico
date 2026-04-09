export type RawDoctor = {
  alias?: string;
  name?: string;
  title?: string;
  first_name?: string;
  last_name?: string;
  specialty?: string;
  specialization?: string;
  department?: string;
  email?: string;
  phone?: string;
  degree?: string;
  experience_years?: number;
  [key: string]: unknown;
};

export type DoctorsResponse =
  | RawDoctor[]
  | {
      total_items?: number;
      total_pages?: number;
      current_page?: number;
      next?: string | null;
      previous?: string | null;
      results?: RawDoctor[];
    }
  | RawDoctor;

export type DoctorRow = RawDoctor & {
  name: string;
  specialty: string;
  degree: string;
  experience: string;
};