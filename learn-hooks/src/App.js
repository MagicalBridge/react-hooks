import React, { Component, PureComponent, memo } from 'react'
import './App.css'

// 使用 PureComponent  下面这种写法也不会重新触发重新渲染
// class Foo extends PureComponent {
//   render() {
//     console.log('Foo render')
//     return null
//   }
// }

const Foo = memo(function Foo(props) {
  console.log('Foo render')
  return <div>{props.name}</div>
})

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
        <Foo name="Mike"/>
      </div>
    )
  }
}

export default App
