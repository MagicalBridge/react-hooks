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
我们写的有状态组件，通常会产生很多的副作用，（side effect） 比如发起ajax 请求获取数据，添加一些监听注册和取消注册
手动修改dom等等，我们之前把这些副作用的函数写在生命周期的钩子里面，比如didmount didupdate

比较推荐的做法：给每一个副作用一个单独的effect 钩子 这样一来，这些副作用不再一股脑的在生命周期钩子函数中，
代码变得更加清晰。

### effect 做了什么？
替代了我们之前的 didmount didupdate 实际上 react 首次渲染和之后的每次渲染都会调用一遍传给useEffect函数
useEfffect 中的更新渲染是异步执行的,之前的在生命周期中的代码是同步执行的，

### 如何解绑 effect带来的副作用
这种场景很常见，当我们在 componentDidMount 中添加一个注册，我们得在componentWillUmount中清除掉，如何清除呢？
让我们传递给useEffect的副作用函数返回一个新的函数即可。

```js
import { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 一定注意下这个顺序：告诉react在下次重新渲染组件之后，同时是下次调用ChatAPI.subscribeToFriendStatus之前执行cleanup
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

effect 函数接收的第二个参数，用第二个参数来告诉react 只有当着个参数发生改变的时候 才执行我们的传递的副作用函数（第一个参数）

```js
useEffect(()={
  document.title = `you clicked ${count} times`
},[count])
```









