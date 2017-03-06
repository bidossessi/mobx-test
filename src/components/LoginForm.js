import React from 'react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }


  handleSubmit (event) {
    console.log(event)
    console.log(this.state)
    this.props.store.login(this.state)
    event.preventDefault();
  }

  setUsername (event) {
    this.setState({username: event.target.value});
  }

  setPassword (event) {
    this.setState({password: event.target.value});
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.setUsername}/>
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.setPassword}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
    )
  }
}

LoginForm.propTypes = {
  store: React.PropTypes.object.isRequired
}
export default LoginForm
