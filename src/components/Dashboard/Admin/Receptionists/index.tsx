import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";
import ReceptionistList from "./ReceptionistList/ReceptionistList";
import ReceptionistOverview from "./ReceptionistOverview/ReceptionistOverview";

const ReceptionistsContainer: React.FC = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/dashboard/admin" },
          { label: "Receptionists", href: "/dashboard/admin/receptionists" },
        ]}
      />
      <ReceptionistOverview />
      <ReceptionistList />
    </div>
  );
};

export default ReceptionistsContainer;
