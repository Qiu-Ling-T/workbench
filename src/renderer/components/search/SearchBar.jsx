import React from 'react';
import { useSearch } from '../../modules/search/SearchContext';
import './SearchBar.css';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, performSearch, performSearchInInternalBrowser } = useSearch();

  // 处理搜索输入框文本变化
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 使用外部默认浏览器执行搜索
  const handleSearchDefault = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  // 使用Electron内部浏览器执行搜索
  const handleSearchInternal = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearchInInternalBrowser(searchQuery);
    }
  };

  // 处理键盘回车事件，触发外部浏览器搜索
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchDefault(e);
    }
  };

  return (
    <form className="search-bar-container">
      <input
        type="text"
        placeholder="输入搜索内容..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input"
        autoFocus
      />
      <button onClick={handleSearchDefault} className="search-button">
        外部浏览器搜索
      </button>
      <button onClick={handleSearchInternal} className="internal-search-button">
        内部浏览器搜索
      </button>
    </form>
  );
};

export default SearchBar;