import React, { useState } from 'react';

const LocalLLMGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'golden' | 'models' | 'frameworks' | 'tops'>('golden');

  const sections = {
    golden: {
      title: 'The Golden Metric',
      icon: '⭐',
      color: '#f59e0b',
    },
    models: {
      title: 'Model Selection',
      icon: '🧠',
      color: '#8b5cf6',
    },
    frameworks: {
      title: 'Frameworks & Backends',
      icon: '⚙️',
      color: '#06b6d4',
    },
    tops: {
      title: 'TOPS Warning',
      icon: '⚠️',
      color: '#f43f5e',
    },
  } as const;

  return (
    <section className="section" id="local-llm-guide" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Local LLM Deployment Guide
          </div>
          <h2 className="section-title">Key Insights from Community Benchmarks</h2>
          <p className="section-desc">
            Community-verified guidance for deploying LLMs locally. Real data, no marketing hype.
            Based on benchmarks across 34 devices, 12 vendors, Qwen 3.5 series with llama.cpp.
          </p>
        </div>

        {/* Tab Nav */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {(Object.keys(sections) as Array<keyof typeof sections>).map(k => (
            <button
              key={k}
              onClick={() => setActiveSection(k)}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: 8,
                border: activeSection === k ? `1px solid ${sections[k].color}60` : '1px solid var(--border)',
                background: activeSection === k ? `${sections[k].color}18` : 'transparent',
                color: activeSection === k ? sections[k].color : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: activeSection === k ? 700 : 500,
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span>{sections[k].icon}</span>
              {sections[k].title}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeSection === 'golden' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f59e0b', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                ⭐ Memory Bandwidth is King
              </h3>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                For typical local inference (weight-loading bound), the memory bus speed is what matters most.
                During autoregressive decoding, model weights are re-read from memory every single token.
              </p>
              <div style={{ marginTop: 12, padding: '0.9rem', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <div style={{ color: '#64748b', marginBottom: 4 }}>TPS Formula:</div>
                <div style={{ color: '#f59e0b', fontWeight: 700 }}>TPS = BW (GB/s) × 0.9 / Weight_Size (GB)</div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { device: 'RTX 5090', bw: 1792, model: '9B int4', size: 5, result: 198 },
                  { device: 'MI50 32GB', bw: 1024, model: '9B int4', size: 5, result: 63 },
                  { device: 'Mac Mini M4 Pro', bw: 273, model: '9B int4', size: 5, result: 27 },
                ].map(ex => (
                  <div key={ex.device} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{ex.device}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#f59e0b' }}>{ex.bw} GB/s → <span style={{ color: '#f1f5f9' }}>{ex.result} TPS</span></span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981', marginBottom: 10 }}>
                📊 Bandwidth Tiers
              </h3>
              {[
                { tier: 'Elite', range: '800+ GB/s', color: '#f59e0b', devices: 'RTX 5090, RX 7900 XTX, RTX 4090', perf: '100–200 TPS on 9B' },
                { tier: 'High', range: '400–800 GB/s', color: '#10b981', devices: 'RTX 3090 Ti, RX 7900 XT, MI50', perf: '50–130 TPS on 9B' },
                { tier: 'Mid', range: '100–400 GB/s', color: '#06b6d4', devices: 'Mac Mini M4 Pro, RTX 3060', perf: '12–50 TPS on 9B' },
                { tier: 'Low', range: '< 100 GB/s', color: '#8b5cf6', devices: 'Pi 5, Orange Pi, Mini PC CPUs', perf: '< 12 TPS on 9B' },
              ].map(t => (
                <div key={t.tier} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 52, textAlign: 'center', padding: '2px 0', background: `${t.color}18`, border: `1px solid ${t.color}40`, borderRadius: 6, fontSize: '0.68rem', fontWeight: 700, color: t.color, flexShrink: 0 }}>{t.tier}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>{t.range}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{t.devices}</div>
                    <div style={{ fontSize: '0.72rem', color: t.color, marginTop: 2 }}>{t.perf}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#06b6d4', marginBottom: 10 }}>
                💰 Value Champions
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                Ranked by TPS per dollar (×100):
              </p>
              {[
                { device: 'AMD MI50 32GB', tps: 63.2, price: 600, ratio: 10.53, note: 'Used market gem' },
                { device: 'RTX 3090 Ti', tps: 111.7, price: 800, ratio: 13.96, note: 'Best used NVIDIA' },
                { device: 'RX 7900 XTX', tps: 152.2, price: 1299, ratio: 11.72, note: 'AMD ROCm leader' },
                { device: 'RTX 3060 12GB', tps: 43.0, price: 350, ratio: 12.29, note: 'Entry-level CUDA' },
                { device: 'Ryzen 8845HS PC', tps: 12.0, price: 399, ratio: 3.01, note: 'CPU-only budget' },
              ].sort((a, b) => b.ratio - a.ratio).map((v, i) => (
                <div key={v.device} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>
                      {i === 0 && <span style={{ color: '#f59e0b' }}>★ </span>}{v.device}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{v.note}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#10b981', fontWeight: 700 }}>{v.ratio.toFixed(2)}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>TPS/$ ×100</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'models' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                model: 'Qwen 3.5-9B',
                size: '~5 GB (int4)',
                color: '#10b981',
                border: 'rgba(16,185,129,0.25)',
                bg: 'rgba(16,185,129,0.06)',
                useCase: '⚡ Fast Interactive Chat',
                recommended: true,
                points: [
                  'Best quality-to-speed ratio for consumer hardware',
                  'Fits in 8GB+ VRAM (int4 quantization)',
                  'Runs at 43+ TPS on RTX 3060 - feels real-time',
                  'Preferred over Llama 3.1 8B for quality',
                ],
                minRAM: '8GB VRAM'
              },
              {
                model: 'Qwen 3.5-27B',
                size: '~15 GB (int4)',
                color: '#8b5cf6',
                border: 'rgba(139,92,246,0.25)',
                bg: 'rgba(139,92,246,0.06)',
                useCase: '🎓 Reasoning & Coding',
                recommended: false,
                points: [
                  'Excellent for complex reasoning tasks',
                  'Requires 24GB+ VRAM or unified memory',
                  'Apple M-series chips shine here (high BW + large RAM)',
                  'Achieves 50 TPS on RX 7900 XTX - surprisingly fast',
                ],
                minRAM: '24GB VRAM'
              },
              {
                model: 'Qwen 3.5-35B-A3B (MoE)',
                size: '~20 GB (int4)',
                color: '#06b6d4',
                border: 'rgba(6,182,212,0.25)',
                bg: 'rgba(6,182,212,0.06)',
                useCase: '🚀 Best Quality, Low Active Params',
                recommended: false,
                points: [
                  'Mixture of Experts: only 3B active params per token',
                  'Quality closer to 35B, compute closer to 9B',
                  'Mac Studio M4 Max achieves 106 TPS - exceptional',
                  'Only 20GB weight storage needed despite 35B total',
                ],
                minRAM: '24GB VRAM / 32GB unified'
              },
            ].map(m => (
              <div key={m.model} style={{
                padding: '1.5rem',
                background: m.bg,
                border: `1px solid ${m.border}`,
                borderRadius: 14,
                position: 'relative',
              }}>
                {m.recommended && (
                  <div style={{
                    position: 'absolute', top: -10, right: 12,
                    background: m.color, color: '#000',
                    fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>Recommended</div>
                )}
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: m.color, marginBottom: 4 }}>{m.model}</h3>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'monospace' }}>{m.size}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9', marginBottom: 10 }}>{m.useCase}</div>
                <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {m.points.map((p, i) => (
                    <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: 8, lineHeight: 1.5 }}>
                      <span style={{ color: m.color, flexShrink: 0, marginTop: 2 }}>→</span>{p}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 12, padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: 6, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Min RAM: <span style={{ color: m.color, fontWeight: 600 }}>{m.minRAM}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'frameworks' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {[
              {
                name: 'llama.cpp',
                icon: '🦙',
                color: '#f59e0b',
                backends: ['CUDA (NVIDIA)', 'ROCm (AMD)', 'MLX (Apple Silicon)', 'Vulkan (cross-GPU)', 'Metal (macOS)'],
                pros: 'Universal. Fastest GGUF inference. Most actively developed.',
                cons: 'Limited batching vs. vLLM for server workloads.',
                quantFormats: ['GGUF Q4_K_M', 'Q8_0', 'Q5_K_M', 'IQ4_NL'],
                best: 'Local single-user inference on any hardware',
              },
              {
                name: 'vLLM',
                icon: '🚀',
                color: '#10b981',
                backends: ['CUDA (NVIDIA)', 'ROCm (AMD)'],
                pros: 'PagedAttention for high-throughput multi-user. Production-grade.',
                cons: 'Best on NVIDIA CUDA. Heavier footprint than llama.cpp.',
                quantFormats: ['AWQ', 'GPTQ', 'FP8', 'bitsandbytes'],
                best: 'Server/API deployments, multi-user workloads',
              },
              {
                name: 'MLX (Apple)',
                icon: '🍎',
                color: '#a0a0a0',
                backends: ['Apple Metal (M-series)'],
                pros: 'Optimized for Apple unified memory. Excellent on Mac Studio/MacBook.',
                cons: 'Apple Silicon only.',
                quantFormats: ['4-bit MLX', '8-bit MLX', 'BF16'],
                best: 'Apple M-series devices → highest efficiency',
              },
              {
                name: 'Ollama',
                icon: '🤖',
                color: '#06b6d4',
                backends: ['llama.cpp backend', 'CUDA', 'Metal', 'ROCm'],
                pros: 'Easiest setup. Docker-friendy. Model hub built-in.',
                cons: 'Less control than raw llama.cpp. Slight overhead.',
                quantFormats: ['Q4_K_M', 'Q8_0 via modelfiles'],
                best: 'Beginners, quick local deployment',
              },
            ].map(fw => (
              <div key={fw.name} style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: '1.5rem' }}>{fw.icon}</span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: fw.color, margin: 0 }}>{fw.name}</h3>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Backends</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {fw.backends.map(b => (
                      <span key={b} style={{ fontSize: '0.68rem', padding: '2px 7px', borderRadius: 5, background: `${fw.color}15`, border: `1px solid ${fw.color}30`, color: fw.color }}>{b}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#10b981', marginBottom: 4 }}>✓ {fw.pros}</div>
                <div style={{ fontSize: '0.78rem', color: '#f43f5e', marginBottom: 8 }}>✗ {fw.cons}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                  <strong>Best for:</strong> {fw.best}
                </div>
                <div style={{ marginTop: 8, fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  Formats: {fw.quantFormats.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'tops' && (
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(244,63,94,0.08), rgba(245,158,11,0.06))',
              border: '1px solid rgba(244,63,94,0.25)',
              borderRadius: 16,
              marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>⚠️</span>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f43f5e', marginBottom: 8 }}>
                    TOPS / TFLOPS is Often Misleading for Local LLM Inference
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Marketing materials often highlight TOPS (Tera Operations Per Second) as the key AI performance metric.
                    For local LLM inference, this is <strong style={{ color: '#f43f5e' }}>usually wrong</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1.25rem', background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 12 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f43f5e', marginBottom: 8, textTransform: 'uppercase' }}>❌ When TOPS Doesn't Matter</div>
                <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    'Autoregressive decoding (sequential token generation)',
                    'Single-user local inference on consumer hardware',
                    'Weight-loading-bound workloads (most LLM inference)',
                    'INT4/INT8 quantized models on GPU VRAM',
                  ].map(p => (
                    <li key={p} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', gap: 7 }}>
                      <span style={{ color: '#f43f5e', flexShrink: 0 }}>✗</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '1.25rem', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', marginBottom: 8, textTransform: 'uppercase' }}>✅ When TOPS DOES Matter</div>
                <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    'Prefill / prompt processing phase (compute-bound)',
                    'Large batch server inference (vLLM, continuous batching)',
                    'Training / fine-tuning workloads',
                    'Speculative decoding with large draft models',
                  ].map(p => (
                    <li key={p} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', gap: 7 }}>
                      <span style={{ color: '#10b981', flexShrink: 0 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 10 }}>Real Example: The Jetson Orin NPU Trap</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: 12 }}>
                <div style={{ padding: '1rem', background: 'rgba(244,63,94,0.06)', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>Marketing Claim</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f43f5e' }}>275 TOPS</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Jetson AGX Orin</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(16,185,129,0.06)', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>Actual LLM Result</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#10b981' }}>24.5 TPS</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>9B int4 - BW-limited (204 GB/s)</div>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                The Jetson AGX Orin's 275 TOPS comes from INT8 DLA (Deep Learning Accelerator) operations optimized for CV workloads.
                LLM decode is memory-bandwidth-bound. 204 GB/s memory bus → ~24 TPS on 9B model.
                Compare to RTX 3060 (360 GB/s) achieving 43 TPS at a lower price point.
              </p>
            </div>
          </div>
        )}

        {/* Source attribution */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1rem 1.5rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem 2rem', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.72rem', color: 'var(--text-muted)',
        }}>
          <span>📊 Source: <a href="https://Community Benchmarks" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>Community Benchmarks</a></span>
          <span>•</span>
          <span>GitHub: <a href="https://github.com/sipeed/Community Benchmarks" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>sipeed/Community Benchmarks</a></span>
          <span>•</span>
          <span>Models: Qwen 3.5 Series</span>
          <span>•</span>
          <span>Framework: llama.cpp (CUDA/ROCm/MLX/Vulkan)</span>
          <span>•</span>
          <span>License: CC BY-SA 4.0</span>
          <span>•</span>
          <span>34 devices, 12 vendors</span>
        </div>
      </div>
    </section>
  );
};

export default LocalLLMGuide;
