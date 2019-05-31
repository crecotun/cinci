import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import styles from './styles.scss'
import { TaskType } from 'src/types'

type CreateTaskFormProps = {
  addTask: ({ text, estimation }: { text: string; estimation: number }) => void
}

// type CreateTaskFormState = {
//   text: string
//   estimation: number
// }

class CreateTaskForm extends React.Component<CreateTaskFormProps, TaskType> {
  state = {
    text: '',
    estimation: 0,
    isDone: false,
  }

  resetState = () => {
    this.setState({
      text: '',
      estimation: 0,
      isDone: false,
    })
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = this.state.text.trim()
    if (!text) {
      return
    }

    this.props.addTask({ text, estimation: this.state.estimation })
    this.resetState()
  }

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      text: e.currentTarget.value,
    })
  }
  handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault()

    this.setState({ estimation: Number(e.currentTarget.value) })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.container}>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleInputChange}
          className={styles.input}
        />
        <select
          name="estimation"
          id="estimation"
          defaultValue={String(this.state.estimation)}
          onChange={this.handleSelectChange}
        >
          <option value="0">Not sure</option>
          <option value="5">5 minutes</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
        </select>
        <button type="submit" className={styles.submit}>
          Add Task
        </button>
      </form>
    )
  }
}

export default inject(({ tasksStore, application }) => {
  return {
    addTask: (taskData: TaskType) => {
      tasksStore.addTask(taskData)
      application.tasks.storeTasks(tasksStore.tasks)
    },
  }
})(CreateTaskForm)
