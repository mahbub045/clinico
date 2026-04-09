import { BaseApi } from "@/redux/api/BaseApi";

export const MedicalRecordsApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getMedicalRecords: build.query({
      query: (params) => ({
        url: "/api/core/medical-records/",
        method: "GET",
        params,
      }),
      providesTags: ["MedicalRecords"],
    }),
    getMedicalRecordDetails: build.query({
      query: (alias) => ({
        url: `/api/core/medical-records/${alias}/`,
        method: "GET",
      }),
      providesTags: ["MedicalRecords"],
    }),
    createMedicalRecord: build.mutation({
      query: (data) => ({
        url: "/api/core/medical-records/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MedicalRecords"],
    }),
    editMedicalRecord: build.mutation({
      query: ({ alias, ...data }) => ({
        url: `/api/core/medical-records/${alias}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["MedicalRecords"],
    }),
    deleteMedicalRecord: build.mutation({
      query: (alias) => ({
        url: `/api/core/medical-records/${alias}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["MedicalRecords"],
    }),
  }),
});

export const {
  useGetMedicalRecordsQuery,
  useGetMedicalRecordDetailsQuery,
  useCreateMedicalRecordMutation,
  useEditMedicalRecordMutation,
  useDeleteMedicalRecordMutation,
} = MedicalRecordsApi;
