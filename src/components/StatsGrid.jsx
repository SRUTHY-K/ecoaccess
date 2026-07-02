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

  return (
    <div className="dashboard-summary-grid">
      {/* CARD 1: CARBON FOOTPRINT */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-red)' }}>
        <div className="stat-header">
          <span>Carbon Footprint</span>
          <Activity size={16} style={{color: 'var(--color-accent-red)'}} />
        </div>
        <div className="stat-value">{metrics.carbonFootprint.toLocaleString()} t</div>
        <div className="stat-change negative">
          <span>Metric Tonnes CO2e</span>
        </div>
      </div>

      {/* CARD 2: GREEN ENERGY MIX */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-emerald)' }}>
        <div className="stat-header">
          <span>Renewable Energy Share</span>
          <Zap size={16} style={{color: 'var(--color-accent-emerald)'}} />
        </div>
        <div className="stat-value">{metrics.greenEnergyMix}%</div>
        <div className="stat-change positive">
          <span>Green Energy Mix</span>
        </div>
      </div>

      {/* CARD 3: ACCESSIBILITY INDEX */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-cyan)' }}>
        <div className="stat-header">
          <span>Accessibility Index</span>
          <Compass size={16} style={{color: 'var(--color-accent-cyan)'}} />
        </div>
        <div className="stat-value">{metrics.inclusivityIndex}%</div>
        <div className={`stat-change ${metrics.inclusivityIndex > 60 ? 'positive' : 'negative'}`}>
          {metrics.inclusivityIndex > 60 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{metrics.inclusivityIndex > 70 ? 'High Inclusivity' : 'Barrier Warning'}</span>
        </div>
      </div>

      {/* CARD 4: FAN SATISFACTION */}
      <div className="glass-panel stat-card" style={{ '--accent-gradient': 'var(--color-accent-pink)' }}>
        <div className="stat-header">
          <span>Spectator Satisfaction</span>
          <MessageSquare size={16} style={{color: 'var(--color-accent-pink)'}} />
        </div>
        <div className="stat-value">{metrics.fanSat}%</div>
        <div className={`stat-change ${metrics.fanSat > 65 ? 'positive' : 'negative'}`}>
          <span>{metrics.fanSat > 75 ? 'Highly Satisfied' : 'Reputation Strain'}</span>
        </div>
      </div>
    </div>
  );
}
