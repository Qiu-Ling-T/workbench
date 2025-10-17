import React, { useState } from 'react';
import { useSearch } from '../../modules/search/SearchContext';
import './PlatformManager.css';

const PlatformManager = () => {
  const { platforms, addPlatform, deletePlatform, setDefaultPlatform } = useSearch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformUrl, setNewPlatformUrl] = useState('');
  const [error, setError] = useState('');

  // 处理添加平台表单提交
  const handleAddPlatform = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!newPlatformName.trim()) {
        throw new Error('请输入平台名称');
      }
      
      if (!newPlatformUrl.trim()) {
        throw new Error('请输入平台URL');
      }
      
      // 添加新平台
      addPlatform(newPlatformName.trim(), newPlatformUrl.trim());
      
      // 重置表单
      setNewPlatformName('');
      setNewPlatformUrl('');
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // 处理删除平台
  const handleDeletePlatform = (id) => {
    try {
      deletePlatform(id);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  // 处理设置默认平台
  const handleSetDefault = (e, id) => {
    e.stopPropagation(); // 防止触发平台选择
    setDefaultPlatform(id);
  };

  return (
    <div className="platform-manager-container">
      <div className="platform-manager-header">
        <h3>管理搜索平台</h3>
        <button 
          className="add-platform-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '取消' : '添加平台'}
        </button>
      </div>

      {showAddForm && (
        <form className="add-platform-form" onSubmit={handleAddPlatform}>
          <div className="form-group">
            <label htmlFor="platform-name">平台名称：</label>
            <input
              id="platform-name"
              type="text"
              value={newPlatformName}
              onChange={(e) => setNewPlatformName(e.target.value)}
              placeholder="例如：百度"
            />
          </div>
          <div className="form-group">
            <label htmlFor="platform-url">平台URL：</label>
            <input
              id="platform-url"
              type="text"
              value={newPlatformUrl}
              onChange={(e) => setNewPlatformUrl(e.target.value)}
              placeholder="例如：https://www.example.com/search?q={query}"
            />
            <small className="url-hint">请在URL中使用{"{query}"}作为搜索关键词的占位符</small>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">添加</button>
          </div>
        </form>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="platform-list">
        <h4>现有平台：</h4>
        <ul className="platform-items">
          {platforms.map((platform) => (
            <li key={platform.id} className="platform-item">
              <div className="platform-info">
                <span className="platform-name">{platform.name}</span>
                {platform.isDefault && <span className="default-indicator">(默认)</span>}
              </div>
              <div className="platform-actions">
                {!platform.isDefault && (
                  <button 
                    className="set-default-btn"
                    onClick={(e) => handleSetDefault(e, platform.id)}
                    title="设为默认"
                  >
                    设为默认
                  </button>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => handleDeletePlatform(platform.id)}
                  title="删除平台"
                >
                  删除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlatformManager;