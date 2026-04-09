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
  }),
});

export const { useGetBillsPaymentStatusQuery } = BillsAnalyticsApi;