import React, { createContext, useContext, useState, useEffect } from 'react';

// 创建搜索上下文
const SearchContext = createContext();

// 自定义Hook用于使用SearchContext
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// SearchProvider组件
export const SearchProvider = ({ children }) => {
  // 初始化搜索平台列表，从localStorage加载或使用默认数据
  const [platforms, setPlatforms] = useState(() => {
    const savedPlatforms = localStorage.getItem('searchPlatforms');
    if (savedPlatforms) {
      return JSON.parse(savedPlatforms);
    }
    // 默认的搜索平台
    return [
      { id: 1, name: 'Bing', url: 'https://www.bing.com/search?q={query}', isDefault: true },
      { id: 2, name: 'Google', url: 'https://www.google.com/search?q={query}', isDefault: false },
      { id: 3, name: '京东', url: 'https://search.jd.com/Search?keyword={query}', isDefault: false },
      { id: 4, name: '拼多多', url: 'https://mobile.yangkeduo.com/search_result.html?search_key={query}', isDefault: false },
      { id: 5, name: '淘宝', url: 'https://s.taobao.com/search?q={query}', isDefault: false }
    ];
  });

  // 当前选中的平台
  const [selectedPlatform, setSelectedPlatform] = useState(() => {
    const savedPlatform = localStorage.getItem('selectedPlatform');
    if (savedPlatform) {
      return parseInt(savedPlatform);
    }
    // 默认选择默认平台
    const defaultPlatform = platforms.find(p => p.isDefault);
    return defaultPlatform ? defaultPlatform.id : platforms[0].id;
  });

  // 搜索关键词
  const [searchQuery, setSearchQuery] = useState('');

  // 当平台列表变化时，保存到localStorage
  useEffect(() => {
    localStorage.setItem('searchPlatforms', JSON.stringify(platforms));
  }, [platforms]);

  // 当选中平台变化时，保存到localStorage
  useEffect(() => {
    localStorage.setItem('selectedPlatform', selectedPlatform.toString());
  }, [selectedPlatform]);

  // 添加新的搜索平台
  const addPlatform = (name, url) => {
    // 检查URL中是否包含{query}占位符
    if (!url.includes('{query}')) {
      throw new Error('URL必须包含{query}占位符，用于指定搜索参数的位置');
    }
    
    const newPlatform = {
      id: Date.now(),
      name,
      url,
      isDefault: false
    };
    setPlatforms([...platforms, newPlatform]);
    return newPlatform.id;
  };

  // 删除搜索平台
  const deletePlatform = (id) => {
    // 不允许删除最后一个平台
    if (platforms.length <= 1) {
      throw new Error('至少需要保留一个搜索平台');
    }
    
    const newPlatforms = platforms.filter(p => p.id !== id);
    setPlatforms(newPlatforms);
    
    // 如果删除的是当前选中的平台，则选择第一个平台
    if (selectedPlatform === id) {
      setSelectedPlatform(newPlatforms[0].id);
    }
  };

  // 设置默认平台
  const setDefaultPlatform = (id) => {
    setPlatforms(platforms.map(p => ({
      ...p,
      isDefault: p.id === id
    })));
  };

  // 生成搜索URL
  const generateSearchUrl = (query) => {
    if (!query || !query.trim()) return '';
    const platform = platforms.find(p => p.id === selectedPlatform);
    return platform ? platform.url.replace('{query}', encodeURIComponent(query.trim())) : '';
  };

  // 执行搜索 - 使用默认浏览器打开
  const performSearch = async (query) => {
    const searchUrl = generateSearchUrl(query);
    if (!searchUrl) return;

    try {
      if (typeof window !== 'undefined' && window.electronAPI?.openExternal) {
        await window.electronAPI.openExternal(searchUrl);
      } else {
        window.open(searchUrl, '_blank');
      }
    } catch {
      window.open(searchUrl, '_blank');
    }
  };

  // 执行搜索 - 使用内部浏览器打开
  const performSearchInInternalBrowser = async (query) => {
    const searchUrl = generateSearchUrl(query);
    if (!searchUrl) return;

    try {
      if (typeof window !== 'undefined' && window.electronAPI?.openInternalBrowser) {
        await window.electronAPI.openInternalBrowser(searchUrl);
      } else {
        window.open(searchUrl, '_blank');
      }
    } catch {
      window.open(searchUrl, '_blank');
    }
  };

  const value = {
    platforms,
    selectedPlatform,
    searchQuery,
    setSelectedPlatform,
    setSearchQuery,
    addPlatform,
    deletePlatform,
    setDefaultPlatform,
    performSearch,
    performSearchInInternalBrowser
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;