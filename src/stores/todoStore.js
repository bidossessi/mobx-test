/* eslint-disable no-alert, no-console */
import { observable, computed, reaction } from 'mobx'

import { axiosClient } from '../backends'

class TodoStore {
  @observable todos = []
  @observable isLoading = true

  constructor (client) {
    this.apiClient = client
  }

  @computed get completedTodosCount () {
    return this.todos.filter(
      todo => todo.completed === true
    ).length
  }

  loadTodos () {
    this.isLoading = true
    this.apiClient.all('todos').then(fetchedTodos => {
      fetchedTodos.forEach(json => this.updateTodoFromServer(json))
      this.isLoading = false
    })
  }

  updateTodoFromServer (json) {
    let todo = this.todos.find(todo => todo.id === json.id)
    if (!todo) {
      todo = new Todo(this, json.id, json.task, json.completed)
      this.todos.push(todo)
    }
    if (json.isDeleted) {
      this.removeTodo(todo)
    } else {
      todo.updateFromJson(json)
    }
  }

  report () {
    if (this.todos.length === 0) { return '<none>' }
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
  }

  addTodo (task) {
    return this.apiClient.post('todos', {task, completed: false})
    .then(json => {
      const todo = new Todo(this, json.id, json.task, json.completed)
      this.todos.push(todo)
    })
  }

  removeTodo (todo) {
    this.todos.splice(this.todos.indexOf(todo), 1)
    return this.apiClient.delete('todos', todo.id)
  }

  saveTodo (todo) {
    this.apiClient.put('todos', todo.id, todo.asJson)
  }
}

class Todo {
  store
  id
  @observable task
  @observable completed
  constructor (store, id, task, completed) {
    this.store = store
    this.id = id
    this.task = task
    this.completed = completed
    this.save = reaction(
      // observe everything that is used in the JSON:
      () => this.asJson,
      // if autoSave is on, send json to server
      (json) => {
        if (this.autoSave) {
          this.store.saveTodo(this)
        }
      }
    )
  }

  toggle () {
    this.completed = !this.completed
  }

  destroy () {
    this.store.removeTodo(this)
  }

  setTask (task) {
    this.task = task
  }

  @computed get asJson () {
    return {
      id: this.id,
      task: this.task,
      completed: this.completed
    }
  }

  updateFromJson (json) {
    this.autoSave = false
    this.completed = json.completed
    this.task = json.task
    this.autoSave = true
  }
}

// The singleton variable
const todoStore = new TodoStore(axiosClient)

export default todoStore
export { TodoStore, Todo }
