import React, { useState } from 'react';
import { useTodo } from '../../modules/todo/TodoContext';
import './TodoInput.css';

const TodoInput = () => {
  const { addTodo } = useTodo();
  const [inputText, setInputText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 处理输入变化
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTodo(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form className={`todo-input-container ${isInputFocused ? 'focused' : ''}`} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="输入新任务..."
        value={inputText}
        onChange={handleInputChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        className="todo-input"
      />
      <button type="submit" className="todo-add-btn">
        添加
      </button>
    </form>
  );
};

export default TodoInput;