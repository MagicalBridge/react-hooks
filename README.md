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
useEffect(() => {
  document.title = `you clicked ${count} times`
},[count])
```

### 我们为什么要写自定义的Effect-hooks 
为什么要自己去写一个Effect-Hooks 这样我们才能把可以复用逻辑抽离出来，变成一个个可以随插拔的插销，哪个组件需要使用，我就插进
哪一个组件里面, 我们完善一个例子。

### context 这个api 是做什么的？
context api 提供了一种方式，能够让数据在组件树中传递而不必一级一级的手动传递
场景，比如在收银台页面中，其实是有三级组件的，这个时候考虑使用这个特性，否则，就会
使用父亲传递给子组件、儿子传递给孙子组件这样的方式去传递，数据很繁琐。

createContext 这个api 提供了两个函数 provider consume

使用context 这个api 特别像vue中应用的 `eventBus` 这种兄弟组件之间的传递数据的方式
但是这个context 是子孙组件传递数据的方式.

当时在feedback 这个组件中最早使用这个时候 那时候感觉写的还不错，但是使用这种中间工具的时候确实感觉精简了不少
feedback的改造使用这个完成。 这个技巧可以更多在跨层级的属性中进行使用

## 如果组件具有多个context应该怎么做呢？ 
这个老师说的是 是可以进行嵌套的，这种嵌套的规则顺序并不是很重要。

## 06 使用contextType静态属性
在Leaf 这个组件中,使用了 consume 这个组件，使用的时候并不是很优雅，我们想要换一种方式去处理它。
这个时候context-Type排上了用场
```js
import React, { Component } from 'react';
import { BatteryContext } from '../utils/Context'

class Leaf extends Component {
  // 这是一个静态属性
  static contextType = BatteryContext
  render() {
    // 使用this.context 拿到当前的这个 context
    const battery = this.context
    return (
      <h1>Battery:{battery}</h1>
    )
  }
}

export default Leaf;
```
上面我们使用context解决的是变成开发的效率问题。那么下面我们使用 lazy 和 Suspense 解决的是性能问题

## Lazy Suspense
背景：我们说在项目运行的时候，有写功能可能一直没有被激活，但是代码依然被下载进了用户的浏览器上。这种是有优化空间的。
延迟加载的场景有图片懒加载。

webpack 中有个 `code splitting` 将页面认为的划分为多个页面产出。
我们平时在项目中使用的import 是一种静态导入模块的应用，实际上，import 还可以动态导入文件，返回的是一个`promise`
```js
import('./detail.js').then(...)
```

如果我们在webpack的运行环境中使用import 动态的导入一个模块，那么webpack 会将这个模块打包成一个单独的模块。
对于react组件来说，怎么来说才算是用到呢？--> **渲染** 
react中的lazy函数 将react的导入行为封装成react组件。一旦封装的组件被渲染，意味着去加载封装的组件，封装的是组件的导入行为，而不是组件本身。导入意味着网络请求。

## 错误边界 
如果组件被人为的阻止了加载,加载错误需要被捕获，这种捕获可以放在错误边界里面出处理。
这里有两种捕获错误边界的做法：
  第一种使用componentDitCatch
  第二种使用react中的一个静态的方法 
  getDriverdStateFromError(error){
    // 在里面直接 return 状态
  }
```js
 state = {
    hasError: false,
  }
  // 使用这个生命周期函数可以设置state的值
  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  // 或者使用一个静态的属性
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
```

## memo
react 作为个视图库，当数据变化的时候会自动的更新状态，重新渲染视图，这点本来就是应该的，
但是有时候当我们的视图没有更新的时候。也渲染这就说不过去了

我们在dev-08 这个项目中声明了一`App`的子组件这个组件f放在app 内部，当app 内部的状态值发生变化的时候
app会重新渲染，这个是肯定的，但是我们并不希望foo 这个组件重新渲染。应该如何做呢？

+ 1、react 中有一个shouldComponentUpdate(nextProps,nextState ){} 这个生命周期函数，这个生命周期函数的参数是下一次渲染周期的props和state, 如果这个函数返回fasle 那么这个组件就不会发生渲染，在这个例子中，我们认为，只要传入的name的值不变就不需要重新渲染

```js
class Foo extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.name === this.props.name) {
      return false
    }
    return true
  }
  render() {
    console.log('Foo render')
    return null
  }
}
```
在foo组件中添加代码在次点击 add Foo组件不会重新渲染

+ 2、我们可以使用PureComponent 进行简化,使用 PureComponent 只是对第一层级的数据进行对比。

```js
class Foo extends PureComponent {
  render() {
    console.log('Foo render')
    return null
  }
}
```
如果接受的是一个复杂的数据类型，这个PureComponent 就不奏效了。
为什么呢 因为 PureComponent 自身携带的 shouldComponentDidUpate 本身携带的句柄没有发生变化，这个时候
就认为没有发生变化，就没有发生重新渲染这个肯定是不对的。


## 使用PureComponent 遇到的陷阱
上一节中，我们使用PureComponent 这种方式 利用自身的一个shouldComponentUpdate，去判断组件到底是否重新渲染
这里还需要注意一些bug

我们给foo 组件传入一个匿名函数,点击按钮发现 Foo 重新渲染了。
```js
 <Foo name="Mike" cb={() => { }} />
```
如何解决这个问题呢？

我们可以将这个匿名函数改写成一个成员函数,这种写法虽然解决了重新渲染的问题但是 callback 里面的this指向保证不了
```js
callback(){
  // 这里面的this 指向保证不了
}
……

<Foo name="Mike" cb={this.callback} />
```

如果这样呢？你会发现 foo 又开始重新渲染了
```js
callback(){}
……

<Foo name="Mike" cb={this.callback.bind(this)} />
```

那应该怎么办呢？ 有这样一种方案：我们把callback 改写成类属性
```js
callback = () =>{}
……

<Foo name="Mike" cb={this.callback} />
```

到这里还是没有讲解mem的用法，对于foo组件来说,是一个无状态组件 我们完全可以改写成函数的形式；
```js
const Foo = memo(function Foo(props) {
  console.log('Foo render')
  return <div>{props.name}</div>
})
```
上面这段代码使用memo包裹了这个无状态组件


## react-hooks 出现的意义和原因
+ 1、组件复用困难
+ 2、副作用集中在一起
+ 3、this的指向困扰： 内联函数过渡创键新的句柄 类成员函数不能保证this

## useState
```js
function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}
      </button>
    </div>
  );
}
export default App
```
useState 是怎么知道 返回的是count 和setCount的呢？ 是按照出现的顺序调用的。
不要再条件语句或者，循环中使用这个state。

如何避免这个问题呢 react 中提供了一个插件  eslint-plugin-react-hooks

useState 可以传入一个函数进行延迟初始化提高效率。


## Effect-hooks
常见的副作用：
+ 1、绑定事件
+ 2、网络请求
+ 3、访问dom
这些副作用都在组件的渲染行为之外，副作用的调用时机一般是放在`mount`之后 `update`之后 `unmount`之前

现在我们有了`useEffect`了，useEffect 一般是在render之后调用，并且根据自身的状态选择调用或者不调用。
第一次的调用就相当于 `componentDidMount` 后面的调用都相当于 `componentDidUpdate` 之前我们在这两个生命周期函数中
可能会编写相同的代码，现在我们不需要关心这个问题了。

同样的 useEffect 还可以返回一个函数，这个函数的执行时机很重要，称之为 clean callback
: 这个回调函数的作用是清除上一次副作用遗留下来的状态。比如一个组件在第三次 第五次 第七次渲染后执行的逻辑
那么回调函数就会在 第四次 第六次 第八次 渲染之前执行，严格来讲是在前一个视图被清除之前。

如果useEffect 只在第一次调用，返回的回调函数只会在组件卸载之前调用了。

```js
function App() {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }
  // 使用useEffect 设置窗口title
  useEffect(() => {
    document.title = count
  })

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    // return一个回调函数 回调函数在视图销毁之前触发，有两种销毁的原因
    // 1、重新渲染，2、组件卸载
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}
        size:{size.width}x{size.height}
      </button>
    </div>
  );
}
```

上面这个函数是如何解决 我们说的那三个问题的呢？
1、首先 设置title 的事情 只在一个useEffect 上面写了一次。
2、不同的逻辑放在不同的useEffect 里面处理，这就做到了关注点分离

显然第一个useEffect是一直在调用，第二个就只调用一次。

useEffect的第二个参数的含义： 只有数组的每一项都不变的情况下，才会阻止effect重新执行，
第一次渲染之后，useEffect 肯定会执行，下一次什么时候再执行取决于数组每一项的对比，
这里有两个特例，什么都不传递，每次渲染都会执行，传入空的数组，由于空数组和空数组是相同的
因此useEffect 只会在第一次执行一次.


我们描述一个场景 就是不断的绑定和解绑事件。



## useMemo 和 useCallback 这连个api
memo 的主要的作用是优化组件的重渲染，是对函数或者无状态组件的一种封装和实现形式。
useMemo 则定义了一段函数逻辑是否重复执行。判定依赖是否发生改变。

```js
useMemo(()=> {
 // something
},[])
```
这个和useEffect的形式差不多,接收一个函数 ，第二个参数是一个数组，如果不传递第二个参数，则useMemo 每次都需要执行。
这个是不能接受的。

```js
function Count(props) {
  return (
    <div>{props.count}</div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  // useMemo 是需要一个返回值的 这个依赖count 也就是说，如果count 发生变化 那么 这个useMemo 就会执行
  // 否则不会执行。
  const double = useMemo(() => {
    return count * 2
  }, [count])
  
  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}  double：{double}
      </button>
      <Count count={count} />
    </div>
  );
}
```
上面的例子中,useMemo 接收一个函数这个函数 需要一个返回值, 返回值也是可以参与渲染。
我们将上面函数做一下修改，条件渲染，将数组的中的参数变成 [count===3] 这是一个布尔值

## useMemo 使用中遇到的问题：
我在useMemo的第二数组中，使用了 [count === 3] 这个在useMemo 看来是一个复杂的表达式，想要我改掉
因此在warning中写了这个内容：
React Hook useMemo has a complex expression in the dependency array. Extract it to a separate variable so it can be statically checked
React Hook useMemo在依赖项数组中有一个复杂的表达式。将其提取到一个单独的变量中，以便可以对其进行静态检查

## 如何引出useCallBack这个函数:
在下面这段逻辑中，即使count组件中传入的 double 没有变化 依然重新触发了渲染，这个是为什么呢？
因为我们传入了函数句柄发生了变化，（App重新渲染了，导致属性也重新改变了）

上一节我们学习了useMemo 这个函数的和 memo 区别在于传入的回调函数可以确认更新或者不更新

```js
const Count = memo(function Count(props) {
  console.log('count render');
  return (
    <div>{props.count}</div>
  )
})

function App() {
  const [count, setCount] = useState(0)

  /**
   * 如果将数组中的参数变成一个布尔值输出看看点击效果
   * 点击前两次的时候 没有任何的变化，第三次的时候count===3变成了true 执行
   * 再次点击又变成false 执行 之后全部为false 不在执行。
   */
  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const onClick = () => {
    console.log('Click')
  }

  

  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}  double：{double}
      </button>
      <Count count={double} onClick={onClick} />
    </div>
  );
}
```

## useRef 
  + 1、获取组件或者DOM节点的句柄
  + 2、渲染周期之间共享数据的存储

  为什么想要获取句柄？因为想要调用子组件的成员方法。
  如果有一个定时器 定时器是一个副作用 应该放在 useEffect上面
  另一个清除定时器的功能也放在 useEffect 上面。

## 自定义hooks 我们将 count的逻辑单独封装出来
  将一些公共的功能抽象出来，变成hooks 这样写出来的自定义hooks 和函数式组件没有什么区别。
```js
// 这里定义了一个自定义的 hooks 使用use 开头
// 接收一个参数作为默认的参数
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)
  let it = useRef()
  //只执行一次
  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])
  // 每次都检查
  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })
  return [count]
}
```

同时Hooks还可以返回一个jsx 参与渲染

## redex 的设计原则：
 + 1、单一数据源：有两层意思第一层是应用程序的所有数据都挂载在同一个对象下面，同一信息量的数据只有一份避免不同步
 + 2、状态不可变：修改数据的前后 应用数据不是同一个数据。
 + 3、纯函数修改状态: 没有副租用 幂等。

































