import { useStaticRendering } from 'mobx-react'
import TasksStore from './features/Tasks'
import { ApplicationType } from 'src/application'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

export class RootStore {
  public tasksStore: TasksStore
  public application!: ApplicationType

  constructor() {
    this.tasksStore = new TasksStore()
  }
}

let store: RootStore | null = null

export function initializeStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new RootStore()
  }
  if (store === null) {
    store = new RootStore()
  }
  return store
}
