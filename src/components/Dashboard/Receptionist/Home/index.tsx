import type { Appointment } from "@/types/Common/Appointments/AppointmentsType";
import Breadcrumbs from "../../Common/Breadcrumbs/Breadcrumbs";

import BillsPaymentMethods from "../../Common/Home/BillsPaymentMethods";
import BillsPaymentStatus from "../../Common/Home/BillsPaymentStatus";
import PrescriptionsMonthlyTrend from "../../Common/Home/PrescriptionsMonthlyTrend";
import BillingSummary from "./components/BillingSummary";
import QuickActions from "./components/QuickActions";
import SummaryCards from "./components/SummaryCards";
import TodayAppointmentsTable from "./components/TodayAppointmentsTable";
import TodaysActivityChart from "./components/TodaysActivityChart";
import BillsDoctorTrend from "../../Common/Home/BillsDoctorTrend";
import BillsMonthlyTrend from "../../Common/Home/BillsMonthlyTrend";

const activityData = [
  { hour: "09 AM", appointments: 2 },
  { hour: "10 AM", appointments: 6 },
  { hour: "11 AM", appointments: 4 },
  { hour: "12 PM", appointments: 3 },
  { hour: "01 PM", appointments: 5 },
  { hour: "02 PM", appointments: 2 },
  { hour: "03 PM", appointments: 4 },
];

const todayAppointmentsMock: Appointment[] = [
  {
    id: 1,
    appointment_time: "09:30",
    patient: { full_name: "Rafia Akter" },
    doctor: { full_name: "Dr. Hasan" },
    status: "CONFIRMED",
  },
  {
    id: 2,
    appointment_time: "10:15",
    patient: { full_name: "Mehedi Hasan" },
    doctor: { full_name: "Dr. Sultana" },
    status: "PENDING",
  },
  {
    id: 3,
    appointment_time: "11:00",
    patient: { full_name: "Nusrat Jahan" },
    doctor: { full_name: "Dr. Rahman" },
    status: "CONFIRMED",
  },
  {
    id: 4,
    appointment_time: "12:20",
    patient: { full_name: "Tanvir Ahmed" },
    doctor: { full_name: "Dr. Karim" },
    status: "CANCELLED",
  },
  {
    id: 5,
    appointment_time: "01:10",
    patient: { full_name: "Sadia Islam" },
    doctor: { full_name: "Dr. Noor" },
    status: "COMPLETED",
  },
  {
    id: 6,
    appointment_time: "02:45",
    patient: { full_name: "Fahim Chowdhury" },
    doctor: { full_name: "Dr. Ahmed" },
    status: "PENDING",
  },
];

const ReceptionistHomeContainer = () => {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/dashboard/receptionist" }]}
      />
      <div className="space-y-8 pb-10">
        <div className="border-border/70 bg-card/90 rounded-[2rem] border p-5 shadow-sm shadow-slate-950/10 backdrop-blur-xl sm:p-8 dark:bg-slate-950/95 dark:shadow-black/10">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-primary flex items-center gap-2 text-sm font-semibold tracking-[0.24em] uppercase">
                <span className="bg-primary/10 text-primary inline-flex h-8 w-8 items-center justify-center rounded-full">
                  R
                </span>
                Receptionist Dashboard
              </p>
              <h1 className="text-foreground mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Clinical overview & patient workflow
              </h1>
              <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6 sm:text-base">
                See your daily schedule, patient priorities, and health insights
                all in one place.
              </p>
            </div>
          </div>
        </div>

        <SummaryCards
          values={{
            totalPatientsToday: 128,
            appointmentsBooked: 42,
            walkIns: 9,
            pendingBills: 13,
          }}
        />

        <PrescriptionsMonthlyTrend />

        <div className="grid gap-6 lg:grid-cols-2">
          <BillsPaymentStatus />
          <BillsPaymentMethods />
        </div>

        <BillsDoctorTrend />
        <BillsMonthlyTrend />

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <TodaysActivityChart data={activityData} loading={false} />
          <QuickActions />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <TodayAppointmentsTable
            appointments={todayAppointmentsMock}
            loading={false}
          />
          <BillingSummary
            values={{ totalRevenue: 42500, paid: 36150, due: 6350 }}
          />
        </div>
      </div>
    </>
  );
};

export default ReceptionistHomeContainer;
