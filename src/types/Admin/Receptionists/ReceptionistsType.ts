export type ReceptionistRecord = {
  alias: string;
  title: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
};

export type ReceptionistApiItem = {
  id: number;
  alias: string;
  slug: string;
  email: string;
  title: string;
  first_name: string;
  last_name: string;
  phone: string;
  suburb: string;
  postal_code: string;
  address: string;
  profile_image: null;
  employee_id: string;
  joining_date: string | null;
  shift: string;
  desk_number: string;
  experience_years: number | null;
  created_at: string;
  updated_at: string;
};
