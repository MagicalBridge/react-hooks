import React, { Component } from 'react'
import { BatteryContext } from './utils/Context.jsx'
import Middle from './components/Middle'
import './App.css'


class App extends Component {
  state = {
    battery: 60,
    onLine: false
  }
  render() {
    const { battery } = this.state
    return (
      <BatteryContext.Provider value={battery}>
        <button type="button" onClick={() => this.setState({ battery: battery + 1 })}>
          press
          </button>
        <Middle></Middle>
      </BatteryContext.Provider>
    )
  }
}

export default App
