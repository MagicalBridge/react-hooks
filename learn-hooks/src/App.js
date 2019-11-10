import React, { Component } from 'react'
import { BatteryContext, OnlineContext } from './utils/Context.jsx'
import Middle from './components/Middle'
import './App.css'


class App extends Component {
  state = {
    battery: 60,
    onLine: false
  }
  render() {
    const { battery, onLine } = this.state
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={onLine}>
          <button type="button" onClick={() => this.setState({ battery: battery + 1 })}>
            press
          </button>
          <button type="button" onClick={() => this.setState({ onLine: !onLine })}>
            switch
          </button>
          <Middle></Middle>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }
}

export default App
