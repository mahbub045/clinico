"use client";

import {
  Edit,
  LoaderPinwheel,
  Plus,
  SearchIcon,
  Trash,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPatientsQuery } from "@/redux/reducers/Common/Patients/PatientsApi";
import { PatientRow, RawPatient } from "@/types/Common/Patients/PatientsType";
import { formatChoiceFieldValue } from "../../../../../../utils/formatters";

const formatAge = (dateOfBirth?: string | null) => {
  if (!dateOfBirth) return "-";
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return "-";

  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age -= 1;
  }

  return `${age}`;
};

const normalizePatient = (patient: RawPatient): PatientRow => {
  const name = [
    formatChoiceFieldValue(patient.user_title),
    patient.user_first_name,
    patient.user_last_name,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return {
    patient_alias: patient.patient_alias,
    name: name || "Unknown patient",
    age: formatAge(patient.date_of_birth),
    gender: patient.gender || "Unknown",
    lastVisit: patient.last_visit || "-",
    email: patient.user_email || "-",
  };
};

const PatientList: React.FC = () => {
  const [query, setQuery] = useState("");

  const { data: patientsData, isLoading } = useGetPatientsQuery({
    search: query,
  });

  const rawPatients = useMemo(() => {
    if (!patientsData) return [];
    if (Array.isArray(patientsData)) return patientsData as RawPatient[];
    if (patientsData.results && Array.isArray(patientsData.results)) {
      return patientsData.results as RawPatient[];
    }
    return [patientsData as RawPatient];
  }, [patientsData]);

  const normalizedPatients = useMemo(
    () => rawPatients.map(normalizePatient),
    [rawPatients],
  );

  const filteredPatients = useMemo(
    () =>
      normalizedPatients.filter((patient) =>
        [patient.name, patient.gender, patient.email]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [normalizedPatients, query],
  );

  return (
    <div className="card bg-card space-y-10 rounded-md p-6 shadow-sm">
      <section className="space-y-4">
        <div className="grid w-full grid-cols-[1fr_auto] gap-3">
          <div className="relative w-sm">
            <SearchIcon className="text-primary pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="patient-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search patients..."
              className="w-full pl-10"
            />
          </div>
          <Button variant="secondary">
            <Plus className="size-4" />
            New patient
          </Button>
        </div>
        <Table className="border-border bg-card w-full border text-sm shadow-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary">Name</TableHead>
              <TableHead className="text-primary">Age</TableHead>
              <TableHead className="text-primary">Gender</TableHead>
              <TableHead className="text-primary">Last visit</TableHead>
              <TableHead className="text-primary text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center">
                  <div className="text-muted-foreground flex items-center justify-center gap-2">
                    <LoaderPinwheel className="text-primary animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient, index) => (
                <TableRow key={patient.patient_alias ?? patient.email ?? index}>
                  <TableCell className="text-foreground font-medium">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary/10 text-primary inline-flex h-9 w-9 items-center justify-center rounded-2xl">
                        <User className="size-4" />
                      </span>
                      <div className="space-y-0.5">
                        <div>{patient.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    {formatChoiceFieldValue(patient.gender)}
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <Button variant="secondary" size="sm">
                        <Edit />
                      </Button>
                      <Button variant="danger" size="sm">
                        <Trash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <p className="text-muted-foreground text-sm">
          Showing patients that match your current search. Refine search to
          update results.
        </p>
      </section>
    </div>
  );
};

export default PatientList;
