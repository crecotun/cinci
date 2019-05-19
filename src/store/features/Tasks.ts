import { observable, action, computed } from 'mobx'
import Task from './Task'
import { TaskType, TasksFilterType } from 'src/types'

export default class Tasks {
  readonly tasks = observable<Task>([])
  @observable
  filter: TasksFilterType = 'all'

  constructor(tasks: TaskType[] = []) {
    if (tasks.length) {
      tasks.forEach(this.addTask)
    }
  }

  @action
  public addTask = (taskData: TaskType): Task => {
    const task = new Task(taskData)
    this.tasks.push(task)

    return this.tasks[this.tasks.length - 1]
  }

  public findTaskById = (id: string): Task | undefined => {
    return this.tasks.find((task: Task) => task.id === id)
  }

  @action
  public removeTaskById = (id: string): void => {
    const newTasks = this.tasks.filter((task: Task) => task.id !== id)

    this.tasks.replace(newTasks)
  }

  @action
  public setFilter(filter: TasksFilterType) {
    this.filter = filter
  }

  @computed
  public get completedTasks(): Task[] {
    return this.tasks.filter((task: Task) => task.isDone === true)
  }

  @computed
  public get uncompletedTasks(): Task[] {
    return this.tasks.filter((task: Task) => task.isDone === false)
  }

  @computed
  public get completedTasksCount(): number {
    return this.completedTasks.length
  }

  @computed
  public get uncompletedTasksCount(): number {
    return this.uncompletedTasks.length
  }
}
