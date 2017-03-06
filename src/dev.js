/* global __DEV__ */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react';
import { Router, browserHistory } from 'react-router';
import RedBox from 'redbox-react';

import { AppContainer } from 'react-hot-loader'
// AppContainer is a necessary wrapper component for HMR

import Routes from './routes'
import userStore  from './stores/userStore'
import todoStore  from './stores/todoStore'
import Layout from './containers/Layout'
import AppState from './stores/AppState'

const appState = new AppState()

const stores = { userStore, todoStore }
const target = document.getElementById('app')
const node = (
<AppContainer>
  <Provider { ...stores }>
    <Router history={browserHistory} routes={Routes} />
  </Provider>
</AppContainer>
)


const render = (componentNode) => {
  try {
    ReactDOM.render(componentNode, target)
  } catch (e) {
    ReactDOM.render(<RedBox error={e} />, target)
  }
};

render(node);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Layout', () => { render(node) });
}

