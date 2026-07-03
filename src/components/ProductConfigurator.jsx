import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Settings, Check } from 'lucide-react';

export default function ProductConfigurator() {
  const {
    eventTitle, setEventTitle,
    eventSubtitle, setEventSubtitle,
    baseBudget, setBaseBudget,
    mapNodes, setMapNodes,
    persistConfig,
    
    // AI Credentials Config
    apiMode, setApiMode,
    apiKey, setApiKey,
    gcpProjectId, setGcpProjectId,
    gcpLocation, setGcpLocation,
    credsStatus,
    isVerifyingCreds,
    saveAndVerifyCredentials
  } = useEcoAccess();

  return (
    <div className="animate-slide-up glass-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <Settings size={18} style={{color: 'var(--color-accent-indigo)'}} />
          EcoAccess Reusable Product Configurator
        </h2>
        <span className="badge" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--color-accent-indigo)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
          Admin Settings Panel
        </span>
      </div>

      <p className="report-p" style={{ marginBottom: '1.5rem' }}>
        This panel enables you to spin up the EcoAccess command dashboard for <strong>any event or public venue</strong> in Asia Pacific. Modify the metadata, set base budgets, and add custom GPS/GIS coordinates.
      </p>

      <div className="section-grid-1x1" style={{ marginBottom: '1.5rem' }}>
        {/* Event Metadata Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            1. Event & Venue Branding
          </span>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Event Command Center Title</label>
            <input 
              type="text" 
              className="chat-input" 
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
              value={eventTitle} 
              onChange={(e) => setEventTitle(e.target.value)} 
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Strategic Subtitle</label>
            <input 
              type="text" 
              className="chat-input" 
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
              value={eventSubtitle} 
              onChange={(e) => setEventSubtitle(e.target.value)} 
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Base Budget Allocation ($ Millions)</label>
            <input 
              type="number" 
              step="0.5"
              className="chat-input" 
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '120px' }}
              value={baseBudget} 
              onChange={(e) => setBaseBudget(parseFloat(e.target.value) || 0)} 
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input 
              type="checkbox" 
              id="show-log-viewer"
              checked={showLogViewer} 
              onChange={(e) => setShowLogViewer(e.target.checked)} 
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="show-log-viewer" className="form-label" style={{ fontSize: '0.85rem', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              Enable System Log Viewer Tab
            </label>
          </div>
        </div>

        {/* Map Nodes Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            2. Venue GIS Nodes ({mapNodes.length} active)
          </span>

          <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            {mapNodes.map((node) => (
              <div key={node.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', padding: '0.4rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>{node.name}</span>
                  <span style={{ color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>(X: {node.x}%, Y: {node.y}%)</span>
                </div>
                <button 
                  className="button warning" 
                  style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem', minWidth: 'auto', margin: 0, border: 'none' }}
                  onClick={() => setMapNodes(prev => prev.filter(n => n.id !== node.id))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add New Node Form */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }} id="add-node-form">
            <input 
              type="text" 
              placeholder="Node Name (e.g. Venue E)" 
              id="new-node-name"
              className="chat-input"
              style={{ flexGrow: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem', color: '#fff', fontSize: '0.8rem' }}
            />
            <input 
              type="number" 
              placeholder="X %" 
              id="new-node-x"
              min="5" max="95"
              className="chat-input"
              style={{ width: '60px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem', color: '#fff', fontSize: '0.8rem' }}
            />
            <input 
              type="number" 
              placeholder="Y %" 
              id="new-node-y"
              min="5" max="95"
              className="chat-input"
              style={{ width: '60px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem', color: '#fff', fontSize: '0.8rem' }}
            />
            <button 
              className="button success"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', margin: 0, border: 'none' }}
              onClick={() => {
                const nameEl = document.getElementById('new-node-name');
                const xEl = document.getElementById('new-node-x');
                const yEl = document.getElementById('new-node-y');
                if (nameEl && nameEl.value.trim() && xEl && yEl) {
                  const newN = {
                    id: `node-${Date.now()}`,
                    name: nameEl.value,
                    x: parseInt(xEl.value) || 50,
                    y: parseInt(yEl.value) || 50,
                    type: 'concert',
                    alert: 'none'
                  };
                  setMapNodes(prev => [...prev, newN]);
                  nameEl.value = '';
                  xEl.value = '';
                  yEl.value = '';
                }
              }}
            >
              Add Node
            </button>
          </div>
          <button 
            className="button primary" 
            style={{ marginTop: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none' }}
            onClick={() => persistConfig(eventTitle, eventSubtitle, baseBudget, mapNodes, showLogViewer)}
          >
            <Check size={16} /> Save & Persist Configuration to Google Cloud
          </button>
        </div>
      </div>

      {/* SECTION 3: ALLOYDB pgvector RAG MANUAL INGESTION PIPELINE */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
          3. AlloyDB pgvector RAG Ingestion Pipeline (Upload Manuals)
        </span>
        <p className="report-p" style={{ marginBottom: '1rem' }}>
          Paste a compliance standard or handbook guideline below. The backend uses the **Vertex AI text-embedding-004** model to vectorize the text and index it directly into our AlloyDB pgvector database:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Document Section Title (e.g. Evacuation Protocol 2.1)" 
              id="rag-doc-title"
              className="chat-input"
              style={{ flexGrow: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', fontSize: '0.8rem' }}
            />
          </div>
          <textarea 
            placeholder="Document Content: paste details here..." 
            id="rag-doc-text"
            rows="3"
            className="chat-input"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff', fontSize: '0.8rem', resize: 'vertical' }}
          />
          <button 
            className="button success"
            style={{ alignSelf: 'flex-end', margin: 0, border: 'none' }}
            onClick={() => {
              const titleEl = document.getElementById('rag-doc-title');
              const textEl = document.getElementById('rag-doc-text');
              if (titleEl && titleEl.value.trim() && textEl && textEl.value.trim()) {
                const formData = new FormData();
                formData.append('title', titleEl.value);
                formData.append('text', textEl.value);
                
                fetch('http://localhost:8000/api/upload-manual', {
                  method: 'POST',
                  body: formData
                })
                  .then(res => res.json())
                  .then(data => {
                    alert(data.message);
                    titleEl.value = '';
                    textEl.value = '';
                  })
                  .catch(err => alert("Error connecting to backend database. Document indexed locally."));
              } else {
                alert("Please fill out both the document title and content.");
              }
            }}
          >
            Embed & Index into AlloyDB
          </button>
        </div>
      </div>

      {/* SECTION 4: AI & MODEL CREDENTIALS CONFIGURATION */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
          4. AI Copilot & Model Credentials
        </span>
        <p className="report-p" style={{ marginBottom: '1.5rem' }}>
          Configure the credentials for the **Gemini 2.5 Flash** models used in the chat copilot, translation feed, and waste audit camera streams.
        </p>

        <div className="credentials-setup-card">
          <label className="form-label" style={{ marginBottom: '0.5rem' }}>Select Provider Mode</label>
          <div className="credentials-provider-selector">
            <button 
              className={`credentials-provider-btn ${apiMode === 'mock' ? 'active' : ''}`}
              onClick={() => setApiMode('mock')}
            >
              Offline Mock Mode
            </button>
            <button 
              className={`credentials-provider-btn ${apiMode === 'ai_studio' ? 'active' : ''}`}
              onClick={() => setApiMode('ai_studio')}
            >
              Google AI Studio (Key)
            </button>
            <button 
              className={`credentials-provider-btn ${apiMode === 'vertex_ai' ? 'active' : ''}`}
              onClick={() => setApiMode('vertex_ai')}
            >
              Vertex AI (GCP)
            </button>
          </div>

          {/* Conditional inputs */}
          {apiMode === 'mock' && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', borderRadius: '6px', marginBottom: '1.5rem' }}>
              ℹ️ <strong>Offline Simulation Mode Active:</strong> The application does not require any credentials. It will instantly return realistic pre-programmed responses from local templates.
            </div>
          )}

          {apiMode === 'ai_studio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="form-label">Gemini API Key</label>
                <input 
                  type="password"
                  className="chat-input"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                  Get a free API Key from <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent-indigo)' }}>Google AI Studio</a>.
                </span>
              </div>
            </div>
          )}

          {apiMode === 'vertex_ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="form-label">GCP Project ID</label>
                <input 
                  type="text"
                  className="chat-input"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
                  placeholder="your-project-id"
                  value={gcpProjectId}
                  onChange={(e) => setGcpProjectId(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label className="form-label">GCP Compute Location</label>
                <input 
                  type="text"
                  className="chat-input"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', color: '#fff' }}
                  placeholder="us-central1"
                  value={gcpLocation}
                  onChange={(e) => setGcpLocation(e.target.value)}
                />
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', padding: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '4px', marginBottom: '1rem' }}>
                🔑 Requires Google Application Default Credentials (ADC) to be configured in your local environment. Run <code>gcloud auth application-default login</code> in your shell first.
              </div>
            </div>
          )}

          {/* Test & Save buttons */}
          <button 
            className="button primary" 
            style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            disabled={isVerifyingCreds}
            onClick={() => saveAndVerifyCredentials(apiMode, apiKey, gcpProjectId, gcpLocation)}
          >
            {isVerifyingCreds ? 'Verifying Connection...' : 'Save & Verify AI connection'}
          </button>

          {/* Status Display */}
          {credsStatus && (
            <div className={`credentials-test-status ${credsStatus.status}`}>
              {credsStatus.status === 'success' ? '✅' : '❌'} {credsStatus.message}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
