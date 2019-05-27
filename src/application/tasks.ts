import { RootStore } from 'src/store'
import { TaskType } from 'src/types'
import { toJS } from 'mobx'
import { InfrastuctureType } from 'src/infrastructure'

export default function createTaskInteractor(
  store: RootStore,
  infra: InfrastuctureType,
) {
  return {
    async requestTasks() {
      const tasks: TaskType[] = await infra.tasks.fetchAll()

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
      await infra.tasks.storeTasks(stringifiedJSON)
    },
  }
}
