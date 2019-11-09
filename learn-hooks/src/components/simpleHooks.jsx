// import React, { Component } from 'react'

// class simpleHooks extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       count: 0
//     }
//   }
//   render() {
//     return (
//       <div>
//         <p>You clicked {this.state.count}</p>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//           click me
//         </button>
//       </div>
//     );
//   }
// }
// export default simpleHooks

// 修改为react-hooks的版本，是不是非常的简单 不用写 constructor 不用写 this.state
// 直接在函数中解构 一个变量和一个操作变量的 set函数 这里组件变成了一个函数，这个函数确拥有自己的
// 状态count 同时它还可以更新自己的状态，之所以它这样的厉害，实际上这个函数注入了一个hooks useState
// hooks 本质上就是一个特殊的函数它可以为我们的函数式组件 注入一些特殊的功能，
import React, { useState } from 'react'
function SimpleHooks() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        click me
      </button>
    </div>
  )
}

export default SimpleHooks
