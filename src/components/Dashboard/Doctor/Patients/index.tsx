import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";

const PatientsContainer: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/dashboard/doctor" },
          { label: "Patients", href: "/dashboard/doctor/patients" },
        ]}
      />
    </div>
  );
};

export default PatientsContainer;