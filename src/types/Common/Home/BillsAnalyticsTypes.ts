export type BillsMonthlyTrendPoint = {
  year: number;
  month: number;
  total_bills: number;
  sum_total_amount: number;
  sum_discount: number;
  sum_tax: number;
  avg_total_amount: number;
};

export type BillsDoctorTrendPoint = {
  appointment__doctor__id: number;
  appointment__doctor__alias: string;
  appointment__doctor__user__first_name: string;
  appointment__doctor__user__last_name: string;
  appointment__doctor__specialization: string;
  total_bills: number;
  sum_total_amount: number;
  average_amount: number;
};

export type BillsPaymentMethodsPoint = {
  payment_method: string;
  total_bills: number;
  total_amount: number;
};

export type BillsPaymentStatusPoint = {
  payment_status: string;
  total_bills: number;
  total_amount: number;
};

export type PrescriptionsMonthlyTrendPoint = {
  year: number;
  month: number;
  total_prescriptions: number;
};
