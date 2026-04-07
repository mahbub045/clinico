import { BaseApi } from "@/redux/api/BaseApi";

export const AppointmentsApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAppointments: build.query({
      query: (params) => ({
        url: "/api/appointments/",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: ["Appointments"],
    }),
    getAppointmentDetails: build.query({
      query: (alias) => ({
        url: `/api/appointments/${alias}/`,
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),
    createAppointment: build.mutation({
      query: (appointmentData) => ({
        url: "/api/appointments/",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointments"],
    }),
    updateAppointment: build.mutation({
      query: ({ alias, ...appointmentData }) => ({
        url: `/api/appointments/${alias}/`,
        method: "PATCH",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointments"],
    }),
    deleteAppointment: build.mutation({
      query: (alias) => ({
        url: `/api/appointments/${alias}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentDetailsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = AppointmentsApi;
