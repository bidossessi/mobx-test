import RestBackend from './rest'
import MockClient from './mock'
import { apiUrl } from '../constants'

// we export backends as singletons
export const axiosClient = new RestBackend(apiUrl)
export const testClient = new MockClient()
