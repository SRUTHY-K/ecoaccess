import React, { useState, useEffect, useRef } from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { 
  Terminal, 
  RefreshCw, 
  Search, 
  AlertTriangle, 
  Info, 
  XCircle, 
  Play, 
  Pause,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function LogViewer() {
  const { logClientAction } = useEcoAccess();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [componentFilter, setComponentFilter] = useState('ALL');
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Poll intervals
  useEffect(() => {
    fetchLogs();
    
    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchLogs(false); // background fetch, no loading spinner
      }, 2500);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh, levelFilter, componentFilter, searchTerm]);

  const fetchLogs = (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    
    let url = 'http://localhost:8000/api/logs?limit=150';
    if (levelFilter !== 'ALL') {
      url += `&level=${levelFilter}`;
    }
    if (componentFilter !== 'ALL') {
      url += `&component=${componentFilter}`;
    }
    if (searchTerm.trim() !== '') {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        if (showSpinner) setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load logs from server: ", err);
        if (showSpinner) setLoading(false);
      });
  };

  const toggleRow = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const getLevelBadge = (level) => {
    switch (level.toUpperCase()) {
      case 'ERROR':
        return (
          <span className="badge" style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--color-accent-red)', border: '1px solid rgba(239,68,68,0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <XCircle size={12} /> ERROR
          </span>
        );
      case 'WARNING':
        return (
          <span className="badge" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--color-accent-orange)', border: '1px solid rgba(245,158,11,0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <AlertTriangle size={12} /> WARNING
          </span>
        );
      default:
        return (
          <span className="badge" style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--color-accent-emerald)', border: '1px solid rgba(16,185,129,0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Info size={12} /> INFO
          </span>
        );
    }
  };

  const formatTimestamp = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + String(d.getMilliseconds()).padStart(3, '0');
    } catch {
      return isoString;
    }
  };

  // List of unique components for filtering
  const componentsList = [
    'ALL',
    'Middleware',
    'Frontend',
    'AI_Service',
    'RAG_Service',
    'BQ_Service',
    'Backend'
  ];

  return (
    <div className="animate-slide-up glass-panel" style={{ height: 'calc(100vh - 12rem)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title Header */}
      <div className="panel-header" style={{ flexShrink: 0 }}>
        <h2 className="panel-title">
          <Terminal size={18} style={{ color: 'var(--color-accent-cyan)' }} />
          EcoAccess Global Telemetry & System Action Logs
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Auto Refresh Toggle */}
          <button 
            onClick={() => setAutoRefresh(prev => !prev)}
            className={`button ${autoRefresh ? 'success' : 'secondary'}`}
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', border: 'none', margin: 0 }}
          >
            {autoRefresh ? <Pause size={12} /> : <Play size={12} />}
            {autoRefresh ? 'Auto-Polling Active' : 'Polling Paused'}
          </button>

          {/* Manual Refresh */}
          <button 
            onClick={() => fetchLogs(true)}
            className="button secondary"
            style={{ padding: '0.35rem', margin: 0, minWidth: 'auto', border: 'none' }}
            title="Refresh Logs Now"
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>

        </div>
      </div>

      {/* Filter Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        padding: '0.75rem 1rem', 
        borderBottom: '1px solid var(--border-color)', 
        background: 'rgba(0,0,0,0.15)',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexShrink: 0
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search action details, errors..." 
            className="chat-input"
            style={{ 
              paddingLeft: '1.8rem', 
              fontSize: '0.8rem', 
              margin: 0, 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)' 
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Level Filters */}
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {['ALL', 'INFO', 'WARNING', 'ERROR'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`button ${levelFilter === lvl ? 'primary' : 'secondary'}`}
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', margin: 0, border: 'none', minWidth: 'auto' }}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Component Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Component:</span>
          <select
            value={componentFilter}
            onChange={(e) => setComponentFilter(e.target.value)}
            className="chat-input"
            style={{ 
              width: '130px', 
              padding: '0.3rem 0.5rem', 
              fontSize: '0.8rem', 
              margin: 0,
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              borderRadius: '6px'
            }}
          >
            {componentsList.map(comp => (
              <option key={comp} value={comp}>{comp}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Logs Table Area */}
      <div style={{ flexGrow: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.25)', padding: '0 0.5rem' }}>
        {logs.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)', gap: '0.5rem', padding: '2rem' }}>
            <Terminal size={32} style={{ opacity: 0.3 }} />
            <span style={{ fontSize: '0.9rem' }}>No log telemetry matching search parameters.</span>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>
                <th style={{ padding: '0.5rem' }}>Time</th>
                <th style={{ padding: '0.5rem', width: '90px' }}>Level</th>
                <th style={{ padding: '0.5rem', width: '110px' }}>Component</th>
                <th style={{ padding: '0.5rem', width: '150px' }}>Action</th>
                <th style={{ padding: '0.5rem' }}>Details</th>
                <th style={{ padding: '0.5rem', width: '30px' }}></th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => {
                const isExpanded = expandedIndex === index;
                const isError = log.level === 'ERROR';
                return (
                  <React.Fragment key={index}>
                    {/* Row Header */}
                    <tr 
                      onClick={() => toggleRow(index)}
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.03)', 
                        cursor: 'pointer',
                        background: isExpanded ? 'rgba(255,255,255,0.02)' : 'transparent',
                        transition: 'background 0.2s'
                      }}
                      className="log-row"
                    >
                      <td style={{ padding: '0.5rem', fontFamily: 'monospace', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                        {formatTimestamp(log.timestamp)}
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        {getLevelBadge(log.level)}
                      </td>
                      <td style={{ padding: '0.5rem', fontWeight: '500', color: 'var(--color-accent-indigo)' }}>
                        {log.component}
                      </td>
                      <td style={{ padding: '0.5rem', fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>
                        {log.action}
                      </td>
                      <td style={{ 
                        padding: '0.5rem', 
                        color: isError ? 'var(--color-accent-red)' : 'var(--color-text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '300px'
                      }}>
                        {log.details}
                      </td>
                      <td style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </td>
                    </tr>
                    
                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={6} style={{ 
                          padding: '0.75rem 1rem', 
                          background: 'rgba(0,0,0,0.4)', 
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          color: '#b3c0dd',
                          lineHeight: '1.4'
                        }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>Timestamp:</span>
                            <span>{log.timestamp}</span>
                            
                            <span style={{ color: 'var(--color-text-muted)' }}>Action:</span>
                            <span style={{ color: 'var(--color-accent-cyan)' }}>{log.action}</span>
                            
                            <span style={{ color: 'var(--color-text-muted)' }}>Details:</span>
                            <span style={{ color: '#fff', whiteSpace: 'pre-wrap' }}>{log.details}</span>
                          </div>
                          
                          {log.error && (
                            <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,0,0,0.1)' }}>
                              <span style={{ color: 'var(--color-accent-red)', fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>
                                Error Traceback:
                              </span>
                              <pre style={{ 
                                margin: 0, 
                                padding: '0.5rem', 
                                background: 'rgba(239,68,68,0.05)', 
                                borderLeft: '3px solid var(--color-accent-red)', 
                                color: 'var(--color-accent-red)',
                                overflowX: 'auto',
                                whiteSpace: 'pre-wrap'
                              }}>{log.error}</pre>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
