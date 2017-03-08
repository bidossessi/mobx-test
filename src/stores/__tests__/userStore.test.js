import { UserStore } from '../UserStore'
import { testClient } from '../../backends'

describe('UserStore', () => {
  it('authenticates a user and gets a token', () => {
    const store = new UserStore(testClient)
    store.login({username: 'test', password: 'test'})
    .then(() => {
      expect(store.profile).toBeDefined()
      expect(store.isAuthenticated).toBe(true)
    })
  })
})
