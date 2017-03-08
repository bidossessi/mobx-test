import RestBackend from './rest'
import MockClient from './mock'
import { apiUrl } from '../constants'

export const axiosClient = new RestBackend(apiUrl)
export const testClient = new MockClient()
