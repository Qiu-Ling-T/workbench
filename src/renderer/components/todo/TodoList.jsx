import React from 'react';
import { useTodo } from '../../modules/todo/TodoContext';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const { todos } = useTodo();

  // 如果没有任务，显示空状态
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>暂无任务，开始添加吧！</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;