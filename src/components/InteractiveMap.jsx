import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Compass } from 'lucide-react';

export default function InteractiveMap() {
  const {
    mapNodes,
    mapOverlayMode,
    setMapOverlayMode,
    incidents,
    metrics,
    handleNodeClick
  } = useEcoAccess();

  return (
    <div className="glass-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <Compass size={18} style={{color: 'var(--color-accent-cyan)'}} />
          Global Event Venue GIS Sensor Grid
        </h2>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button 
            className={`button secondary ${mapOverlayMode === 'carbon' ? 'active' : ''}`}
            style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: 'none'}}
            onClick={() => setMapOverlayMode('carbon')}
          >
            Carbon Load
          </button>
          <button 
            className={`button secondary ${mapOverlayMode === 'accessibility' ? 'active' : ''}`}
            style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: 'none'}}
            onClick={() => setMapOverlayMode('accessibility')}
          >
            Accessibility Paths
          </button>
        </div>
      </div>
      
      <div className="map-canvas-container">
        <div className="map-grid-layer"></div>
        <div className="scanner-line"></div>
        
        {/* Connections */}
        {mapOverlayMode === 'carbon' ? (
          <>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '31%', transform: 'rotate(27deg)', borderTop: '2px dashed rgba(239, 68, 68, 0.4)' }}></div>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '23%', transform: 'rotate(130deg)', borderTop: '2px dashed rgba(239, 68, 68, 0.4)' }}></div>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '32%', transform: 'rotate(-44deg)', borderTop: '2px dashed rgba(239, 68, 68, 0.4)' }}></div>
          </>
        ) : (
          <>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '31%', transform: 'rotate(27deg)', borderTop: '3px double var(--color-accent-cyan)' }}></div>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '23%', transform: 'rotate(130deg)', borderTop: '3px double var(--color-accent-cyan)' }}></div>
            <div className="map-connection" style={{ left: '50%', top: '50%', width: '32%', transform: 'rotate(-44deg)', borderTop: '3px double var(--color-accent-cyan)' }}></div>
          </>
        )}
        
        {/* Dynamic Map Nodes */}
        {mapNodes.map(node => {
          let bgColor = 'var(--color-accent-emerald)';
          let glowClass = '';
          let labelDetail = '';

          const unresolvedElevator = metrics.unresolvedElevator;
          const unresolvedGrid = metrics.unresolvedGrid;

          if (node.alert === 'elevator' && unresolvedElevator) {
            bgColor = 'var(--color-accent-red)';
            glowClass = 'animate-pulse-glow-red';
            labelDetail = ' (🚨 Broken Elevator Gate 6)';
          } else if (node.alert === 'grid' && unresolvedGrid) {
            bgColor = 'var(--color-accent-orange)';
            glowClass = 'animate-pulse-glow-orange';
            labelDetail = ' (⚡ Grid Spike)';
          } else if (node.type === 'transporthub') {
            bgColor = 'var(--color-accent-indigo)';
          }

          return (
            <div 
              key={node.id}
              className="map-node" 
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`, 
                backgroundColor: bgColor, 
                boxShadow: `0 0 10px ${bgColor}`,
                cursor: 'pointer'
              }} 
              onClick={() => handleNodeClick(node.name)}
            >
              {glowClass && <div className={glowClass} style={{ position: 'absolute', top: -4, left: -4, right: -4, bottom: -4, borderRadius: '50%' }}></div>}
              <div className="map-node-label">{node.name}{labelDetail}</div>
            </div>
          );
        })}

        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-color-dot" style={{backgroundColor: 'var(--color-accent-emerald)'}}></span>
            <span>Green & Fully Accessible</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-dot" style={{backgroundColor: 'var(--color-accent-red)'}}></span>
            <span>High Priority Alert (Access Barrier)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-dot" style={{backgroundColor: 'var(--color-accent-orange)'}}></span>
            <span>Carbon / Energy Anomaly</span>
          </div>
        </div>
      </div>
    </div>
  );
}
