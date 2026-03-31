import React from 'react';

const SelectionLaws: React.FC = () => {
  const principles = [
    {
      icon: '📐',
      title: 'Law of Resolution',
      colorAccent: '#f43f5e',
      iconBg: 'rgba(244,63,94,0.12)',
      desc: 'Encoder latency scales quadratically with input resolution for CNNs and quartically for ViTs. Doubling resolution increases CNN latency by ~4× and ViT latency by ~16×.',
      detail: 'For detail-sensitive tasks like OCR, EfficientNet-B0 at 384px consistently outperforms EfficientNet-B4 at 224px-higher resolution preserves spatial detail that downsampling destroys.',
      formula: 'CNN: O(R²)  |  ViT: O((R²/P²)²) = O(R⁴)',
    },
    {
      icon: '⚖️',
      title: 'Law of Depth vs. Width',
      colorAccent: '#f59e0b',
      iconBg: 'rgba(245,158,11,0.12)',
      desc: 'On edge NPUs, inference latency is dominated by sequential memory access overhead rather than arithmetic computation. Deep networks create compute unit starvation.',
      detail: 'ResNet-101 leaves processing units idle waiting for weight transfers from off-chip DRAM. Wide, shallow networks (MobileNetV3, EfficientFormer) maximize SIMD utilization.',
      formula: 'Memory-bound: L ∝ D × (W_size / BW_mem)',
    },
    {
      icon: '🔀',
      title: 'Hybridization Principle',
      colorAccent: '#10b981',
      iconBg: 'rgba(16,185,129,0.12)',
      desc: 'Pure ViTs suffer disproportionate latency on edge accelerators due to quadratic complexity and suboptimal operator support. Hybrid architectures combine the best of both worlds.',
      detail: 'Coral TPU must offload ViT-specific ops (Softmax, reshape) to CPU. Hybrid CNN-Transformer models use a convolutional stem for spatial reduction before any attention blocks.',
      formula: 'EfficientFormer: 79.2% @ 1.6ms vs ViT-Base: 81.0% @ 98ms',
    },
  ];

  return (
    <section className="section" id="principles">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(244,63,94,0.12)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Design Methodology
          </div>
          <h2 className="section-title">Three Governing Design Principles</h2>
          <p className="section-desc">
            Established through formal complexity analysis, Roofline modeling, and PolyThrottle validation 
            on Raspberry Pi 5, Google Coral TPU, and NVIDIA Jetson Orin Nano.
          </p>
        </div>

        <div className="principle-cards">
          {principles.map((p, i) => (
            <div className="principle-card" key={p.title}>
              <div className="principle-icon" style={{ background: p.iconBg }}>
                <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
              </div>
              <h3 style={{ color: p.colorAccent }}>{p.title}</h3>
              <p>{p.desc}</p>
              <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {p.detail}
              </p>
              <div className="principle-formula">{p.formula}</div>
            </div>
          ))}
        </div>

        {/* Adaptive Resolution Strategy */}
        <div style={{
          marginTop: '2.5rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(6,182,212,0.06), rgba(139,92,246,0.06))',
          border: '1px solid rgba(6,182,212,0.2)',
          borderRadius: '16px',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '1.5rem' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(6,182,212,0.15)', fontSize: '1.4rem', flexShrink: 0,
            }}>🔄</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Optional: Adaptive Resolution Strategy
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                A runtime optimization where the system dynamically adjusts input resolution based on task requirements 
                without reloading model weights. A mobile robot operates at <strong style={{ color: 'var(--accent-cyan)' }}>224px (~15 ms)</strong> for 
                obstacle avoidance and switches to <strong style={{ color: 'var(--accent-cyan)' }}>384px (~45 ms)</strong> only 
                when fine-grained semantic analysis is required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectionLaws;
