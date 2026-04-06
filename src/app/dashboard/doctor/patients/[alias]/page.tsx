import PatientDetails from "@/components/Dashboard/Common/Patients/PatientList/PatientDetails";
import { requireDashboardRole } from "@/lib/dashboard-auth";

export default async function PatientsPage() {
  await requireDashboardRole(["DOCTOR"]);
  return <PatientDetails />;
}
