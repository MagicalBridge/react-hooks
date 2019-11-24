import React, { useState, useEffect } from 'react'
import './App.css'

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

  const click = () => {
    console.log('click');
  }

  // 反复的不断清理函数的副作用
  useEffect(() => {
    document.querySelector('#size').addEventListener('click', click, false)
    return () => {
      document.querySelector('#size').removeEventListener('click', click, false)
    }
  })

  // 使用useEffect 设置窗口title
  useEffect(() => {
    document.title = count
  })

  // 当count变化的时候 useEffect 才会执行
  useEffect(() => {
    console.log('count', count);
  }, [count])

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
        {
          count % 2 ? <span id="size" onClick={() => this.click}></span>
            : <p id="size" onClick={() => this.click}></p>
        }
      </button>

    </div>
  );
}

export default App;
