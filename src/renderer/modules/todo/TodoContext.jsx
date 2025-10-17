import React, { createContext, useContext, useState, useEffect } from 'react';

// 创建TodoContext
const TodoContext = createContext();

// 自定义Hook用于使用TodoContext
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

// TodoProvider组件
export const TodoProvider = ({ children }) => {
  // 初始化任务列表，从localStorage加载或使用默认数据
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    // 默认的示例任务
    return [
      { id: 1, text: '完成任务清单模块开发', completed: false },
      { id: 2, text: '学习Electron和React', completed: true },
      { id: 3, text: '优化应用性能', completed: false }
    ];
  });

  // 当todos变化时，保存到localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加任务
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // 切换任务完成状态
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 删除任务
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 更新任务文本
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;