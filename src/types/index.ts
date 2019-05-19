export type TaskType = {
  id?: string
  text: string
  isDone: boolean
}

export type TasksFilterType = 'all' | 'completed' | 'uncompleted'