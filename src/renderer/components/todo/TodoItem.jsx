import React, { useState } from 'react';
import { useTodo } from '../../modules/todo/TodoContext';
import './TodoItem.css';

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // 处理编辑开始
  const handleEditStart = () => {
    setIsEditing(true);
  };

  // 处理编辑保存
  const handleEditSave = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
      setIsEditing(false);
    } else {
      // 如果文本为空，取消编辑并恢复原文本
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  // 处理编辑取消
  const handleEditCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  // 处理按键事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <div className="todo-edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            className="todo-edit-input"
            autoFocus
          />
        </div>
      ) : (
        <span 
          className="todo-text" 
          onClick={handleEditStart}
          title="点击编辑任务"
        >
          {todo.text}
        </span>
      )}
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="todo-delete-btn"
        title="删除任务"
      >
        ×
      </button>
    </li>
  );
};

export default TodoItem;