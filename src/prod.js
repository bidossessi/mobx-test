import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, browserHistory } from 'react-router'

import Routes from './routes'
import userStore from './stores/userStore'
import todoStore from './stores/todoStore'

const stores = { userStore, todoStore }
const target = document.getElementById('app')
const node = (
  <Provider { ...stores }>
    <Router history={browserHistory} routes={Routes} />
  </Provider>
)

ReactDOM.render(node, target)
