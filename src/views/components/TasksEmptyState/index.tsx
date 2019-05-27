import React from 'react'
import styles from './styles.scss'

const TasksEmptyState: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      Add a task to your list to see data here
    </div>
  )
}

export default TasksEmptyState
