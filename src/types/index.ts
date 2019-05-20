export type TaskType = {
  id?: string
  text: string
  isDone: boolean
}

export type TasksFilterType = 'all' | 'completed' | 'uncompleted'

declare namespace NodeJS {
  interface Process {
    browser: boolean
  }
}
