import Breadcrumbs from "@/components/Dashboard/Common/Breadcrumbs/Breadcrumbs";
import MedicalRecordDetails from "@/components/Dashboard/Common/MedicalRecords/MedicalRecordDetails/MedicalRecordDetails";

const MedicalRecordDetailsContainer: React.FC = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/dashboard/admin" },
          {
            href: "/dashboard/admin/medical-records",
          },
          { label: "Record Details", href: "#" },
        ]}
      />
      <MedicalRecordDetails />
    </div>
  );
};

export default MedicalRecordDetailsContainer;
