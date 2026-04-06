import { BaseApi } from "@/redux/api/BaseApi";

export const PatientsApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getPatients: build.query({
      query: (params) => ({
        url: "/api/patient/",
        method: "GET",
        params,
      }),
      providesTags: ["Patients"],
    }),
  }),
});

export const { useGetPatientsQuery } = PatientsApi;
