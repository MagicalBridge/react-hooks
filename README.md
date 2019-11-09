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

### 什么是渲染属性？
渲染属性指的是使用一个值为函数的prop来传递需要动态渲染的nodes或者组件。下面的代码我们可以看到我们的DataProvider组件包含了所有跟状态相关的代码，而Cat组件则可以是任何一个单纯的展示型组件，这样一来DataProvider 就可以单独复用了。

### hooks真正的用途
我们可以将各种功能写成一个个可以复用的hooks当组件中想要什么样的功能时候，直接在组件中调用这个hooks即可。
我们一般写组件的时候，希望写纯的function 组件，但是随着业务的复杂，不得不将原来的pureFunction 改回去 class
这个事情也是非常让人烦恼的。

### 如何保证多个useState 相互独立，按照顺序执行:
react 规定我们必须把hooks写在函数的最外层，不能写在if else 等条件语句中，来确保hooks执行顺序一致。

### 什么是Effect Hooks





