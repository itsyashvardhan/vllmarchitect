import React from 'react';

const PipelineDiagram: React.FC = () => {
  const stages = [
    {
      icon: '📸',
      title: 'Input Processing',
      subtitle: 'Resize & Normalize',
      desc: 'Images resized to 224px/384px and normalized. Resolution choice critically determines encoder latency.',
      bg: 'rgba(203,213,225,0.1)',
      border: 'rgba(203,213,225,0.2)',
      iconBg: 'rgba(203,213,225,0.15)',
      tag: 'L_preprocess ≈ trivial',
    },
    {
      icon: '🧠',
      title: 'Vision Encoder',
      subtitle: 'L_enc (Primary Bottleneck)',
      desc: 'The sensory bottleneck. Extracts feature embeddings via CNN, ViT, or hybrid backbone. Dominates TTFT on edge.',
      bg: 'rgba(31,193,102,0.08)',
      border: 'rgba(31,193,102,0.25)',
      iconBg: 'rgba(31,193,102,0.15)',
      tag: 'L_enc: 1.6–210 ms',
      highlight: true,
    },
    {
      icon: '🔗',
      title: 'Projector Layer',
      subtitle: 'L_proj (MLP / Q-Former)',
      desc: 'Aligns encoder embeddings with LLM space. Linear/MLP forwards all 576-1024 tokens; Q-Former compresses by 16×.',
      bg: 'rgba(139,92,246,0.08)',
      border: 'rgba(139,92,246,0.2)',
      iconBg: 'rgba(139,92,246,0.15)',
      tag: 'L_proj: 15–80 ms',
    },
    {
      icon: '💬',
      title: 'LLM Decoder',
      subtitle: 'Prefill + Generation',
      desc: 'Autoregressive text generation. Prefill latency depends on visual token count T from projector stage.',
      bg: 'rgba(6,182,212,0.08)',
      border: 'rgba(6,182,212,0.2)',
      iconBg: 'rgba(6,182,212,0.15)',
      tag: 'L_prefill(T)',
    },
  ];

  return (
    <section className="section" id="pipeline">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(203,213,225,0.12)', color: '#cbd5e1', border: '1px solid rgba(203,213,225,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            System Architecture
          </div>
          <h2 className="section-title">Edge VLLM Inference Pipeline</h2>
          <p className="section-desc">
            In visual LLMs, Time-to-First-Token (TTFT) determines responsiveness. 
            The vision encoder is the <strong>sensory bottleneck</strong>-optimizing it is the focus of this research.
          </p>
        </div>

        <div className="pipeline-container">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.title}>
              <div
                className="pipeline-stage"
                style={{
                  background: stage.bg,
                  border: stage.highlight ? `2px solid ${stage.border}` : `1px solid ${stage.border}`,
                  boxShadow: stage.highlight ? '0 0 40px rgba(31,193,102,0.15)' : 'none',
                }}
              >
                <div
                  className="pipeline-stage-icon"
                  style={{ background: stage.iconBg }}
                >
                  {stage.icon}
                </div>
                <h4>{stage.title}</h4>
                <p style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {stage.subtitle}
                </p>
                <p>{stage.desc}</p>
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.4rem 0.75rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  fontSize: '0.72rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'var(--accent-cyan)',
                  border: '1px solid var(--border)',
                  display: 'inline-block',
                }}>
                  {stage.tag}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="pipeline-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="pipeline-formula">
          <code>TTFT = L<sub>enc</sub> + L<sub>proj</sub> + L<sub>prefill</sub>(T)</code>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Where L<sub>enc</sub> is encoder latency (primary bottleneck), L<sub>proj</sub> is projector latency, and T is the visual token count
          </p>
        </div>
      </div>
    </section>
  );
};

export default PipelineDiagram;
