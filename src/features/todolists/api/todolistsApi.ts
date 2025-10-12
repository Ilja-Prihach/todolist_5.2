// import { instance } from "@/common/instance"
// import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
//import {  fetchBaseQuery } from "@reduxjs/toolkit/query/react"
//import { AUTH_TOKEN } from "@/common/constants"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"


export const todolistsApi = baseApi.injectEndpoints({
  // reducerPath: "todolistsApi",
  // tagTypes: ["Todolist"],
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_BASE_URL,
  //   headers: {
  //     "API-KEY": import.meta.env.VITE_API_KEY,
  //   },
  //   prepareHeaders: (headers) => {
  //     headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
  //     //config.headers["Authorization"] = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  //   },
  // }),
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      // query: () => ({url: "/todo-lists"}),  // для get запроса можно сокращенно писать
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((todolists) => ({ ...todolists, filter: "all", entityStatus: "idle" })),
      providesTags: ["Todolist"],
    }),
    addTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "/todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `/todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {useGetTodolistsQuery, useAddTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistTitleMutation,} = todolistsApi








// export const _todolistsApi = {
//   getTodolists() {
//     return instance.get<Todolist[]>("/todo-lists")
//   },
//   changeTodolistTitle(payload: { id: string; title: string }) {
//     const { id, title } = payload
//     return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
//   },
//   createTodolist(title: string) {
//     return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
//   },
//   deleteTodolist(id: string) {
//     return instance.delete<BaseResponse>(`/todo-lists/${id}`)
//   },
// }
