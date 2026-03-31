import React, { useState, useEffect } from 'react';
import LocalLLMLeaderboard from './LocalLLMLeaderboard';
import LocalLLMScatter from './LocalLLMScatter';
import LocalLLMGuide from './LocalLLMGuide';

type HardwareTier = 'low' | 'mid' | 'high';

interface Recommendation {
  model: string;
  family: string;
  latency: string;
  latencyPct: number;
  accuracy: string;
  reason: string;
  regime: string;
  device: string;
}

const ArchitectSelector: React.FC = () => {
  const [hardware, setHardware] = useState<HardwareTier>('mid');
  const [latencyBudget, setLatencyBudget] = useState(50);
  const [accuracyMode, setAccuracyMode] = useState<'balanced' | 'high'>('balanced');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [activeTab, setActiveTab] = useState<'vlm' | 'leaderboard' | 'scatter' | 'guide'>('vlm');

  useEffect(() => {
    const getRec = (): Recommendation => {
      // High end (Jetson Orin, Mac, iPhone 15)
      if (hardware === 'high') {
        if (latencyBudget <= 5) return {
          model: 'EfficientFormer-L1',
          family: 'Hybrid ViT', latency: '~1.6 ms', latencyPct: 3,
          accuracy: '79.2%', regime: 'Real-Time',
          reason: 'Hybrid architecture with convolutional stem eliminates ViT-specific CPU offloading. Fastest encoder tested.',
          device: 'Jetson Orin / Coral TPU',
        };
        if (latencyBudget <= 15 && accuracyMode === 'balanced') return {
          model: 'MobileViT-XS',
          family: 'Hybrid', latency: '~7.2 ms', latencyPct: 8,
          accuracy: '78.9%', regime: 'Real-Time',
          reason: 'Optimized for Apple Neural Engine; 7.2ms on iPhone 15 Pro with CoreML NPU compilation.',
          device: 'iPhone 15 Pro / NPU',
        };
        if (accuracyMode === 'high' && latencyBudget > 15) return {
          model: 'EfficientNet-B4',
          family: 'EfficientNet', latency: '~48.5 ms', latencyPct: 45,
          accuracy: '82.9%', regime: 'Interactive',
          reason: 'Maximum accuracy but crosses cache cliff (DRAM-bound). Only recommended with strong GPU and non-real-time requirements.',
          device: 'Jetson Orin Nano',
        };
        return {
          model: 'EfficientNet-B3',
          family: 'EfficientNet', latency: '~14.2 ms', latencyPct: 12,
          accuracy: '81.6%', regime: 'Interactive',
          reason: 'Pareto-optimal: optimal L2/L3 cache utilization on Jetson Orin. Best accuracy before cache cliff.',
          device: 'Jetson Orin Nano',
        };
      }

      // Mid range (RPi 5, Coral TPU)
      if (hardware === 'mid') {
        if (latencyBudget <= 5) return {
          model: 'EfficientFormer-L1',
          family: 'Hybrid', latency: '~1.6 ms', latencyPct: 3,
          accuracy: '79.2%', regime: 'Real-Time',
          reason: 'Only viable for hard real-time on mid-range: requires Coral TPU edge accelerator with INT8 compilation.',
          device: 'Coral TPU',
        };
        if (accuracyMode === 'high') return {
          model: 'FastViT-HD',
          family: 'Hybrid CNN-Transformer', latency: '~18.5 ms', latencyPct: 18,
          accuracy: '82.2%', regime: 'Interactive',
          reason: 'Hybrid CNN-Transformer advantage. Achieves 82.2% accuracy while staying under 20ms-outperforms ViT-Base by 5× in speed.',
          device: 'Jetson Orin Nano',
        };
        return {
          model: 'EfficientNet-B0',
          family: 'EfficientNet', latency: '~28-32 ms', latencyPct: 28,
          accuracy: '77.1%', regime: 'Interactive',
          reason: 'CPU-only execution on RPi 5. Memory bandwidth limited but provides solid accuracy. INT8 TFLite quantized.',
          device: 'Raspberry Pi 5',
        };
      }

      // Low end
      if (latencyBudget <= 15) return {
        model: 'MobileNetV3-Small',
        family: 'MobileNet', latency: '~8 ms', latencyPct: 6,
        accuracy: '67.4%', regime: 'Real-Time',
        reason: 'Only viable option for real-time on legacy hardware. Depthwise separable convolutions minimize parameters.',
        device: 'Legacy Pi 4 / MCU',
      };
      return {
        model: 'MobileNetV3-Large',
        family: 'MobileNet', latency: '~42-56 ms', latencyPct: 50,
        accuracy: '75.2%', regime: 'Interactive',
        reason: 'Thermal throttling adds +15-20% latency on sustained inference. Replace Swish with HardSwish/ReLU6 for <1% accuracy cost.',
        device: 'Legacy Pi 4',
      };
    };
    setRecommendation(getRec());
  }, [hardware, latencyBudget, accuracyMode]);

  return (
    <section className="section" id="selector" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'var(--kiit-light)', color: 'var(--kiit)', border: '1px solid var(--kiit-medium)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 13h4"/></svg>
            Interactive Tools
          </div>
          <h2 className="section-title">Unified Deployment Tools & Benchmarks</h2>
          <p className="section-desc">
            Toggle between the VLM architectural selector and comprehensive community hardware leaderboards and guides.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button className={`chip ${activeTab === 'vlm' ? 'active active-blue' : ''}`} onClick={() => setActiveTab('vlm')}>VLM Architect</button>
          <button className={`chip ${activeTab === 'leaderboard' ? 'active active-blue' : ''}`} onClick={() => setActiveTab('leaderboard')}>LLM Leaderboard</button>
          <button className={`chip ${activeTab === 'scatter' ? 'active active-blue' : ''}`} onClick={() => setActiveTab('scatter')}>Scatter Plot</button>
          <button className={`chip ${activeTab === 'guide' ? 'active active-blue' : ''}`} onClick={() => setActiveTab('guide')}>Deployment Guide</button>
        </div>

        {activeTab === 'vlm' && (
        <div style={{ display: 'grid', gap: '2rem', maxWidth: 900, margin: '0 auto' }} className="responsive-grid">
          {/* Controls */}
          <div className="selector-card" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div className="selector-input-group">
              <label className="selector-label">Hardware Platform</label>
              <select
                className="selector-select"
                value={hardware}
                onChange={e => setHardware(e.target.value as HardwareTier)}
              >
                <option value="high">High-End (Jetson Orin / iPhone 15 Pro)</option>
                <option value="mid">Mid-Range (Raspberry Pi 5 / Coral TPU)</option>
                <option value="low">Low-End (Pi 4 / ESP32 / MCU)</option>
              </select>
            </div>

            <div className="selector-input-group">
              <label className="selector-label">
                Latency Budget: <span className="mono" style={{ color: 'var(--accent-cyan)' }}>{latencyBudget} ms</span>
              </label>
              <input
                type="range" min="1" max="200" value={latencyBudget}
                onChange={e => setLatencyBudget(parseInt(e.target.value))}
                className="selector-range"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <span>1ms (Ultra Real-time)</span>
                <span>{latencyBudget <= 15 ? '⚡ Real-Time' : latencyBudget <= 50 ? '🔄 Interactive' : '📦 Batch'}</span>
                <span>200ms (Batch)</span>
              </div>
            </div>

            <div className="selector-input-group">
              <label className="selector-label">Target Accuracy</label>
              <div className="selector-btn-group">
                <button
                  className={`selector-btn ${accuracyMode === 'balanced' ? 'active' : ''}`}
                  onClick={() => setAccuracyMode('balanced')}
                >
                  Balanced (~75-79%)
                </button>
                <button
                  className={`selector-btn ${accuracyMode === 'high' ? 'active' : ''}`}
                  onClick={() => setAccuracyMode('high')}
                >
                  High (&gt;80%)
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="result-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Recommended Backbone
              </div>
              <div className="result-model-name">{recommendation?.model}</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span className="result-family">{recommendation?.family}</span>
                <span className="table-badge badge-interactive">{recommendation?.regime}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {recommendation?.reason}
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>Est. Latency</div>
                  <div className="mono" style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>{recommendation?.latency}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>Accuracy</div>
                  <div className="mono" style={{ fontSize: '1.25rem', color: 'var(--accent-emerald)' }}>{recommendation?.accuracy}</div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Latency vs. 200ms budget</span>
                  <span style={{ color: 'var(--text-muted)' }}>{recommendation?.device}</span>
                </div>
                <div className="latency-bar-bg">
                  <div className="latency-bar-fill" style={{ width: `${Math.min(recommendation?.latencyPct || 0, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeTab === 'leaderboard' && <div className="tab-pane-content"><LocalLLMLeaderboard /></div>}
        {activeTab === 'scatter' && <div className="tab-pane-content"><LocalLLMScatter /></div>}
        {activeTab === 'guide' && <div className="tab-pane-content"><LocalLLMGuide /></div>}
        
      </div>
    </section>
  );
};

export default ArchitectSelector;