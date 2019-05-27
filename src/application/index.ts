import { RootStore } from 'src/store'
import createTasksInteractor from './tasks'
import createInfrastructure from '../infrastructure'

export type ApplicationType = ReturnType<typeof createApplication>

export default function createApplication(store: RootStore) {
  const infrastructure = createInfrastructure()

  return {
    tasks: createTasksInteractor(store, infrastructure),
  }
}
