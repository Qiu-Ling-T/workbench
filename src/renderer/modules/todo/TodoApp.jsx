import React from 'react';
import { TodoProvider } from './TodoContext';
import TodoInput from '../../components/todo/TodoInput';
import TodoList from '../../components/todo/TodoList';
import './todo.css';

const TodoApp = () => {
  return (
    <TodoProvider>
      <div className="todo-app">
        <div className="todo-app-header">
          <h1>任务清单</h1>
        </div>
        <div className="todo-app-content">
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodoApp;