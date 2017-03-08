import React from 'react'
import { observer, inject } from 'mobx-react'

import LoginForm from './LoginForm'


//inject and use the store here
const Login = inject("userStore")(observer( ({ userStore }) => {

  const doLogin = (creds) => {userStore.login(creds)}

  return <LoginForm handleSubmit={doLogin}/>

} ))
// @inject("userStore") @observer
// class Login extends React.Component {

//   constructor(props) {
//     super(props)
//     this.doSubmit = this.doSubmit.bind(this);
//   }

//   doSubmit(creds) {
//     this.props.userStore.log(creds)
//   }

//   render() {
//     return (
//       <LoginForm handleSubmit={this.doSubmit}/>
//     );
//   }
// }

export default Login
