import Breadcrumbs from "@/components/Dashboard/Common/Breadcrumbs/Breadcrumbs";
import PatientDetails from "@/components/Dashboard/Common/Patients/PatientDetails/PatientDetails";

const PatientDetailsContainer: React.FC = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/dashboard/admin" },
          { label: "Patients", href: "/dashboard/admin/patients" },
          { label: "Details", href: "#" },
        ]}
      />
      <PatientDetails />
    </div>
  );
};

export default PatientDetailsContainer;
