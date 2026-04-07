import AppointmentList from "../../Common/Appointments/Appointments";
import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";

const AppointmentsContainer: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/dashboard/admin" },
          {
            label: "Appointments",
            href: "/dashboard/admin/appointments",
          },
        ]}
      />
      <AppointmentList />
    </div>
  );
};

export default AppointmentsContainer;
