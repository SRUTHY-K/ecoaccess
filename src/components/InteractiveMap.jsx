import React, { useState } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Compass, Eye, EyeOff, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

export default function InteractiveMap() {
  const {
    mapNodes,
    mapOverlayMode,
    setMapOverlayMode,
    incidents,
    metrics,
    handleDispatch
  } = useEcoAccess();

  const [showLabels, setShowLabels] = useState(true);
  const [activeNode, setActiveNode] = useState(null);

  // Helper to find matching incident for a node
  const getNodeIncident = (node) => {
    return incidents.find(inc => 
      inc.sector.toLowerCase().includes(node.name.toLowerCase()) || 
      node.name.toLowerCase().includes(inc.sector.toLowerCase())
    );
  };

  const handleNodeSelect = (node) => {
    setActiveNode(node);
  };

  const activeIncident = activeNode ? getNodeIncident(activeNode) : null;

  return (
    <div className="glass-panel" style={{ position: 'relative' }}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Compass size={18} style={{color: 'var(--color-accent-cyan)'}} />
          Global Event Venue GIS Sensor Grid
        </h2>
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          {/* Mobile friendly label toggle */}
          <button 
            className="button secondary"
            style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem'}}
            onClick={() => setShowLabels(!showLabels)}
            title="Toggle Node Labels (Mobile Option)"
          >
            {showLabels ? <Eye size={12} /> : <EyeOff size={12} />}
            <span style={{ fontSize: '0.7rem' }}>Labels</span>
          </button>
          
          <button 
            className={`button secondary ${mapOverlayMode === 'carbon' ? 'active' : ''}`}
            style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: 'none'}}
            onClick={() => setMapOverlayMode('carbon')}
          >
            Carbon
          </button>
          <button 
            className={`button secondary ${mapOverlayMode === 'accessibility' ? 'active' : ''}`}
            style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: 'none'}}
            onClick={() => setMapOverlayMode('accessibility')}
          >
            Accessibility
          </button>
        </div>
      </div>
      
      <div className="map-canvas-container" style={{ position: 'relative', overflow: 'hidden' }}>
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
          const nodeIncident = getNodeIncident(node);
          const isIncidentUnresolved = nodeIncident && nodeIncident.status !== 'resolved';
 
          if (node.alert === 'elevator' && isIncidentUnresolved) {
            bgColor = 'var(--color-accent-red)';
            glowClass = 'animate-pulse-glow-red';
            labelDetail = ' (🚨 Elevator Alert)';
          } else if (node.alert === 'grid' && isIncidentUnresolved) {
            bgColor = 'var(--color-accent-orange)';
            glowClass = 'animate-pulse-glow-orange';
            labelDetail = ' (⚡ Grid Spike)';
          } else if (node.type === 'transporthub') {
            bgColor = 'var(--color-accent-indigo)';
          }
 
          return (
            <div 
              key={node.id}
              className={`map-node ${activeNode?.id === node.id ? 'focused' : ''}`}
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`, 
                backgroundColor: bgColor, 
                boxShadow: activeNode?.id === node.id ? `0 0 20px 4px ${bgColor}` : `0 0 10px ${bgColor}`,
                cursor: 'pointer',
                transform: activeNode?.id === node.id ? 'translate(-50%, -50%) scale(1.3)' : 'translate(-50%, -50%)'
              }} 
              onClick={() => handleNodeSelect(node)}
            >
              {glowClass && <div className={glowClass} style={{ position: 'absolute', top: -4, left: -4, right: -4, bottom: -4, borderRadius: '50%' }}></div>}
              
              {/* Always-on Label Badge */}
              {showLabels && (
                <div className="map-node-label">
                  {node.name}{labelDetail}
                </div>
              )}
            </div>
          );
        })}
 
        <div className="map-legend" style={{ zIndex: 1 }}>
          <div className="legend-item">
            <span className="legend-color-dot" style={{backgroundColor: 'var(--color-accent-emerald)'}}></span>
            <span>Accessible / Normal</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-dot" style={{backgroundColor: 'var(--color-accent-red)'}}></span>
            <span>Accessibility Alert</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-dot" style={{backgroundColor: 'var(--color-accent-orange)'}}></span>
            <span>Energy Anomaly</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-dot" style={{backgroundColor: 'var(--color-accent-indigo)'}}></span>
            <span>Accessible Transport Hub</span>
          </div>
        </div>

        {/* Mobile Detail Drawer Slider */}
        {activeNode && (
          <div className="map-drawer animate-slide-up">
            <div className="map-drawer-header">
              <span className="map-drawer-title">{activeNode.name}</span>
              <button className="map-drawer-close" onClick={() => setActiveNode(null)}>Close</button>
            </div>
            
            {activeIncident ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldAlert size={14} style={{ color: activeIncident.severity === 'high' ? 'var(--color-accent-red)' : 'var(--color-accent-orange)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>{activeIncident.title}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  {activeIncident.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 'bold', color: activeIncident.status === 'resolved' ? 'var(--color-accent-emerald)' : 'var(--color-accent-orange)' }}>
                    Status: {activeIncident.status}
                  </span>
                  
                  {activeIncident.status === 'unresolved' && (
                    <button 
                      className="button success" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', border: 'none', margin: 0 }}
                      onClick={() => handleDispatch(activeIncident.id)}
                    >
                      Dispatch Crew
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-accent-emerald)' }} />
                <span>Venue telemetry channels active. No critical incidents detected at this sector.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
