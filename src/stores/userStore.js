'use strict'
import jwt from 'jwt-simple'
import { observable, computed, autorun } from 'mobx'
import { client } from '../backends'

class UserStore {
  @observable profile = {};

  constructor (client) {
    this.SESSION_KEY = 'profile'
    this.jwtk = 'super secret'
    this.apiClient = client
    autorun(() => console.log(this.profile))
  }

  @computed get isAuthenticated () {
    return this.profile !== null && this.profile.hasOwnProperty('sessionToken')
  }

  login (creds) {
    this.apiClient.post("login", creds)
    .then(data => {
      this._storeSession(data.token)
    })
    .catch(console.log) // We should send some feedback here
  }

  logout () {
    this.apiClient.resetHeaders()
    this._deleteSession()
  }

  _storeSession (sessionToken) {
      const decoded = jwt.decode(sessionToken, this.jwtk)
      this.profile = Object.assign({}, decoded, {sessionToken})
      localStorage.setItem(this.SESSION_KEY, this.profile)
      this.apiClient.setJWTToken(this.profile.sessionToken)
  }

  _deleteSession () {
    localStorage.removeItem(this.SESSION_KEY)
    this.profile = {}
  }

  useLocalProfile (sessionToken) {
    if (sessionToken) {
      this._storeSession(sessionToken)
    } else {
      try {
        this.profile = localStorage.getItem(this.SESSION_KEY)
        this.apiClient.setJWTToken(this.profile.sessionToken)
      } catch(e) {
        throw new Error("No Profile found")
      }
    }
  }

}
// The singleton variable
const userStore = new UserStore(client)

export { UserStore }
export default userStore
