/* eslint-disable no-console */

// I prefer axios to fetch
import axios from 'axios'
import _ from 'lodash'

import { apiUrl } from '../constants'


class RestBackend {
  // ReST CRUD backend

  constructor (domain) {
    console.log('Backend being born')
    this.apiDomain = domain
    this.defaultOpts = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
    this.opts = {}
  }

  setConfig (opts) {
    // store token and user
    this.opts = Object.assign({}, this.defaultOpts, opts)
  }

  setAuthToken (token) {
    this.opts =  this.setConfig({headers: {"Authorization": `Bearer ${token}`}})
  }

  getConfig () {
    return this.opts
  }

  _run (opts) {
    return axios(opts)
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
        return false
      })
    }

  all (resource, params = {}) {
    const opts = Object.assign({}, this.getConfig(), {
      url: [this.apiDomain, resource].join('/'),
      params,
      method: 'get'
    })
    return this._run(opts)
  }

  one (resource, itemId, params = {}) {
    const opts = Object.assign({}, this.getConfig(), {
      url: [this.apiDomain, resource, itemId].join('/'),
      params,
      method: 'get'
    })
    return this._run(opts)
  }

  post (resource, hash, params = {}) {
    const opts = Object.assign({}, this.getConfig(), {
      url: [this.apiDomain, resource].join('/'),
      data: JSON.stringify(hash),
      params,
      method: 'post'
    })
    return this._run(opts)
  }

  put (resource, itemId, hash, params = {}) {
    const opts = Object.assign({}, this.getConfig(), {
      url: [this.apiDomain, resource, itemId].join('/'),
      data: JSON.stringify(hash),
      params,
      method: 'put'
    })
    return this._run(opts)
  }

  delete (itemId, params = {}) {
    const opts = Object.assign({}, this.getConfig(), {
      url: [this.apiDomain, resource, itemId].join('/'),
      params,
      method: 'delete'
    })
    return this._run(opts)
  }
}
export default RestBackend
