import { TodoStore } from '../TodoStore'
import { testClient } from '../../backends'

describe('TodoStore', () => {
  test('creates new todos', () => {
    const store = new TodoStore(testClient)
    store.addTodo('todo1')
    .then(() => {
      expect(store.todos.length).toBe(1)
      expect(store.todos[0].value).toBe('todo1')
    })
    store.addTodo('todo2')
    .then(() => {
      expect(store.todos.length).toBe(2)
      expect(store.todos[1].value).toBe('todo2')
    })
  })
})
