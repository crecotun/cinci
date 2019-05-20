import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import styles from './styles.scss'

type CreateTaskFormProps = {
  addTask: ({ text }: { text: string }) => void
}

type CreateTaskFormState = {
  text: string
}

class CreateTaskForm extends React.Component<
  CreateTaskFormProps,
  CreateTaskFormState
> {
  state = {
    text: '',
  }

  resetState = () => {
    this.setState({
      text: '',
    })
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = this.state.text.trim()
    if (!text) {
      return
    }

    this.props.addTask({ text })
    this.resetState()
  }

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      text: e.currentTarget.value,
    })
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
        <button type="submit" className={styles.submit}>
          Add Task
        </button>
      </form>
    )
  }
}

export default inject(({ tasksStore, service }) => {
  return {
    addTask: ({ text }: { text: string }) => {
      tasksStore.addTask({ text, isDone: false })
      service.tasks.storeTasks(tasksStore.tasks)
    },
  }
})(CreateTaskForm)
