### 1、我自己在component 中创建了一个组件 在App.jsx中引用
```js
import React, { Component } from 'react'

class SimpleHooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          click me
        </button>
      </div>
    );
  }
}

export default SimpleHooks
```
准备对这个简单的例子进行改造成react-hooks版本。

```js
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
```

### React 为什么要搞一个Hooks？
想要复用一个组件是在是太麻烦了！

react的思想是将页面拆分成一个个独立的，可以复用的组件，并且用自上而下的单向数据流将这些组件串联起来，但是实际的使用过程中
我们的项目上很多大型组件冗长且组件难以复用，尤其哪些class组件，本身包含了状态，所以这类组件就变得很麻烦。

在hooks 之前，官方推荐使用 **渲染属性** 和高阶组件（Higher-Order-Component）我们可以稍微简单看下这两种模式


