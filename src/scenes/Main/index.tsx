import * as React from 'react'
import Tasks from 'src/components/Tasks'
import CreateTaskForm from 'src/components/CreateTaskForm'
import styles from './styles.scss'
import Toolbar from 'src/components/Toolbar'
import { IService } from 'src/services'
import { inject } from 'src/utils/storeInject'

type PropsType = {
  service: IService
}

class Main extends React.Component<PropsType> {
  async componentDidMount() {
    await this.props.service.tasks.requestTasks()
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

export default inject(({ service }) => ({ service }))(Main)
