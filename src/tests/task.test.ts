import Task from '../store/features/Task'
import { toJS } from 'mobx'

describe('Task', () => {
  const taskData = { id: '123', text: 'Todo', isDone: false }
  test('Create', () => {
    const task = new Task(taskData)

    expect(toJS(task)).toEqual({
      id: '123',
      text: 'Todo',
      isDone: false,
    })
  })

  test('Create with empty id', () => {
    const task = new Task({ text: 'Todo', isDone: false })

    expect(task.id).toBe('123456789')
  })

  test('Change text', () => {
    const task = new Task(taskData)
    const newText = 'Changed text'

    task.setText(newText)

    expect(task.text).toBe(newText)
  })

  test('Set status to done', () => {
    const task = new Task(taskData)

    task.setDone()

    expect(task.isDone).toBe(true)
  })
})
