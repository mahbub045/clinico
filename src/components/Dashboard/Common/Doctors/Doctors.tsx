import DoctorList from "./DoctorList/DoctorList";
import DoctorsSummary from "./DoctorsSummary/DoctorsSummary";

const Doctors: React.FC = () => {
  return (
    <div className="space-y-8">
      <DoctorsSummary />
      <DoctorList />
    </div>
  );
};

export default Doctors;
