import React from 'react';
import { useEcoAccess } from '../context/EcoAccessContext';
import { Cpu, Check } from 'lucide-react';

export default function DemoController() {
  const {
    demoStep,
    triggerSpectatorSurge,
    runBigQueryMLForecast,
    triggerPresetVisionAudit,
    handleImageUpload,
    isVisionAnalyzing,
    generateAICopilotBrief,
    geminiBrief,
    queryRAGRules,
    executeDemoMitigations,
    resetDemoWorkflow
  } = useEcoAccess();

  return (
    <div className="glass-panel" style={{display: 'flex', flexDirection: 'column'}}>
      <div className="panel-header">
        <h2 className="panel-title">
          <Cpu size={18} style={{color: 'var(--color-accent-indigo)'}} />
          Decision Intelligence Demo Workflow
        </h2>
      </div>
      
      <p className="report-p" style={{marginBottom: '1rem'}}>
        Walk through the end-to-end zero-pollution decision workflow:
      </p>

      <div className="demo-steps-timeline" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', overflowY: 'auto', maxHeight: '380px'}}>
        
        {/* STEP 1 */}
        <div className={`demo-step-card ${demoStep === 1 ? 'active' : ''}`} style={{borderLeft: demoStep === 1 ? '3px solid var(--color-accent-cyan)' : '2px solid var(--border-color)', padding: '0.5rem 0.75rem', background: demoStep === 1 ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255,255,255,0.01)', borderRadius: '4px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: '0.8rem', fontWeight: 'bold', color: demoStep === 1 ? '#fff' : 'var(--color-text-secondary)'}}>Step 1: Event Telemetry Spikes</span>
            {demoStep > 1 && <Check size={14} style={{color: 'var(--color-accent-emerald)'}} />}
          </div>
          <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', margin: '0.25rem 0'}}>
            Simulate the start of a massive crowd surge (75,000 spectators) causing grid spikes.
          </span>
          {demoStep === 1 && (
            <button className="button success" style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginTop: '0.25rem', minWidth: 'auto'}} onClick={triggerSpectatorSurge}>
              Trigger Crowd Surge
            </button>
          )}
        </div>

        {/* STEP 2 */}
        <div className={`demo-step-card ${demoStep === 2 ? 'active' : ''}`} style={{borderLeft: demoStep === 2 ? '3px solid var(--color-accent-orange)' : '2px solid var(--border-color)', padding: '0.5rem 0.75rem', background: demoStep === 2 ? 'rgba(249, 115, 22, 0.05)' : 'rgba(255,255,255,0.01)', borderRadius: '4px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: '0.8rem', fontWeight: 'bold', color: demoStep === 2 ? '#fff' : 'var(--color-text-secondary)'}}>Step 2: BigQuery ML Forecast</span>
            {demoStep > 2 && <Check size={14} style={{color: 'var(--color-accent-emerald)'}} />}
          </div>
          <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', margin: '0.25rem 0'}}>
            Execute BigQuery ML models to forecast upcoming energy demand and carbon footprints.
          </span>
          {demoStep === 2 && (
            <button className="button warning" style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginTop: '0.25rem', minWidth: 'auto'}} onClick={runBigQueryMLForecast}>
              Run BigQuery ML
            </button>
          )}
        </div>

        {/* STEP 3 */}
        <div className={`demo-step-card ${demoStep === 3 ? 'active' : ''}`} style={{borderLeft: demoStep === 3 ? '3px solid var(--color-accent-indigo)' : '2px solid var(--border-color)', padding: '0.5rem 0.75rem', background: demoStep === 3 ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.01)', borderRadius: '4px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: '0.8rem', fontWeight: 'bold', color: demoStep === 3 ? '#fff' : 'var(--color-text-secondary)'}}>Step 3: Vision AI Waste Audit</span>
            {demoStep > 3 && <Check size={14} style={{color: 'var(--color-accent-emerald)'}} />}
          </div>
          <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', margin: '0.25rem 0'}}>
            Use Gemini Vision to analyze live camera frames for waste bin levels and contamination.
          </span>
          {demoStep === 3 && (
            <div style={{marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button className="button primary" style={{padding: '0.2rem 0.4rem', fontSize: '0.7rem', minWidth: 'auto'}} onClick={() => triggerPresetVisionAudit('contaminated')}>
                  Trigger Contaminated
                </button>
                <button className="button secondary" style={{padding: '0.2rem 0.4rem', fontSize: '0.7rem', minWidth: 'auto'}} onClick={() => triggerPresetVisionAudit('clean')}>
                  Trigger Clean
                </button>
              </div>
              <div style={{borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.2rem'}}>
                <label style={{fontSize: '0.7rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.25rem'}}>Upload your own bin image:</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{fontSize: '0.7rem'}} />
              </div>
              {isVisionAnalyzing && <span style={{fontSize: '0.7rem', color: 'var(--color-accent-cyan)', fontStyle: 'italic'}}>Gemini Vision auditing image...</span>}
            </div>
          )}
        </div>

        {/* STEP 4 */}
        <div className={`demo-step-card ${demoStep === 4 ? 'active' : ''}`} style={{borderLeft: demoStep === 4 ? '3px solid var(--color-accent-pink)' : '2px solid var(--border-color)', padding: '0.5rem 0.75rem', background: demoStep === 4 ? 'rgba(236, 72, 153, 0.05)' : 'rgba(255,255,255,0.01)', borderRadius: '4px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: '0.8rem', fontWeight: 'bold', color: demoStep === 4 ? '#fff' : 'var(--color-text-secondary)'}}>Step 4: AI Decision Copilot</span>
            {demoStep > 4 && <Check size={14} style={{color: 'var(--color-accent-emerald)'}} />}
          </div>
          <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', margin: '0.25rem 0'}}>
            Consult Gemini to synthesize issues across energy grids, accessibility, and waste.
          </span>
          {demoStep === 4 && (
            <button className="button success" style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginTop: '0.25rem', minWidth: 'auto'}} onClick={generateAICopilotBrief}>
              Ask Copilot
            </button>
          )}
          {geminiBrief && (
            <div style={{background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.5rem', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--color-text-secondary)', whiteSpace: 'pre-line', maxHeight: '150px', overflowY: 'auto'}}>
              {geminiBrief}
            </div>
          )}
        </div>

        {/* STEP 5 */}
        <div className={`demo-step-card ${demoStep === 5 ? 'active' : ''}`} style={{borderLeft: demoStep === 5 ? '3px solid var(--color-accent-emerald)' : '2px solid var(--border-color)', padding: '0.5rem 0.75rem', background: demoStep === 5 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.01)', borderRadius: '4px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: '0.8rem', fontWeight: 'bold', color: demoStep === 5 ? '#fff' : 'var(--color-text-secondary)'}}>Step 5: RAG Guideline Retrieval</span>
            {demoStep > 5 && <Check size={14} style={{color: 'var(--color-accent-emerald)'}} />}
          </div>
          <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', margin: '0.25rem 0'}}>
            Retrieve specific sustainability policies using AlloyDB pgvector semantic matching.
          </span>
          {demoStep === 5 && (
            <button className="button primary" style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginTop: '0.25rem', minWidth: 'auto'}} onClick={queryRAGRules}>
              Retrieve Guidelines
            </button>
          )}
        </div>

        {/* STEP 6 */}
        <div className={`demo-step-card ${demoStep === 6 ? 'active' : ''}`} style={{borderLeft: demoStep === 6 ? '3px solid var(--color-accent-red)' : '2px solid var(--border-color)', padding: '0.5rem 0.75rem', background: demoStep === 6 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255,255,255,0.01)', borderRadius: '4px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: '0.8rem', fontWeight: 'bold', color: demoStep === 6 ? '#fff' : 'var(--color-text-secondary)'}}>Step 6: Execute Mitigations</span>
            {demoStep > 6 && <Check size={14} style={{color: 'var(--color-accent-emerald)'}} />}
          </div>
          <span style={{fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block', margin: '0.25rem 0'}}>
            Apply recommendations: activate solar peak shaving and adjust transit parameters.
          </span>
          {demoStep === 6 && (
            <button className="button danger" style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginTop: '0.25rem', minWidth: 'auto'}} onClick={executeDemoMitigations}>
              Apply Mitigations
            </button>
          )}
        </div>
      </div>

      <div style={{marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <button className="button secondary" style={{padding: '0.2rem 0.5rem', fontSize: '0.75rem', minWidth: 'auto', margin: 0, border: 'none'}} onClick={resetDemoWorkflow}>
          Reset
        </button>
        {demoStep === 7 ? (
          <span style={{fontSize: '0.85rem', color: 'var(--color-accent-emerald)', fontWeight: 'bold'}}>Demo Completed! 🎉</span>
        ) : (
          <span style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>Step {demoStep} of 6</span>
        )}
      </div>
    </div>
  );
}
