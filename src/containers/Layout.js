import React from 'react'

import Secure from './Secure'
import ProfileMenu from '../components/profile'

class Layout extends Secure {
  render () {
    return (
      <div>
        <div><ProfileMenu /></div>
        <hr/>
        {this.props.children}
      </div>)
  }
}

export default Layout
