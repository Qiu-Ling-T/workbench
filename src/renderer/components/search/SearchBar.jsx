import React from 'react';
import { useSearch } from '../../modules/search/SearchContext';
import './SearchBar.css';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, performSearch } = useSearch();

  // 处理输入变化
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 处理搜索提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  // 处理按键事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="输入搜索内容..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input"
        autoFocus
      />
      <button type="submit" className="search-button">
        搜索
      </button>
    </form>
  );
};

export default SearchBar;