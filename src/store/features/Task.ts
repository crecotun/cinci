import { observable, action } from 'mobx'
import * as uuid from 'uuid/v4'
import { TaskType } from 'src/types'

class Task {
  public id: string

  @observable
  public text: string = ''

  @observable
  public isDone: boolean = false

  @observable
  public estimation: number = 0

  constructor({
    id = uuid(),
    text = '',
    isDone = false,
    estimation = 0,
  }: TaskType) {
    if (!text) {
      throw new Error('Text was not provided')
    }

    this.id = id
    this.text = text
    this.isDone = isDone
    this.estimation = estimation
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

  @action
  public setEstimation(estimation: number) {
    if (!estimation) {
      throw new Error(`Estimation wasn't specified`)
    }

    this.estimation = estimation
  }
}

export default Task
