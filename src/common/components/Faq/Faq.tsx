import { useFetchTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

export const Faq = () => {
  const { data } = useFetchTodolistsQuery()

  return (
    <div>
      <h1>Faq</h1>
      <div>
        {data?.map((item) => {
          return <div>{item.title}</div>
        })}
      </div>
    </div>
  )
}
