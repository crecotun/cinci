import * as React from 'react'
import Tasks from 'src/components/Tasks'
import CreateTaskForm from 'src/components/CreateTaskForm'
import styles from './styles.scss'
import Toolbar from 'src/components/Toolbar'

const Main: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <CreateTaskForm />
        </div>
        <div className={styles.toolbar}>
          <Toolbar />
        </div>
        <Tasks />
      </div>
    </div>
  )
}

export default Main
