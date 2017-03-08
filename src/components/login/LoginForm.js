import React from 'react'

import Input from './Input'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {},
      errorData: {},
      realForm: [],
    }
    this.doUpdate = this.doUpdate.bind(this)
    this.doSubmit = this.doSubmit.bind(this)
  }

  doUpdate (field) {
    this.setState({formData: Object.assign({}, this.state.formData, field)})
  }

  doSubmit (event) {
    this.props.handleSubmit(this.state.formData)
    event.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.doSubmit}>

            <Input
              label="Username"
              name="username"
              type="text"
              handleResult={this.doUpdate}/>
            <Input
              label="Password"
              name="password"
              type="password"
              handleResult={this.doUpdate}/>
          <input type="submit" value="Submit" />
        </form>
    )
  }
}

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}
export default LoginForm
