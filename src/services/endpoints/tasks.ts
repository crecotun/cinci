import { RootStore } from 'src/store'
import Provider from '../providers'
import { TaskType } from 'src/types'
import { toJS } from 'mobx'

export default function createTasksEndpoint(
  store: RootStore,
  provider: Provider,
) {
  return {
    async requestTasks() {
      const tasks: TaskType[] = await provider.fetchTasks()

      if (!tasks) {
        return []
      }

      return store.tasksStore.hydrate(tasks)
    },

    async removeTaskById(id: string) {
      store.tasksStore.removeTaskById(id)
      this.storeTasks(store.tasksStore.tasks)
    },

    async storeTasks(tasks: TaskType[]) {
      const stringifiedJSON = JSON.stringify(toJS(tasks))
      await provider.storeTasks(stringifiedJSON)
    },
  }
}
