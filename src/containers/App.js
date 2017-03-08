import React from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

@observer
class App extends React.Component {
  render () {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer}
        </button>
        <DevTools />
      </div>
    )
  }

  onReset = () => {
    this.props.appState.resetTimer()
  }
}

export default App
