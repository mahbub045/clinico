import { BaseApi } from "@/redux/api/BaseApi";

export const BillsAnalyticsApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getBillsPaymentStatus: build.query({
      query: () => ({
        url: "api/bills/analytics/payment-status/",
        method: "GET",
      }),
      providesTags: ["BillsAnalytics"],
    }),
    getBillsPaymentMethods: build.query({
      query: () => ({
        url: "api/bills/analytics/payment-method/",
        method: "GET",
      }),
      providesTags: ["BillsAnalytics"],
    }),
    getBillsDoctorTrend: build.query({
      query: () => ({
        url: "/api/bills/analytics/doctor/",
        method: "GET",
      }),
      providesTags: ["BillsAnalytics"],
    }),
    getBillsMonthlyTrend: build.query({
      query: () => ({
        url: "/api/bills/analytics/monthly-trend/",
        method: "GET",
      }),
      providesTags: ["BillsAnalytics"],
    }),
  }),
});

export const {
  useGetBillsPaymentStatusQuery,
  useGetBillsPaymentMethodsQuery,
  useGetBillsDoctorTrendQuery,
  useGetBillsMonthlyTrendQuery,
} = BillsAnalyticsApi;
