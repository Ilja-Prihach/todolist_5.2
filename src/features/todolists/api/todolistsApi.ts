import { baseApi } from "@/app/baseApi.ts"
import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import type { Todolist } from "./todolistsApi.types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({ method: "post", url: "/todo-lists", body: { title } }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({ method: "delete", url: `/todo-lists/${id}` }),
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({ method: "put", url: `/todo-lists/${id}`, body: { title } }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useFetchTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

export const _todolistsApi = {
  // ✅
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  // ✅
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
  // ✅
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  // ✅
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
}
