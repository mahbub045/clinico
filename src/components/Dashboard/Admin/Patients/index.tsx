import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";
import Patients from "../../Common/Patients/Patients";

const PatientsContainer: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/dashboard/admin" },
          { label: "Patients", href: "/dashboard/admin/patients" },
        ]}
      />
      <Patients />
    </div>
  );
};

export default PatientsContainer;
