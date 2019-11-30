import React, { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'

let idSeq = new Date().getTime();


function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  const onSubmit = (e) => {
    // 阻止默认事件
    e.preventDefault();
    const newText = inputRef.current.value.trim();

    if (newText === '') {
      return
    }
    // 添加代办事项
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })

    // 添加完之后清空input的值
    inputRef.current.value = ''

  }

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} className="new-todo" placeholder="what needs to be done?" />
      </form>
    </div>
  )
}

function TodoItem(props) {
  const {
    todo: {
      id,
      text,
      complete
    },
    toggleTodo, removeTodo
  } = props

  const onChange = () => {
    toggleTodo(id)
  }

  const onRemove = () => {
    removeTodo(id)
  }
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        onChange={onChange}
        checked={complete}
      />
      <label className={complete ? 'complete' : ""}>
        {text}
      </label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
}

function Todos(props) {
  const { todos, toggleTodo, removeTodo } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return (
            // 这里因为是列表所以为了避免修改一个影响其他的组件这里内部再抽象一层组件
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          )
        })
      }
    </ul>
  )
}

const LS_KEY = '_$-todos_'

function TodoList() {
  const [todos, setTodos] = useState([])

  // 将一个新的代办添加到数组的尾部，参数是一个新的todo
  const addTodo = useCallback((todo) => {
    // setTodos 传入一个函数避免对 todos 这个变量的直接依赖
    setTodos(todos => [...todos, todo])
  }, [])

  // 删除一个指定的代办 为了优化性能传入的函数使用 useCallback 包裹
  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => {
      return todo.id !== id
    }))
  }, [])

  // 改变代办的是否完成的标志位
  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id ? {
        ...todo,
        complete: !todo.complete,
      } : todo;
    }))
  }, [])

  // 这是读取的逻辑
  useEffect( () => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos)
  },[])

  // 为了防止刷新之后页面数据 我们使用副作用同步数据
  useEffect(() => {
    localStorage.setItem(LS_KEY,JSON.stringify(todos))
  }, [todos])

  

  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
    </div>
  );
}

export default TodoList;
