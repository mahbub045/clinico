import { BaseApi } from "@/redux/api/BaseApi";

export const PrescriptionsApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getPrescriptions: build.query({
      query: (params) => ({
        url: "/api/prescriptions/",
        method: "GET",
        params,
      }),
      providesTags: ["Prescriptions"],
    }),
    getPrescriptionDetails: build.query({
      query: (alias) => ({
        url: `/api/prescriptions/${alias}/`,
      }),
      providesTags: ["Prescriptions"],
    }),
    downloadPrescription: build.mutation({
      query: (alias) => ({
        url: `/api/prescriptions/${alias}/pdf/`,
        method: "GET",
        responseHandler: async (response: Response) => response.blob(),
      }),
    }),
    createPrescription: build.mutation({
      query: (data) => ({
        url: "/api/prescriptions/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    editPrescription: build.mutation({
      query: ({ alias, data }) => ({
        url: `/api/prescriptions/${alias}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    deletePrescription: build.mutation({
      query: (alias) => ({
        url: `/api/prescriptions/${alias}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prescriptions"],
    }),
  }),
});

export const {
  useGetPrescriptionsQuery,
  useGetPrescriptionDetailsQuery,
  useDownloadPrescriptionMutation,
  useCreatePrescriptionMutation,
  useEditPrescriptionMutation,
  useDeletePrescriptionMutation,
} = PrescriptionsApi;
