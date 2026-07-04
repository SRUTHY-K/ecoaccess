import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Eye } from 'lucide-react';

export default function LiveCCTV() {
  const { incidents } = useEcoAccess();

  const unresolvedElevator = incidents.find(i => i.id === 'inc-301')?.status !== 'resolved';
  const unresolvedGrid = incidents.find(i => i.id === 'inc-302')?.status !== 'resolved';
  const unresolvedContam = incidents.find(i => i.id === 'inc-303')?.status !== 'resolved';
  const unresolvedEgress = incidents.find(i => i.id === 'inc-304')?.status !== 'resolved';

  // Component to render cyber HUD indicators inside CCTV feed thumbnails
  const RenderCCTVFeed = ({ camId, label, isAlertActive, colorVar }) => {
    return (
      <div className="cctv-viewport" style={{ position: 'relative', width: '90px', height: '60px', background: '#020617', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Neon Indicator dot */}
        <div className="pulse-dot" style={{ position: 'absolute', top: '6px', left: '6px', backgroundColor: isAlertActive ? `var(--color-accent-${colorVar})` : 'var(--color-accent-emerald)', width: '5px', height: '5px', zIndex: 4 }}></div>
        
        {/* CCTV Scrolling Scanline */}
        {isAlertActive && <div className="cctv-scanline" style={{ background: `rgba(var(--color-accent-${colorVar}-glow), 0.5)` }}></div>}
        
        {/* HUD overlays */}
        <span className="cctv-hud-text" style={{ color: isAlertActive ? `var(--color-accent-${colorVar})` : 'var(--color-accent-emerald)' }}>REC</span>
        
        {/* Brackets */}
        <div className="cctv-target-brackets" style={{ opacity: isAlertActive ? 0.8 : 0.2 }}>
          <div className="cctv-bracket cctv-bracket-topleft" style={{ borderColor: isAlertActive ? `var(--color-accent-${colorVar})` : '#555' }}></div>
          <div className="cctv-bracket cctv-bracket-topright" style={{ borderColor: isAlertActive ? `var(--color-accent-${colorVar})` : '#555' }}></div>
          <div className="cctv-bracket cctv-bracket-bottomleft" style={{ borderColor: isAlertActive ? `var(--color-accent-${colorVar})` : '#555' }}></div>
          <div className="cctv-bracket cctv-bracket-bottomright" style={{ borderColor: isAlertActive ? `var(--color-accent-${colorVar})` : '#555' }}></div>
        </div>

        <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.6)', position: 'absolute', bottom: '3px', right: '4px', fontFamily: 'var(--font-mono)', zIndex: 4 }}>{camId}</span>
      </div>
    );
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Eye size={18} style={{ color: 'var(--color-accent-indigo)' }} />
          Vertex AI Vision: Live Stream Analyzers
        </h2>
        <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-accent-indigo)', fontWeight: '700', textTransform: 'uppercase' }}>CCTV Core Streams</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        
        {/* Stream 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <RenderCCTVFeed camId="CAM_04_GATE2" label="LIVE" isAlertActive={unresolvedEgress} colorVar="red" />
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff' }}>Gate 2 Egress Ramp</span>
              <span style={{ fontSize: '0.7rem', color: unresolvedEgress ? 'var(--color-accent-red)' : 'var(--color-accent-emerald)', fontWeight: '600' }}>
                {unresolvedEgress ? 'Obstruction Detected' : 'Clear & Normal'}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {unresolvedEgress 
                ? 'Egress path blocked. Crowd density high (1.4 persons/sq.m). Recommendation sent to dispatch desk.' 
                : 'Vendor relocated. Access ramp clear. Crowd flow parameters normal.'}
            </span>
          </div>
        </div>

        {/* Stream 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <RenderCCTVFeed camId="CAM_12_FANZONE" label="LIVE" isAlertActive={unresolvedContam} colorVar="orange" />
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff' }}>Plaza Food Court Bin #4</span>
              <span style={{ fontSize: '0.7rem', color: unresolvedContam ? 'var(--color-accent-orange)' : 'var(--color-accent-emerald)', fontWeight: '600' }}>
                {unresolvedContam ? 'Contamination Warning' : 'No Contamination'}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {unresolvedContam 
                ? 'Plastics detected in compost dumpster. Waste contamination probability: 89%. Routing sorting alert.' 
                : 'Organic compost bin audit complete. Contamination rate: <1%.'}
            </span>
          </div>
        </div>

        {/* Stream 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <RenderCCTVFeed camId="CAM_08_STADIUM" label="LIVE" isAlertActive={unresolvedElevator} colorVar="red" />
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff' }}>Gate 6 Wheelchair Elevator</span>
              <span style={{ fontSize: '0.7rem', color: unresolvedElevator ? 'var(--color-accent-red)' : 'var(--color-accent-emerald)', fontWeight: '600' }}>
                {unresolvedElevator ? 'Outage - Barrier Risk' : 'Ramp Area Normal'}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {unresolvedElevator 
                ? 'Elevator E-4 is offline. Accessible seating flow is blocked. Repair crews dispatched.' 
                : 'Elevator E-4 zone monitoring. Flow is clear. Backup access shuttles operational.'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
