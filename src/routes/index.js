import React from 'react'
import {
  Route,
  IndexRedirect,
} from 'react-router'

import Layout from '../containers/Layout'
import Home from '../containers/Home'
import {Login} from '../components/login'

const Routes = (
  <Route path="/" component={Layout}>
    <IndexRedirect to="/home" />
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
  </Route>
)
export default Routes
