import React, { useState } from 'react';

// Interactive decision tree based on Figure 4.2 of the report
const FlowchartSection: React.FC = () => {
  const [activePath, setActivePath] = useState<string[]>([]);
  const [result, setResult] = useState<{ model: string; note: string } | null>(null);

  const reset = () => { setActivePath([]); setResult(null); };

  const choose = (path: string, model?: string, note?: string) => {
    setActivePath(prev => [...prev, path]);
    if (model) setResult({ model, note: note || '' });
  };

  const isActive = (step: string) => activePath.includes(step);
  const currentStep = activePath.length;

  return (
    <section className="section" id="flowcharts" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM7 14a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4z"/></svg>
            Interactive Flowcharts
          </div>
          <h2 className="section-title">Encoder Selection Decision Tree</h2>
          <p className="section-desc">
            Based on Figure 4.2 from the project report. Click through the decision tree 
            to find the optimal vision encoder backbone for your edge deployment scenario.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: 800, margin: '0 auto' }}>
          {/* Interactive Decision Tree */}
          <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>🌲 Interactive Decision Tree</h3>
              <button onClick={reset} style={{
                padding: '0.4rem 1rem', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer',
                fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit',
              }}>
                Reset
              </button>
            </div>

            {/* Root */}
            <div className="decision-tree">
              <div className="dt-node flow-node-primary" style={{ marginBottom: 0, cursor: 'default' }}>
                🚀 Edge VLLM Deployment
              </div>
              <div className="dt-connector" />

              {/* Q1 */}
              <div className="dt-node dt-question">
                Latency Budget ≤ 5 ms?
              </div>
              {currentStep === 0 && !result && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button onClick={() => choose('q1-yes', 'MobileNet / MobileViT @ 224px', 'Ultra-low latency; only hybrid/mobile models feasible. EfficientFormer-L1 achieves 1.6ms.')}
                    className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.82rem' }}>
                    ✓ Yes (≤5ms)
                  </button>
                  <button onClick={() => choose('q1-no')}
                    className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.82rem' }}>
                    ✗ No (&gt;5ms)
                  </button>
                </div>
              )}
              {isActive('q1-yes') && (
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="dt-branch-label dt-yes">Yes ≤ 5ms</span>
                </div>
              )}
              {isActive('q1-no') && (
                <>
                  <div style={{ marginTop: '0.5rem' }}>
                    <span className="dt-branch-label dt-no">No &gt; 5ms</span>
                  </div>
                  <div className="dt-connector" />

                  {/* Q2 */}
                  <div className="dt-node dt-question">
                    Budget &lt; 50ms & Need High Accuracy?
                  </div>
                  {currentStep === 1 && !result && (
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <button onClick={() => choose('q2-yes', 'EfficientNet-B3 or FastViT-HD', 'Pareto-optimal: B3 at 14.2ms/81.6% or FastViT at 18.5ms/82.2%. Best accuracy-per-watt trade-off.')}
                        className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.82rem' }}>
                        ✓ Yes
                      </button>
                      <button onClick={() => choose('q2-no')}
                        className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.82rem' }}>
                        ✗ No
                      </button>
                    </div>
                  )}
                  {isActive('q2-yes') && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <span className="dt-branch-label dt-yes">Yes</span>
                    </div>
                  )}
                  {isActive('q2-no') && (
                    <>
                      <div style={{ marginTop: '0.5rem' }}>
                        <span className="dt-branch-label dt-no">No</span>
                      </div>
                      <div className="dt-connector" />

                      {/* Q3 */}
                      <div className="dt-node dt-question">
                        Strong GPU Available (Jetson Orin)?
                      </div>
                      {currentStep === 2 && !result && (
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                          <button onClick={() => choose('q3-yes', 'EfficientNet-B4+', 'Batch regime: 48.5ms for 82.9% accuracy. Monitor cache cliff beyond B3 (3.4× latency jump).')}
                            className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.82rem' }}>
                            ✓ Strong GPU
                          </button>
                          <button onClick={() => choose('q3-no', 'Relax Accuracy Target → MobileNetV3', 'Without strong GPU, relax to 75-78% accuracy. MobileNetV3-Large at 42-56ms on Pi 4.')}
                            className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.82rem' }}>
                            ✗ Weak / No GPU
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {/* Result */}
              {result && (
                <div style={{ marginTop: '1.5rem', width: '100%' }}>
                  <div className="dt-connector" />
                  <div className="result-card" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      ✅ Recommended Encoder
                    </div>
                    <div className="result-model-name" style={{ fontSize: '1.5rem' }}>
                      {result.model}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginTop: '0.75rem' }}>
                      {result.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Encoder Selection Matrix - Table III */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Table III: Encoder Selection Matrix by Latency Budget
            </h3>
            <div className="benchmark-table-wrapper">
              <table className="benchmark-table">
                <thead>
                  <tr>
                    <th>Regime</th>
                    <th>Target Platform</th>
                    <th>Recommended Encoder</th>
                    <th>Accuracy</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="table-badge badge-real-time">Real-Time &lt;15ms</span></td>
                    <td>IoT / Raspberry Pi</td>
                    <td className="table-model-name">MobileViT-XS, EfficientFormer-L1</td>
                    <td><span className="mono" style={{ color: 'var(--accent-emerald)' }}>78–79%</span></td>
                    <td style={{ whiteSpace: 'normal' }}>Hard real-time; only hybrid models feasible</td>
                  </tr>
                  <tr>
                    <td><span className="table-badge badge-interactive">Interactive &lt;50ms</span></td>
                    <td>Coral TPU, Jetson Nano</td>
                    <td className="table-model-name">EfficientNet-B0–B3, FastViT</td>
                    <td><span className="mono" style={{ color: 'var(--accent-emerald)' }}>79–82%</span></td>
                    <td style={{ whiteSpace: 'normal' }}>Sweet spot for balanced performance</td>
                  </tr>
                  <tr>
                    <td><span className="table-badge badge-batch">Batch &lt;200ms</span></td>
                    <td>Jetson Orin, Edge GPU</td>
                    <td className="table-model-name">EfficientNet-B4+</td>
                    <td><span className="mono" style={{ color: 'var(--accent-emerald)' }}>82–83%</span></td>
                    <td style={{ whiteSpace: 'normal' }}>Monitor cache cliff beyond B3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Static Architecture Overview Flowchart */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
              📊 Vision Encoder Architecture Taxonomy
            </h3>
            <div className="decision-tree">
              <div className="flow-node flow-node-accent" style={{ marginBottom: 0 }}>
                Vision Encoder Architectures
              </div>
              <div className="dt-connector" />
              <div className="dt-branch" style={{ gap: '1.5rem' }}>
                {/* CNN Branch */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div className="flow-node flow-node-secondary" style={{ minWidth: 180, fontSize: '0.82rem' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 700 }}>CNN</span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>O(R²) scaling</div>
                  </div>
                  <div className="dt-connector" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(203,213,225,0.08)', border: '1px solid rgba(203,213,225,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      EfficientNet B0–B7
                    </div>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(203,213,225,0.08)', border: '1px solid rgba(203,213,225,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      MobileNetV3
                    </div>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(203,213,225,0.08)', border: '1px solid rgba(203,213,225,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      ResNet Family
                    </div>
                  </div>
                </div>
                {/* Hybrid Branch */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div className="flow-node flow-node-secondary" style={{ minWidth: 180, fontSize: '0.82rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>Hybrid</span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>CNN stem + Transformer</div>
                  </div>
                  <div className="dt-connector" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      MobileViT
                    </div>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      EfficientFormer
                    </div>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      FastViT
                    </div>
                  </div>
                </div>
                {/* ViT Branch */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div className="flow-node flow-node-secondary" style={{ minWidth: 180, fontSize: '0.82rem' }}>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>Pure ViT</span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>O(R⁴) scaling</div>
                  </div>
                  <div className="dt-connector" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      ViT-Base/16
                    </div>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      DeiT
                    </div>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, fontSize: '0.75rem', textAlign: 'center' }}>
                      Swin Transformer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowchartSection;
