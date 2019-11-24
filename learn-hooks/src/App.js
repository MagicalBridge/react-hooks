import React, { useState, createContext,useContext } from 'react'
import './App.css'

// 创建一个context
const CountContext = createContext()

// 函数组件
function Count () {
  // 直接使用useContext 传入CountContext 返回的是count
  const count = useContext(CountContext)
  return(
    <div>{count}</div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}
      </button>
      <CountContext.Provider value={count}>
        <Count></Count>
      </CountContext.Provider>
    </div>
  );
}

export default App;
