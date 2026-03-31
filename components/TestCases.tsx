import React from 'react';

const TestCases: React.FC = () => {
  const tests = [
    {
      id: 'T01',
      title: 'EfficientNet-B0 at 224px on RPi 5',
      condition: 'Single image INT8',
      behavior: 'Inference completes',
      result: 'TTFT 28-32 ms; 77.1% accuracy',
      status: 'pass',
    },
    {
      id: 'T02',
      title: 'ViT-Base at 224px on Jetson Orin',
      condition: 'Single image FP16',
      behavior: 'Inference completes',
      result: 'TTFT ~98 ms; acceptable for batch',
      status: 'pass',
    },
    {
      id: 'T03',
      title: 'EfficientFormer-L1 on Coral TPU',
      condition: 'INT8 single pass',
      behavior: 'Inference < 5 ms',
      result: 'TTFT 1.6 ms; real-time achieved',
      status: 'pass',
    },
    {
      id: 'T04',
      title: 'EfficientNet-B4 at 384px on Jetson',
      condition: 'High-res FP16',
      behavior: 'Latency under 100 ms',
      result: 'TTFT 48.5 ms; within budget',
      status: 'pass',
    },
    {
      id: 'T05',
      title: 'MobileViT-XS on iPhone 15 Pro',
      condition: 'CoreML NPU',
      behavior: 'Inference < 15 ms',
      result: 'TTFT 7.2 ms; real-time achieved',
      status: 'pass',
    },
  ];

  return (
    <section className="section" id="tests">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Table IV
          </div>
          <h2 className="section-title">Verification & Test Cases</h2>
          <p className="section-desc">
            Five test cases covering real-time, interactive, and batch regimes. 
            Each verified TTFT budget compliance with ±2% accuracy threshold.
          </p>
        </div>

        <div className="test-grid">
          {tests.map(t => (
            <div className="test-card" key={t.id}>
              <div className="test-card-id">{t.id}</div>
              <h4>{t.title}</h4>
              <div className="test-detail">
                <span className="test-detail-label">Condition</span>
                <span className="test-detail-value">{t.condition}</span>
              </div>
              <div className="test-detail">
                <span className="test-detail-label">Expected</span>
                <span className="test-detail-value">{t.behavior}</span>
              </div>
              <div className="test-detail">
                <span className="test-detail-label">Result</span>
                <span className="test-detail-value" style={{ color: 'var(--accent-emerald)' }}>{t.result}</span>
              </div>
              <div className="test-result">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                PASS
              </div>
            </div>
          ))}
        </div>

        {/* Quality Assurance */}
        <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {[
            {
              icon: '🔁',
              title: 'Measurement Repeatability',
              desc: 'All latency measurements averaged over 100 inference passes with 10-pass warm-up. Variance: ±5% GPU, ±8% CPU.',
            },
            {
              icon: '🔍',
              title: 'Model Compilation Verification',
              desc: 'Compiled models verified against float reference. Max accuracy degradation threshold: 2%. Most INT8 models show <1% drop.',
            },
            {
              icon: '🔄',
              title: 'Cross-Platform Consistency',
              desc: 'Relative ranking of architectures remained stable across platforms, confirming hardware-agnostic design principles.',
            },
          ].map(qa => (
            <div key={qa.title} style={{
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
            }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{qa.icon}</div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>{qa.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{qa.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestCases;
