import React from 'react'
import styles from './styles.scss'
import { inject } from 'src/utils/storeInject'
import classnames from 'classnames'

type ToolbarProps = {
  showAll: () => void
  showCompleted: () => void
  showUncompleted: () => void
  activeFilter: string
}

const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  activeFilter,
  showAll,
  showCompleted,
  showUncompleted,
}) => {
  const showAllButtonClass = classnames({
    [styles.button]: true,
    [styles.buttonActive]: activeFilter === 'all',
  })
  const showCompletedButtonClass = classnames({
    [styles.button]: true,
    [styles.buttonActive]: activeFilter === 'completed',
  })
  const showUncompletedButtonClass = classnames({
    [styles.button]: true,
    [styles.buttonActive]: activeFilter === 'uncompleted',
  })

  return (
    <div className={styles.container}>
      Show:
      <button type="button" onClick={showAll} className={showAllButtonClass}>
        all
      </button>
      <button
        type="button"
        onClick={showCompleted}
        className={showCompletedButtonClass}
      >
        completed
      </button>
      <button
        type="button"
        onClick={showUncompleted}
        className={showUncompletedButtonClass}
      >
        uncompleted
      </button>
    </div>
  )
}

export default inject(
  ({ tasksStore }) => {
    return {
      showAll: () => tasksStore.setFilter('all'),
      showCompleted: () => tasksStore.setFilter('completed'),
      showUncompleted: () => tasksStore.setFilter('uncompleted'),
      activeFilter: tasksStore.filter,
    }
  },
  { observe: true },
)(Toolbar)
