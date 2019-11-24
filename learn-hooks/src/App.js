import React, { Component, PureComponent } from 'react'
import './App.css'

// 使用组件自身的 shouldComponentUpdate
// class Foo extends Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.name === this.props.name) {
//       return false
//     }
//     return true
//   }
//   render() {
//     console.log('Foo render')
//     return null
//   }
// }

// 使用 PureComponent  下面这种写法也不会重新触发重新渲染
class Foo extends PureComponent {
  render() {
    console.log('Foo render')
    return null
  }
}


class App extends Component {
  state = {
    count: 0,
  }
  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ count: this.state.count++ })}>
          add
        </button>
        <Foo name="Mike" />
      </div>
    )
  }
}

export default App
