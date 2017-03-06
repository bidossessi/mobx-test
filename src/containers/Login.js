import React from 'react'
import { observer, inject } from 'mobx-react'

import LoginForm from '../components/LoginForm'


//inject and use the store here
const Login = inject("userStore")(observer( ({ userStore }) => <LoginForm store={userStore}/> ))
// @inject("userStore") @observer
// class Login extends React.Component {
//   render() {
//     return (
//       <LoginForm store={this.props.userStore}/>
//     );
//   }
// }

export default Login
