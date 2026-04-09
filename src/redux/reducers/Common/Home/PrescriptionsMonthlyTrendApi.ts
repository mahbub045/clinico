import { BaseApi } from "@/redux/api/BaseApi";

export const PrescriptionsMonthlyTrendApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getPrescriptionsMonthlyTrend: build.query({
      query: () => ({
        url: "/api/prescriptions/analytics/monthly-trend/",
        method: "GET",
      }),
      providesTags: ["Prescriptions"],
    }),
  }),
});

export const { useGetPrescriptionsMonthlyTrendQuery } =
  PrescriptionsMonthlyTrendApi;
