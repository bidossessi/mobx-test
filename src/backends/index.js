import RestBackend from './rest'
import { apiUrl } from '../constants'

export const client = new RestBackend(apiUrl)
