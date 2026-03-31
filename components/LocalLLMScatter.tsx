import React, { useState, useMemo } from 'react';
import {
  ScatterChart, Scatter,
  XAxis as RXAxis, YAxis as RYAxis, ZAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Label, ReferenceLine, Legend
} from 'recharts';
import { DEVICE_DATA } from './LocalLLMLeaderboard';

type AxisX = 'price' | 'bw' | 'power' | 'ram';
type AxisY = 'tps9B' | 'tps27B' | 'efficiency';

const VENDOR_COLORS: Record<string, string> = {
  NVIDIA: '#76b900',
  AMD: '#ed1c24',
  Apple: '#a0a0a0',
  Intel: '#0071c5',
  Rockchip: '#f59e0b',
  RPi: '#c51a4a',
  AXera: '#8b5cf6',
  Sophgo: '#06b6d4',
};

const AXIS_CONFIG: Record<AxisX | AxisY, { label: string; unit: string; format: (v: number) => string }> = {
  price:      { label: 'Price (USD)', unit: '$',       format: v => `$${v.toLocaleString()}` },
  bw:         { label: 'Memory Bandwidth (GB/s)', unit: 'GB/s', format: v => `${v} GB/s` },
  power:      { label: 'TDP (Watts)', unit: 'W',       format: v => `${v}W` },
  ram:        { label: 'RAM (GB)', unit: 'GB',          format: v => `${v}GB` },
  tps9B:      { label: 'Qwen 3.5-9B TPS', unit: 'tok/s', format: v => `${v.toFixed(1)} TPS` },
  tps27B:     { label: 'Qwen 3.5-27B TPS', unit: 'tok/s', format: v => `${v.toFixed(1)} TPS` },
  efficiency: { label: 'TPS/$ Efficiency (×100)', unit: '', format: v => `${v.toFixed(3)}` },
};

const CustomTooltip2D = ({ active, payload, xKey, yKey }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: 'rgba(10,18,35,0.97)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 12,
      padding: '0.9rem 1.1rem',
      fontSize: '0.78rem',
      lineHeight: 1.7,
      minWidth: 200,
    }}>
      <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 4, fontSize: '0.85rem' }}>{d.name}</div>
      <div style={{ color: '#06b6d4' }}>{AXIS_CONFIG[xKey as AxisX]?.label}: <strong>{AXIS_CONFIG[xKey as AxisX]?.format(d._x)}</strong></div>
      <div style={{ color: '#10b981' }}>{AXIS_CONFIG[yKey as AxisY]?.label}: <strong>{AXIS_CONFIG[yKey as AxisY]?.format(d._y)}</strong></div>
      <div style={{ color: '#94a3b8', marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 4 }}>
        <div>Type: <span style={{ color: '#cbd5e1' }}>{d.type} - {d.vendor}</span></div>
        <div>BW: <span style={{ color: '#f59e0b' }}>{d.bw} GB/s</span> • Power: <span style={{ color: '#f43f5e' }}>{d.power}W</span></div>
        {d.estimated && <div style={{ color: '#f59e0b', fontSize: '0.68rem' }}>* Estimated TPS</div>}
      </div>
    </div>
  );
};

const LocalLLMScatter: React.FC = () => {
  const [xKey, setXKey] = useState<AxisX>('price');
  const [yKey, setYKey] = useState<AxisY>('tps9B');
  const [vendorFilter, setVendorFilter] = useState<string>('All');

  const allVendors = ['All', ...Array.from(new Set(DEVICE_DATA.map(d => d.vendor)))];

  const byVendor = useMemo(() => {
    const vendors = vendorFilter === 'All'
      ? Array.from(new Set(DEVICE_DATA.map(d => d.vendor)))
      : [vendorFilter];

    return vendors.map(vendor => {
      const pts = DEVICE_DATA
        .filter(d => d.vendor === vendor)
        .filter(d => {
          const xVal = xKey === 'efficiency' ? undefined : d[xKey as keyof typeof d];
          const yVal = yKey === 'efficiency'
            ? (d.tps9B ? (d.tps9B / d.price) * 100 : undefined)
            : d[yKey as keyof typeof d];
          return xVal != null && yVal != null && (yVal as number) > 0;
        })
        .map(d => {
          const xVal = d[xKey as keyof typeof d] as number;
          const yVal = yKey === 'efficiency'
            ? (d.tps9B ? (d.tps9B / d.price) * 100 : 0)
            : (d[yKey as keyof typeof d] as number);
          return { ...d, _x: xVal, _y: yVal, z: Math.log2(d.bw + 1) * 8 };
        });
      return { vendor, color: VENDOR_COLORS[vendor] || '#8b5cf6', data: pts };
    }).filter(v => v.data.length > 0);
  }, [xKey, yKey, vendorFilter]);

  const xAxisCfg = AXIS_CONFIG[xKey];
  const yAxisCfg = AXIS_CONFIG[yKey];

  return (
    <section className="section" id="local-llm-scatter" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(6,182,212,0.12)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="9" r="3"/><circle cx="16" cy="15" r="2"/><circle cx="6" cy="17" r="2.5"/></svg>
            2D Scatter Analysis
          </div>
          <h2 className="section-title">Price–Performance & Efficiency Explorer</h2>
          <p className="section-desc">
            Compare any two axes to find the best value device for your budget. Bubble size = memory bandwidth.
            Switch axes to find efficiency winners vs. raw performance leaders.
          </p>
        </div>

        {/* Axis Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 700, margin: '0 auto 1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>X Axis</div>
            <select
              value={xKey}
              onChange={e => setXKey(e.target.value as AxisX)}
              className="selector-select"
              style={{ fontSize: '0.82rem' }}
            >
              <option value="price">Price (USD)</option>
              <option value="bw">Memory Bandwidth (GB/s)</option>
              <option value="power">TDP / Power (W)</option>
              <option value="ram">RAM (GB)</option>
            </select>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Y Axis</div>
            <select
              value={yKey}
              onChange={e => setYKey(e.target.value as AxisY)}
              className="selector-select"
              style={{ fontSize: '0.82rem' }}
            >
              <option value="tps9B">Qwen 3.5-9B TPS</option>
              <option value="tps27B">Qwen 3.5-27B TPS</option>
              <option value="efficiency">TPS/$ Efficiency (×100)</option>
            </select>
          </div>
        </div>

        {/* Vendor Filter chips */}
        <div className="chart-filters" style={{ marginBottom: '1.5rem' }}>
          {allVendors.map(v => (
            <button
              key={v}
              className={`chip ${vendorFilter === v ? 'active' : ''}`}
              onClick={() => setVendorFilter(v)}
              style={vendorFilter === v
                ? { background: `${VENDOR_COLORS[v] || 'rgba(139,92,246'}15`, borderColor: VENDOR_COLORS[v] || '#8b5cf6', color: VENDOR_COLORS[v] || '#8b5cf6' }
                : {}}
            >
              {v !== 'All' && <span style={{ width: 8, height: 8, borderRadius: 2, background: VENDOR_COLORS[v], display: 'inline-block', marginRight: 4 }} />}
              {v}
            </button>
          ))}
        </div>

        {/* Scatter Chart */}
        <div className="chart-container" style={{ padding: '1.5rem' }}>
          <div style={{ height: 460 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 40, bottom: 50, left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <RXAxis
                  type="number" dataKey="_x"
                  tick={{ fill: '#64748b', fontSize: 11 }} stroke="rgba(255,255,255,0.08)"
                  tickFormatter={v => xKey === 'price' ? `$${(v/1000).toFixed(1)}k` : String(v)}
                >
                  <Label value={xAxisCfg.label} offset={-8} position="insideBottom" fill="#64748b" fontSize={11} />
                </RXAxis>
                <RYAxis
                  type="number" dataKey="_y"
                  tick={{ fill: '#64748b', fontSize: 11 }} stroke="rgba(255,255,255,0.08)"
                >
                  <Label value={yAxisCfg.label} angle={-90} position="insideLeft" offset={10} fill="#64748b" fontSize={11} />
                </RYAxis>
                <ZAxis type="number" dataKey="z" range={[40, 400]} />
                <Tooltip content={<CustomTooltip2D xKey={xKey} yKey={yKey} />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.08)' }} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{value}</span>}
                />
                {/* Pareto-style reference lines */}
                {xKey === 'price' && (
                  <>
                    <ReferenceLine x={500} stroke="rgba(245,158,11,0.3)" strokeDasharray="4 4" label={{ value: '$500 budget', fill: 'rgba(245,158,11,0.6)', fontSize: 10, position: 'top' }} />
                    <ReferenceLine x={2000} stroke="rgba(6,182,212,0.3)" strokeDasharray="4 4" label={{ value: '$2k', fill: 'rgba(6,182,212,0.6)', fontSize: 10, position: 'top' }} />
                  </>
                )}
                {byVendor.map(v => (
                  <Scatter
                    key={v.vendor}
                    name={v.vendor}
                    data={v.data}
                    fill={v.color}
                    fillOpacity={0.82}
                    shape="circle"
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            Bubble size proportional to memory bandwidth • Source: Community Benchmarks • CC BY-SA 4.0
          </p>
        </div>

        {/* Budget Recommendations */}
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>💡</span>
            Budget-Based Recommendations (from Community Benchmarks)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              {
                budget: 'Under $500',
                color: '#10b981',
                bg: 'rgba(16,185,129,0.08)',
                border: 'rgba(16,185,129,0.2)',
                picks: ['AMD Ryzen 7 8845HS Mini PC (~$399)', 'Used NVIDIA RTX 3060 12GB (~$350)'],
                note: 'Best value for 9B models. CPU inference with Vulkan backend.',
              },
              {
                budget: '$500 – $1,000',
                color: '#06b6d4',
                bg: 'rgba(6,182,212,0.08)',
                border: 'rgba(6,182,212,0.2)',
                picks: ['AMD Instinct MI50 32GB (used ~$600)', 'NVIDIA RTX 3090 (used ~$700)'],
                note: '32GB VRAM enables 27B models. MI50 offers exceptional bandwidth/$ ratio.',
              },
              {
                budget: '$1,000 – $2,000',
                color: '#8b5cf6',
                bg: 'rgba(139,92,246,0.08)',
                border: 'rgba(139,92,246,0.2)',
                picks: ['Apple Mac Mini M4 Pro 48GB ($1,799)', 'NVIDIA RTX 4080 Super 16GB (~$999)'],
                note: 'Mac Mini M4 Pro crushes on power efficiency. RTX 4080S for CUDA ecosystem.',
              },
              {
                budget: '$2,000 – $4,000+',
                color: '#f59e0b',
                bg: 'rgba(245,158,11,0.08)',
                border: 'rgba(245,158,11,0.2)',
                picks: ['Apple Mac Studio M4 Max 128GB ($3,999)', 'NVIDIA RTX 5090 32GB ($3,999)'],
                note: 'Mac Studio handles 35B MoE fluently. RTX 5090 leads all single-GPU CUDA benches.',
              },
            ].map(rec => (
              <div key={rec.budget} style={{
                padding: '1.25rem',
                background: rec.bg,
                border: `1px solid ${rec.border}`,
                borderRadius: 12,
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: rec.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                  {rec.budget}
                </div>
                {rec.picks.map((p, i) => (
                  <div key={i} style={{ fontSize: '0.82rem', color: '#f1f5f9', fontWeight: 500, marginBottom: 3, display: 'flex', gap: 6 }}>
                    <span style={{ color: rec.color }}>▸</span>{p}
                  </div>
                ))}
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5, margin: '8px 0 0' }}>{rec.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalLLMScatter;
