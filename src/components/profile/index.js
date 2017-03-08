import React from 'react'
import { observer, inject } from 'mobx-react'

import Logout from './LogoutContainer'


//inject and use the store here
const ProfileMenu = inject("userStore")(observer(
  ({ userStore }) => (
    <div>
      <span>This is the main layout. Authentification is {userStore.isAuthenticated.toString()}</span>
      <Logout />
    </div>
  )
))

export default ProfileMenu
