import React, { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';

// Accurate data from Table II of the project report
const dataCNN = [
  { name: 'EfficientNet-B0', x: 30, y: 77.1, device: 'RPi 5', precision: 'TFLite INT8' },
  { name: 'EfficientNet-B3', x: 14.2, y: 81.6, device: 'Jetson Orin', precision: 'TensorRT FP16' },
  { name: 'EfficientNet-B4', x: 48.5, y: 82.9, device: 'Jetson Orin', precision: 'TensorRT FP16' },
  { name: 'MobileNetV3', x: 49, y: 75.2, device: 'Legacy Pi 4', precision: 'TFLite INT8' },
];

const dataHybrid = [
  { name: 'MobileViT-XS', x: 7.2, y: 78.9, device: 'iPhone 15 Pro', precision: 'CoreML NPU' },
  { name: 'EfficientFormer-L1', x: 1.6, y: 79.2, device: 'Jetson Orin', precision: 'TensorRT FP16' },
  { name: 'FastViT-HD', x: 18.5, y: 82.2, device: 'Jetson Orin', precision: 'TensorRT FP16' },
];

const dataViT = [
  { name: 'ViT-Base/16', x: 98.0, y: 81.0, device: 'Jetson Orin', precision: 'TensorRT FP16' },
];

const dataFullPipeline = [
  { name: 'MobileVLM-1.7B', x: 183, y: 72.5, device: 'RPi 5 + Coral', precision: 'TFLite+NNAPI' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div style={{
        background: 'rgba(15,22,41,0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '0.85rem 1rem',
        fontSize: '0.8rem',
        lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: '0.25rem' }}>{d.name}</div>
        <div style={{ color: '#06b6d4' }}>Latency: <strong>{d.x} ms</strong></div>
        <div style={{ color: '#10b981' }}>Accuracy: <strong>{d.y}%</strong></div>
        <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginTop: '0.25rem' }}>
          {d.device} • {d.precision}
        </div>
      </div>
    );
  }
  return null;
};

const LatencyChart: React.FC = () => {
  const [filters, setFilters] = useState({ cnn: true, hybrid: true, vit: true, pipeline: true });

  const toggle = (key: keyof typeof filters) => setFilters(p => ({ ...p, [key]: !p[key] }));

  return (
    <section className="section" id="benchmarks" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'rgba(6,182,212,0.12)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Experimental Results
          </div>
          <h2 className="section-title">Latency–Accuracy Pareto Frontier</h2>
          <p className="section-desc">
            Measured TTFT vs. ImageNet Top-1 accuracy across edge platforms. 
            EfficientNet-B3 and FastViT-HD form the optimal trade-off frontier.
          </p>
        </div>

        <div className="chart-container">
          <div className="chart-filters">
            <button className={`chip ${filters.cnn ? 'active active-blue' : ''}`} onClick={() => toggle('cnn')}>
              ● CNN (EfficientNet/MobileNet)
            </button>
            <button className={`chip ${filters.hybrid ? 'active active-green' : ''}`} onClick={() => toggle('hybrid')}>
              ▲ Hybrid (MobileViT/FastViT)
            </button>
            <button className={`chip ${filters.vit ? 'active active-amber' : ''}`} onClick={() => toggle('vit')}>
              ★ Pure ViT
            </button>
            <button className={`chip ${filters.pipeline ? 'active' : ''}`} onClick={() => toggle('pipeline')}
              style={filters.pipeline ? { background: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.3)', color: '#8b5cf6' } : {}}
            >
              ◆ Full Pipeline
            </button>
          </div>
          <div style={{ height: 420, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  type="number" dataKey="x" name="Latency" unit=" ms"
                  label={{ value: 'Encoder Latency (ms) → Lower is Better', position: 'bottom', offset: 15, fill: '#64748b', fontSize: 12 }}
                  stroke="rgba(255,255,255,0.1)" tick={{ fill: '#64748b', fontSize: 11 }}
                  domain={[0, 'auto']}
                />
                <YAxis
                  type="number" dataKey="y" name="Accuracy" unit="%"
                  domain={[70, 85]}
                  label={{ value: 'ImageNet Top-1 (%)', angle: -90, position: 'insideLeft', offset: 5, fill: '#64748b', fontSize: 12 }}
                  stroke="rgba(255,255,255,0.1)" tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }} />
                <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '0.75rem', color: '#94a3b8' }} />

                {/* Performance regime boundaries */}
                <ReferenceLine x={15} stroke="rgba(16,185,129,0.3)" strokeDasharray="4 4"
                  label={{ value: 'Real-time (<15ms)', fill: 'rgba(16,185,129,0.6)', fontSize: 10, position: 'insideTop' }} />
                <ReferenceLine x={50} stroke="rgba(6,182,212,0.3)" strokeDasharray="4 4"
                  label={{ value: 'Interactive (<50ms)', fill: 'rgba(6,182,212,0.6)', fontSize: 10, position: 'insideTop' }} />

                {filters.cnn && (
                  <Scatter name="CNN Family" data={dataCNN} fill="#3b82f6" shape="circle" />
                )}
                {filters.hybrid && (
                  <Scatter name="Hybrid Models" data={dataHybrid} fill="#10b981" shape="triangle" />
                )}
                {filters.vit && (
                  <Scatter name="Pure ViT" data={dataViT} fill="#f59e0b" shape="star" />
                )}
                {filters.pipeline && (
                  <Scatter name="Full Pipeline" data={dataFullPipeline} fill="#8b5cf6" shape="diamond" />
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <span>Source: Table II - Project Report (March 2026)</span>
            <span>•</span>
            <span>Platforms: RPi 5, Jetson Orin Nano, Coral TPU, iPhone 15 Pro</span>
            <span>•</span>
            <span>Pareto-optimal: EfficientNet-B3 (14.2ms/81.6%) & FastViT-HD (18.5ms/82.2%)</span>
          </div>
        </div>

        {/* Full benchmark table */}
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            Table II: Complete Benchmark Results
          </h3>
          <div className="benchmark-table-wrapper">
            <table className="benchmark-table">
              <thead>
                <tr>
                  <th>Backbone Model</th>
                  <th>Target Device</th>
                  <th>Precision / Compiler</th>
                  <th>Latency (ms)</th>
                  <th>Accuracy (%)</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: 'EfficientNet-B0', device: 'Raspberry Pi 5', prec: 'TFLite INT8', lat: '28–32', acc: '77.1', rem: 'CPU-only; memory bandwidth limited', type: 'cnn' },
                  { model: 'EfficientNet-B3', device: 'Jetson Orin Nano', prec: 'TensorRT FP16', lat: '14.2', acc: '81.6', rem: 'Optimal L2/L3 cache utilization', type: 'cnn' },
                  { model: 'EfficientNet-B4', device: 'Jetson Orin Nano', prec: 'TensorRT FP16', lat: '48.5', acc: '82.9', rem: 'Cache overflow; DRAM-bound', type: 'cnn' },
                  { model: 'MobileNetV3', device: 'Legacy Pi 4', prec: 'TFLite INT8', lat: '42–56', acc: '75.2', rem: 'Thermal throttling +15-20%', type: 'cnn' },
                  { model: 'MobileViT-XS', device: 'iPhone 15 Pro', prec: 'CoreML NPU', lat: '7.2', acc: '78.9', rem: 'Optimized for Apple Neural Engine', type: 'hybrid' },
                  { model: 'ViT-Base/16', device: 'Jetson Orin Nano', prec: 'TensorRT FP16', lat: '98.0', acc: '81.0', rem: 'Quartic complexity scaling penalty', type: 'vit' },
                  { model: 'FastViT-HD', device: 'Jetson Orin Nano', prec: 'TensorRT FP16', lat: '18.5', acc: '82.2', rem: 'Hybrid CNN-Transformer advantage', type: 'hybrid' },
                  { model: 'MobileVLM-1.7B', device: 'RPi 5 + Coral TPU', prec: 'TFLite + NNAPI', lat: '156–210', acc: '72.5', rem: 'Projection adds 40-80 ms overhead', type: 'pipeline' },
                ].map(r => (
                  <tr key={r.model}>
                    <td><span className="table-model-name">{r.model}</span></td>
                    <td>{r.device}</td>
                    <td>{r.prec}</td>
                    <td><span className="mono" style={{ color: 'var(--accent-cyan)' }}>{r.lat}</span></td>
                    <td><span className="mono" style={{ color: 'var(--accent-emerald)' }}>{r.acc}</span></td>
                    <td style={{ whiteSpace: 'normal', minWidth: 200 }}>{r.rem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatencyChart;
