import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { 
  Activity, 
  Zap, 
  Compass, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export default function StatsGrid() {
  const { metrics } = useEcoAccess();

  // Helper to generate dynamic sparkline SVG path based on value trends
  const getSparklinePath = (type, value) => {
    if (type === 'carbon') {
      // Slopes down as efficiency increases
      return "M 0 25 Q 25 15 50 20 T 100 12 T 150 18 T 200 8";
    } else if (type === 'energy') {
      // Rises with renewable share
      return `M 0 28 Q 25 24 50 18 T 100 15 T 150 10 T 200 ${Math.max(4, 30 - value * 0.25)}`;
    } else if (type === 'accessibility') {
      // Fluctuates slightly, ends high
      return `M 0 20 Q 25 22 50 16 T 100 12 T 150 ${Math.max(4, 40 - value * 0.35)} T 200 6`;
    } else {
      // Fan satisfaction curve
      return "M 0 15 Q 25 18 50 10 T 100 14 T 150 8 T 200 4";
    }
  };

  return (
    <div className="dashboard-summary-grid">
      {/* CARD 1: CARBON FOOTPRINT */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-red)', transition: 'transform 0.2s ease' }}>
        <div className="stat-header">
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Carbon Footprint</span>
          <Activity size={16} style={{color: 'var(--color-accent-red)'}} />
        </div>
        <div className="stat-value">{metrics.carbonFootprint.toLocaleString()} t</div>
        <div className="stat-change negative" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>Metric Tonnes CO2e</span>
          <span style={{ color: 'var(--color-accent-red)', fontWeight: 'bold' }}>Scope 2 & 3</span>
        </div>
        
        {/* Sparkline Visual */}
        <svg className="stat-sparkline" style={{ '--sparkline-color': 'var(--color-accent-red)', '--sparkline-glow': 'var(--color-accent-red-glow)' }}>
          <path className="stat-sparkline-path" d={getSparklinePath('carbon')} />
        </svg>
      </div>

      {/* CARD 2: GREEN ENERGY MIX */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-emerald)', transition: 'transform 0.2s ease' }}>
        <div className="stat-header">
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Renewable Energy Share</span>
          <Zap size={16} style={{color: 'var(--color-accent-emerald)'}} />
        </div>
        <div className="stat-value">{metrics.greenEnergyMix}%</div>
        <div className="stat-change positive" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>Green Energy Mix</span>
          <span style={{ color: 'var(--color-accent-emerald)', fontWeight: 'bold' }}>Active Peak</span>
        </div>

        {/* Sparkline Visual */}
        <svg className="stat-sparkline" style={{ '--sparkline-color': 'var(--color-accent-emerald)', '--sparkline-glow': 'var(--color-accent-emerald-glow)' }}>
          <path className="stat-sparkline-path" d={getSparklinePath('energy', metrics.greenEnergyMix)} />
        </svg>
      </div>

      {/* CARD 3: ACCESSIBILITY INDEX */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-cyan)', transition: 'transform 0.2s ease' }}>
        <div className="stat-header">
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Accessibility Index</span>
          <Compass size={16} style={{color: 'var(--color-accent-cyan)'}} />
        </div>
        <div className="stat-value">{metrics.inclusivityIndex}%</div>
        <div className={`stat-change ${metrics.inclusivityIndex > 60 ? 'positive' : 'negative'}`} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {metrics.inclusivityIndex > 60 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{metrics.inclusivityIndex > 70 ? 'High Inclusivity' : 'Barrier Warning'}</span>
          </div>
          <span style={{ color: 'var(--color-accent-cyan)', fontWeight: 'bold' }}>GIS Grid</span>
        </div>

        {/* Sparkline Visual */}
        <svg className="stat-sparkline" style={{ '--sparkline-color': 'var(--color-accent-cyan)', '--sparkline-glow': 'var(--color-accent-cyan-glow)' }}>
          <path className="stat-sparkline-path" d={getSparklinePath('accessibility', metrics.inclusivityIndex)} />
        </svg>
      </div>

      {/* CARD 4: FAN SATISFACTION */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-pink)', transition: 'transform 0.2s ease' }}>
        <div className="stat-header">
          <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Spectator Satisfaction</span>
          <MessageSquare size={16} style={{color: 'var(--color-accent-pink)'}} />
        </div>
        <div className="stat-value">{metrics.fanSat}%</div>
        <div className={`stat-change ${metrics.fanSat > 65 ? 'positive' : 'negative'}`} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>{metrics.fanSat > 75 ? 'Highly Satisfied' : 'Reputation Strain'}</span>
          <span style={{ color: 'var(--color-accent-pink)', fontWeight: 'bold' }}>Live Sentiment</span>
        </div>

        {/* Sparkline Visual */}
        <svg className="stat-sparkline" style={{ '--sparkline-color': 'var(--color-accent-pink)', '--sparkline-glow': 'var(--color-accent-pink-glow)' }}>
          <path className="stat-sparkline-path" d={getSparklinePath('fansat')} />
        </svg>
      </div>
    </div>
  );
}
