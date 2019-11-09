import React, { useState, useEffect } from 'react';

// useState 是react自带的一个状态函数，它的作用就是用来声明状态变量。useState这个函数接收的参数是
// 这个状态的初始值，（initial state）它返回一个数组，这个数组的第0项是当前的状态值，第1项是可以改变第一项的方法函数
// 所以我们要做的就是 声明一个状态变量count 把它的初始值设置为0 同提供一个可以更改count的函数setCount
// 因为count是一个变量所以我们再也不用this.state.xxx 这种访问形式了 同样的修改的时候 我们使用的逻辑 直接调用 setCount
// 就可以了。

// 这里我们不禁有一个疑问 我们在调用 setState 这个方法的时候每次拿到的都是新的值，对最新的值进行更新的操作。
// 是如何做到的呢，我们知道，对于一个函数来说，假设我们不使用闭包，在执行完毕之后，内部的变量是会被销毁的，
// 这里我们需要知道 useState 这个hooks 在组件中是可以多次调用的，并且并没有规定初始值是 number/string/boolean/

// 什么是Effect Hooks

// 我们梳理一下,effect到底做了什么，首先我们声明了一个变量 count 将它的初始值设置为0，然后告诉react 我们这个组件有一个副作用
// 在我们这个例子中，这个副作用就是 调用brower Api 来修改文档标题。当react 要渲染我们的组件的时候，它会记住我们的副作用，等到更新
// DOM 之后，它再一次执行我们的副作用函数。


function DataProvider() {
  const [count, setCount] = useState(0)
  // 类似于 componentDidMount 和 componentDidUpdate 因为是动态的 设置标题 如果不使用effectHooks
  // 我们需要分别在 componentDidMount 和 componentDidUpdate 中设置这个标题
  useEffect(() => {
    // 更新文档标题
    document.title = `You clicked ${count} times`
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default DataProvider;
