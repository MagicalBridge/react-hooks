import React, { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'


function Control() {
  return <div></div>
}

function Todos() {
  return <div></div>
}

function TodoList() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    // setTodos 传入一个函数避免直接对修改 todos
    setTodos(todos => [...todos, todo])
  }

  const removeTodo = (id) => {
    setTodos(todos => todos.filter(todo => {
      return todo.id !== id
    }))
  }

  const toggleTodo = (id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id ? {
        ...todo,
        complete: !todo.complete,
      }
        : todo;
    }))
  }
  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default TodoList;
