import React, { useState } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Activity, ShieldAlert } from 'lucide-react';

export default function BigQueryML() {
  const { metrics, energyForecast, renewablesShare, transitInclusivity } = useEcoAccess();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG dimensions
  const chartWidth = 380;
  const chartHeight = 120;

  // Project data points to SVG space
  const maxVal = energyForecast && energyForecast.length > 0 
    ? Math.max(...energyForecast.map(f => f.value), 1000) 
    : 1000;

  const points = (energyForecast || []).map((f, i) => {
    const x = 20 + i * ((chartWidth - 40) / (energyForecast.length - 1));
    const y = chartHeight - 15 - (f.value / maxVal) * (chartHeight - 30);
    return { x, y, value: f.value, time: f.time };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - 15} L ${points[0].x} ${chartHeight - 15} Z` 
    : '';

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Activity size={18} style={{ color: 'var(--color-accent-orange)' }} />
          BigQuery ML: Carbon & Energy Forecasts
        </h2>
        <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--color-accent-orange)', fontWeight: '700', textTransform: 'uppercase' }}>ML Models Active</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
        
        {/* SECTION 1: CARBON FORECAST */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: '600', color: '#fff' }}>Scope 2 & 3 Carbon Footprint (Next 4 Hours)</span>
            <span className="font-mono" style={{ color: 'var(--color-accent-red)' }}>+{Math.round(metrics.carbonFootprint / 24)} t CO2e / hour</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            BigQuery ML Linear Regression model projects carbon emissions based on current venue and transit parameters.
          </div>
        </div>

        {/* SECTION 2: HIGH FIDELITY SVG ENERGY CHART */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: '600', color: '#fff' }}>Thermal Grid Energy Demand Forecast (ARIMA Time Series)</span>
            <span className="font-mono" style={{ color: 'var(--color-accent-orange)', fontWeight: '700' }}>
              {energyForecast && energyForecast.length > 0 ? `${Math.max(...energyForecast.map(f => f.value))} kW Peak` : "880 kW Peak"}
            </span>
          </div>

          <div style={{ position: 'relative', height: `${chartHeight}px`, width: '100%' }}>
            {/* Tooltip Overlay */}
            {hoveredPoint && (
              <div 
                style={{
                  position: 'absolute',
                  left: `${hoveredPoint.x - 45}px`,
                  top: `${hoveredPoint.y - 35}px`,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--color-accent-orange)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '0.65rem',
                  pointerEvents: 'none',
                  zIndex: 5,
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  color: '#fff'
                }}
              >
                <strong>{Math.round(hoveredPoint.value)} kW</strong>
                <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--color-text-secondary)' }}>
                  at {hoveredPoint.time.includes(' ') ? hoveredPoint.time.split(' ')[1].substring(0, 5) : hoveredPoint.time}
                </span>
              </div>
            )}

            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="arima-chart-svg">
              <defs>
                <linearGradient id="arimaAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent-orange)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--color-accent-orange)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="20" y1="15" x2={chartWidth - 20} y2="15" className="arima-chart-grid" />
              <line x1="20" y1={chartHeight / 2} x2={chartWidth - 20} y2={chartHeight / 2} className="arima-chart-grid" />
              <line x1="20" y1={chartHeight - 15} x2={chartWidth - 20} y2={chartHeight - 15} className="arima-chart-grid" />

              {/* Area path */}
              {areaPath && <path d={areaPath} className="arima-chart-area" />}

              {/* Line path */}
              {linePath && <path d={linePath} className="arima-chart-line" />}

              {/* Data points */}
              {points.map((p, i) => (
                <circle 
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  className="arima-chart-dot"
                  onMouseEnter={() => setHoveredPoint(p)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}

              {/* X Axis Labels */}
              {points.map((p, i) => (
                <text 
                  key={i}
                  x={p.x}
                  y={chartHeight - 2}
                  fill="var(--color-text-secondary)"
                  fontSize="8"
                  textAnchor="middle"
                >
                  {p.time.includes(' ') ? p.time.split(' ')[1].substring(0, 5) : p.time}
                </text>
              ))}
            </svg>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
            BigQuery ARIMA model projects upcoming substation loads. Activating solar battery buffers mitigates grid overloads.
          </div>
        </div>

        {/* SECTION 3: SYSTEM EFFICIENCY SUMMARY */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: '600', color: '#fff' }}>Resource Utilization Rate</span>
            <span className="font-mono" style={{ color: 'var(--color-accent-cyan)' }}>{(renewablesShare * 0.4 + transitInclusivity * 0.6).toFixed(1)}% Efficiency</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            Optimized allocation models recommend increasing low-floor shuttle count by 8 units during egress windows.
          </div>
        </div>

      </div>
    </div>
  );
}
