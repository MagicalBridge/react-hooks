import React, { Component, lazy, Suspense } from 'react'
import './App.css'

const About = lazy(() => /* webpackChunkName: "about" */ import('./components/About.jsx'))
class App extends Component {
  state = {
    hasError: false,
  }
  // didcatch
  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }
  render() {
    if(this.state.hasError){
      return(
        <div>ERROR</div>
      )
    }
    return (
      <div>
        <Suspense fallback={<div>loading</div>}>
          <About></About>
        </Suspense>
      </div>
    )
  }
}

export default App
