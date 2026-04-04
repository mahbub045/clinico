import { BaseApi } from "@/redux/api/BaseApi";

export const UserInfoApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query({
      query: () => "/auth/users/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserInfoQuery } = UserInfoApi;
