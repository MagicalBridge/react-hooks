import React, { useState, useMemo } from 'react'
import './App.css'

// 函数组件
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


  /**
   * 如果将数组中的参数变成一个布尔值输出看看点击效果
   * 点击前两次的时候 没有任何的变化，第三次的时候count===3变成了true 执行
   * 再次点击又变成false 执行 之后全部为false 不在执行。
   */
  // const double = useMemo(() => {
  //   return count * 2
  // }, [count === 3])
  
  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}  double：{double}
      </button>
      <Count count={count} />
    </div>
  );
}

export default App;
