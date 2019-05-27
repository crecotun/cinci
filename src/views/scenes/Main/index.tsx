import * as React from 'react'
import Tasks from 'src/views/components/Tasks'
import CreateTaskForm from 'src/views/components/CreateTaskForm'
import styles from './styles.scss'
import Toolbar from 'src/views/components/Toolbar'
import { inject } from 'src/utils/storeInject'
import { ApplicationType } from 'src/app'

type PropsType = {
  application: ApplicationType
}

class Main extends React.Component<PropsType> {
  async componentDidMount() {
    await this.props.application.tasks.requestTasks()
  }

  render() {
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
}

export default inject(({ application }) => ({ application }))(Main)
