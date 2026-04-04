import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";
import AppointmentList from "./AppointmentList/AppointmentList";

const AppointmentsContainer: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/dashboard/doctor" },
          { label: "Appointments", href: "/dashboard/doctor/appointments" },
        ]}
      />
      <AppointmentList />
    </div>
  );
};

export default AppointmentsContainer;
