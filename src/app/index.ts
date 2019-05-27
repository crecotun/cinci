import { RootStore } from 'src/store'
import createTasksInteractor from './tasks'
import createInfrastructure from '../infra'

export type ApplicationType = ReturnType<typeof createApplication>

export default function createApplication(store: RootStore) {
  const provider = createInfrastructure()

  return {
    tasks: createTasksInteractor(store, provider),
  }
}
