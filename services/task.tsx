import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fair-tan-camel-fez.cyclic.app",
  }),
  endpoints: (builder) => ({
    getTask: builder.mutation({
        query: () => ({
          url: `/task`,
          method: "GET",
        }),
    }),
    addTask: builder.mutation({
      query: (body) => ({
        url: `/task`,
        method: "POST",
        body,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
    }),
    updateTask: builder.mutation({
      query: (body) => ({
        url: `/task/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
    useGetTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;