import { BaseApi } from "@/redux/api/BaseApi";

export const AppointmentsApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAppointments: build.query({
      query: () => ({
        url: "/api/appointments/",
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),
    getAppointmentDetails: build.query({
      query: (id) => ({
        url: `/api/appointments/${id}/`,
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
      query: ({ id, ...appointmentData }) => ({
        url: `/api/appointments/${id}/`,
        method: "PATCH",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointments"],
    }),
    deleteAppointment: build.mutation({
      query: (id) => ({
        url: `/api/appointments/${id}/`,
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
