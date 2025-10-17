import React from 'react';
import './App.css';
import TodoApp from './modules/todo/TodoApp';
import SearchApp from './modules/search/SearchApp';

function App() {
  return (
    <div className="app">
      <SearchApp />
      <div style={{ marginTop: '40px' }}>
        <TodoApp />
      </div>
    </div>
  );
}

export default App;