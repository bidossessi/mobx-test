import React from 'react'

import Secure from './Secure'
import ProfileMenu from '../components/profile'

// We can use this class as a wrapper
// Inheriting from Secure gives us auth checking + any cool things in there
// But we could also instead use Secure on a per-module basis, which would probably
// make more sense
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
