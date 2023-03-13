import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const betUserApi = createApi({
  reducerPath: "betUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/bettracker/" }),
  tagTypes: ["Users"],
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
    addSlip: builder.mutation({
      query: (data) => ({
        url: `addSlip`,
        method: "POST",
        body: data,
      }),
    }),
    addToSlip: builder.mutation({
      query: (data) => ({
        url: `addToSlip`,
        method: "POST",
        body: data,
      }),
    }),
    deleteItem: builder.mutation({
      query: (data) => ({
        url: `deleteItem`,
        method: "POST",
        body: data,
      }),
    }),
    editSlip: builder.mutation({
      query: (data) => ({
        url: `editSlip`,
        method: "POST",
        body: data,
      }),
    }),
    editEvent: builder.mutation({
      query: (data) => ({
        url: `editEvent`,
        method: "POST",
        body: data,
      }),
    }),
    getFilteredData: builder.mutation({
      query: (data) => ({
        url: `getFilteredData`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginUserMutation,
  useAddEventMutation,
  useAddSlipMutation,
  useEditSlipMutation,
  useDeleteItemMutation,
  useAddToSlipMutation,
  useEditEventMutation,
  useGetFilteredDataMutation,
} = betUserApi;
