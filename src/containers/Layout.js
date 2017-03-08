import React from 'react'

import Secure from './Secure'
import ProfileMenu from '../components/profile'

// We can use this class as a wrapper
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
