import React from 'react';
import { SearchProvider } from './SearchContext';
import SearchBar from '../../components/search/SearchBar';
import PlatformSelector from '../../components/search/PlatformSelector';
import PlatformManager from '../../components/search/PlatformManager';
import './search.css';

const SearchApp = () => {
  return (
    <SearchProvider>
      <div className="search-app">
        <div className="search-app-header">
          <h1>多平台搜索</h1>
        </div>
        <div className="search-app-content">
          <SearchBar />
          <PlatformSelector />
          <PlatformManager />
        </div>
      </div>
    </SearchProvider>
  );
};

export default SearchApp;