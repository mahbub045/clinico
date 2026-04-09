import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";
import MedicalRecordAnalyticsCondition from "./components/MedicalRecordAnalyticsCondition";
import MedicalRecordSummary from "./components/MedicalRecordSummary";

const AdminHomeContainer: React.FC = () => {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/dashboard/admin" }]} />
      <div className="space-y-8 pb-10">
        <MedicalRecordSummary />

        <div className="grid gap-6 lg:grid-cols-2">
          <MedicalRecordAnalyticsCondition />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]"></div>
      </div>
    </>
  );
};

export default AdminHomeContainer;
