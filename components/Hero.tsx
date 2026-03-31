import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-content fade-in">
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div className="hero-badge" style={{ marginBottom: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            KIIT University • Major Project 2025-26
          </div>
          <div className="hero-badge" style={{ marginBottom: 0, background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Accepted: ICCCNet 2026, Manchester UK
          </div>
        </div>
        <h1>
          Vision Encoder Optimization for{' '}
          <span className="gradient-text">Edge Visual LLMs</span>
        </h1>
        <p className="hero-subtitle">
          A hardware-aware framework for selecting efficient vision encoder backbones-from 
          EfficientNet to MobileViT-for real-time multimodal inference on edge devices. 
          Navigate the latency-accuracy Pareto frontier across Raspberry Pi 5, Jetson Orin Nano, and Coral TPU.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={onStart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Explore the Framework
          </button>
          <a href="#selector" className="btn btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 13h4"/></svg>
            Open Encoder Selector
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">8</div>
            <div className="hero-stat-label">Models Benchmarked</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">3</div>
            <div className="hero-stat-label">Edge Platforms</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">1.6ms</div>
            <div className="hero-stat-label">Best TTFT</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">82.9%</div>
            <div className="hero-stat-label">Top Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
