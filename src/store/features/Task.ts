import { observable, action } from 'mobx'
import * as uuid from 'uuid/v4'
import { TaskType } from 'src/types'

class Task {
  public id: string

  @observable
  public text: string = ''

  @observable
  public isDone: boolean = false

  constructor({ id, text = '', isDone = false }: TaskType) {
    this.id = id || uuid()
    if (!text) {
      throw new Error('Text was not provided')
    }

    this.text = text
    this.isDone = isDone
  }

  @action
  public setText(text: string) {
    this.text = text
  }

  @action
  public setDone() {
    this.isDone = true
  }

  @action
  public setUndone() {
    this.isDone = false
  }
}

export default Task
