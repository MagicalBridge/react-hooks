import React, { Component, lazy, Suspense } from 'react'
import './App.css'

const About = lazy(() => /* webpackChunkName: "about" */ import('./components/About.jsx'))
class App extends Component {
  state = {
    hasError: false,
  }
  // 使用这个生命周期函数可以设置state的值
  // componentDidCatch() {
  //   this.setState({
  //     hasError: true
  //   })
  // }

  // 或者使用一个静态的属性
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
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
