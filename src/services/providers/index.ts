import { TaskType } from 'src/types'

class Provider {
  fetchTasks(): TaskType[] {
    const tasks = window.localStorage.getItem('tasks')

    if (!tasks) {
      console.error(`Cound't fetch tasks`)
      return []
    }

    return JSON.parse(tasks)
  }

  storeTasks(tasks: string) {
    window.localStorage.setItem('tasks', tasks)
  }
}

export default Provider
