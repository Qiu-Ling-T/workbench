import React from 'react';
import './HomePage.css';
import WelcomeMessage from '../components/WelcomeMessage';
import FeatureCard from '../components/FeatureCard';

function HomePage() {
  const features = [
    { title: 'React 组件化', description: '基于React的模块化开发' },
    { title: 'Electron 桌面应用', description: '跨平台桌面应用开发' },
    { title: 'Webpack 构建', description: '现代化的代码构建工具' },
  ];

  return (
    <div className="home-page">
      <WelcomeMessage />
      <div className="features">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;