//import { useAppDispatch, useAppSelector } from "@/common/hooks"
//import { fetchTodolistsTC, selectTodolists } from "@/features/todolists/model/todolists-slice"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
//import { useEffect } from "react"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
//import { useState } from "react"


export const Todolists = () => {
  // const [skip, setSkip] = useState(true)
  //const todolists = useAppSelector(selectTodolists)

  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  // const { data } = useGetTodolistsQuery(undefined, {skip})
  //
  // const fetchTodolists = () => {
  //   setSkip(false)
  // }
const {data} = useGetTodolistsQuery()


  return (
    <>
      {/*<div>*/}
      {/*  <button onClick={fetchTodolists}>Download todolists</button>*/}
      {/*</div>*/}
      {data?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
