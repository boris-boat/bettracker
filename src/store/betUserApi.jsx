import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const betUserApi = createApi({
  reducerPath: "betUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/bettracker/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `login`,
        method: "POST",
        body: credentials,
      }),
    }),
    addEvent: builder.mutation({
      query: (data) => ({
        url: `addEvent`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useLoginUserMutation, useAddEventMutation } = betUserApi;
