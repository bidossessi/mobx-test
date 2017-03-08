import React from 'react'
import { observer, inject } from 'mobx-react'

// inject and use the store here
const Logout = inject('userStore')(observer(({ userStore }) => {
  const doLogout = (event) => {
    event.preventDefault()
    userStore.logout()
  }

  const showLogout = (authed) => authed ? (<button onClick={doLogout}>Log out</button>) : null

  return (showLogout(userStore.isAuthenticated))
}))

export default Logout
