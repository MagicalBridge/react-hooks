import React, { useState, PureComponent, useEffect, useRef } from 'react'
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

function App() {
  const [count] = useCount(0)
  return (
    <div>
      <button>
        add {count}
      </button>
      <Count count={count} />
    </div>
  );
}

export default App;
