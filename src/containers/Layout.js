import React from 'react'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'

@inject("userStore") @observer
class Layout extends React.Component {
  // This class could handle top-level widgets compositions
  // such as menus, master css, etc

  componentWillMount () {
    // console.log(this.props.title + 'Secure about to mount');
    this.checkAuth();
  }

  checkAuth() {
    const { userStore } = this.props
    if (!userStore.isAuthenticated) {
      // try getting auth from storage or redirect to login
      try {
        userStore.getSession()
      } catch (e) {
        console.log(e)
        browserHistory.push('/login')
      }
    }
  }

  render() {
    return(
      <div>
        <div>This is the main layout. Authentification is {this.props.userStore.isAuthenticated.toString()}</div>
        <hr/>
        {this.props.children}
      </div>)
  }
}

export default Layout
