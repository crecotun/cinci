import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import styles from './styles.scss'
import classnames from 'classnames'

type TaskProps = {
  id: string
  text: string
  isDone: boolean
  estimation: number
  toggleTask: () => void
  deleteTask: () => void
}

const Task: React.FunctionComponent<TaskProps> = ({
  text,
  isDone,
  estimation,
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
      {estimation && <span className={styles.text}>{`${estimation} min`}</span>}

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
  ({ tasksStore, application }, { id }: { id: string }) => {
    const task = tasksStore.findTaskById(id)

    if (!task) {
      throw new Error('Task was not found')
    }

    return {
      text: task.text,
      estimation: task.estimation,
      isDone: task.isDone,
      toggleTask: () => {
        task.isDone ? task.setUndone() : task.setDone()
        application.tasks.storeTasks(tasksStore.tasks)
      },
      deleteTask: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        application.tasks.removeTaskById(id)
      },
    }
  },
  { observe: true },
)(Task)
