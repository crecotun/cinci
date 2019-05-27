import TasksRepository from './taskRepository'

export type InfrastuctureType = ReturnType<typeof createInfrastructure>

export default function createInfrastructure() {
  return {
    tasks: new TasksRepository(),
  }
}
