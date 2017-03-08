import React from 'react'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'

import Secure from './Secure'
import ProfileMenu from '../components/profile'

@inject("userStore") @observer
class Layout extends React.Component {
  // This class could handle top-level widgets compositions
  // such as menus, master css, etc
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    console.log('Secure about to mount');
    this.checkAuth();
  }

  checkAuth() {
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

  render() {
    return(
      <div>
        <div><ProfileMenu /></div>
        <hr/>
        {this.props.children}
      </div>)
  }
}

export default Layout
