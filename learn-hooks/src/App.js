import React, { useState, useMemo, memo, useCallback } from 'react'
import './App.css'

// 函数组件
const Counter = memo(function Count(props) {
  console.log('count render');
  return (
    <div>{props.count}</div>
  )
})

function App() {
  const [count, setCount] = useState(0)
  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  // 将传入Counter的click 做如下的改写，真的是非常的有优势，能够将渲染性能提升一些
  // 我在做项目中，思考的角度有问题，不是说处理子组件的点击事件，而是处理 父组件传递给子组件的
  // 点击事件 这要求将组件改写成hooks函数。

  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log('Click');
  //   }
  // }, [])

  // 如果想要使用callback 如何书写呢，其实比useMemo要简单一些，可以省略顶层的函数
  const onClick = useCallback(() => {
    console.log('click');
  }, [])

  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}  double：{double}
      </button>
      {/* 给Counter 添加一个函数props */}
      <Counter count={double} onClick={onClick} />
    </div>
  );
}

export default App;
