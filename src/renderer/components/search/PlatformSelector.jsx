import React from 'react';
import { useSearch } from '../../modules/search/SearchContext';
import './PlatformSelector.css';

const PlatformSelector = () => {
  const { platforms, selectedPlatform, setSelectedPlatform } = useSearch();

  // 处理平台选择
  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId);
  };

  return (
    <div className="platform-selector-container">
      <h3 className="platform-selector-title">选择搜索平台：</h3>
      <div className="platform-options">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`platform-option ${selectedPlatform === platform.id ? 'selected' : ''}`}
            onClick={() => handlePlatformSelect(platform.id)}
          >
            <span className="platform-name">{platform.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;