import React from 'react'

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      initialized: false,
      value: '',
      error: '',
    }
    this.doChange = this.doChange.bind(this)
    this.doResult = this.doResult.bind(this)
  }

  doChange (event) {
    this.setState({value: event.target.value})
    event.preventDefault()
  }

  doResult (event) {
    let obj = {}
    obj[this.props.name] = event.target.value
    this.props.handleResult(obj)
    event.preventDefault()
  }

  render () {
    return (
      <label>
          {this.props.label}:
          <input
            type={this}
            value={this.state.value}
            onChange={this.doChange}
            onBlur={this.doResult}
          />
      </label>
    )
  }
}

Input.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  handleResult: React.PropTypes.func.isRequired,
}

export default Input
