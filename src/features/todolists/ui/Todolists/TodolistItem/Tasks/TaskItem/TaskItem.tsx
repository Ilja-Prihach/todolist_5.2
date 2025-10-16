import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enums"
//import { useAppDispatch } from "@/common/hooks"
import type { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
//import { deleteTaskTC, updateTaskTC } from "@/features/todolists/model/tasks-slice"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  //const dispatch = useAppDispatch()
  const [DeleteTaskMutation] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTask = () => {
    //dispatch(deleteTaskTC({ todolistId: todolist.id, taskId: task.id }))
    DeleteTaskMutation({ todolistId: todolist.id, taskId: task.id })
  }

  // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
  //   const newStatusValue = e.currentTarget.checked
  //   dispatch(
  //     updateTaskTC({
  //       todolistId: todolist.id,
  //       taskId: task.id,
  //       domainModel: { status: newStatusValue ? TaskStatus.Completed : TaskStatus.New },
  //     }),
  //   )
  // }

  const updateTaskField = (updates: Partial<UpdateTaskModel>) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...updates,
    }
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTaskField({ status })
  }

  const changeTaskTitle = (title: string) => {
    updateTaskField({ title })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const disabled = todolist.entityStatus === "loading"

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
      </div>
      <IconButton onClick={deleteTask} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
