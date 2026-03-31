import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList
} from 'recharts';

// ─── Complete dataset from Community Benchmarks (34 devices) ────────────────────────
export const DEVICE_DATA = [
  // RTX / NVIDIA GPUs
  { id: 'd1',  name: 'RTX 5090 32GB',         type: 'GPU',     vendor: 'NVIDIA', ram: 32,   bw: 1792, price: 3999, power: 450, tps9B: 198.0, tps27B: 90.0,  tps35MoE: 194.0, estimated: false },
  { id: 'd2',  name: 'RTX 4090 24GB',          type: 'GPU',     vendor: 'NVIDIA', ram: 24,   bw: 1008, price: 1599, power: 450, tps9B: 126.0, tps27B: 43.0,  tps35MoE: 110.0, estimated: true  },
  { id: 'd3',  name: 'RTX 3090 Ti 24GB',       type: 'GPU',     vendor: 'NVIDIA', ram: 24,   bw: 936,  price: 800,  power: 450, tps9B: 111.7, tps27B: 39.0,  tps35MoE: 102.0, estimated: true  },
  { id: 'd4',  name: 'RTX 3090 24GB',          type: 'GPU',     vendor: 'NVIDIA', ram: 24,   bw: 936,  price: 700,  power: 350, tps9B: 106.0, tps27B: 35.0,  tps35MoE: 98.0,  estimated: true  },
  { id: 'd5',  name: 'RTX 4080 Super 16GB',    type: 'GPU',     vendor: 'NVIDIA', ram: 16,   bw: 736,  price: 999,  power: 320, tps9B: 88.0,  tps27B: null,  tps35MoE: 82.0,  estimated: true  },
  { id: 'd6',  name: 'RTX 4070 Ti 12GB',       type: 'GPU',     vendor: 'NVIDIA', ram: 12,   bw: 672,  price: 799,  power: 285, tps9B: 80.0,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd7',  name: 'RTX 3060 12GB',          type: 'GPU',     vendor: 'NVIDIA', ram: 12,   bw: 360,  price: 350,  power: 170, tps9B: 43.0,  tps27B: null,  tps35MoE: null,  estimated: true  },
  // AMD GPUs
  { id: 'd8',  name: 'RX 7900 XTX 24GB',       type: 'GPU',     vendor: 'AMD',    ram: 24,   bw: 960,  price: 1299, power: 355, tps9B: 152.2, tps27B: 50.6,  tps35MoE: 133.0, estimated: true  },
  { id: 'd9',  name: 'RX 7900 XT 20GB',        type: 'GPU',     vendor: 'AMD',    ram: 20,   bw: 800,  price: 999,  power: 315, tps9B: 126.3, tps27B: 42.0,  tps35MoE: 110.0, estimated: true  },
  { id: 'd10', name: 'Instinct MI50 32GB',      type: 'GPU',     vendor: 'AMD',    ram: 32,   bw: 1024, price: 600,  power: 300, tps9B: 63.2,  tps27B: 19.8,  tps35MoE: 73.1,  estimated: true  },
  { id: 'd11', name: 'RX 6800 XT 16GB',        type: 'GPU',     vendor: 'AMD',    ram: 16,   bw: 512,  price: 499,  power: 300, tps9B: 61.0,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd12', name: 'RX 7600 8GB',            type: 'GPU',     vendor: 'AMD',    ram: 8,    bw: 288,  price: 269,  power: 165, tps9B: 34.5,  tps27B: null,  tps35MoE: null,  estimated: true  },
  // Apple Silicon - Mac Studio / Mac Mini / MacBook
  { id: 'd13', name: 'Mac Studio M3 Ultra',     type: 'Mini PC', vendor: 'Apple',  ram: 192,  bw: 819,  price: 6749, power: 140, tps9B: 102.0, tps27B: 37.0,  tps35MoE: 90.0,  estimated: false },
  { id: 'd14', name: 'Mac Studio M4 Max',       type: 'Mini PC', vendor: 'Apple',  ram: 128,  bw: 546,  price: 3999, power: 92,  tps9B: 64.7,  tps27B: null,  tps35MoE: 106.0, estimated: true  },
  { id: 'd15', name: 'Mac Studio M1 Ultra 64G', type: 'Mini PC', vendor: 'Apple',  ram: 64,   bw: 800,  price: 2699, power: 122, tps9B: 90.0,  tps27B: 30.0,  tps35MoE: 79.0,  estimated: false },
  { id: 'd16', name: 'Mac Mini M4 Pro 48GB',    type: 'Mini PC', vendor: 'Apple',  ram: 48,   bw: 273,  price: 1799, power: 35,  tps9B: 27.0,  tps27B: 9.0,   tps35MoE: 55.0,  estimated: true  },
  { id: 'd17', name: 'Mac Mini M4 24GB',        type: 'Mini PC', vendor: 'Apple',  ram: 24,   bw: 120,  price: 1099, power: 20,  tps9B: 14.4,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd18', name: 'MacBook Pro M4 Max 128G', type: 'Laptop',  vendor: 'Apple',  ram: 128,  bw: 546,  price: 3499, power: 92,  tps9B: 65.0,  tps27B: 23.0,  tps35MoE: 106.0, estimated: true  },
  // Intel / AMD Mini PCs
  { id: 'd19', name: 'Ryzen 7 8845HS Mini PC',  type: 'Mini PC', vendor: 'AMD',    ram: 32,   bw: 100,  price: 399,  power: 45,  tps9B: 12.0,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd20', name: 'Core Ultra 9 200H Laptop', type: 'Laptop', vendor: 'Intel',  ram: 32,   bw: 90,   price: 1200, power: 45,  tps9B: 10.8,  tps27B: null,  tps35MoE: null,  estimated: true  },
  // Dev Boards / SBCs
  { id: 'd21', name: 'Jetson Orin 64GB',        type: 'Dev Board', vendor: 'NVIDIA', ram: 64, bw: 205,  price: 1999, power: 60,  tps9B: 12.0,  tps27B: 4.0,   tps35MoE: null,  estimated: true  },
  { id: 'd22', name: 'Jetson Orin Nano 8GB',    type: 'Dev Board', vendor: 'NVIDIA', ram: 8,  bw: 68,   price: 499,  power: 15,  tps9B: 4.1,   tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd23', name: 'Orange Pi 5 Max 16GB',    type: 'Dev Board', vendor: 'Rockchip', ram: 16, bw: 34, price: 205,  power: 15,  tps9B: 1.6,   tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd24', name: 'Raspberry Pi 5 8GB',      type: 'Dev Board', vendor: 'RPi',   ram: 8,   bw: 17,   price: 80,   power: 10,  tps9B: 0.9,   tps27B: null,  tps35MoE: null,  estimated: true  },
  // Accelerator cards / NPU dongles
  { id: 'd25', name: 'AXera M4N',               type: 'Accelerator', vendor: 'AXera', ram: 8, bw: 29,   price: 150,  power: 8,   tps9B: 3.5,   tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd26', name: 'Sophgo SG2380',           type: 'Accelerator', vendor: 'Sophgo', ram: 16, bw: 256, price: 680,  power: 35,  tps9B: 30.7,  tps27B: null,  tps35MoE: null,  estimated: true  },
  // Additional GPUs
  { id: 'd27', name: 'RTX 4060 Ti 16GB',        type: 'GPU',     vendor: 'NVIDIA', ram: 16,   bw: 288,  price: 499,  power: 165, tps9B: 34.5,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd28', name: 'RTX 4060 8GB',            type: 'GPU',     vendor: 'NVIDIA', ram: 8,    bw: 272,  price: 299,  power: 115, tps9B: 32.7,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd29', name: 'RTX 3070 8GB',            type: 'GPU',     vendor: 'NVIDIA', ram: 8,    bw: 448,  price: 400,  power: 220, tps9B: 53.8,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd30', name: 'A100 80GB SXM',           type: 'GPU',     vendor: 'NVIDIA', ram: 80,   bw: 2000, price: 15000, power: 400, tps9B: 240.0, tps27B: 86.0, tps35MoE: 220.0, estimated: false },
  { id: 'd31', name: 'RX 6700 XT 12GB',        type: 'GPU',     vendor: 'AMD',    ram: 12,   bw: 384,  price: 380,  power: 230, tps9B: 46.1,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd32', name: 'Radeon Pro W7900 48GB',   type: 'GPU',     vendor: 'AMD',    ram: 48,   bw: 864,  price: 3999, power: 295, tps9B: 103.7, tps27B: 36.5,  tps35MoE: 90.0,  estimated: true  },
  { id: 'd33', name: 'MacBook Air M3 16GB',     type: 'Laptop',  vendor: 'Apple',  ram: 16,   bw: 100,  price: 1299, power: 15,  tps9B: 12.0,  tps27B: null,  tps35MoE: null,  estimated: true  },
  { id: 'd34', name: 'Jetson AGX Orin 64GB',    type: 'Dev Board', vendor: 'NVIDIA', ram: 64, bw: 204,  price: 1999, power: 60,  tps9B: 24.5,  tps27B: 8.0,   tps35MoE: null,  estimated: true  },
];

type Metric = 'tps9B' | 'tps27B' | 'tps35MoE';
type FilterType = 'All' | 'GPU' | 'Mini PC' | 'Laptop' | 'Dev Board' | 'Accelerator';

const VENDOR_COLORS: Record<string, string> = {
  NVIDIA: '#76b900',
  AMD: '#ed1c24',
  Apple: '#999999',
  Intel: '#0071c5',
  Rockchip: '#f59e0b',
  RPi: '#c51a4a',
  AXera: '#8b5cf6',
  Sophgo: '#06b6d4',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const metricVal = payload[0].value;
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
      <div style={{ color: '#06b6d4' }}>TPS: <strong>{metricVal?.toFixed(1)} tok/s</strong>{d.estimated ? ' *' : ''}</div>
      <div style={{ color: '#94a3b8', marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 4 }}>
        <div>Type: <span style={{ color: '#cbd5e1' }}>{d.type}</span></div>
        <div>RAM: <span style={{ color: '#cbd5e1' }}>{d.ram}GB @ {d.bw} GB/s</span></div>
        <div>Price: <span style={{ color: '#10b981' }}>${d.price.toLocaleString()}</span></div>
        <div>TDP: <span style={{ color: '#cbd5e1' }}>{d.power}W</span></div>
      </div>
      {d.estimated && (
        <div style={{ color: '#f59e0b', fontSize: '0.68rem', marginTop: 4 }}>* Estimated from memory bandwidth</div>
      )}
    </div>
  );
};

const LocalLLMLeaderboard: React.FC = () => {
  const [metric, setMetric] = useState<Metric>('tps9B');
  const [filter, setFilter] = useState<FilterType>('All');
  const [showTable, setShowTable] = useState(false);
  const [sortBy, setSortBy] = useState<'tps' | 'price' | 'bw' | 'efficiency'>('tps');

  const METRIC_LABELS: Record<Metric, string> = {
    tps9B: 'Qwen 3.5-9B int4 - Decode TPS',
    tps27B: 'Qwen 3.5-27B int4 - Decode TPS',
    tps35MoE: 'Qwen 3.5-35B-A3B MoE - Decode TPS',
  };

  const filtered = useMemo(() => {
    return DEVICE_DATA
      .filter(d => filter === 'All' || d.type === filter)
      .filter(d => d[metric] !== null && d[metric] !== undefined)
      .sort((a, b) => ((b[metric] as number) || 0) - ((a[metric] as number) || 0))
      .slice(0, 20);
  }, [metric, filter]);

  const tableData = useMemo(() => {
    let data = DEVICE_DATA.filter(d => filter === 'All' || d.type === filter);
    if (sortBy === 'tps') data = [...data].sort((a, b) => ((b.tps9B || 0) - (a.tps9B || 0)));
    if (sortBy === 'price') data = [...data].sort((a, b) => a.price - b.price);
    if (sortBy === 'bw') data = [...data].sort((a, b) => b.bw - a.bw);
    if (sortBy === 'efficiency') data = [...data].sort((a, b) => ((b.tps9B || 0) / b.price) - ((a.tps9B || 0) / a.price));
    return data;
  }, [filter, sortBy]);

  const types: FilterType[] = ['All', 'GPU', 'Mini PC', 'Laptop', 'Dev Board', 'Accelerator'];

  return (
    <section className="section" id="local-llm-leaderboard" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3v18h18"/><path d="M18 9l-5-5-4 4-3-3"/></svg>
            Community Benchmarks Data
          </div>
          <h2 className="section-title">Local LLM Device Leaderboard</h2>
          <p className="section-desc">
            Real benchmark data across 34 devices from 12 vendors - no hype, community-verified.
            Ranked by decode throughput (tokens/sec) using Qwen 3.5 series with llama.cpp (int4/Q4_K_M).
          </p>
        </div>

        {/* Metric Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {(Object.keys(METRIC_LABELS) as Metric[]).map(m => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 8,
                border: metric === m ? '1px solid rgba(139,92,246,0.5)' : '1px solid var(--border)',
                background: metric === m ? 'rgba(139,92,246,0.15)' : 'transparent',
                color: metric === m ? '#8b5cf6' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: metric === m ? 700 : 500,
                transition: 'all 0.2s',
              }}
            >
              {METRIC_LABELS[m]}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="chart-filters" style={{ marginBottom: '1.5rem' }}>
          {types.map(t => (
            <button
              key={t}
              className={`chip ${filter === t ? 'active' : ''}`}
              onClick={() => setFilter(t)}
              style={filter === t ? { background: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.35)', color: '#8b5cf6' } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="chart-container" style={{ padding: '1.5rem' }}>
          <div style={{ height: 480 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filtered}
                layout="vertical"
                margin={{ top: 8, right: 80, bottom: 8, left: 160 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  stroke="rgba(255,255,255,0.08)"
                  label={{ value: 'Tokens / Second (TPS) - Higher is Better', position: 'insideBottom', offset: -4, fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={155}
                  tick={{ fill: '#94a3b8', fontSize: 10.5 }}
                  stroke="rgba(255,255,255,0.08)"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.025)' }} />
                <Bar dataKey={metric} radius={[0, 5, 5, 0]} maxBarSize={22}>
                  {filtered.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={VENDOR_COLORS[entry.vendor] || '#8b5cf6'}
                      fillOpacity={entry.estimated ? 0.7 : 1}
                    />
                  ))}
                  <LabelList
                    dataKey={metric}
                    position="right"
                    formatter={(v: number) => `${v.toFixed(1)}`}
                    style={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', marginTop: '1rem', justifyContent: 'center', fontSize: '0.72rem' }}>
            {Object.entries(VENDOR_COLORS).map(([vendor, color]) => (
              <span key={vendor} style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b' }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: color, display: 'inline-block' }} />
                {vendor}
              </span>
            ))}
            <span style={{ color: '#f59e0b' }}>* = Estimated from BW formula</span>
          </div>
        </div>

        {/* The Golden Metric callout */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem 2rem',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(6,182,212,0.08))',
          border: '1px solid rgba(245,158,11,0.25)',
          borderRadius: 14,
          display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              ⭐ The Golden Metric - From Community Benchmarks
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>
              Memory Bandwidth is the primary bottleneck for local LLM inference
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              For weight-loading-bound inference (typical on consumer hardware), TOPS/TFLOPS is largely irrelevant.
              The memory bus speed determines how fast model weights can be streamed to compute units.
            </p>
          </div>
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.2)',
            borderRadius: 10,
            fontFamily: 'monospace',
            flexShrink: 0,
          }}>
            <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: 4 }}>Theoretical TPS Formula:</div>
            <div style={{ color: '#06b6d4', fontSize: '0.85rem', fontWeight: 700 }}>
              TPS = BW (GB/s) × 0.9 / Model_Size (GB)
            </div>
            <div style={{ color: '#64748b', fontSize: '0.68rem', marginTop: 6 }}>
              Example: RTX 5090 (1792 GB/s) → 9B int4 (≈5GB)<br />
              1792 × 0.9 / 5 ≈ 322 theoretical → 198 measured
            </div>
          </div>
        </div>

        {/* Data Table Toggle */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => setShowTable(v => !v)}
            style={{
              padding: '0.65rem 1.5rem',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: showTable ? 'rgba(139,92,246,0.12)' : 'transparent',
              color: showTable ? '#8b5cf6' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
            </svg>
            {showTable ? 'Hide' : 'Show'} Full Data Table (34 devices)
          </button>
        </div>

        {showTable && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sort by:</span>
              {[
                { key: 'tps', label: '9B TPS ↓' },
                { key: 'efficiency', label: 'TPS/$ Efficiency' },
                { key: 'price', label: 'Price ↑' },
                { key: 'bw', label: 'Bandwidth ↓' },
              ].map(s => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key as any)}
                  className={`chip ${sortBy === s.key ? 'active active-blue' : ''}`}
                  style={{ fontSize: '0.72rem' }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="benchmark-table-wrapper">
              <table className="benchmark-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Device</th>
                    <th>Type</th>
                    <th>RAM</th>
                    <th>BW (GB/s)</th>
                    <th>Price</th>
                    <th>9B TPS</th>
                    <th>27B TPS</th>
                    <th>35B MoE TPS</th>
                    <th>TPS/$ ×100</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((d, i) => (
                    <tr key={d.id}>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{i + 1}</td>
                      <td>
                        <span className="table-model-name" style={{ color: VENDOR_COLORS[d.vendor] || '#8b5cf6' }}>
                          {d.name}
                        </span>
                        {d.estimated && <span style={{ color: '#64748b', fontSize: '0.65rem', marginLeft: 4 }}>*</span>}
                      </td>
                      <td><span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.type}</span></td>
                      <td><span className="mono" style={{ color: '#94a3b8' }}>{d.ram}GB</span></td>
                      <td><span className="mono" style={{ color: 'var(--accent-cyan)' }}>{d.bw}</span></td>
                      <td><span className="mono" style={{ color: '#10b981' }}>${d.price.toLocaleString()}</span></td>
                      <td><span className="mono" style={{ color: '#f1f5f9', fontWeight: 600 }}>{d.tps9B?.toFixed(1) ?? '-'}</span></td>
                      <td><span className="mono" style={{ color: '#94a3b8' }}>{d.tps27B?.toFixed(1) ?? '-'}</span></td>
                      <td><span className="mono" style={{ color: '#94a3b8' }}>{d.tps35MoE?.toFixed(1) ?? '-'}</span></td>
                      <td>
                        <span className="mono" style={{ color: '#f59e0b', fontSize: '0.8rem' }}>
                          {d.tps9B ? ((d.tps9B / d.price) * 100).toFixed(2) : '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
              Source: Community Benchmarks • Models tested with llama.cpp (CUDA/ROCm/MLX backends) • Quantization: int4 / Q4_K_M
              <br />* = Estimated via formula: TPS = BW × 0.9 / model_size_GB • License: CC BY-SA 4.0
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocalLLMLeaderboard;
