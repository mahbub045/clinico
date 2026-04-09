import { BaseApi } from "@/redux/api/BaseApi";

export const CommonApis = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    commonAppointmentList: build.query({
      query: (search) => ({
        url: "api/common/appointment-list/",
        method: "GET",
        params: { search },
      }),
      providesTags: ["Appointments"],
    }),
    commonPatientList: build.query({
      query: (search) => ({
        url: "api/common/patient-list/",
        method: "GET",
        params: { search },
      }),
      providesTags: ["Patients"],
    }),
    commonDoctorList: build.query({
      query: (search) => ({
        url: "api/common/doctor-list/",
        method: "GET",
        params: { search },
      }),
      providesTags: ["Doctors"],
    }),
  }),
});

export const {
  useCommonAppointmentListQuery,
  useCommonPatientListQuery,
  useCommonDoctorListQuery,
} = CommonApis;
