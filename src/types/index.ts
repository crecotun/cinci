export type TaskType = {
  id?: string
  text: string
  isDone: boolean
  estimation?: number
}

export type TasksFilterType = 'all' | 'completed' | 'uncompleted'
