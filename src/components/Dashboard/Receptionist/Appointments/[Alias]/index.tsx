import AppointmentDetails from "@/components/Dashboard/Common/Appointments/AppointmentDetails/AppointmentDetails";
import Breadcrumbs from "@/components/Dashboard/Common/Breadcrumbs/Breadcrumbs";

const AppointmentDetailsContainer: React.FC = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/dashboard/receptionist" },
          {
            label: "Appointments",
            href: "/dashboard/receptionist/appointments",
          },
          {
            label: "Appointment Details",
            href: "#",
          },
        ]}
      />
      <AppointmentDetails />
    </div>
  );
};

export default AppointmentDetailsContainer;
