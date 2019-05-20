import * as React from 'react'
import TasksStore from 'src/store/features/Tasks'
import { inject } from 'src/utils/storeInject'
import styles from './styles.scss'
import classnames from 'classnames'

type TaskProps = {
  id: string
  text: string
  isDone: boolean
  toggleTask: () => void
  deleteTask: () => void
}

const Task: React.FunctionComponent<TaskProps> = ({
  text,
  isDone,
  toggleTask,
  deleteTask,
}) => {
  const containerClass = classnames({
    [styles.container]: true,
    [styles.done]: isDone,
  })
  return (
    <div className={containerClass}>
      <span className={styles.text}>{text}</span>
      <button type="button" className={styles.delete} onClick={deleteTask}>
        Delete
      </button>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" checked={isDone} onChange={toggleTask} />
      </label>
    </div>
  )
}

export default inject(
  ({ tasksStore, service }, { id }: { id: string }) => {
    const task = tasksStore.findTaskById(id)

    if (!task) {
      throw new Error('Task was not found')
    }

    return {
      text: task.text,
      isDone: task.isDone,
      toggleTask: () => {
        task.isDone ? task.setUndone() : task.setDone()
        service.tasks.storeTasks(tasksStore.tasks)
      },
      deleteTask: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        service.tasks.removeTaskById(id)
      },
    }
  },
  { observe: true },
)(Task)
