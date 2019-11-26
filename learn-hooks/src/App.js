import React, { useState, PureComponent, useEffect, useRef, useCallback } from 'react'
import './App.css'

// 函数组件
// const Count = memo(function Count(props) {
//   console.log('count render');
//   return (
//     <div>{props.count}</div>
//   )
// })

class Count extends PureComponent {
  render() {
    const { props } = this
    return (
      <div>{props.count}</div>
    )
  }
}

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

// 自定义hooks的size函数

function useSize() {
  // 定义数据
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  // 定义副作用 只需要执行一次
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    }
  }, [])

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])

  return size
}

function App() {
  const [count] = useCount(0)
  const size = useSize()
  return (
    <div>
      <button>
        add {count}
        size {size.width} {size.height}
      </button>
      <Count count={count} />
    </div>
  );
}

export default App;
