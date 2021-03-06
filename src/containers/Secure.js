/* eslint-disable no-alert, no-console */
import React from 'react'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'

@inject('userStore') @observer
class Secure extends React.Component {
  // This class could handle top-level widgets compositions
  // such as menus, master css, etc
  componentWillMount () {
    console.log('Secure about to mount')
    this.checkAuth()
  }

  checkAuth () {
    const { userStore } = this.props
    if (!userStore.isAuthenticated) {
      // try getting auth from storage or redirect to login
      try {
        userStore.useLocalProfile()
      } catch (e) {
        console.log(e)
        browserHistory.push('/login')
      }
    }
  }
}
export default Secure
