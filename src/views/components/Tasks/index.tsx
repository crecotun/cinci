import * as React from 'react'
import { inject } from 'src/utils/storeInject'
import TaskStore from 'src/store/features/Task'
import Task from 'src/views/components/Task'
import TasksStore from 'src/store/features/tasks'
import styles from './styles.scss'
import TasksEmptyState from '../TasksEmptyState'

type TasksProps = {
  tasks: TaskStore[]
}

const Tasks: React.FunctionComponent<TasksProps> = ({ tasks }) => {
  if (!tasks.length) {
    return <TasksEmptyState />
  }

  const tasksComponents = tasks.map(task => (
    <li key={task.id} className={styles.item}>
      <Task id={task.id} />
    </li>
  ))
  return <ul className={styles.container}>{tasksComponents}</ul>
}

function getTasks(tasksStore: TasksStore) {
  switch (tasksStore.filter) {
    case 'completed':
      return tasksStore.completedTasks
    case 'uncompleted':
      return tasksStore.uncompletedTasks
    default:
      return tasksStore.tasks
  }
}

export default inject(
  ({ tasksStore }) => {
    return {
      tasks: getTasks(tasksStore),
    }
  },
  { observe: true },
)(Tasks)
