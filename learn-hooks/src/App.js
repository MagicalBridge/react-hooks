import React, { useState, PureComponent, useEffect, useMemo, useCallback, useRef } from 'react'
import './App.css'

// 函数组件
// const Count = memo(function Count(props) {
//   console.log('count render');
//   return (
//     <div>{props.count}</div>
//   )
// })

class Count extends PureComponent {
  speak() {
    console.log(`render${this.props.count}`);
  }
  render() {
    const { props } = this
    return (
      <div onClick={props.onClick}>{props.count}</div>
    )
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const counterRef = useRef()
  let it = useRef()

  /**
   * 如果将数组中的参数变成一个布尔值输出看看点击效果
   * 点击前两次的时候 没有任何的变化，第三次的时候count===3变成了true 执行
   * 再次点击又变成false 执行 之后全部为false 不在执行。
   */
  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const onClick = useCallback(() => {
    console.log('Click')
    setClickCount((clickCount) => clickCount + 1)
    console.log(clickCount)
    counterRef.current.speak();
  }, [counterRef])

  //只执行一次
  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  },[])
  // 每次都检查
  useEffect(()=>{
    if(count >= 10){
      clearInterval(it.current)
    }
  })



  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}  double：{double}
      </button>
      <Count ref={counterRef} count={double} onClick={onClick} />
    </div>
  );
}

export default App;
