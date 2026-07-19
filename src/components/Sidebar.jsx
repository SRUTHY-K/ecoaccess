import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { 
  Activity, 
  LayoutDashboard, 
  Compass, 
  ShieldAlert, 
  Zap, 
  MessageSquare, 
  FileText, 
  Settings, 
  Eye, 
  Type, 
  Volume2, 
  Cpu, 
  Building 
} from 'lucide-react';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    highContrast,
    setHighContrast,
    fontSizeClass,
    setFontSizeClass,
    isSpeaking,
    handleTextToSpeech
  } = useEcoAccess();

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <Activity className="logo-icon" size={24} style={{color: 'var(--color-accent-emerald)'}} />
        <span className="logo-text">EcoAccess.ai</span>
      </div>

      <nav className="nav-group">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard className="nav-icon" size={18} />
          Command Center
        </button>
        
        <button 
          className={`nav-item ${activeTab === 'citizen' ? 'active' : ''}`}
          onClick={() => setActiveTab('citizen')}
        >
          <MessageSquare className="nav-icon" size={18} />
          Sustainability Chat
        </button>

        <button 
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
          title="Configure Guidelines and Event Details"
        >
          <Settings className="nav-icon" size={18} />
          Knowledge Assistant
        </button>
      </nav>

      {/* ACCESSIBILITY TOGGLE PANEL */}
      <div style={{marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <span style={{fontSize: '0.7rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase'}}>Accessibility Controls</span>
        
        <button 
          className="button secondary" 
          style={{fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-start'}}
          onClick={() => setHighContrast(prev => !prev)}
          title="Toggle high-contrast display for visually impaired stakeholders"
        >
          <Eye size={14} />
          {highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
        </button>

        <button 
          className="button secondary" 
          style={{fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-start'}}
          onClick={() => setFontSizeClass(prev => prev === 'font-normal' ? 'font-large' : 'font-normal')}
          title="Enlarge typography font size"
        >
          <Type size={14} />
          {fontSizeClass === 'font-large' ? 'Font: Standard' : 'Font: Large'}
        </button>

        <button 
          className={`button ${isSpeaking ? 'danger' : 'secondary'}`} 
          style={{fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-start'}}
          onClick={handleTextToSpeech}
          title="Listen to an audio readout of current dashboard metrics"
        >
          <Volume2 size={14} />
          {isSpeaking ? 'Stop Audio Readout' : 'Audio Briefing (TTS)'}
        </button>
      </div>

      <div className="sidebar-footer">
        <div className="architecture-badge">
          <span className="architecture-badge-title">EcoAccess Stack</span>
          <span className="architecture-badge-item">
            <Cpu size={10} style={{color: 'var(--color-accent-pink)'}} /> Gemini 2.5 Flash Vision
          </span>
          <span className="architecture-badge-item">
            <Activity size={10} style={{color: 'var(--color-accent-orange)'}} /> BigQuery ML ARIMA + LR
          </span>
          <span className="architecture-badge-item">
            <Building size={10} style={{color: 'var(--color-accent-indigo)'}} /> AlloyDB pgvector RAG
          </span>
          <span className="architecture-badge-item">
            <Zap size={10} style={{color: 'var(--color-accent-emerald)'}} /> Cloud Run · Vertex AI
          </span>
        </div>
        <a
          href="https://ecoaccess-457619638562.us-central1.run.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            marginTop: '0.6rem',
            fontSize: '0.65rem',
            color: 'var(--color-accent-indigo)',
            textDecoration: 'none',
            textAlign: 'center',
            padding: '0.3rem',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '4px',
            background: 'rgba(99,102,241,0.05)',
            transition: 'background 0.2s'
          }}
        >
          🌐 Live Demo
        </a>
      </div>
    </aside>
  );
}
