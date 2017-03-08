import _ from 'lodash'
import jwt from 'jwt-simple'
import { jwtk } from '../constants'

class MockClient {
  // Mock CRUD backend

  constructor (resource) {
    this.stores = {
      user: {username: 'test', password: 'test', id: 1}
    }
    this.stores[resource] = []
    this.token = null
    this.nextId = 1
  }

  setJWTToken (token) {
    if (token) {
      this.token = null
    }
  }

  resetHeaders () {
    this.token = null
  }

  all (resource, params = {}) {
    return new Promise((resolve) => { resolve(this.stores[resource]) })
  }

  one (resource, itemId, params = {}) {
    return new Promise((resolve, reject) => {
      const matched = _.find(this.stores[resource], (o) => o.id === itemId)
      if (matched) {
        resolve(matched)
      } else {
        reject(new Error(404))
      }
    })
  }

  post (resource, hash, params = {}) {
    return new Promise((resolve, reject) => {
      if (resource === 'login') {
        if (hash.username === this.stores.user.username && hash.password === this.stores.user.password) {
          resolve({token: jwt.encode(_.pick(this.stores.user, 'username', 'id'), jwtk)})
        } else {
          reject(new Error(401))
        }
      } else {
        // should probably implement a 422
        hash.id = this.nextId++
        this.stores[resource].push(hash)
        resolve(hash)
      }
    })
  }

  put (resource, itemId, hash, params = {}) {
    return new Promise((resolve, reject) => {
      const matched = _.find(this.stores[resource], (o) => o.id === itemId)
      if (matched) {
        const res = Object.assign({}, matched, hash)
        resolve(res)
      } else {
        reject(new Error(404))
      }
    })
  }

  delete (resource, itemId, params = {}) {
    return new Promise((resolve, reject) => {
      const matched = _.find(this.stores[resource], (o) => o.id === itemId)
      if (matched) {
        this.stores[resource].splice(this.stores[resource].indexOf(matched), 1)
        resolve(202)
      } else {
        reject(new Error(404))
      }
    })
  }
}
export default MockClient
