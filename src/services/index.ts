import { RootStore } from 'src/store'
import createTasksEndpoint from './endpoints/tasks'
import Provider from './providers'

export type IService = ReturnType<typeof createService>

export default function createService(store: RootStore) {
  const provider = new Provider()

  return {
    tasks: createTasksEndpoint(store, provider),
  }
}
