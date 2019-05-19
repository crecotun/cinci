import TasksStore from '../store/features/Tasks'
import mockData from './mockData'

describe('Tasks initialisations', () => {
  test('with empty data', () => {
    const tasksStore = new TasksStore()

    expect(tasksStore.tasks.length).toBe(0)
  })

  test('with preset data', () => {
    const tasksStore = new TasksStore(mockData.tasks)

    expect(tasksStore.tasks.length).toBe(4)
  })
})

describe('Tasks', () => {
  let tasksStore: TasksStore

  beforeEach(() => {
    tasksStore = new TasksStore(mockData.tasks)
  })

  test('Add new task', () => {
    const newTask = tasksStore.addTask({
      text: 'New task',
      isDone: false,
    })

    expect(newTask.id).toBe('123456789')
    expect(tasksStore.tasks.length).toBe(5)
  })

  test('Find task by id', () => {
    const task = tasksStore.findTaskById('task3')

    expect(task.text).toBe('Do user research')
  })

  test('Remove task by id', () => {
    tasksStore.removeTaskById('task2')
    const removedTask = tasksStore.findTaskById('task2')

    expect(removedTask).toBe(undefined)
    expect(tasksStore.tasks.length).toBe(3)
  })

  test('Get amount of complited tasks', () => {
    expect(tasksStore.completedTasksCount).toBe(1)
  })

  test('Get amount of uncomplited tasks', () => {
    expect(tasksStore.uncompletedTasksCount).toBe(3)
  })

  test('change filter', () => {
    tasksStore.setFilter('completed')

    expect(tasksStore.filter).toBe('completed')
  })
})
