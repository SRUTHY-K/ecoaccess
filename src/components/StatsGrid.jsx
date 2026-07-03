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
    // Sized down slightly (Y limits between 6 and 24) to leave 6px padding for drop-shadow glow filters
    if (type === 'carbon') {
      return "M 0 20 Q 25 15 50 18 T 100 12 T 150 16 T 200 8";
    } else if (type === 'energy') {
      const endY = Math.min(24, Math.max(6, 28 - value * 0.22));
      return `M 0 22 Q 25 18 50 14 T 100 12 T 150 10 T 200 ${endY}`;
    } else if (type === 'accessibility') {
      const endY = Math.min(24, Math.max(6, 32 - value * 0.3));
      return `M 0 18 Q 25 20 50 14 T 100 12 T 150 ${endY} T 200 8`;
    } else {
      // Fan satisfaction curve (reacts dynamically to user rating)
      const endY = Math.min(24, Math.max(6, 30 - value * 0.28));
      return `M 0 12 Q 25 16 50 10 T 100 14 T 150 12 T 200 ${endY}`;
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
        <svg className="stat-sparkline" viewBox="0 0 200 30" preserveAspectRatio="none" style={{ '--sparkline-color': 'var(--color-accent-red)', '--sparkline-glow': 'var(--color-accent-red-glow)' }}>
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
        <svg className="stat-sparkline" viewBox="0 0 200 30" preserveAspectRatio="none" style={{ '--sparkline-color': 'var(--color-accent-emerald)', '--sparkline-glow': 'var(--color-accent-emerald-glow)' }}>
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
        <svg className="stat-sparkline" viewBox="0 0 200 30" preserveAspectRatio="none" style={{ '--sparkline-color': 'var(--color-accent-cyan)', '--sparkline-glow': 'var(--color-accent-cyan-glow)' }}>
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
        <svg className="stat-sparkline" viewBox="0 0 200 30" preserveAspectRatio="none" style={{ '--sparkline-color': 'var(--color-accent-pink)', '--sparkline-glow': 'var(--color-accent-pink-glow)' }}>
          <path className="stat-sparkline-path" d={getSparklinePath('fansat', metrics.fanSat)} />
        </svg>
      </div>
    </div>
  );
}
