import React from 'react';

const HardwareSection: React.FC = () => {
  const platforms = [
    {
      name: 'Raspberry Pi 5',
      icon: '🍓',
      iconBg: 'rgba(244,63,94,0.12)',
      specs: [
        { label: 'Compute', value: 'Cortex-A76 Quad' },
        { label: 'Peak', value: '10-12 GFLOPS' },
        { label: 'Memory', value: '8GB LPDDR4X' },
        { label: 'Bandwidth', value: '50 GB/s' },
        { label: 'Power', value: '5-10 W' },
        { label: 'Latency Range', value: '28-32 ms' },
      ],
    },
    {
      name: 'RPi 5 + Coral TPU',
      icon: '🪸',
      iconBg: 'rgba(6,182,212,0.12)',
      specs: [
        { label: 'Compute', value: 'CPU + Edge TPU' },
        { label: 'Peak', value: '4 TOPS (INT8)' },
        { label: 'Memory', value: 'Shared 8 GB' },
        { label: 'Bandwidth', value: '50 GB/s' },
        { label: 'Power', value: '7-12 W' },
        { label: 'Latency Range', value: '1.6-300 ms' },
      ],
    },
    {
      name: 'NVIDIA Jetson Orin Nano',
      icon: '🟢',
      iconBg: 'rgba(16,185,129,0.12)',
      specs: [
        { label: 'Compute', value: 'GPU (Ampere)' },
        { label: 'Peak', value: '20-40 TOPS (INT8)' },
        { label: 'Memory', value: '8GB LPDDR5' },
        { label: 'Bandwidth', value: '68 GB/s' },
        { label: 'Power', value: '7-15 W' },
        { label: 'Latency Range', value: '14-98 ms' },
      ],
    },
    {
      name: 'iPhone 15 Pro',
      icon: '📱',
      iconBg: 'rgba(139,92,246,0.12)',
      specs: [
        { label: 'Compute', value: 'Apple Neural Engine' },
        { label: 'Peak', value: '35 TOPS' },
        { label: 'Memory', value: 'Unified Memory' },
        { label: 'Bandwidth', value: 'SoC Internal' },
        { label: 'Power', value: 'Mobile SoC' },
        { label: 'Latency Range', value: '7.2 ms' },
      ],
    },
  ];

  return (
    <section className="section" id="hardware">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>
            Table I
          </div>
          <h2 className="section-title">Edge Hardware Platforms & Constraints</h2>
          <p className="section-desc">
            Four target platforms spanning IoT to mobile SoC, each with distinct compute characteristics 
            that fundamentally shape encoder selection.
          </p>
        </div>

        <div className="hw-grid">
          {platforms.map(p => (
            <div className="hw-card" key={p.name}>
              <div className="hw-card-header">
                <div className="hw-card-icon" style={{ background: p.iconBg, fontSize: '1.2rem' }}>
                  {p.icon}
                </div>
                <h4>{p.name}</h4>
              </div>
              <div className="hw-card-specs">
                {p.specs.map(s => (
                  <div className="hw-spec" key={s.label}>
                    <span className="hw-spec-label">{s.label}</span>
                    <span className="hw-spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Roofline Model explanation */}
        <div style={{
          marginTop: '2.5rem',
          padding: '2rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📈 The Roofline Model
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>
                Edge hardware performance is bounded by <strong>min(P<sub>peak</sub>, b<sub>mem</sub> × I)</strong> where 
                I is arithmetic intensity (FLOPs/byte). Deep networks have low I, making them 
                memory-bandwidth-bound on edge platforms.
              </p>
              <div className="principle-formula" style={{ fontSize: '0.78rem' }}>
                Performance ≤ min(P_peak, BW_mem × Arithmetic_Intensity)
              </div>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🌡️ Thermal Throttling
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>
                Sustained inference over 2 minutes reduces memory clock frequency by <strong style={{ color: 'var(--accent-rose)' }}>20-40%</strong> on 
                the Jetson Orin, amplifying latency for memory-bound architectures by <strong style={{ color: 'var(--accent-rose)' }}>1.7×</strong>.
              </p>
              <div className="principle-formula" style={{ fontSize: '0.78rem' }}>
                MobileNetV3 on Pi 4: +15-20% latency from throttling
              </div>
            </div>
          </div>
        </div>

        {/* Cache Cliff Finding */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem 2rem',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(244,63,94,0.06))',
          border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: '12px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <strong style={{ color: '#f59e0b' }}>Cache Cliff Phenomenon:</strong>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
              Scaling beyond EfficientNet-B3 violates the 2-8 MB L2/L3 cache constraints. 
              Jetson Orin shows <span className="mono" style={{ color: '#f43f5e' }}>14.2ms → 48.5ms</span> (3.4× jump) for only +1.3% accuracy gain.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardwareSection;
